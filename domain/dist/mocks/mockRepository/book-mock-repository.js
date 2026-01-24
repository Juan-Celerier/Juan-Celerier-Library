import { v4 as uuid } from "uuid";
export function createBookRepositoryMock(books = []) {
    return {
        books,
        async create(data) {
            // No validamos ISBN aquí, eso es responsabilidad del caso de uso
            const newBook = {
                id: uuid(),
                createdAt: new Date(),
                ...data,
            };
            this.books.push(newBook);
            return newBook;
        },
        async findById(id) {
            return this.books.find((book) => book.id === id) || null;
        },
        async findByIsbn(isbn) {
            return this.books.find((book) => book.isbn === isbn) || null;
        },
        async findAll() {
            return this.books;
        },
        async update(id, data) {
            const index = this.books.findIndex((b) => b.id === id);
            if (index === -1)
                return null;
            this.books[index] = {
                ...this.books[index],
                ...data,
            };
            return this.books[index];
        },
        async delete(id) {
            const initialLength = this.books.length;
            this.books = this.books.filter((book) => book.id !== id);
            return this.books.length < initialLength;
        },
    };
}
