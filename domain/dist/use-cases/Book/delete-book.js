import { createInvalidBookDataError, createBookNotFoundError, createInternalServerError } from "domain/src/errors/error.js";
export const deleteBook = async (request, dependencies) => {
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
            error: createInternalServerError(`Failed to delete book with id ${request.id}`).message,
        };
    }
    return {
        success: true,
        message: "Book deleted successfully",
    };
};
