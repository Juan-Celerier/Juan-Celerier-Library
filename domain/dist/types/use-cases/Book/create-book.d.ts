import { Book } from "domain/src/entities/Book.js";
import { UserRole } from "domain/src/entities/User.js";
import { BookRepository } from "domain/src/repositories/book-repository.js";
export interface CreateBookRequest {
    title: string;
    author: string;
    publisher: string;
    publicationDate: Date;
    isbn: string;
    image?: string;
    description?: string;
    authors?: string[];
    categories?: string[];
}
export interface CreateBookResponse {
    success: boolean;
    book?: Book;
    error?: string;
    warning?: string;
}
export interface CreateBookDependencies {
    bookRepository: BookRepository;
}
export interface CreateBookWithUserRequest extends CreateBookRequest {
    userRole: UserRole;
}
export declare const createBook: (request: CreateBookRequest, dependencies: CreateBookDependencies) => Promise<CreateBookResponse>;
/**
 * Create book with role validation
 */
export declare const createBookWithRoleValidation: (request: CreateBookWithUserRequest, dependencies: CreateBookDependencies) => Promise<CreateBookResponse>;
