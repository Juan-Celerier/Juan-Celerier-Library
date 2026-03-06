import { Borrower } from "domain/src/entities/Borrower.js";
import { BorrowerNotFoundError } from "domain/src/errors/error.js";
import { BorrowerRepository } from "domain/src/repositories/borrower-repository.js";

export async function getBorrower(
  repository: BorrowerRepository,
  id: string,
): Promise<Borrower> {
  const borrower = await repository.findById(id);
  if (!borrower) {
    throw BorrowerNotFoundError(id);
  }
  return borrower;
}
