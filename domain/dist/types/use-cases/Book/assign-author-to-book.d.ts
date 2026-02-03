import { BookAuthorRepository } from "domain/src/repositories/author-repository.js";
import { BookRepository } from "domain/src/repositories/book-repository.js";
export interface AssignAuthorToBookDeps {
    bookRepository: BookRepository;
    authorRepository: BookAuthorRepository;
}
export declare function assignAuthorToBook({ bookRepository, authorRepository }: AssignAuthorToBookDeps, { bookId, authorIds }: {
    bookId: string;
    authorIds: string[];
}): Promise<{
    authorsDetail: import("../../entities/BookAuthor.js").BookAuthor[];
    id: string;
    title: string;
    author: string;
    authors: string[];
    categories: string[];
    publisher: string;
    publicationDate: Date;
    isbn: string;
    image?: string;
    description?: string;
    createdAt: Date;
    availableCopies: number;
    totalCopies: number;
}>;
