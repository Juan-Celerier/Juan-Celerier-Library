"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLibrarianMock = createLibrarianMock;
function createLibrarianMock(opts = {}) {
    return {
        id: "librarian-123",
        name: "John Doe",
        surname: "Doe",
        email: "john.doe@example.com",
        passwordHash: "password123",
        image: "https://example.com/image.jpg",
        token: "token-abc-123",
        validated: true,
        locked: false,
        role: "ADMIN",
        createdAt: new Date(),
        ...opts,
    };
}
