import { BookRepository } from "domain/src/repositories/book-repository.js";
export interface DeleteBookRequest {
    id: string;
}
export interface DeleteBookResponse {
    success: boolean;
    message?: string;
    error?: string;
}
export interface DeleteBookDependencies {
    bookRepository: BookRepository;
}
export declare const deleteBook: (request: DeleteBookRequest, dependencies: DeleteBookDependencies) => Promise<DeleteBookResponse>;
//# sourceMappingURL=delete-book.d.ts.map