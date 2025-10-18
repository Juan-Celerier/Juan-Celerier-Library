import { createInvalidDataError, CategoryNotFoundError } from "domain/src/errors/error.js";
export async function deleteCategory(repository, request) {
    // Validar ID
    if (!request.id || request.id.trim().length === 0) {
        throw createInvalidDataError();
    }
    // Intentar eliminar
    const deleted = await repository.delete(request.id);
    if (!deleted) {
        throw CategoryNotFoundError(request.id);
    }
}
