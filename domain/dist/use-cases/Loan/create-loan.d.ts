import { Loan } from "domain/src/entities/Loan.js";
import { LoanRepository } from "domain/src/repositories/loan-repository.js";
export interface CreateLoanRequest {
    bookId: string;
    borrowerId: string;
}
export interface CreateLoanResponse {
    success: boolean;
    loan?: Loan;
    error?: string;
    warning?: string;
}
export interface CreateLoanDependencies {
    loanRepository: LoanRepository;
}
export declare const createLoan: (request: CreateLoanRequest, dependencies: CreateLoanDependencies) => Promise<CreateLoanResponse>;
//# sourceMappingURL=create-loan.d.ts.map