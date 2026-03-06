import { Category } from "domain/src/entities/Category.js";
import { CategoryRepository } from "domain/src/repositories/category-repository.js";
interface CreateCategoryInput {
    name: string;
    description: string;
    image?: string;
}
export declare function createCategory(repository: CategoryRepository, input: CreateCategoryInput): Promise<Category>;
export {};
//# sourceMappingURL=create-category.d.ts.map