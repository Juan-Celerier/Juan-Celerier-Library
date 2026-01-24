import { Book } from "domain/src/entities/Book.js";
import { BookRepository } from "domain/src/repositories/book-repository.js";
export interface CreateBookRequest {
    title: string;
    author: string;
    publisher: string;
    publicationDate: Date;
    isbn: string;
    image?: string;
    description?: string;
    availableCopies: number;
    totalCopies: number;
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
export declare const createBook: (request: CreateBookRequest, dependencies: CreateBookDependencies) => Promise<CreateBookResponse>;
