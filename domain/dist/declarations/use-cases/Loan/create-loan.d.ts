import { Loan } from "domain/src/entities/Loan.js";
import { UserRole } from "domain/src/entities/User.js";
import { LoanRepository } from "domain/src/repositories/loan-repository.js";
export interface CreateLoanRequest {
    bookCopyId: string;
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
export interface CreateLoanWithUserRequest extends CreateLoanRequest {
    userRole: UserRole;
}
export declare const createLoan: (request: CreateLoanRequest, dependencies: CreateLoanDependencies) => Promise<CreateLoanResponse>;
/**
 * Create loan with role validation
 */
export declare const createLoanWithRoleValidation: (request: CreateLoanWithUserRequest, dependencies: CreateLoanDependencies) => Promise<CreateLoanResponse>;
//# sourceMappingURL=create-loan.d.ts.map