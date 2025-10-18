import { Book } from "domain/src/entities/Book.js";
import { createInvalidBookDataError } from "domain/src/errors/error.js";
import { BookRepository } from "domain/src/repositories/book-repository.js";
import { describe, beforeEach, test, expect } from "vitest";
import {
  CreateBookDependencies,
  CreateBookRequest,
  createBook,
} from "./create-book.js";

const createMockDependencies = (): CreateBookDependencies => {
  const mockBookRepository: Partial<BookRepository> = {
    findByIsbn: async (isbn: string): Promise<Book | null> => null,
    create: async (book: any): Promise<Book> => {
      return { ...book, id: "book-id", createdAt: new Date() } as Book;
    },
  };

  return {
    bookRepository: mockBookRepository as BookRepository,
  };
};

describe("createBook", () => {
  let dependencies: CreateBookDependencies;

  beforeEach(() => {
    dependencies = createMockDependencies();
  });

  test("creates book successfully with complete data", async () => {
    const request: CreateBookRequest = {
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      publisher: "Editorial Sudamericana",
      publicationDate: new Date("1967-05-30"),
      isbn: "978-987-1144-81-7",
      image: "cien-anos-cover.jpg",
      description: "Una obra maestra del realismo mágico",
      availableCopies: 15,
      totalCopies: 20,
    };

    const result = await createBook(request, dependencies);

    expect(result.success).toBe(true);
    expect(result.book?.title).toBe(request.title);
    expect(result.book?.author).toBe(request.author);
    expect(result.error).toBeUndefined();
  });

  test("warns when book with same ISBN already exists", async () => {
    dependencies.bookRepository.findByIsbn = async () => ({
      id: "existing-book",
      title: "Existente",
      authors: [],
      categories: [],
      isbn: "978-987-1144-81-7",
      author: "Autor",
      publisher: "Editorial",
      publicationDate: new Date(),
      availableCopies: 5,
      totalCopies: 5,
      createdAt: new Date(),
    });

    const request: CreateBookRequest = {
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      publisher: "Editorial Sudamericana",
      publicationDate: new Date("1967-05-30"),
      isbn: "978-987-1144-81-7",
      availableCopies: 10,
      totalCopies: 15,
    };

    const result = await createBook(request, dependencies);

    expect(result.success).toBe(true);
    expect(result.warning).toBeDefined();
  });

  test("fails when title is empty", async () => {
    const request: CreateBookRequest = {
      title: "",
      author: "Autor Test",
      publisher: "Editorial Test",
      publicationDate: new Date(),
      isbn: "978-123-456-789-0",
      availableCopies: 5,
      totalCopies: 5,
    };

    const result = await createBook(request, dependencies);

    expect(result.success).toBe(false);
    expect(result.error).toBe(createInvalidBookDataError().message);
  });

  test("fails when author is empty", async () => {
    const request: CreateBookRequest = {
      title: "Libro Test",
      author: "",
      publisher: "Editorial Test",
      publicationDate: new Date(),
      isbn: "978-123-456-789-0",
      availableCopies: 5,
      totalCopies: 5,
    };

    const result = await createBook(request, dependencies);

    expect(result.success).toBe(false);
    expect(result.error).toBe(createInvalidBookDataError().message);
  });

  test("fails when ISBN is empty", async () => {
    const request: CreateBookRequest = {
      title: "Libro Test",
      author: "Autor Test",
      publisher: "Editorial Test",
      publicationDate: new Date(),
      isbn: "",
      availableCopies: 5,
      totalCopies: 5,
    };

    const result = await createBook(request, dependencies);

    expect(result.success).toBe(false);
    expect(result.error).toBe(createInvalidBookDataError().message);
  });

  test("fails when publication date is in the future", async () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);

    const request: CreateBookRequest = {
      title: "Libro Futuro",
      author: "Autor",
      publisher: "Editorial",
      publicationDate: futureDate,
      isbn: "978-123-456-789-0",
      availableCopies: 5,
      totalCopies: 5,
    };

    const result = await createBook(request, dependencies);

    expect(result.success).toBe(false);
    expect(result.error).toBe(createInvalidBookDataError().message);
  });

  test("fails when availableCopies > totalCopies", async () => {
    const request: CreateBookRequest = {
      title: "Libro Test",
      author: "Autor Test",
      publisher: "Editorial Test",
      publicationDate: new Date(),
      isbn: "978-123-456-789-0",
      availableCopies: 10,
      totalCopies: 5,
    };

    const result = await createBook(request, dependencies);

    expect(result.success).toBe(false);
    expect(result.error).toBe(createInvalidBookDataError().message);
  });

  test("fails when copies are negative", async () => {
    const request: CreateBookRequest = {
      title: "Libro Test",
      author: "Autor Test",
      publisher: "Editorial Test",
      publicationDate: new Date(),
      isbn: "978-123-456-789-0",
      availableCopies: -1,
      totalCopies: 5,
    };

    const result = await createBook(request, dependencies);

    expect(result.success).toBe(false);
    expect(result.error).toBe(createInvalidBookDataError().message);
  });
});
