import { createAuthorNotFoundError, createInvalidDataError, createInternalServerError, } from "domain/src/errors/error.js";
import { createBookAuthorRepositoryMock } from "domain/src/mocks/mockRepository/author-mock-repository.js";
import { describe, beforeEach, test, expect } from "vitest";
import { updateBookAuthor, } from "./Update-bookauthor.js";
describe("updateBookAuthor", () => {
    let dependencies;
    beforeEach(() => {
        dependencies = {
            bookAuthorRepository: createBookAuthorRepositoryMock(),
        };
    });
    test("should update author successfully", async () => {
        const existingAuthor = {
            id: "author-1",
            name: "Gabriel",
            surname: "García Márquez",
            createdAt: new Date(),
        };
        await dependencies.bookAuthorRepository.create(existingAuthor);
        const request = {
            id: "author-1",
            name: "Gabriel José",
        };
        const result = await updateBookAuthor(request, dependencies);
        expect(result.name).toBe("Gabriel José");
        expect(result.surname).toBe("García Márquez");
    });
    test("should throw AuthorNotFoundError if author does not exist", async () => {
        const request = {
            id: "unknown-id",
            name: "New Name",
        };
        await expect(updateBookAuthor(request, dependencies)).rejects.toMatchObject(createAuthorNotFoundError("unknown-id"));
    });
    test("should throw InvalidDataError if name is empty", async () => {
        const existingAuthor = {
            id: "author-2",
            name: "Isabel",
            surname: "Allende",
            createdAt: new Date(),
        };
        await dependencies.bookAuthorRepository.create(existingAuthor);
        const request = { id: "author-2", name: "" };
        await expect(updateBookAuthor(request, dependencies)).rejects.toMatchObject(createInvalidDataError("Name cannot be empty"));
    });
    test("should throw InvalidDataError if surname is empty", async () => {
        const existingAuthor = {
            id: "author-3",
            name: "Jorge Luis",
            surname: "Borges",
            createdAt: new Date(),
        };
        await dependencies.bookAuthorRepository.create(existingAuthor);
        const request = { id: "author-3", surname: "" };
        await expect(updateBookAuthor(request, dependencies)).rejects.toMatchObject(createInvalidDataError("Surname cannot be empty"));
    });
    test("should throw InvalidDataError if birthDate is in the future", async () => {
        const existingAuthor = {
            id: "author-4",
            name: "Julio",
            surname: "Cortázar",
            createdAt: new Date(),
        };
        await dependencies.bookAuthorRepository.create(existingAuthor);
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);
        const request = {
            id: "author-4",
            birthDate: futureDate,
        };
        await expect(updateBookAuthor(request, dependencies)).rejects.toMatchObject(createInvalidDataError("Birth date cannot be in the future"));
    });
    test("should throwcreateInternalServerError if update fails", async () => {
        const existingAuthor = {
            id: "author-5",
            name: "Mario",
            surname: "Vargas Llosa",
            createdAt: new Date(),
        };
        await dependencies.bookAuthorRepository.create(existingAuthor);
        // Simular fallo en update
        dependencies.bookAuthorRepository.update = async () => null;
        const request = {
            id: "author-5",
            name: "Mario José",
        };
        await expect(updateBookAuthor(request, dependencies)).rejects.toMatchObject(createInternalServerError("Failed to update author"));
    });
    test("should update only provided fields", async () => {
        const existingAuthor = {
            id: "author-6",
            name: "Mario",
            surname: "Vargas Llosa",
            nationality: "Peruvian",
            createdAt: new Date(),
        };
        await dependencies.bookAuthorRepository.create(existingAuthor);
        const request = {
            id: "author-6",
            nationality: "Spanish",
        };
        const result = await updateBookAuthor(request, dependencies);
        expect(result.nationality).toBe("Spanish");
        expect(result.name).toBe("Mario"); // sigue igual
        expect(result.surname).toBe("Vargas Llosa"); // sigue igual
    });
});
