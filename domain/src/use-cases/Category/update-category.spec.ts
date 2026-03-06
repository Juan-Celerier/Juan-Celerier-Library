import {
  CategoryNotFoundError,
  CategoryAlreadyExistsError,
  createInternalServerError,
} from "domain/src/errors/error.js";
import { createCategoryMock } from "domain/src/mocks/category-mock.js";
import { createCategoryRepositoryMock } from "domain/src/mocks/mockRepository/category-mock-repository.js";
import { describe, test, expect } from "vitest";
import { updateCategory } from "./update-category.js";

describe("Update Category Use Case", () => {
  test("should update category details", async () => {
    const category = createCategoryMock({ name: "Original" });
    const repository = createCategoryRepositoryMock([category]);

    const input = {
      id: category.id,
      name: "Updated Name",
      description: "Updated Description",
      image: "http://example.com/new-image.jpg",
    };

    const result = await updateCategory(repository, input);

    expect(result.name).toBe(input.name);
    expect(result.description).toBe(input.description);
    expect(result.image).toBe(input.image);
  });

  test("should throw an error if category does not exist", async () => {
    const repository = createCategoryRepositoryMock();

    const input = { id: "non-existent", name: "Updated Name" };

    await expect(updateCategory(repository, input)).rejects.toThrow(
      CategoryNotFoundError("non-existent").message,
    );
  });

  test("should throw an error if new name is already taken", async () => {
    const category1 = createCategoryMock({ name: "Category One" });
    const category2 = createCategoryMock({ name: "Category Two" });
    const repository = createCategoryRepositoryMock([category1, category2]);

    const input = { id: category1.id, name: "Category Two" };

    await expect(updateCategory(repository, input)).rejects.toThrow(
      CategoryAlreadyExistsError("Category Two").message,
    );
  });

  test("should throw an error if repository.update returns null", async () => {
    const category = createCategoryMock({ name: "Original" });
    const repository = createCategoryRepositoryMock([category]);
    repository.update = async () => null; // Forzamos fallo

    const input = { id: category.id, name: "New Name" };

    await expect(updateCategory(repository, input)).rejects.toThrow(
      createInternalServerError("Failed to update category").message,
    );
  });
});
