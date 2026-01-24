import { createInvalidDataError, createAuthorNotFoundError, createInternalServerError, } from "domain/src/errors/error.js";
export const deleteBookAuthor = async (request, dependencies) => {
    const { authorId } = request;
    const { bookAuthorRepository } = dependencies;
    if (!authorId || authorId.trim().length === 0) {
        return {
            success: false,
            error: createInvalidDataError("Author ID is required"),
        };
    }
    const trimmedId = authorId.trim();
    try {
        const existingAuthor = await bookAuthorRepository.findById(trimmedId);
        if (!existingAuthor) {
            return { success: false, error: createAuthorNotFoundError(trimmedId) };
        }
        const deleted = await bookAuthorRepository.delete(trimmedId);
        if (!deleted) {
            return {
                success: false,
                error: createInternalServerError("Failed to delete author"),
            };
        }
        return { success: true, authorId: trimmedId };
    }
    catch (err) {
        // si ocurre algo inesperado (ej: DB caída) propagamos el error
        throw err;
    }
};
