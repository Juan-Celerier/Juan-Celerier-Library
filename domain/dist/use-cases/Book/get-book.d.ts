import { Book } from "domain/src/entities/Book.js";
import { BookRepository } from "domain/src/repositories/book-repository.js";
export interface GetBooksResponse {
    success: boolean;
    books?: Book[];
    error?: string;
}
export interface GetBooksDependencies {
    bookRepository: BookRepository;
}
export declare const getBooks: (dependencies: GetBooksDependencies) => Promise<GetBooksResponse>;
