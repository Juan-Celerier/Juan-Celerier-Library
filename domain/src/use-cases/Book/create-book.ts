import { Book, CreateBookDTO } from "domain/src/entities/Book.js";
import {
  createBookAlreadyExistsError,
  createInvalidBookDataError,
} from "domain/src/errors/error.js";
import { BookRepository } from "domain/src/repositories/book-repository.js";

export interface CreateBookRequest {
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

export interface CreateBookResponse {
  success: boolean;
  book?: Book;
  error?: string;
  warning?: string;
}

export interface CreateBookDependencies {
  bookRepository: BookRepository;
}

export const createBook = async (
  request: CreateBookRequest,
  dependencies: CreateBookDependencies
): Promise<CreateBookResponse> => {
  const { bookRepository } = dependencies;

  // Validaciones
  const validationError = validateCreateBookRequest(request);
  if (validationError) {
    return { success: false, error: validationError.message };
  }

  // Verificar si ya existe un libro con el mismo ISBN
  const existingBook = await bookRepository.findByIsbn(request.isbn.trim());

  let warning: string | undefined;
  if (existingBook) {
    warning = createBookAlreadyExistsError(request.isbn).message;
  }

  // Crear DTO para el repositorio
  const createBookDTO: CreateBookDTO = {
    title: request.title.trim(),
    author: request.author.trim(),
    publisher: request.publisher.trim(),
    authors: [],
    categories: [],
    publicationDate: request.publicationDate,
    isbn: request.isbn.trim(),
    image: request.image?.trim(),
    description: request.description?.trim(),
    availableCopies: request.availableCopies,
    totalCopies: request.totalCopies,
  };

  // Crear el libro
  const book = await bookRepository.create(createBookDTO);

  return {
    success: true,
    book,
    warning,
  };
};

const validateCreateBookRequest = (request: CreateBookRequest) => {
  if (!request.title?.trim()) return createInvalidBookDataError();
  if (!request.author?.trim()) return createInvalidBookDataError();
  if (!request.publisher?.trim()) return createInvalidBookDataError();
  if (!request.isbn?.trim()) return createInvalidBookDataError();
  if (request.publicationDate && request.publicationDate > new Date())
    return createInvalidBookDataError();
  if (request.availableCopies < 0 || request.totalCopies < 0)
    return createInvalidBookDataError();
  if (request.availableCopies > request.totalCopies)
    return createInvalidBookDataError();

  return null;
};
