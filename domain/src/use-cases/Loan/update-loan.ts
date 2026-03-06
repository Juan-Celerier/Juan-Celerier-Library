import { Loan } from "domain/src/entities/Loan.js";
import { createLoanNotFoundError } from "domain/src/errors/error.js";
import { LoanRepository } from "domain/src/repositories/loan-repository.js";

export interface UpdateLoanInput {
  id: string;
  data: Partial<Omit<Loan, "id" | "createdAt">>;
}

export const updateLoan = async (
  repository: LoanRepository,
  { id, data }: UpdateLoanInput,
): Promise<Loan> => {
  const loan = await repository.findById(id);
  if (!loan) throw createLoanNotFoundError(id);

  return repository.updateLoan(id, data);
};
