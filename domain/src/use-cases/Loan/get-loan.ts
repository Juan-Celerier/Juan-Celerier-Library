import { Loan } from "domain/src/entities/Loan.js";
import { createLoanNotFoundError } from "domain/src/errors/error.js";
import { LoanRepository } from "domain/src/repositories/loan-repository.js";


export type GetLoanDeps = {
  loanRepository: LoanRepository;
};

export async function getLoan(
  { loanRepository }: GetLoanDeps,
  id: string
): Promise<Loan> {
  const loan = await loanRepository.findById(id);

  if (!loan) {
    throw createLoanNotFoundError(id);
  }

  return loan;
}
