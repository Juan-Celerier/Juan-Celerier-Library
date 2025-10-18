import { BookAuthor } from "domain/src/entities/BookAuthor.js";
import { createInternalServerError } from "domain/src/errors/error.js";
import { BookAuthorRepository } from "domain/src/repositories/author-repository.js";

export interface GetAllBookAuthorsRequest {
  // vacío por ahora, preparado para filtros futuros
}

export interface GetAllBookAuthorsResponse {
  success: boolean;
  authors?: BookAuthor[];
  count?: number;
  error?: string;
}

export interface GetAllBookAuthorsDependencies {
  bookAuthorRepository: BookAuthorRepository;
}

export const getAllBookAuthors = async (
  request: GetAllBookAuthorsRequest,
  dependencies: GetAllBookAuthorsDependencies
): Promise<GetAllBookAuthorsResponse> => {
  const { bookAuthorRepository } = dependencies;

  try {
    const authors = await bookAuthorRepository.findAll();

    return {
      success: true,
      authors,
      count: authors.length,
    };
  } catch (err: any) {
    // Lanzamos error para que el test con `rejects.toThrow` pase
    throw createInternalServerError(err?.message || "Unexpected error");
  }
};
