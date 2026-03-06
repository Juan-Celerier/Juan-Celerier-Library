import { BookRepository } from "domain/src/repositories/book-repository.js";
import { CategoryRepository } from "domain/src/repositories/category-repository.js";
export interface AssignCategoryToBookDeps {
    bookRepository: BookRepository;
    categoryRepository: CategoryRepository;
}
export interface AssignCategoryToBookDTO {
    bookId: string;
    categoryIds: string[];
}
export declare function assignCategoryToBook({ bookRepository, categoryRepository }: AssignCategoryToBookDeps, { bookId, categoryIds }: AssignCategoryToBookDTO): Promise<{
    categoriesDetail: import("../../entities/Category.js").Category[];
    id: string;
    title: string;
    author: string;
    authors: string[];
    categories: string[];
    publisher: string;
    publicationDate: Date;
    isbn: string;
    image?: string;
    description?: string;
    createdAt: Date;
    availableCopies: number;
    totalCopies: number;
}>;
//# sourceMappingURL=assign-category-to-book.d.ts.map