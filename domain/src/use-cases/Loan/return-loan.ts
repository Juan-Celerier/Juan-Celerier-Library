import { Loan } from "domain/src/entities/Loan.js";
import {
  createInvalidDataError,
  createLoanNotFoundError,
  createLoanAlreadyReturnedError,
} from "domain/src/errors/error.js";
import { LoanRepository } from "domain/src/repositories/loan-repository.js";

export interface ReturnLoanRequest {
  id: string;
}

export interface ReturnLoanDependencies {
  loanRepository: LoanRepository;
}

export const returnLoan = async (
  request: ReturnLoanRequest,
  { loanRepository }: ReturnLoanDependencies,
): Promise<Loan> => {
  const loanId = request.id?.trim();
  if (!loanId) throw createInvalidDataError("Loan ID is required");

  const loan = await loanRepository.findById(loanId);
  if (!loan) throw createLoanNotFoundError(loanId);

  if (loan.status === "returned") throw createLoanAlreadyReturnedError(loanId);

  const returnedLoan = await loanRepository.returnBook(loanId);

  // Aseguramos los campos correctos
  return {
    ...returnedLoan,
    status: "returned",
    returnDate: new Date(),
  };
};
