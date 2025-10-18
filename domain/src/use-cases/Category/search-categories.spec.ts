import { createCategoryMock } from "domain/src/mocks/category-mock.js";
import { createCategoryRepositoryMock } from "domain/src/mocks/mockRepository/category-mock-repository.js";
import { describe, test, expect } from "vitest";
import { searchCategories } from "./search-categories.js";

describe("searchCategories", () => {
  test("should fail if search term is too short", async () => {
    const repository = createCategoryRepositoryMock();

    const result = await searchCategories("a", repository);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Search term must have at least 2 characters");
  });

  test("should return empty array if no matches", async () => {
    const repository = createCategoryRepositoryMock([
      createCategoryMock({ name: "Science" }),
      createCategoryMock({ name: "Technology" }),
    ]);

    const result = await searchCategories("Art", repository);

    expect(result.success).toBe(true);
    expect(result.categories).toHaveLength(0);
  });

  test("should return matching categories (case-insensitive, partial match)", async () => {
    const repository = createCategoryRepositoryMock([
      createCategoryMock({ name: "Science" }),
      createCategoryMock({ name: "Technology" }),
      createCategoryMock({ name: "Art" }),
    ]);

    const result = await searchCategories("tech", repository);

    expect(result.success).toBe(true);
    expect(result.categories).toHaveLength(1);
    expect(result.categories?.[0].name).toBe("Technology");
  });
});
