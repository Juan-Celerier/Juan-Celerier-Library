import { createCategoryMock } from "domain/src/mocks/category-mock.js";
import { createCategoryRepositoryMock } from "domain/src/mocks/mockRepository/category-mock-repository.js";
import { describe, test, expect } from "vitest";
import { getCategory } from "./get-category.js";

describe("getCategory", () => {
  test("should return category if found", async () => {
    const category = createCategoryMock();
    const repository = createCategoryRepositoryMock([category]);

    const result = await getCategory(repository, { id: category.id });

    expect(result.success).toBe(true);
    expect(result.category).toEqual(category);
  });

  test("should return error if ID is empty", async () => {
    const repository = createCategoryRepositoryMock();

    const result = await getCategory(repository, { id: "" });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Category ID is required");
  });

  test("should return error if category does not exist", async () => {
    const repository = createCategoryRepositoryMock();

    const result = await getCategory(repository, { id: "non-existent-id" });

    expect(result.success).toBe(false);
    expect(result.error).toBe("Category with id non-existent-id not found");
  });
});
