import { BorrowerRole, Borrower } from "domain/src/entities/Borrower.js";
import { createInvalidBorrowerRoleError } from "domain/src/errors/error.js";
import { BorrowerRepository } from "domain/src/repositories/borrower-repository.js";

export async function getBorrowersByRole(
  repository: BorrowerRepository,
  role: BorrowerRole,
): Promise<Borrower[]> {
  const validRoles: BorrowerRole[] = ["STUDENT", "TEACHER"];
  if (!validRoles.includes(role)) {
    throw createInvalidBorrowerRoleError(role);
  }

  return repository.findByRole(role);
}
