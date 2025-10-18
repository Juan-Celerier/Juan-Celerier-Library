import { BookAuthor } from "domain/src/entities/BookAuthor.js";
import { createInternalServerError } from "domain/src/errors/error.js";

export interface SearchBookAuthorsRequest {
  searchTerm?: string;
}

export interface SearchBookAuthorsDependencies {
  bookAuthorRepository: {
    searchByName(searchTerm: string): Promise<BookAuthor[]>;
    findAll(): Promise<BookAuthor[]>;
  };
}

export interface SearchBookAuthorsResponse {
  success: boolean;
  authors?: BookAuthor[];
  totalCount?: number;
  error?: string;
}

export async function searchBookAuthors(
  request: SearchBookAuthorsRequest,
  { bookAuthorRepository }: SearchBookAuthorsDependencies
): Promise<SearchBookAuthorsResponse> {
  const searchTerm = (request.searchTerm ?? "").trim();

  try {
    let authors: BookAuthor[];

    if (!searchTerm) {
      authors = await bookAuthorRepository.findAll();
    } else {
      authors = await bookAuthorRepository.searchByName(searchTerm);
    }

    return {
      success: true,
      authors,
      totalCount: authors.length,
    };
  } catch (err: any) {
    // Lanzamos un AppError centralizado
    throw createInternalServerError(err?.message || "Unexpected error");
  }
}
