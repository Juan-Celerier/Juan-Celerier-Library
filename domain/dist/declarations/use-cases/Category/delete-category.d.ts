import { CategoryRepository } from "domain/src/repositories/category-repository.js";
export interface DeleteCategoryRequest {
    id: string;
}
export declare function deleteCategory(repository: CategoryRepository, request: DeleteCategoryRequest): Promise<void>;
//# sourceMappingURL=delete-category.d.ts.map