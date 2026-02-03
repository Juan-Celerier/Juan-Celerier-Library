import { Category } from "domain/src/entities/Category.js";
import { CategoryRepository } from "domain/src/repositories/category-repository.js";
export interface GetAllCategoriesResponse {
    success: boolean;
    categories: Category[];
}
export declare function getAllCategories(repository: CategoryRepository): Promise<GetAllCategoriesResponse>;
//# sourceMappingURL=get-all-categories.d.ts.map