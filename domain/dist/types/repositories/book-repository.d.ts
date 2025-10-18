import { Book, CreateBookDTO, UpdateBookDTO } from "../entities/Book.js";
export interface BookRepository {
    create(book: CreateBookDTO): Promise<Book>;
    findById(id: string): Promise<Book | null>;
    findByIsbn(isbn: string): Promise<Book | null>;
    findAll(): Promise<Book[]>;
    update(id: string, book: UpdateBookDTO): Promise<Book | null>;
    delete(id: string): Promise<boolean>;
}
