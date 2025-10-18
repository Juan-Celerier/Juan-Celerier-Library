import { Borrower } from "domain/src/entities/Borrower.js";
import { BorrowerNotFoundError } from "domain/src/errors/error.js";
import { BorrowerRepository } from "domain/src/repositories/borrower-repository.js";

export async function validateBorrower(
  repository: BorrowerRepository,
  id: string
): Promise<Borrower> {
  const borrower = await repository.findById(id);
  if (!borrower) {
    throw new Error(BorrowerNotFoundError(id).message);
  }

  borrower.validated = true;
  return repository.update(borrower);
}
