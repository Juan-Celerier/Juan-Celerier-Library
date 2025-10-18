import { createBookNotFoundError, createInvalidBookDataError, } from "domain/src/errors/error.js";
import { createBookRepositoryMock } from "domain/src/mocks/mockRepository/book-mock-repository.js";
import { describe, beforeEach, test, expect } from "vitest";
import { updateBook } from "./update-book.js";
describe("updateBook", () => {
    let bookRepository;
    let existingBook;
    beforeEach(async () => {
        bookRepository = createBookRepositoryMock();
        existingBook = await bookRepository.create({
            title: "El libro de la vida",
            authors: ["author-1", "author-2"],
            categories: ["category-1"],
            author: "Juan Pérez",
            publisher: "Editorial ABC",
            publicationDate: new Date("2020-01-01"),
            isbn: "1234567890",
            image: "imagen.jpg",
            description: "Descripción",
            availableCopies: 10,
            totalCopies: 10,
        });
    });
    const buildRequest = (overrides = {}) => ({
        id: existingBook.id,
        title: "Libro",
        author: "Autor",
        publisher: "Editorial",
        publicationDate: new Date("2020-01-01"),
        isbn: "1234567890",
        image: "",
        description: "",
        availableCopies: 5,
        totalCopies: 5,
        authors: [],
        categories: [],
        ...overrides,
    });
    test("debe actualizar un libro con éxito", async () => {
        const request = buildRequest({
            id: existingBook.id,
            title: "El libro de la vida actualizado",
            image: "imagen-actualizada.jpg",
            description: "Descripción actualizada",
        });
        const response = await updateBook(request, { bookRepository });
        expect(response.success).toBe(true);
        expect(response.book).toBeDefined();
        expect(response.book?.title).toBe("El libro de la vida actualizado");
        expect(response.book?.image).toBe("imagen-actualizada.jpg");
    });
    test("debe retornar error si el libro no existe", async () => {
        const request = buildRequest({ id: "non-existent-id" });
        const response = await updateBook(request, { bookRepository });
        expect(response.success).toBe(false);
        expect(response.error).toBe(createBookNotFoundError("non-existent-id").message);
    });
    test.each([
        ["title", ""],
        ["author", ""],
        ["publisher", ""],
        ["isbn", ""],
    ])("debe fallar si %s está vacío", async (field, value) => {
        const request = buildRequest({ [field]: value });
        const response = await updateBook(request, { bookRepository });
        expect(response.success).toBe(false);
        expect(response.error).toBe(createInvalidBookDataError().message);
    });
    test("debe fallar si publicationDate es futura", async () => {
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);
        const request = buildRequest({ publicationDate: futureDate });
        const response = await updateBook(request, { bookRepository });
        expect(response.success).toBe(false);
        expect(response.error).toBe(createInvalidBookDataError().message);
    });
    test("debe fallar si availableCopies > totalCopies", async () => {
        const request = buildRequest({ availableCopies: 10, totalCopies: 5 });
        const response = await updateBook(request, { bookRepository });
        expect(response.success).toBe(false);
        expect(response.error).toBe(createInvalidBookDataError().message);
    });
    test("debe retornar error si update retorna null", async () => {
        bookRepository.update = async () => null;
        const request = buildRequest();
        const response = await updateBook(request, { bookRepository });
        expect(response.success).toBe(false);
        expect(response.error).toBe(`Failed to update book with id ${existingBook.id}`);
    });
    test("debe retornar error si update lanza una excepción", async () => {
        bookRepository.update = async () => {
            throw new Error("DB connection lost");
        };
        const request = buildRequest({ title: "Libro con error" });
        const response = await updateBook(request, { bookRepository });
        expect(response.success).toBe(false);
        expect(response.error).toBe(`Failed to update book with id ${existingBook.id}`);
    });
});
