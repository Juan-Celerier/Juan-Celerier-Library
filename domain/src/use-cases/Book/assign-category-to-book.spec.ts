import { createBookRepositoryMock } from "domain/src/mocks/mockRepository/book-mock-repository.js";
import { createCategoryRepositoryMock } from "domain/src/mocks/mockRepository/category-mock-repository.js";
import { describe, beforeEach, test, expect } from "vitest";
import { assignCategoryToBook } from "./assign-category-to-book.js";

describe("assignCategoryToBook", () => {
  let bookRepo: ReturnType<typeof createBookRepositoryMock>;
  let categoryRepo: ReturnType<typeof createCategoryRepositoryMock>;

  beforeEach(() => {
    bookRepo = createBookRepositoryMock([
      {
        id: "book-1",
        title: "Sample Book",
        isbn: "12345",
        authors: [],
        categories: [],
        description: "Sample Description",
        image: "sample-image.jpg",
        author: "Sample Author",
        createdAt: new Date(),
        publicationDate: new Date(),
        availableCopies: 5,
        totalCopies: 5,
        publisher: "Sample Publisher",
      },
    ]);

    categoryRepo = createCategoryRepositoryMock([
      {
        id: "cat-1",
        name: "Fiction",
        createdAt: new Date(),
        description: "Fictional books",
      },
    ]);
  });

  test("assigns a category to a book", async () => {
    const result = await assignCategoryToBook(
      { bookRepository: bookRepo, categoryRepository: categoryRepo },
      { bookId: "book-1", categoryIds: ["cat-1"] },
    );

    expect(result.categories).toContain("cat-1");
    expect(result.categoriesDetail.length).toBe(1);
    expect(result.categoriesDetail[0].name).toBe("Fiction");
  });

  test("throws BookNotFoundError if book not found", async () => {
    await expect(
      assignCategoryToBook(
        { bookRepository: bookRepo, categoryRepository: categoryRepo },
        { bookId: "book-99", categoryIds: ["cat-1"] },
      ),
    ).rejects.toMatchObject({ name: "BookNotFoundError" });
  });

  test("throws CategoryNotFoundError if category not found", async () => {
    await expect(
      assignCategoryToBook(
        { bookRepository: bookRepo, categoryRepository: categoryRepo },
        { bookId: "book-1", categoryIds: ["cat-99"] },
      ),
    ).rejects.toMatchObject({ name: "CategoryNotFoundError" });
  });
  test("throwscreateInternalServerError if update fails", async () => {
    // Sobrescribimos update para simular fallo
    bookRepo.update = async () => null;

    await expect(
      assignCategoryToBook(
        { bookRepository: bookRepo, categoryRepository: categoryRepo },
        { bookId: "book-1", categoryIds: ["cat-1"] },
      ),
    ).rejects.toMatchObject({ name: "InternalServerError" });
  });
  test("adds multiple categories, keeping existing ones", async () => {
    // Añadimos ya una categoría al libro
    bookRepo.books[0].categories = ["cat-1"];

    // Añadimos cat-2 además de cat-1
    categoryRepo.categories = [
      { id: "cat-2", name: "Science", createdAt: new Date(), description: "" },
    ];

    const result = await assignCategoryToBook(
      { bookRepository: bookRepo, categoryRepository: categoryRepo },
      { bookId: "book-1", categoryIds: ["cat-2"] },
    );

    expect(result.categories).toContain("cat-1");
    expect(result.categories).toContain("cat-2");
    expect(result.categoriesDetail.length).toBe(1);
    expect(result.categoriesDetail[0].name).toBe("Science");
  });

  test("throws CategoryNotFoundError if one of multiple categories is invalid", async () => {
    categoryRepo.categories = [
      { id: "cat-2", name: "Science", createdAt: new Date(), description: "" },
    ];

    await expect(
      assignCategoryToBook(
        { bookRepository: bookRepo, categoryRepository: categoryRepo },
        { bookId: "book-1", categoryIds: ["cat-2", "cat-99"] },
      ),
    ).rejects.toMatchObject({ name: "CategoryNotFoundError" });
  });
  test("does not duplicate existing categories when adding same category again", async () => {
    // El libro ya tiene cat-1
    bookRepo.books[0].categories = ["cat-1"];

    // Intentamos añadir cat-1 otra vez
    categoryRepo.categories = [
      { id: "cat-1", name: "Fiction", createdAt: new Date(), description: "" },
    ];

    const result = await assignCategoryToBook(
      { bookRepository: bookRepo, categoryRepository: categoryRepo },
      { bookId: "book-1", categoryIds: ["cat-1"] },
    );

    // La categoría no se duplica
    expect(result.categories).toEqual(["cat-1"]);
    expect(result.categoriesDetail.length).toBe(1);
    expect(result.categoriesDetail[0].name).toBe("Fiction");
  });
});
