import { Loan, CreateLoanDTO } from "domain/src/entities/Loan.js";
import { LoanRepository } from "domain/src/repositories/loan-repository.js";

export interface MockedLoanRepository extends LoanRepository {
  loans: Loan[];
}

export function createLoanRepositoryMock(
  loans: Loan[] = [],
): MockedLoanRepository {
  return {
    loans,

    async create(loan: CreateLoanDTO) {
      const newLoan: Loan = {
        id: `loan-${Date.now()}`,
        ...loan,
        createdAt: new Date(),
      };
      this.loans.push(newLoan);
      return newLoan;
    },

    async findById(id: string) {
      return this.loans.find((l) => l.id === id) || null;
    },

    async findAll() {
      return this.loans;
    },

    async updateLoan(id: string, loan: Partial<CreateLoanDTO>) {
      const index = this.loans.findIndex((l) => l.id === id);
      if (index === -1) throw new Error("Loan not found");

      this.loans[index] = {
        ...this.loans[index],
        ...loan,
      };
      return this.loans[index];
    },

    async delete(id: string) {
      this.loans = this.loans.filter((l) => l.id !== id);
    },

    async findByBorrowerId(borrowerId: string) {
      return this.loans.filter((l) => l.borrowerId === borrowerId);
    },

    async findByBookCopyId(bookCopyId: string) {
      return this.loans.find((l) => l.bookCopyId === bookCopyId) || null;
    },

    async returnBook(id) {
      const loan = this.loans.find((l) => l.id === id);
      if (!loan) throw new Error("Loan not found");
      loan.returnDate = new Date();
      return loan;
    },

    async renewLoan(id) {
      const loan = this.loans.find((l) => l.id === id);
      if (!loan) throw new Error("Loan not found");

      // Import the renew function from the Loan entity
      const { renew } = await import("../../entities/Loan.js");

      const renewedLoan = renew(loan);
      const index = this.loans.findIndex((l) => l.id === id);
      this.loans[index] = renewedLoan;
      return renewedLoan;
    },
  };
}
