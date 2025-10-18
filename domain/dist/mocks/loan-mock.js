export function createLoanMock(opts = {}) {
    return {
        id: "loan-123",
        bookId: "bookCopy-001",
        borrowerId: "borrower-001",
        loanDate: new Date("2025-01-01"),
        dueDate: new Date("2025-01-15"),
        returnDate: undefined,
        fineAmount: undefined,
        createdAt: new Date(),
        status: "active",
        ...opts,
    };
}
