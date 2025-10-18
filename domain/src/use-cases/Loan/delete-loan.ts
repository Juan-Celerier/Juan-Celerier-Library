import { createInvalidDataError } from "domain/src/errors/error.js";
import { LoanRepository } from "domain/src/repositories/loan-repository.js";

export interface DeleteLoanInput {
  id: string;
}

export interface DeleteLoanResponse {
  success: boolean;
  error?: string;
}

export async function deleteLoan(
  repository: LoanRepository,
  input: DeleteLoanInput
): Promise<DeleteLoanResponse> {
  // Validar ID
  if (!input.id || input.id.trim().length === 0) {
    return {
      success: false,
      error: createInvalidDataError("Loan ID is required").message,
    };
  }

  const existingLoan = await repository.findById(input.id);
  if (!existingLoan) {
    return {
      success: false,
      error: "Loan not found",
    };
  }

  await repository.delete(input.id);

  return { success: true };
}
