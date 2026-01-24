import { createInternalServerError } from "domain/src/errors/error.js";
export async function searchBookAuthors(request, { bookAuthorRepository }) {
    const searchTerm = (request.searchTerm ?? "").trim();
    try {
        let authors;
        if (!searchTerm) {
            authors = await bookAuthorRepository.findAll();
        }
        else {
            authors = await bookAuthorRepository.searchByName(searchTerm);
        }
        return {
            success: true,
            authors,
            totalCount: authors.length,
        };
    }
    catch (err) {
        // Lanzamos un AppError centralizado
        throw createInternalServerError(err?.message || "Unexpected error");
    }
}
