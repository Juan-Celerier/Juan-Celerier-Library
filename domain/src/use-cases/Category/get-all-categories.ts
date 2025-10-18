import { Category } from "domain/src/entities/Category.js";
import { CategoryRepository } from "domain/src/repositories/category-repository.js";

export interface GetAllCategoriesResponse {
  success: boolean;
  categories: Category[];
}

export async function getAllCategories(
  repository: CategoryRepository
): Promise<GetAllCategoriesResponse> {
  const categories = await repository.findAll();

  return {
    success: true,
    categories,
  };
}
