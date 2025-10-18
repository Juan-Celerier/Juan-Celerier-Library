import { CategoryAlreadyExistsError, createInvalidCategoryDataError, } from "domain/src/errors/error.js";
import { createCategoryMock } from "domain/src/mocks/category-mock.js";
import { createCategoryRepositoryMock } from "domain/src/mocks/mockRepository/category-mock-repository.js";
import { describe, test, expect } from "vitest";
import { createCategory } from "./create-category.js";
describe("Create Category Use Case", () => {
    test("should create a new category", async () => {
        const repository = createCategoryRepositoryMock();
        const input = {
            name: "New Category",
            description: "A new category",
            image: "http://example.com/image.jpg",
        };
        const result = await createCategory(repository, input);
        expect(result).toHaveProperty("id");
        expect(result.name).toBe(input.name);
        expect(repository.categories.length).toBe(1);
    });
    test("should not create a category with duplicate name", async () => {
        const category = createCategoryMock({ name: "Duplicate" });
        const repository = createCategoryRepositoryMock([category]);
        const input = {
            name: "Duplicate",
            description: "Trying duplicate",
            image: "http://example.com/image.jpg",
        };
        await expect(createCategory(repository, input)).rejects.toEqual(CategoryAlreadyExistsError("Duplicate"));
    });
    test("should throw error if name or description is missing", async () => {
        const repository = createCategoryRepositoryMock();
        const input = {
            name: "",
            description: "",
        };
        await expect(createCategory(repository, input)).rejects.toEqual(createInvalidCategoryDataError());
    });
});
