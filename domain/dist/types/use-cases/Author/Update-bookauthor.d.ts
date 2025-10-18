import { BookAuthor } from "domain/src/entities/BookAuthor.js";
import { BookAuthorRepository } from "domain/src/repositories/author-repository.js";
export interface UpdateBookAuthorRequest {
    id: string;
    name?: string;
    surname?: string;
    biography?: string;
    birthDate?: Date;
    nationality?: string;
    image?: string;
}
export interface UpdateBookAuthorDependencies {
    bookAuthorRepository: BookAuthorRepository;
}
export declare const updateBookAuthor: (request: UpdateBookAuthorRequest, { bookAuthorRepository }: UpdateBookAuthorDependencies) => Promise<BookAuthor>;
