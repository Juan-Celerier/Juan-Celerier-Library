import { Loan } from "domain/src/entities/Loan.js";
import { LoanRepository } from "domain/src/repositories/loan-repository.js";
export interface GetActiveLoansByUserRequest {
    borrowerId: string;
}
export interface GetActiveLoansByUserResponse {
    success: boolean;
    loans?: Loan[];
    error?: string;
}
export interface GetActiveLoansByUserDependencies {
    loanRepository: LoanRepository;
}
export declare function getActiveLoansByUser(request: GetActiveLoansByUserRequest, dependencies: GetActiveLoansByUserDependencies): Promise<GetActiveLoansByUserResponse>;
