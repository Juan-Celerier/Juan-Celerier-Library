import { BookAuthor } from "domain/src/entities/BookAuthor.js";
import { createInternalServerError } from "domain/src/errors/error.js";
import { describe, beforeEach, test, expect } from "vitest";
import {
  SearchBookAuthorsDependencies,
  SearchBookAuthorsRequest,
  searchBookAuthors,
} from "./Search-bookauthor.js";

// Helper para mock de repo
const createMockDependencies = (
  authors: BookAuthor[] = []
): SearchBookAuthorsDependencies => ({
  bookAuthorRepository: {
    searchByName: async (term: string): Promise<BookAuthor[]> =>
      authors.filter((author) =>
        author.name.toLowerCase().includes(term.toLowerCase())
      ),
    findAll: async (): Promise<BookAuthor[]> => authors,
  },
});

describe("searchBookAuthors", () => {
  let dependencies: SearchBookAuthorsDependencies;
  let authorsData: BookAuthor[];

  beforeEach(() => {
    authorsData = [
      {
        id: "author-1",
        name: "Gabriel",
        surname: "García Márquez",
        nationality: "Colombian",
        createdAt: new Date("2023-01-01"),
      },
      {
        id: "author-2",
        name: "Federico",
        surname: "García Lorca",
        nationality: "Spanish",
        createdAt: new Date("2023-01-02"),
      },
      {
        id: "author-3",
        name: "Jorge Luis",
        surname: "Borges",
        nationality: "Argentinian",
        createdAt: new Date("2023-01-03"),
      },
    ];
    dependencies = createMockDependencies(authorsData);
  });

  test("should return matching authors when search term is provided", async () => {
    const request: SearchBookAuthorsRequest = { searchTerm: "García" };
    const result = await searchBookAuthors(request, dependencies);

    const expectedAuthors = authorsData.filter((a) =>
      a.name.toLowerCase().includes("garcía")
    );

    expect(result.success).toBe(true);
    expect(result.authors).toEqual(expectedAuthors);
    expect(result.totalCount).toBe(expectedAuthors.length);
    expect(result.error).toBeUndefined();
  });

  test("should return empty array when no authors match search term", async () => {
    const request: SearchBookAuthorsRequest = { searchTerm: "Nonexistent" };
    const result = await searchBookAuthors(request, dependencies);

    expect(result.success).toBe(true);
    expect(result.authors).toEqual([]);
    expect(result.totalCount).toBe(0);
    expect(result.error).toBeUndefined();
  });

  test("should return all authors when search term is empty or whitespace", async () => {
    const requests: SearchBookAuthorsRequest[] = [
      { searchTerm: "" },
      { searchTerm: "   " },
    ];

    for (const request of requests) {
      const result = await searchBookAuthors(request, dependencies);
      expect(result.success).toBe(true);
      expect(result.authors).toEqual(authorsData);
      expect(result.totalCount).toBe(authorsData.length);
      expect(result.error).toBeUndefined();
    }
  });

  test("should handle case insensitive search", async () => {
    const request: SearchBookAuthorsRequest = { searchTerm: "gabriel" };
    const result = await searchBookAuthors(request, dependencies);

    const expectedAuthors = authorsData.filter((a) =>
      a.name.toLowerCase().includes("gabriel")
    );

    expect(result.success).toBe(true);
    expect(result.authors).toEqual(expectedAuthors);
    expect(result.totalCount).toBe(expectedAuthors.length);
  });

  test("should throw AppError if repository throws", async () => {
    const request: SearchBookAuthorsRequest = { searchTerm: "any" };
    const failingDependencies: SearchBookAuthorsDependencies = {
      bookAuthorRepository: {
        findAll: async () => {
          throw new Error("fail findAll");
        },
        searchByName: async () => {
          throw new Error("fail searchByName");
        },
      },
    };

    await expect(
      searchBookAuthors(request, failingDependencies)
    ).rejects.toThrowError(
      createInternalServerError("fail searchByName").message
    );
  });
});
