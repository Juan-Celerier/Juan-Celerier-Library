import { Category } from "domain/src/entities/Category.js";
import { CategoryRepository } from "domain/src/repositories/category-repository.js";
export interface MockedCategoryRepository extends CategoryRepository {
    categories: Category[];
}
export declare function createCategoryRepositoryMock(categories?: Category[]): MockedCategoryRepository;
