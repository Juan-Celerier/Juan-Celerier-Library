import { BookAuthor } from "domain/src/entities/BookAuthor.js";
import { BookAuthorRepository } from "domain/src/repositories/author-repository.js";
export interface GetAllBookAuthorsRequest {
}
export interface GetAllBookAuthorsResponse {
    success: boolean;
    authors?: BookAuthor[];
    count?: number;
    error?: string;
}
export interface GetAllBookAuthorsDependencies {
    bookAuthorRepository: BookAuthorRepository;
}
export declare const getAllBookAuthors: (request: GetAllBookAuthorsRequest, dependencies: GetAllBookAuthorsDependencies) => Promise<GetAllBookAuthorsResponse>;
//# sourceMappingURL=get-bookauthor.d.ts.map