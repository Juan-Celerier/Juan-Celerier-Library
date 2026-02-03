import { BookCopy, CreateBookCopyDTO } from "domain/src/entities/BookCopy.js";
export interface BookCopyRepository {
    create(bookCopy: CreateBookCopyDTO): Promise<BookCopy>;
    findById(id: string): Promise<BookCopy | null>;
    findByBookId(bookId: string): Promise<BookCopy[]>;
    findAvailableByBookId(bookId: string): Promise<BookCopy[]>;
    update(id: string, bookCopy: Partial<BookCopy>): Promise<BookCopy | null>;
    delete(id: string): Promise<boolean>;
    countAvailableByBookId(bookId: string): Promise<number>;
}
export interface MockedBookCopyRepository extends BookCopyRepository {
    bookCopies: BookCopy[];
}
export declare function createBookCopyRepositoryMock(bookCopies?: BookCopy[]): MockedBookCopyRepository;
//# sourceMappingURL=book-copy-mock-repository.d.ts.map