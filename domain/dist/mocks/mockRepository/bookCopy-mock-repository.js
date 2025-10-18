"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookCopyRepositoryMock = createBookCopyRepositoryMock;
const bookCopy_mock_1 = require("../bookCopy-mock");
function createBookCopyRepositoryMock(bookCopies = [(0, bookCopy_mock_1.createBookCopyMock)()]) {
    return {
        bookCopies,
        async getById(id) {
            return this.bookCopies.find((bookCopy) => bookCopy.id === id) || null;
        },
        async getAll() {
            return this.bookCopies;
        },
        async getByBookId(bookId) {
            return this.bookCopies.filter((bookCopy) => bookCopy.bookId === bookId);
        },
        async create(data) {
            const newBookCopy = (0, bookCopy_mock_1.createBookCopyMock)(data);
            this.bookCopies.push(newBookCopy);
            return newBookCopy;
        },
        async update(id, data) {
            const index = this.bookCopies.findIndex((bc) => bc.id === id);
            if (index === -1)
                throw new Error("BookCopy not found");
            this.bookCopies[index] = { ...this.bookCopies[index], ...data };
            return this.bookCopies[index];
        },
        async delete(id) {
            const index = this.bookCopies.findIndex((bookCopy) => bookCopy.id === id);
            if (index !== -1) {
                this.bookCopies.splice(index, 1);
            }
        },
        async updateStatus(id, status) {
            const index = this.bookCopies.findIndex((bc) => bc.id === id);
            if (index === -1)
                throw new Error("BookCopy not found");
            this.bookCopies[index].status = status;
            return this.bookCopies[index];
        },
    };
}
