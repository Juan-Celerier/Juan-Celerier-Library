import { BookAuthor, CreateBookAuthorDTO } from "../entities/BookAuthor.js";
export interface BookAuthorRepository {
    findAll(): Promise<BookAuthor[]>;
    findById(id: string): Promise<BookAuthor | null>;
    create(data: CreateBookAuthorDTO): Promise<BookAuthor>;
    update(id: string, data: Partial<CreateBookAuthorDTO>): Promise<BookAuthor | null>;
    delete(id: string): Promise<boolean>;
    searchByName(term: string): Promise<BookAuthor[]>;
}
