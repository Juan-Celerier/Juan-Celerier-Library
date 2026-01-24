import { createInvalidCategoryDataError, CategoryAlreadyExistsError } from "domain/src/errors/error.js";
export async function createCategory(repository, input) {
    if (!input.name || !input.description) {
        throw createInvalidCategoryDataError();
    }
    const existingCategory = await repository.findByName(input.name);
    if (existingCategory) {
        throw CategoryAlreadyExistsError(input.name);
    }
    return repository.create({
        name: input.name,
        description: input.description,
        image: input.image,
    });
}
