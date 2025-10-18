"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFineRepositoryMock = createFineRepositoryMock;
const fine_mock_1 = require("../fine-mock");
function createFineRepositoryMock(fines = [(0, fine_mock_1.createFineMock)()]) {
    return {
        fines,
        async create(fine) {
            const newFine = (0, fine_mock_1.createFineMock)(fine);
            this.fines.push(newFine);
            return newFine;
        },
        async findById(id) {
            return this.fines.find((fine) => fine.id === id) || null;
        },
        async findAll() {
            return this.fines;
        },
        async update(id, fine) {
            const index = this.fines.findIndex((fine) => fine.id === id);
            if (index === -1)
                throw new Error("Fine not found");
            this.fines[index] = { ...this.fines[index], ...fine };
            return this.fines[index];
        },
        async delete(id) {
            const index = this.fines.findIndex((fine) => fine.id === id);
            if (index !== -1) {
                this.fines.splice(index, 1);
            }
        },
        async findByLoanId(loanId) {
            return this.fines.find((fine) => fine.loanId === loanId) || null;
        },
        async payFine(id) {
            const fine = await this.findById(id);
            if (!fine)
                throw new Error("Fine not found");
            fine.paid = true;
            fine.paymentDate = new Date();
            return fine;
        },
    };
}
