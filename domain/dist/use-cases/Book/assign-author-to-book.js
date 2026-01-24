import { createBookNotFoundError, createAuthorNotFoundError, createInternalServerError } from "domain/src/errors/error.js";
export async function assignAuthorToBook({ bookRepository, authorRepository }, { bookId, authorIds }) {
    const book = await bookRepository.findById(bookId);
    if (!book)
        throw createBookNotFoundError(bookId);
    const authors = await Promise.all(authorIds.map(async (id) => {
        const author = await authorRepository.findById(id);
        if (!author)
            throw createAuthorNotFoundError(id);
        return author;
    }));
    const uniqueAuthorIds = Array.from(new Set([...(book.authors || []), ...authorIds]));
    const updatedBook = await bookRepository.update(bookId, {
        ...book,
        authors: uniqueAuthorIds,
    });
    if (!updatedBook)
        throw createInternalServerError("Failed to assign authors to book");
    return {
        ...updatedBook,
        authorsDetail: authors,
    };
}
