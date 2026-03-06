import { Category } from "domain/src/entities/Category.js";
import { createInvalidDataError } from "domain/src/errors/error.js";
import { CategoryRepository } from "domain/src/repositories/category-repository.js";

export interface SearchCategoriesResponse {
  success: boolean;
  categories?: Category[];
  error?: string;
}

export async function searchCategories(
  term: string,
  repository: CategoryRepository,
): Promise<SearchCategoriesResponse> {
  if (!term || term.trim().length < 2) {
    return {
      success: false,
      error: createInvalidDataError(
        "Search term must have at least 2 characters",
      ).message,
    };
  }

  const allCategories = await repository.findAll();

  const filtered = allCategories.filter((category) =>
    category.name.toLowerCase().includes(term.toLowerCase()),
  );

  return {
    success: true,
    categories: filtered,
  };
}
