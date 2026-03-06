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

export function createBookCopyRepositoryMock(
  bookCopies: BookCopy[] = [],
): MockedBookCopyRepository {
  return {
    bookCopies,

    async create(bookCopy: CreateBookCopyDTO) {
      const newBookCopy: BookCopy = {
        id: `book-copy-${Date.now()}`,
        ...bookCopy,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.bookCopies.push(newBookCopy);
      return newBookCopy;
    },

    async findById(id: string) {
      return this.bookCopies.find((bc) => bc.id === id) || null;
    },

    async findByBookId(bookId: string) {
      return this.bookCopies.filter((bc) => bc.bookId === bookId);
    },

    async findAvailableByBookId(bookId: string) {
      return this.bookCopies.filter(
        (bc) => bc.bookId === bookId && bc.status === "AVAILABLE",
      );
    },

    async update(id: string, updateData: Partial<BookCopy>) {
      const index = this.bookCopies.findIndex((bc) => bc.id === id);
      if (index === -1) {
        throw new Error("BookCopy not found");
      }

      this.bookCopies[index] = {
        ...this.bookCopies[index],
        ...updateData,
        updatedAt: new Date(),
      };

      return this.bookCopies[index];
    },

    async delete(id: string) {
      const initialLength = this.bookCopies.length;
      this.bookCopies = this.bookCopies.filter((bc) => bc.id !== id);
      return this.bookCopies.length < initialLength;
    },

    async countAvailableByBookId(bookId: string) {
      return this.bookCopies.filter(
        (bc) => bc.bookId === bookId && bc.status === "AVAILABLE",
      ).length;
    },
  };
}
