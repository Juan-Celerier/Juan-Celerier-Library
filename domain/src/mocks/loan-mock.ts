import { Loan } from "../entities/Loan.js";

export function createLoanMock(opts: Partial<Loan> = {}): Loan {
  return {
    id: "loan-123",
    bookCopyId: "bookCopy-001",
    bookId: "book-001",
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
