import { BookAuthor } from "domain/src/entities/BookAuthor.js";
import { BookAuthorRepository } from "domain/src/repositories/author-repository.js";
export interface MockedAuthorRepository extends BookAuthorRepository {
    authors: BookAuthor[];
}
export declare function createBookAuthorRepositoryMock(authors?: BookAuthor[]): MockedAuthorRepository;
