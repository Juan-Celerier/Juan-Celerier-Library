import { createBookNotFoundError, CategoryNotFoundError, createInternalServerError, } from "domain/src/errors/error.js";
export async function assignCategoryToBook({ bookRepository, categoryRepository }, { bookId, categoryIds }) {
    const book = await bookRepository.findById(bookId);
    if (!book)
        throw createBookNotFoundError(bookId);
    const newCategoryIds = new Set(book.categories || []);
    const categoriesDetail = [];
    for (const categoryId of categoryIds) {
        const category = await categoryRepository.findById(categoryId);
        if (!category)
            throw CategoryNotFoundError(categoryId);
        newCategoryIds.add(categoryId);
        categoriesDetail.push(category);
    }
    const updatedBook = await bookRepository.update(book.id, {
        ...book,
        categories: Array.from(newCategoryIds),
    });
    if (!updatedBook)
        throw createInternalServerError("Failed to assign categories to book");
    return {
        ...updatedBook,
        categoriesDetail,
    };
}
