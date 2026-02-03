import { Category, CreateCategoryDTO } from "../entities/Category.js";
export interface CategoryRepository {
    create(category: CreateCategoryDTO): Promise<Category>;
    findById(id: string): Promise<Category | null>;
    findAll(): Promise<Category[]>;
    update(id: string, category: Partial<CreateCategoryDTO>): Promise<Category | null>;
    delete(id: string): Promise<boolean>;
    findByName(name: string): Promise<Category | null>;
}
//# sourceMappingURL=category-repository.d.ts.map