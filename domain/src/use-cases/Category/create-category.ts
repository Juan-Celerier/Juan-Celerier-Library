import { Category } from "domain/src/entities/Category.js";
import { createInvalidCategoryDataError, CategoryAlreadyExistsError } from "domain/src/errors/error.js";
import { CategoryRepository } from "domain/src/repositories/category-repository.js";


interface CreateCategoryInput {
  name: string;
  description: string;
  image?: string;
}

export async function createCategory(
  repository: CategoryRepository,
  input: CreateCategoryInput
): Promise<Category> {
  if (!input.name || !input.description) {
    throw createInvalidCategoryDataError();
  }

  const existingCategory = await repository.findByName(input.name);
  if (existingCategory) {
    throw CategoryAlreadyExistsError(input.name);
  }

  return repository.create({
    name: input.name,
    description: input.description,
    image: input.image,
  });
}
