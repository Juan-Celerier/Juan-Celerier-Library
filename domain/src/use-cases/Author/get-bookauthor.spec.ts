import { createAuthorMock } from "domain/src/mocks/bookauthor-mock.js";
import { createBookAuthorRepositoryMock } from "domain/src/mocks/mockRepository/author-mock-repository.js";
import { describe, test, expect } from "vitest";
import {
  GetAllBookAuthorsDependencies,
  GetAllBookAuthorsRequest,
  getAllBookAuthors,
} from "./get-bookauthor.js";

describe("getAllBookAuthors (integration with mock repo)", () => {
  test("should return all book authors successfully when authors exist", async () => {
    const existingAuthors = [
      createAuthorMock({
        id: "a1",
        name: "Gabriel",
        surname: "García Márquez",
      }),
      createAuthorMock({ id: "a2", name: "Jorge Luis", surname: "Borges" }),
      createAuthorMock({ id: "a3", name: "Julio", surname: "Cortázar" }),
    ];

    const repo = createBookAuthorRepositoryMock(existingAuthors);
    const dependencies: GetAllBookAuthorsDependencies = {
      bookAuthorRepository: repo,
    };
    const request: GetAllBookAuthorsRequest = {};

    const result = await getAllBookAuthors(request, dependencies);

    expect(result.success).toBe(true);
    expect(result.authors).toEqual(existingAuthors);
    expect(result.count).toBe(3);
  });

  test("should return empty array when no authors exist", async () => {
    const repo = createBookAuthorRepositoryMock();
    const dependencies: GetAllBookAuthorsDependencies = {
      bookAuthorRepository: repo,
    };
    const request: GetAllBookAuthorsRequest = {};

    const result = await getAllBookAuthors(request, dependencies);

    expect(result.success).toBe(true);
    expect(result.authors).toEqual([]);
    expect(result.count).toBe(0);
  });

  test("should return single author when only one exists", async () => {
    const singleAuthor = createAuthorMock({
      id: "a1",
      name: "Isabel",
      surname: "Allende",
    });
    const repo = createBookAuthorRepositoryMock([singleAuthor]);
    const dependencies: GetAllBookAuthorsDependencies = {
      bookAuthorRepository: repo,
    };
    const request: GetAllBookAuthorsRequest = {};

    const result = await getAllBookAuthors(request, dependencies);

    expect(result.success).toBe(true);
    expect(result.authors).toEqual([singleAuthor]);
    expect(result.count).toBe(1);
  });

  test("should handle authors with minimal data", async () => {
    const minimalAuthors = [
      createAuthorMock({ id: "m1", name: "Jane", surname: "Doe" }),
      createAuthorMock({ id: "m2", name: "John", surname: "Smith" }),
    ];
    const repo = createBookAuthorRepositoryMock(minimalAuthors);
    const dependencies: GetAllBookAuthorsDependencies = {
      bookAuthorRepository: repo,
    };
    const request: GetAllBookAuthorsRequest = {};

    const result = await getAllBookAuthors(request, dependencies);

    expect(result.success).toBe(true);
    expect(result.authors).toHaveLength(2);
    expect(result.count).toBe(2);
  });

  test("should handle repository errors gracefully", async () => {
    const repo = createBookAuthorRepositoryMock();
    // Forzamos error en findAll
    repo.findAll = async () => {
      throw new Error("Database connection failed");
    };
    const dependencies: GetAllBookAuthorsDependencies = {
      bookAuthorRepository: repo,
    };
    const request: GetAllBookAuthorsRequest = {};

    await expect(getAllBookAuthors(request, dependencies)).rejects.toThrow(
      "Database connection failed",
    );
  });

  test("should preserve author data integrity", async () => {
    const specificDate = new Date("1927-03-06");
    const authorsWithCompleteData = [
      createAuthorMock({
        id: "complete",
        name: "Gabriel",
        surname: "García Márquez",
        biography: "Colombian novelist and Nobel Prize winner",
        birthDate: specificDate,
        nationality: "Colombian",
        image: "gabriel.jpg",
      }),
    ];

    const repo = createBookAuthorRepositoryMock(authorsWithCompleteData);
    const dependencies: GetAllBookAuthorsDependencies = {
      bookAuthorRepository: repo,
    };
    const request: GetAllBookAuthorsRequest = {};

    const result = await getAllBookAuthors(request, dependencies);

    expect(result.success).toBe(true);
    expect(result.authors).toEqual(authorsWithCompleteData);
  });
});
