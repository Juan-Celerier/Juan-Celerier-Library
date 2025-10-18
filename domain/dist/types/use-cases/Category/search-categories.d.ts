import { Category } from "domain/src/entities/Category.js";
import { CategoryRepository } from "domain/src/repositories/category-repository.js";
export interface SearchCategoriesResponse {
    success: boolean;
    categories?: Category[];
    error?: string;
}
export declare function searchCategories(term: string, repository: CategoryRepository): Promise<SearchCategoriesResponse>;
