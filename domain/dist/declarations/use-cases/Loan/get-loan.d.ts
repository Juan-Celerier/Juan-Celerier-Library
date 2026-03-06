import { Loan } from "domain/src/entities/Loan.js";
import { LoanRepository } from "domain/src/repositories/loan-repository.js";
export type GetLoanDeps = {
    loanRepository: LoanRepository;
};
export declare function getLoan({ loanRepository }: GetLoanDeps, id: string): Promise<Loan>;
//# sourceMappingURL=get-loan.d.ts.map