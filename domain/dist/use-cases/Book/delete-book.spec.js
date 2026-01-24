import { createBookNotFoundError, createInvalidBookDataError, createInternalServerError } from "domain/src/errors/error.js";
import { createBookRepositoryMock } from "domain/src/mocks/mockRepository/book-mock-repository.js";
import { describe, beforeEach, test, expect } from "vitest";
import { deleteBook } from "./delete-book.js";
describe("deleteBook", () => {
    let bookRepository;
    let existingBook;
    beforeEach(async () => {
        bookRepository = createBookRepositoryMock();
        existingBook = await bookRepository.create({
            title: "Libro para borrar",
            author: "Autor",
            publisher: "Editorial",
            publicationDate: new Date("2020-01-01"),
            isbn: "1234567890",
            image: "",
            categories: [],
            authors: [],
            description: "",
            availableCopies: 5,
            totalCopies: 5,
        });
    });
    test("debe borrar un libro con éxito", async () => {
        const response = await deleteBook({ id: existingBook.id }, { bookRepository });
        expect(response.success).toBe(true);
        expect(response.message).toBe("Book deleted successfully");
        const book = await bookRepository.findById(existingBook.id);
        expect(book).toBeNull();
    });
    test("debe fallar si el libro no existe", async () => {
        const response = await deleteBook({ id: "non-existent-id" }, { bookRepository });
        expect(response.success).toBe(false);
        expect(response.error).toBe(createBookNotFoundError("non-existent-id").message);
    });
    test("debe fallar si el id está vacío", async () => {
        const response = await deleteBook({ id: "" }, { bookRepository });
        expect(response.success).toBe(false);
        expect(response.error).toBe(createInvalidBookDataError().message);
    });
    test("debe fallar si delete retorna false", async () => {
        // Sobreescribimos delete para simular fallo
        bookRepository.delete = async () => false;
        const response = await deleteBook({ id: existingBook.id }, { bookRepository });
        expect(response.success).toBe(false);
        expect(response.error).toBe(createInternalServerError(`Failed to delete book with id ${existingBook.id}`).message);
    });
});
