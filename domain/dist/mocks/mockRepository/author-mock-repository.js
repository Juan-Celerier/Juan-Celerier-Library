import { v4 as uuid } from "uuid";
export function createBookAuthorRepositoryMock(authors = []) {
    return {
        authors,
        async findAll() {
            return this.authors;
        },
        async findById(id) {
            return this.authors.find((a) => a.id === id) || null;
        },
        async create(data) {
            const newAuthor = {
                id: uuid(),
                createdAt: new Date(),
                ...data,
            };
            this.authors.push(newAuthor);
            return newAuthor;
        },
        async update(id, data) {
            const index = this.authors.findIndex((a) => a.id === id);
            if (index === -1)
                return null;
            this.authors[index] = { ...this.authors[index], ...data };
            return this.authors[index];
        },
        async delete(id) {
            const initialLength = this.authors.length;
            this.authors = this.authors.filter((a) => a.id !== id);
            return this.authors.length < initialLength;
        },
        async searchByName(term) {
            const normalizedTerm = term.toLowerCase();
            return this.authors.filter((author) => {
                const fullName = `${author.name} ${author.surname}`.toLowerCase();
                return (author.name.toLowerCase().includes(normalizedTerm) ||
                    author.surname.toLowerCase().includes(normalizedTerm) ||
                    fullName.includes(normalizedTerm));
            });
        },
    };
}
