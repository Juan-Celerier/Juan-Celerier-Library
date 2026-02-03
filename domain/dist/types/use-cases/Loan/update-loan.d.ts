import { Loan } from "domain/src/entities/Loan.js";
import { LoanRepository } from "domain/src/repositories/loan-repository.js";
export interface UpdateLoanInput {
    id: string;
    data: Partial<Omit<Loan, "id" | "createdAt">>;
}
export declare const updateLoan: (repository: LoanRepository, { id, data }: UpdateLoanInput) => Promise<Loan>;
