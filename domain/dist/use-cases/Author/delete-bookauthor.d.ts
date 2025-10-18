import { AppError } from "domain/src/errors/error.js";
import { BookAuthorRepository } from "domain/src/repositories/author-repository.js";
export interface DeleteBookAuthorRequest {
    authorId: string;
}
export interface DeleteBookAuthorResponse {
    success: boolean;
    authorId?: string;
    error?: AppError;
}
export interface DeleteBookAuthorDependencies {
    bookAuthorRepository: BookAuthorRepository;
}
export declare const deleteBookAuthor: (request: DeleteBookAuthorRequest, dependencies: DeleteBookAuthorDependencies) => Promise<DeleteBookAuthorResponse>;
//# sourceMappingURL=delete-bookauthor.d.ts.map