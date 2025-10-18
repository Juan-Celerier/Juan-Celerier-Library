"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookCopyMock = createBookCopyMock;
function createBookCopyMock(opts = {}) {
    return {
        id: "bookCopy-123",
        bookId: "book-123",
        status: "AVAILABLE",
        dueDate: new Date(),
        barcode: "BC-123456789",
        createdAt: new Date(),
        ...opts,
    };
}
