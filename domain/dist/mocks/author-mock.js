"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthorMock = createAuthorMock;
function createAuthorMock(opts = {}) {
    return {
        id: "any-id",
        name: "Jane",
        surname: "Smith",
        email: "jane.smith@example.com",
        passwordHash: "hashed-password",
        image: "any-image-url",
        token: "any-token",
        validated: true,
        locked: false,
        role: "WRITER",
        createdAt: new Date(),
        ...opts,
    };
}
