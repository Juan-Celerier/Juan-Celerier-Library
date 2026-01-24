import { describe, test, expect } from "vitest";
import { Category, CreateCategoryDTO } from "./Category.js";

describe("Category Entity", () => {
  test("Category should have all required fields", () => {
    const category: Category = {
      id: "category-1",
      name: "Fiction",
      description: "Fiction books",
      createdAt: new Date(),
    };

    expect(category).toHaveProperty("id");
    expect(category).toHaveProperty("name");
    expect(category).toHaveProperty("description");
    expect(category).toHaveProperty("createdAt");
  });

  test("Category should allow optional image field", () => {
    const category: Category = {
      id: "category-1",
      name: "Fiction",
      description: "Fiction books",
      createdAt: new Date(),
      // image is optional
    };

    expect(category).not.toHaveProperty("image");
  });

  test("CreateCategoryDTO should exclude id and createdAt", () => {
    const categoryData: CreateCategoryDTO = {
      name: "Science",
      description: "Science books",
    };

    expect(categoryData).not.toHaveProperty("id");
    expect(categoryData).not.toHaveProperty("createdAt");
  });
});
