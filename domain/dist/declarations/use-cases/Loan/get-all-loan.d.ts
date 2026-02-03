import { Loan } from "domain/src/entities/Loan.js";
import { LoanRepository } from "domain/src/repositories/loan-repository.js";
export interface GetAllLoansResponse {
    success: boolean;
    loans?: Loan[];
    error?: string;
}
export interface GetAllLoansDependencies {
    loanRepository: LoanRepository;
}
export declare const getAllLoans: (dependencies: GetAllLoansDependencies) => Promise<GetAllLoansResponse>;
//# sourceMappingURL=get-all-loan.d.ts.map