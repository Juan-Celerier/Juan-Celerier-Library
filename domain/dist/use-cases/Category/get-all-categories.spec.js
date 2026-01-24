import { createCategoryMock } from "domain/src/mocks/category-mock.js";
import { createCategoryRepositoryMock } from "domain/src/mocks/mockRepository/category-mock-repository.js";
import { describe, test, expect } from "vitest";
import { getAllCategories } from "./get-all-categories.js";
describe("getAllCategories", () => {
    test("should return empty array if no categories exist", async () => {
        const repository = createCategoryRepositoryMock();
        const result = await getAllCategories(repository);
        expect(result.success).toBe(true);
        expect(result.categories).toEqual([]);
    });
    test("should return all categories", async () => {
        const category1 = createCategoryMock({ id: "1" });
        const category2 = createCategoryMock({ id: "2" });
        const repository = createCategoryRepositoryMock([category1, category2]);
        const result = await getAllCategories(repository);
        expect(result.success).toBe(true);
        expect(result.categories).toHaveLength(2);
        expect(result.categories).toContainEqual(category1);
        expect(result.categories).toContainEqual(category2);
    });
});
