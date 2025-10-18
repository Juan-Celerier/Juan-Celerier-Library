"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLibrarianRepositoryMock = createLibrarianRepositoryMock;
function createLibrarianRepositoryMock(librarians = []) {
    return {
        librarians,
        async create(librarian) {
            const newLibrarian = {
                id: `librarian-${Date.now()}`,
                ...librarian,
                createdAt: new Date(),
            };
            this.librarians.push(newLibrarian);
            return newLibrarian;
        },
        async findById(id) {
            return this.librarians.find((l) => l.id === id) || null;
        },
        async findAll() {
            return this.librarians;
        },
        async update(id, librarian) {
            const index = this.librarians.findIndex((l) => l.id === id);
            if (index === -1)
                throw new Error("Librarian not found");
            this.librarians[index] = {
                ...this.librarians[index],
                ...librarian,
            };
            return this.librarians[index];
        },
        async delete(id) {
            this.librarians = this.librarians.filter((l) => l.id !== id);
        },
        async findByEmail(email) {
            return this.librarians.find((l) => l.email === email) || null;
        },
        async authenticate(email, password) {
            // Aquí asumimos que `password` se compara en claro por ser mock
            return (this.librarians.find((l) => l.email === email && l.passwordHash === password) || null);
        },
    };
}
