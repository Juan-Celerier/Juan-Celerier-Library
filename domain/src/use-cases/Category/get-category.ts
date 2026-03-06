import { Category } from "domain/src/entities/Category.js";
import { CategoryNotFoundError } from "domain/src/errors/error.js";
import { CategoryRepository } from "domain/src/repositories/category-repository.js";

export interface GetCategoryRequest {
  id: string;
}

export interface GetCategoryResponse {
  success: boolean;
  category?: Category;
  error?: string;
}

export async function getCategory(
  repository: CategoryRepository,
  request: GetCategoryRequest,
): Promise<GetCategoryResponse> {
  // Validación de ID
  if (!request.id || request.id.trim().length === 0) {
    return {
      success: false,
      error: "Category ID is required",
    };
  }

  // Buscar categoría
  const category = await repository.findById(request.id);

  if (!category) {
    const err = CategoryNotFoundError(request.id);
    return {
      success: false,
      error: err.message,
    };
  }

  return {
    success: true,
    category,
  };
}
