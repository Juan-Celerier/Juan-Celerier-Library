import {
  createInvalidDataError,
  CategoryNotFoundError,
} from "domain/src/errors/error.js";
import { CategoryRepository } from "domain/src/repositories/category-repository.js";

export interface DeleteCategoryRequest {
  id: string;
}

export async function deleteCategory(
  repository: CategoryRepository,
  request: DeleteCategoryRequest,
): Promise<void> {
  // Validar ID
  if (!request.id || request.id.trim().length === 0) {
    throw createInvalidDataError();
  }

  // Intentar eliminar
  const deleted = await repository.delete(request.id);

  if (!deleted) {
    throw CategoryNotFoundError(request.id);
  }
}
