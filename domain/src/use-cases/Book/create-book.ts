import { Book, CreateBookDTO } from "domain/src/entities/Book.js";
import { UserRole } from "domain/src/entities/User.js";
import { RoleService } from "domain/src/services/role-service.js";
import {
  createBookAlreadyExistsError,
  createInvalidBookDataError,
  createUnauthorizedError,
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
  authors?: string[];
  categories?: string[];
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

export interface CreateBookWithUserRequest extends CreateBookRequest {
  userRole: UserRole;
}

export const createBook = async (
  request: CreateBookRequest,
  dependencies: CreateBookDependencies,
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
    authors: request.authors || [],
    categories: request.categories || [],
    publicationDate: request.publicationDate,
    isbn: request.isbn.trim(),
    image: request.image?.trim(),
    description: request.description?.trim(),
    availableCopies: 1, // Default value
    totalCopies: 1, // Default value
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

  return null;
};

/**
 * Create book with role validation
 */
export const createBookWithRoleValidation = async (
  request: CreateBookWithUserRequest,
  dependencies: CreateBookDependencies,
): Promise<CreateBookResponse> => {
  // Validate user role first
  if (!RoleService.canCreateBooks(request.userRole)) {
    return {
      success: false,
      error: createUnauthorizedError("User role not authorized to create books")
        .message,
    };
  }

  // If authorized, proceed with normal book creation
  return createBook(request, dependencies);
};
