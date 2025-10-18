import { Loan } from "domain/src/entities/Loan.js";
import { createInvalidDataError, BorrowerNotFoundError } from "domain/src/errors/error.js";
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

export async function getActiveLoansByUser(
  request: GetActiveLoansByUserRequest,
  dependencies: GetActiveLoansByUserDependencies
): Promise<GetActiveLoansByUserResponse> {
  const { borrowerId } = request;
  const { loanRepository } = dependencies;

  if (!borrowerId || borrowerId.trim().length === 0) {
    const error = createInvalidDataError("Borrower ID is required");
    return { success: false, error: error.message };
  }

  const allLoans = await loanRepository.findByBorrowerId(borrowerId);
  const activeLoans = allLoans.filter((loan) => loan.status === "active");

  if (activeLoans.length === 0) {
    const error = BorrowerNotFoundError(borrowerId);
    return { success: false, error: error.message };
  }

  return {
    success: true,
    loans: activeLoans, // ahora devolvemos un array de préstamos activos
  };
}
