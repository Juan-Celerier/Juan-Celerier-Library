// domain/entities/Book.ts
export interface Book {
  id: string;
  title: string;
  author: string;
  authors: string[]; // IDs de autores
  categories: string[]; // IDs de categorías
  publisher: string;
  publicationDate: Date;
  isbn: string;
  image?: string;
  description?: string;
  createdAt: Date;
  availableCopies: number;
  totalCopies: number;
}

export type CreateBookDTO = Omit<Book, "id" | "createdAt">;
export type UpdateBookDTO = Partial<Omit<Book, "id" | "createdAt">>;
