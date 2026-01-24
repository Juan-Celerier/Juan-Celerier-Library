export function createLoanRepositoryMock(loans = []) {
    return {
        loans,
        async create(loan) {
            const newLoan = {
                id: `loan-${Date.now()}`,
                ...loan,
                createdAt: new Date(),
            };
            this.loans.push(newLoan);
            return newLoan;
        },
        async findById(id) {
            return this.loans.find((l) => l.id === id) || null;
        },
        async findAll() {
            return this.loans;
        },
        async updateLoan(id, loan) {
            const index = this.loans.findIndex((l) => l.id === id);
            if (index === -1)
                throw new Error("Loan not found");
            this.loans[index] = {
                ...this.loans[index],
                ...loan,
            };
            return this.loans[index];
        },
        async delete(id) {
            this.loans = this.loans.filter((l) => l.id !== id);
        },
        async findByBorrowerId(borrowerId) {
            return this.loans.filter((l) => l.borrowerId === borrowerId);
        },
        async returnBook(id) {
            const loan = this.loans.find((l) => l.id === id);
            if (!loan)
                throw new Error("Loan not found");
            loan.returnDate = new Date();
            return loan;
        },
        async renewLoan(id) {
            const loan = this.loans.find((l) => l.id === id);
            if (!loan)
                throw new Error("Loan not found");
            loan.dueDate = new Date(loan.dueDate.getTime() + 7 * 24 * 60 * 60 * 1000);
            return loan;
        },
    };
}
