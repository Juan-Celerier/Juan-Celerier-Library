import { Book } from "domain/src/entities/Book.js";
import { createInternalServerError } from "domain/src/errors/error.js";
import { BookRepository } from "domain/src/repositories/book-repository.js";

export interface GetBooksResponse {
  success: boolean;
  books?: Book[];
  error?: string;
}

export interface GetBooksDependencies {
  bookRepository: BookRepository;
}

export const getBooks = async (
  dependencies: GetBooksDependencies,
): Promise<GetBooksResponse> => {
  const { bookRepository } = dependencies;

  try {
    const books = await bookRepository.findAll();
    return {
      success: true,
      books,
    };
  } catch (error) {
    return {
      success: false,
      error: createInternalServerError("Failed to fetch books").message,
    };
  }
};
