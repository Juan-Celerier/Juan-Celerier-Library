import { Category } from "../entities/Category.js";

export function createCategoryMock(opts: Partial<Category> = {}): Category {
  return {
    id: "category-123",
    name: "Category 1",
    description: "Description 1",
    image: "http://example.com/image.jpg",
    createdAt: new Date(),
    ...opts,
  };
}
