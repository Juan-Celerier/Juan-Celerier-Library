import { describe, test, expect } from "vitest";
import { Book, CreateBookDTO, UpdateBookDTO } from "./Book.js";

describe("Book Entity", () => {
  test("CreateBookDTO should exclude id and createdAt", () => {
    const bookData: CreateBookDTO = {
      title: "Test Book",
      author: "Test Author",
      authors: ["author-1"],
      categories: ["category-1"],
      publisher: "Test Publisher",
      publicationDate: new Date(),
      isbn: "978-1234567890",
      description: "Test description",
      availableCopies: 5,
      totalCopies: 10,
    };

    // Should not have id or createdAt
    expect(bookData).not.toHaveProperty("id");
    expect(bookData).not.toHaveProperty("createdAt");
  });

  test("UpdateBookDTO should exclude id and createdAt", () => {
    const bookData: UpdateBookDTO = {
      title: "Updated Book",
      author: "Updated Author",
      authors: ["author-1"],
      categories: ["category-1"],
      publisher: "Updated Publisher",
      publicationDate: new Date(),
      isbn: "978-1234567890",
      availableCopies: 5,
      totalCopies: 10,
    };

    // Should not have id or createdAt
    expect(bookData).not.toHaveProperty("id");
    expect(bookData).not.toHaveProperty("createdAt");
  });

  test("Book interface should have all required fields", () => {
    const book: Book = {
      id: "book-1",
      title: "Complete Book",
      author: "Author",
      authors: ["author-1"],
      categories: ["category-1"],
      publisher: "Publisher",
      publicationDate: new Date(),
      isbn: "978-1234567890",
      createdAt: new Date(),
      availableCopies: 5,
      totalCopies: 10,
    };

    expect(book).toHaveProperty("id");
    expect(book).toHaveProperty("title");
    expect(book).toHaveProperty("author");
    expect(book).toHaveProperty("authors");
    expect(book).toHaveProperty("categories");
    expect(book).toHaveProperty("publisher");
    expect(book).toHaveProperty("publicationDate");
    expect(book).toHaveProperty("isbn");
    expect(book).toHaveProperty("createdAt");
  });

  test("Book should allow optional fields", () => {
    const book: Book = {
      id: "book-1",
      title: "Minimal Book",
      author: "Author",
      authors: [],
      categories: [],
      publisher: "Publisher",
      publicationDate: new Date(),
      isbn: "978-1234567890",
      createdAt: new Date(),
      availableCopies: 5,
      totalCopies: 10,
      // image and description are optional
    };

    expect(book).not.toHaveProperty("image");
    expect(book).not.toHaveProperty("description");
  });
});
