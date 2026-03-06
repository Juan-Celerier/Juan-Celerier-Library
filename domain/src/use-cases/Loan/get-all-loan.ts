import { Loan } from "domain/src/entities/Loan.js";
import { createInternalServerError } from "domain/src/errors/error.js";
import { LoanRepository } from "domain/src/repositories/loan-repository.js";

export interface GetAllLoansResponse {
  success: boolean;
  loans?: Loan[];
  error?: string;
}

export interface GetAllLoansDependencies {
  loanRepository: LoanRepository;
}

export const getAllLoans = async (
  dependencies: GetAllLoansDependencies,
): Promise<GetAllLoansResponse> => {
  const { loanRepository } = dependencies;

  try {
    const loans = await loanRepository.findAll();
    return { success: true, loans };
  } catch (error) {
    const appError = createInternalServerError("Failed to retrieve loans");
    return { success: false, error: appError.message };
  }
};
