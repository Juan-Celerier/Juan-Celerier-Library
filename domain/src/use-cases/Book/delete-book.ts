import {
  createInvalidBookDataError,
  createBookNotFoundError,
  createInternalServerError,
} from "domain/src/errors/error.js";
import { BookRepository } from "domain/src/repositories/book-repository.js";

export interface DeleteBookRequest {
  id: string;
}

export interface DeleteBookResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface DeleteBookDependencies {
  bookRepository: BookRepository;
}

export const deleteBook = async (
  request: DeleteBookRequest,
  dependencies: DeleteBookDependencies,
): Promise<DeleteBookResponse> => {
  const { bookRepository } = dependencies;

  // Validar request
  if (!request.id?.trim()) {
    return { success: false, error: createInvalidBookDataError().message };
  }

  // Verificar si el libro existe
  const existingBook = await bookRepository.findById(request.id);
  if (!existingBook) {
    return {
      success: false,
      error: createBookNotFoundError(request.id).message,
    };
  }

  // Borrar el libro
  const deleted = await bookRepository.delete(request.id);
  if (!deleted) {
    return {
      success: false,
      error: createInternalServerError(
        `Failed to delete book with id ${request.id}`,
      ).message,
    };
  }

  return {
    success: true,
    message: "Book deleted successfully",
  };
};
