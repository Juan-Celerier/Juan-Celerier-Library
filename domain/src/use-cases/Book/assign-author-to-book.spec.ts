import { createBookAuthorRepositoryMock } from "domain/src/mocks/mockRepository/author-mock-repository.js";
import { createBookRepositoryMock } from "domain/src/mocks/mockRepository/book-mock-repository.js";
import { describe, beforeEach, test, expect } from "vitest";
import { assignAuthorToBook } from "./assign-author-to-book.js";

describe("assignAuthorToBook", () => {
  let bookRepo: ReturnType<typeof createBookRepositoryMock>;
  let authorRepo: ReturnType<typeof createBookAuthorRepositoryMock>;

  beforeEach(() => {
    bookRepo = createBookRepositoryMock([
      {
        id: "book-1",
        title: "Clean Code",
        isbn: "123456",
        description: "A book about clean code",
        image: "clean-code.jpg",
        author: "Robert C. Martin",
        authors: [],
        categories: [],
        publicationDate: new Date(),
        availableCopies: 10,
        totalCopies: 10,
        publisher: "Prentice Hall",
        createdAt: new Date(),
      },
    ]);

    authorRepo = createBookAuthorRepositoryMock([
      { id: "author-1", name: "John", surname: "Doe", createdAt: new Date() },
    ]);
  });

  test("assigns an author to a book", async () => {
    const result = await assignAuthorToBook(
      { bookRepository: bookRepo, authorRepository: authorRepo },
      { bookId: "book-1", authorIds: ["author-1"] },
    );

    expect(result.authors).toContain("author-1");
    expect(result.authorsDetail.length).toBe(1);
    expect(result.authorsDetail[0].name).toBe("John");
  });

  test("throws BookNotFoundError if book not found", async () => {
    await expect(
      assignAuthorToBook(
        { bookRepository: bookRepo, authorRepository: authorRepo },
        { bookId: "book-99", authorIds: ["author-1"] },
      ),
    ).rejects.toMatchObject({ name: "BookNotFoundError" });
  });

  test("throws AuthorNotFoundError if author not found", async () => {
    await expect(
      assignAuthorToBook(
        { bookRepository: bookRepo, authorRepository: authorRepo },
        { bookId: "book-1", authorIds: ["author-99"] },
      ),
    ).rejects.toMatchObject({ name: "AuthorNotFoundError" });
  });
});
