import {
  BookAuthor,
  CreateBookAuthorDTO,
} from "domain/src/entities/BookAuthor.js";
import { BookAuthorRepository } from "domain/src/repositories/author-repository.js";
import { v4 as uuid } from "uuid";

export interface MockedAuthorRepository extends BookAuthorRepository {
  authors: BookAuthor[];
}

export function createBookAuthorRepositoryMock(
  authors: BookAuthor[] = [],
): MockedAuthorRepository {
  return {
    authors,

    async findAll() {
      return this.authors;
    },

    async findById(id: string) {
      return this.authors.find((a) => a.id === id) || null;
    },

    async create(data: CreateBookAuthorDTO) {
      const newAuthor: BookAuthor = {
        id: uuid(),
        createdAt: new Date(),
        ...data,
      };
      this.authors.push(newAuthor);
      return newAuthor;
    },

    async update(id: string, data: Partial<CreateBookAuthorDTO>) {
      const index = this.authors.findIndex((a) => a.id === id);
      if (index === -1) return null;
      this.authors[index] = { ...this.authors[index], ...data };
      return this.authors[index];
    },

    async delete(id: string) {
      const initialLength = this.authors.length;
      this.authors = this.authors.filter((a) => a.id !== id);
      return this.authors.length < initialLength;
    },

    async searchByName(term: string) {
      const normalizedTerm = term.toLowerCase();
      return this.authors.filter((author) => {
        const fullName = `${author.name} ${author.surname}`.toLowerCase();
        return (
          author.name.toLowerCase().includes(normalizedTerm) ||
          author.surname.toLowerCase().includes(normalizedTerm) ||
          fullName.includes(normalizedTerm)
        );
      });
    },
  };
}
