import { createInternalServerError } from "domain/src/errors/error.js";
export const getAllBookAuthors = async (request, dependencies) => {
    const { bookAuthorRepository } = dependencies;
    try {
        const authors = await bookAuthorRepository.findAll();
        return {
            success: true,
            authors,
            count: authors.length,
        };
    }
    catch (err) {
        // Lanzamos error para que el test con `rejects.toThrow` pase
        throw createInternalServerError(err?.message || "Unexpected error");
    }
};
