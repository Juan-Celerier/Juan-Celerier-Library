import { createInvalidDataError, CategoryNotFoundError } from "domain/src/errors/error.js";
import { createCategoryMock } from "domain/src/mocks/category-mock.js";
import { createCategoryRepositoryMock } from "domain/src/mocks/mockRepository/category-mock-repository.js";
import { describe, test, expect } from "vitest";
import { deleteCategory } from "./delete-category.js";


describe("deleteCategory", () => {
  test("should delete a category successfully", async () => {
    const category = createCategoryMock();
    const repository = createCategoryRepositoryMock([category]);

    await deleteCategory(repository, { id: category.id });

    expect(repository.categories.length).toBe(0);
  });

  test("should throw error if category ID is empty", async () => {
    const repository = createCategoryRepositoryMock();

    await expect(deleteCategory(repository, { id: "" })).rejects.toEqual(
      createInvalidDataError()
    );
  });

  test("should throw error if category does not exist", async () => {
    const repository = createCategoryRepositoryMock();

    await expect(
      deleteCategory(repository, { id: "non-existent-id" })
    ).rejects.toEqual(CategoryNotFoundError("non-existent-id"));
  });
});
