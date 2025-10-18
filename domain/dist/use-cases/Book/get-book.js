import { createInternalServerError } from "domain/src/errors/error.js";
export const getBooks = async (dependencies) => {
    const { bookRepository } = dependencies;
    try {
        const books = await bookRepository.findAll();
        return {
            success: true,
            books,
        };
    }
    catch (error) {
        return {
            success: false,
            error: createInternalServerError("Failed to fetch books").message,
        };
    }
};
