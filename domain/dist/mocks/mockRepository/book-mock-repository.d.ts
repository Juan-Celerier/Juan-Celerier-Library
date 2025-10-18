import { Book } from "domain/src/entities/Book.js";
import { BookRepository } from "domain/src/repositories/book-repository.js";
export interface MockedBookRepository extends BookRepository {
    books: Book[];
}
export declare function createBookRepositoryMock(books?: Book[]): MockedBookRepository;
//# sourceMappingURL=book-mock-repository.d.ts.map