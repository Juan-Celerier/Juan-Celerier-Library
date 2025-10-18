import { LoanRepository } from "domain/src/repositories/loan-repository.js";
export interface DeleteLoanInput {
    id: string;
}
export interface DeleteLoanResponse {
    success: boolean;
    error?: string;
}
export declare function deleteLoan(repository: LoanRepository, input: DeleteLoanInput): Promise<DeleteLoanResponse>;
