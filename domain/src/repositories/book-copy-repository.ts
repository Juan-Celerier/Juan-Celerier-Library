import {
  BookCopy,
  CreateBookCopyDTO,
  UpdateBookCopyDTO,
} from "../entities/BookCopy.js";

export interface BookCopyRepository {
  create(bookCopy: CreateBookCopyDTO): Promise<BookCopy>;
  findById(id: string): Promise<BookCopy | null>;
  findByBookId(bookId: string): Promise<BookCopy[]>;
  findAvailableByBookId(bookId: string): Promise<BookCopy[]>;
  update(id: string, bookCopy: UpdateBookCopyDTO): Promise<BookCopy | null>;
  delete(id: string): Promise<boolean>;
  countAvailableByBookId(bookId: string): Promise<number>;
}
