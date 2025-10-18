import { createInvalidDataError } from "domain/src/errors/error.js";
export async function searchCategories(term, repository) {
    if (!term || term.trim().length < 2) {
        return {
            success: false,
            error: createInvalidDataError("Search term must have at least 2 characters").message,
        };
    }
    const allCategories = await repository.findAll();
    const filtered = allCategories.filter((category) => category.name.toLowerCase().includes(term.toLowerCase()));
    return {
        success: true,
        categories: filtered,
    };
}
