import { BookAuthor } from "domain/src/entities/BookAuthor.js";
import {
  createAuthorNotFoundError,
  createInvalidDataError,
  createInternalServerError,
} from "domain/src/errors/error.js";
import { BookAuthorRepository } from "domain/src/repositories/author-repository.js";

export interface UpdateBookAuthorRequest {
  id: string;
  name?: string;
  surname?: string;
  biography?: string;
  birthDate?: Date;
  nationality?: string;
  image?: string;
}

export interface UpdateBookAuthorDependencies {
  bookAuthorRepository: BookAuthorRepository;
}

export const updateBookAuthor = async (
  request: UpdateBookAuthorRequest,
  { bookAuthorRepository }: UpdateBookAuthorDependencies,
): Promise<BookAuthor> => {
  try {
    // Buscar autor existente
    const existingAuthor = await bookAuthorRepository.findById(request.id);
    if (!existingAuthor) throw createAuthorNotFoundError(request.id);

    // Validaciones
    const validationError = validateUpdateBookAuthorRequest(request);
    if (validationError) throw createInvalidDataError(validationError);

    // Construir nuevo objeto BookAuthor para actualizar
    const updatedAuthor: BookAuthor = {
      ...existingAuthor,
      name:
        request.name !== undefined ? request.name.trim() : existingAuthor.name,
      surname:
        request.surname !== undefined
          ? request.surname.trim()
          : existingAuthor.surname,
      biography:
        request.biography !== undefined
          ? request.biography.trim()
          : existingAuthor.biography,
      birthDate: request.birthDate ?? existingAuthor.birthDate,
      nationality:
        request.nationality !== undefined
          ? request.nationality.trim()
          : existingAuthor.nationality,
      image:
        request.image !== undefined
          ? request.image.trim()
          : existingAuthor.image,
    };

    const result = await bookAuthorRepository.update(request.id, updatedAuthor);
    if (!result) throw createInternalServerError("Failed to update author");

    return result;
  } catch (err: any) {
    // Lanza AppError para que el consumidor lo capture
    throw err;
  }
};

const validateUpdateBookAuthorRequest = (
  request: UpdateBookAuthorRequest,
): string | null => {
  if (request.name !== undefined && request.name.trim().length === 0)
    return "Name cannot be empty";
  if (request.surname !== undefined && request.surname.trim().length === 0)
    return "Surname cannot be empty";
  if (request.birthDate && request.birthDate > new Date())
    return "Birth date cannot be in the future";
  return null;
};
