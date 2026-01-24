import { Book } from "domain/src/entities/Book.js";
import { BookRepository } from "domain/src/repositories/book-repository.js";
export interface UpdateBookRequest {
    id: string;
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
export interface UpdateBookResponse {
    success: boolean;
    book?: Book;
    error?: string;
    warning?: string;
}
export interface UpdateBookDependencies {
    bookRepository: BookRepository;
}
export declare const updateBook: (request: UpdateBookRequest, dependencies: UpdateBookDependencies) => Promise<UpdateBookResponse>;
