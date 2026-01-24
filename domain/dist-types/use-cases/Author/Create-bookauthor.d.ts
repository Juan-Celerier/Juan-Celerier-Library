import { BookAuthor, CreateBookAuthorDTO } from "domain/src/entities/BookAuthor.js";
import { BookAuthorRepository } from "domain/src/repositories/author-repository.js";
interface CreateBookAuthorResult {
    success: boolean;
    author?: BookAuthor;
    error?: string;
}
export declare function createBookAuthor(input: CreateBookAuthorDTO, repo: BookAuthorRepository): Promise<CreateBookAuthorResult>;
export {};
