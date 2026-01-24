import { createBookAlreadyExistsError, createInvalidBookDataError, } from "domain/src/errors/error.js";
export const createBook = async (request, dependencies) => {
    const { bookRepository } = dependencies;
    // Validaciones
    const validationError = validateCreateBookRequest(request);
    if (validationError) {
        return { success: false, error: validationError.message };
    }
    // Verificar si ya existe un libro con el mismo ISBN
    const existingBook = await bookRepository.findByIsbn(request.isbn.trim());
    let warning;
    if (existingBook) {
        warning = createBookAlreadyExistsError(request.isbn).message;
    }
    // Crear DTO para el repositorio
    const createBookDTO = {
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
const validateCreateBookRequest = (request) => {
    if (!request.title?.trim())
        return createInvalidBookDataError();
    if (!request.author?.trim())
        return createInvalidBookDataError();
    if (!request.publisher?.trim())
        return createInvalidBookDataError();
    if (!request.isbn?.trim())
        return createInvalidBookDataError();
    if (request.publicationDate && request.publicationDate > new Date())
        return createInvalidBookDataError();
    if (request.availableCopies < 0 || request.totalCopies < 0)
        return createInvalidBookDataError();
    if (request.availableCopies > request.totalCopies)
        return createInvalidBookDataError();
    return null;
};
