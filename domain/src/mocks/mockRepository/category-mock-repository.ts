import { Category, CreateCategoryDTO } from "domain/src/entities/Category.js";
import { CategoryRepository } from "domain/src/repositories/category-repository.js";
import { v4 as uuid } from "uuid";

export interface MockedCategoryRepository extends CategoryRepository {
  categories: Category[];
}

export function createCategoryRepositoryMock(
  categories: Category[] = [],
): MockedCategoryRepository {
  return {
    categories,

    async create(data: CreateCategoryDTO) {
      const newCategory: Category = {
        id: uuid(),
        createdAt: new Date(),
        ...data,
      };
      this.categories.push(newCategory);
      return newCategory;
    },

    async findById(id: string) {
      return this.categories.find((c) => c.id === id) || null;
    },

    async findAll() {
      return this.categories;
    },

    async update(id: string, data: Partial<CreateCategoryDTO>) {
      const index = this.categories.findIndex((c) => c.id === id);
      if (index === -1) throw new Error("Category not found");

      this.categories[index] = {
        ...this.categories[index],
        ...data,
      };
      return this.categories[index];
    },

    async delete(id: string) {
      const initialLength = this.categories.length;
      this.categories = this.categories.filter((c) => c.id !== id);
      return this.categories.length < initialLength;
    },

    async findByName(name: string) {
      return (
        this.categories.find(
          (c) => c.name.toLowerCase() === name.toLowerCase(),
        ) || null
      );
    },
  };
}
