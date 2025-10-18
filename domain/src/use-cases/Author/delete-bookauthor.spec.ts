import { createAuthorNotFoundError, createInvalidDataError, createInternalServerError } from "domain/src/errors/error.js";
import { createAuthorMock } from "domain/src/mocks/bookauthor-mock.js";
import { createBookAuthorRepositoryMock } from "domain/src/mocks/mockRepository/author-mock-repository.js";
import { describe, test, expect } from "vitest";
import { DeleteBookAuthorDependencies, DeleteBookAuthorRequest, deleteBookAuthor } from "./delete-bookauthor.js";


describe("deleteBookAuthor (integration with mock repo)", () => {
  test("should delete author successfully", async () => {
    const existingAuthor = createAuthorMock({ id: "a1" });
    const repo = createBookAuthorRepositoryMock([existingAuthor]);

    const dependencies: DeleteBookAuthorDependencies = {
      bookAuthorRepository: repo,
    };

    const request: DeleteBookAuthorRequest = { authorId: "a1" };

    const result = await deleteBookAuthor(request, dependencies);

    expect(result.success).toBe(true);
    expect(result.authorId).toBe("a1");
    expect(repo.authors.length).toBe(0);
  });

  test("should fail when author not found", async () => {
    const repo = createBookAuthorRepositoryMock();
    const dependencies: DeleteBookAuthorDependencies = {
      bookAuthorRepository: repo,
    };

    const request: DeleteBookAuthorRequest = { authorId: "not-found" };

    const result = await deleteBookAuthor(request, dependencies);

    const expectedError = createAuthorNotFoundError("not-found");
    expect(result.success).toBe(false);
    expect(result.error).toStrictEqual(expectedError);
  });

  test("should fail when authorId is empty", async () => {
    const repo = createBookAuthorRepositoryMock();
    const dependencies: DeleteBookAuthorDependencies = {
      bookAuthorRepository: repo,
    };

    const request: DeleteBookAuthorRequest = { authorId: "" };

    const result = await deleteBookAuthor(request, dependencies);

    const expectedError = createInvalidDataError("Author ID is required");
    expect(result.success).toBe(false);
    expect(result.error).toStrictEqual(expectedError);
  });

  test("should return error when delete returns false", async () => {
    const existingAuthor = createAuthorMock({ id: "a1" });
    const repo = createBookAuthorRepositoryMock([existingAuthor]);

    // Forzamos a que delete no borre nada
    repo.delete = async () => false;

    const dependencies: DeleteBookAuthorDependencies = {
      bookAuthorRepository: repo,
    };

    const request: DeleteBookAuthorRequest = { authorId: "a1" };

    const result = await deleteBookAuthor(request, dependencies);

    const expectedError = createInternalServerError("Failed to delete author");
    expect(result.success).toBe(false);
    expect(result.error).toStrictEqual(expectedError);
  });
});
