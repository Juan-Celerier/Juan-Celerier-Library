import { Loan } from "domain/src/entities/Loan.js";
import { LoanRepository } from "domain/src/repositories/loan-repository.js";
export interface ReturnLoanRequest {
    id: string;
}
export interface ReturnLoanDependencies {
    loanRepository: LoanRepository;
}
export declare const returnLoan: (request: ReturnLoanRequest, { loanRepository }: ReturnLoanDependencies) => Promise<Loan>;
