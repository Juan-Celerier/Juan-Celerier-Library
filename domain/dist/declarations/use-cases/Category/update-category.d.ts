import { Category } from "domain/src/entities/Category.js";
import { CategoryRepository } from "domain/src/repositories/category-repository.js";
interface UpdateCategoryInput {
    id: string;
    name?: string;
    description?: string;
    image?: string;
}
export declare function updateCategory(repository: CategoryRepository, input: UpdateCategoryInput): Promise<Category>;
export {};
//# sourceMappingURL=update-category.d.ts.map