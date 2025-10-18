import { Category } from "domain/src/entities/Category.js";
import { CategoryRepository } from "domain/src/repositories/category-repository.js";
export interface GetCategoryRequest {
    id: string;
}
export interface GetCategoryResponse {
    success: boolean;
    category?: Category;
    error?: string;
}
export declare function getCategory(repository: CategoryRepository, request: GetCategoryRequest): Promise<GetCategoryResponse>;
//# sourceMappingURL=get-category.d.ts.map