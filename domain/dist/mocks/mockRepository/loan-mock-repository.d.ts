import { Loan } from "domain/src/entities/Loan.js";
import { LoanRepository } from "domain/src/repositories/loan-repository.js";
export interface MockedLoanRepository extends LoanRepository {
    loans: Loan[];
}
export declare function createLoanRepositoryMock(loans?: Loan[]): MockedLoanRepository;
//# sourceMappingURL=loan-mock-repository.d.ts.map