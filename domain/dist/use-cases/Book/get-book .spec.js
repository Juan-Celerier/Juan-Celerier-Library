import { createInternalServerError } from "domain/src/errors/error.js";
import { createBookRepositoryMock } from "domain/src/mocks/mockRepository/book-mock-repository.js";
import { describe, beforeEach, test, expect } from "vitest";
import { getBooks } from "./get-book.js";
describe("getBooks", () => {
    let bookRepository;
    beforeEach(() => {
        bookRepository = createBookRepositoryMock();
    });
    test("debe retornar una lista vacía si no hay libros", async () => {
        const response = await getBooks({ bookRepository });
        expect(response.success).toBe(true);
        expect(response.books).toEqual([]);
    });
    test("debe retornar todos los libros existentes", async () => {
        const book1 = await bookRepository.create({
            title: "Libro 1",
            author: "Autor 1",
            publisher: "Editorial 1",
            publicationDate: new Date("2020-01-01"),
            isbn: "1111111111",
            image: "",
            description: "",
            availableCopies: 5,
            totalCopies: 5,
            authors: [],
            categories: [],
        });
        const book2 = await bookRepository.create({
            title: "Libro 2",
            author: "Autor 2",
            publisher: "Editorial 2",
            publicationDate: new Date("2021-01-01"),
            isbn: "2222222222",
            image: "",
            description: "",
            availableCopies: 3,
            totalCopies: 3,
            authors: [],
            categories: [],
        });
        const response = await getBooks({ bookRepository });
        expect(response.success).toBe(true);
        expect(response.books).toHaveLength(2);
        expect(response.books).toContainEqual(book1);
        expect(response.books).toContainEqual(book2);
    });
    test("debe retornar error si falla el repositorio", async () => {
        bookRepository.findAll = async () => {
            throw new Error("Database error");
        };
        const response = await getBooks({ bookRepository });
        expect(response.success).toBe(false);
        expect(response.error).toBe(createInternalServerError("Failed to fetch books").message);
    });
});
