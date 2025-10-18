import { CreateLoanDTO, Loan } from "../entities/Loan.js";

export interface LoanRepository {
  create(loan: CreateLoanDTO): Promise<Loan>;
  findById(id: string): Promise<Loan | null>;
  findAll(): Promise<Loan[]>;
  updateLoan(id: string, loan: Partial<CreateLoanDTO>): Promise<Loan>;
  delete(id: string): Promise<void>;

  findByBorrowerId(borrowerId: string): Promise<Loan[]>;
  returnBook(id: string): Promise<Loan>;
  renewLoan(id: string): Promise<Loan>;
}
