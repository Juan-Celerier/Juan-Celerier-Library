import { Book } from "domain/src/entities/Book.js";
import {
  createInvalidBookDataError,
  createBookNotFoundError,
  createInternalServerError,
} from "domain/src/errors/error.js";
import { BookRepository } from "domain/src/repositories/book-repository.js";

export interface UpdateBookRequest {
  id: string;
  title: string;
  author: string;
  publisher: string;
  publicationDate: Date;
  isbn: string;
  image?: string;
  description?: string;
  availableCopies: number;
  totalCopies: number;
}

export interface UpdateBookResponse {
  success: boolean;
  book?: Book;
  error?: string;
  warning?: string;
}

export interface UpdateBookDependencies {
  bookRepository: BookRepository;
}

export const updateBook = async (
  request: UpdateBookRequest,
  dependencies: UpdateBookDependencies,
): Promise<UpdateBookResponse> => {
  const { bookRepository } = dependencies;

  // Validación
  const validationError = validateUpdateBookRequest(request);
  if (validationError) {
    return { success: false, error: createInvalidBookDataError().message };
  }

  // Verificar si existe el libro
  const existingBook = await bookRepository.findById(request.id);
  if (!existingBook) {
    return {
      success: false,
      error: createBookNotFoundError(request.id).message,
    };
  }

  // Preparar datos actualizados
  const updatedBookData: Book = {
    id: request.id,
    title: request.title.trim(),
    author: request.author.trim(),
    publisher: request.publisher.trim(),
    publicationDate: request.publicationDate,
    isbn: request.isbn.trim(),
    image: request.image?.trim() || undefined,
    description: request.description?.trim() || undefined,
    availableCopies: request.availableCopies,
    totalCopies: request.totalCopies,
    authors: existingBook.authors,
    categories: existingBook.categories,
    createdAt: existingBook.createdAt,
  };

  try {
    const updatedBook = await bookRepository.update(
      request.id,
      updatedBookData,
    );
    if (!updatedBook) {
      return {
        success: false,
        error: createInternalServerError(
          `Failed to update book with id ${request.id}`,
        ).message,
      };
    }

    return { success: true, book: updatedBook };
  } catch (error) {
    return {
      success: false,
      error: createInternalServerError(
        `Failed to update book with id ${request.id}`,
      ).message,
    };
  }
};

const validateUpdateBookRequest = (
  request: UpdateBookRequest,
): string | null => {
  if (!request.title || request.title.trim().length === 0) return "title";
  if (!request.author || request.author.trim().length === 0) return "author";
  if (!request.publisher || request.publisher.trim().length === 0)
    return "publisher";
  if (!request.isbn || request.isbn.trim().length === 0) return "isbn";
  if (request.publicationDate && request.publicationDate > new Date())
    return "publicationDate";
  if (request.availableCopies < 0 || request.totalCopies < 0) return "copies";
  if (request.availableCopies > request.totalCopies) return "availableCopies";
  return null;
};
