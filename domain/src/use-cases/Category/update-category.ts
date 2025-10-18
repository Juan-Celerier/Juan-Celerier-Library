import { Category } from "domain/src/entities/Category.js";
import {
  CategoryNotFoundError,
  CategoryAlreadyExistsError,
  createInternalServerError,
} from "domain/src/errors/error.js";
import { CategoryRepository } from "domain/src/repositories/category-repository.js";

interface UpdateCategoryInput {
  id: string;
  name?: string;
  description?: string;
  image?: string;
}

export async function updateCategory(
  repository: CategoryRepository,
  input: UpdateCategoryInput
): Promise<Category> {
  const existingCategory = await repository.findById(input.id);
  if (!existingCategory) {
    throw CategoryNotFoundError(input.id);
  }

  if (input.name && input.name !== existingCategory.name) {
    const nameExists = await repository.findByName(input.name);
    if (nameExists) {
      throw CategoryAlreadyExistsError(input.name);
    }
  }

  const updatedCategory = await repository.update(input.id, {
    name: input.name,
    description: input.description,
    image: input.image,
  });

  if (!updatedCategory) {
    throw createInternalServerError("Failed to update category");
  }

  return updatedCategory;
}
