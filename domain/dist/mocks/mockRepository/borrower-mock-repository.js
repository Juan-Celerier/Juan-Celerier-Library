import { createBorrowerMock } from "../borrower-mock.js";
export function createBorrowerRepositoryMock(borrowers = [createBorrowerMock()]) {
    return {
        borrowers,
        async findById(id) {
            return this.borrowers.find((borrower) => borrower.id === id) || null;
        },
        async findAll() {
            return this.borrowers;
        },
        async findByEmail(email) {
            return (this.borrowers.find((borrower) => borrower.email === email) || null);
        },
        async findByRole(role) {
            return this.borrowers.filter((borrower) => borrower.role === role);
        },
        async create(data) {
            const newBorrower = createBorrowerMock(data);
            this.borrowers.push(newBorrower);
            return newBorrower;
        },
        async update(borrower) {
            const index = this.borrowers.findIndex((b) => b.id === borrower.id);
            if (index === -1)
                throw new Error("Borrower not found");
            this.borrowers[index] = borrower;
            return borrower;
        },
        async delete(id) {
            const index = this.borrowers.findIndex((borrower) => borrower.id === id);
            if (index !== -1) {
                this.borrowers.splice(index, 1);
            }
        },
    };
}
