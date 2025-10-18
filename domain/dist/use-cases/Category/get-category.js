import { CategoryNotFoundError } from "domain/src/errors/error.js";
export async function getCategory(repository, request) {
    // Validación de ID
    if (!request.id || request.id.trim().length === 0) {
        return {
            success: false,
            error: "Category ID is required",
        };
    }
    // Buscar categoría
    const category = await repository.findById(request.id);
    if (!category) {
        const err = CategoryNotFoundError(request.id);
        return {
            success: false,
            error: err.message,
        };
    }
    return {
        success: true,
        category,
    };
}
