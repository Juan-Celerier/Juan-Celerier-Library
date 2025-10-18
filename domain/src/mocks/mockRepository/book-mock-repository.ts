import { Book, CreateBookDTO } from "domain/src/entities/Book.js";
import { BookRepository } from "domain/src/repositories/book-repository.js";
import { v4 as uuid } from "uuid";

export interface MockedBookRepository extends BookRepository {
  books: Book[];
}

export function createBookRepositoryMock(
  books: Book[] = []
): MockedBookRepository {
  return {
    books,

    async create(data: CreateBookDTO) {
      // No validamos ISBN aquí, eso es responsabilidad del caso de uso
      const newBook: Book = {
        id: uuid(),
        createdAt: new Date(),
        ...data,
      };
      this.books.push(newBook);
      return newBook;
    },

    async findById(id: string) {
      return this.books.find((book) => book.id === id) || null;
    },

    async findByIsbn(isbn: string) {
      return this.books.find((book) => book.isbn === isbn) || null;
    },

    async findAll() {
      return this.books;
    },

    async update(id: string, data: Partial<CreateBookDTO>) {
      const index = this.books.findIndex((b) => b.id === id);
      if (index === -1) return null;

      this.books[index] = {
        ...this.books[index],
        ...data,
      };
      return this.books[index];
    },

    async delete(id: string) {
      const initialLength = this.books.length;
      this.books = this.books.filter((book) => book.id !== id);
      return this.books.length < initialLength;
    },
  };
}
