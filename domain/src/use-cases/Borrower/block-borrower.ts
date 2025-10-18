import { Borrower } from "domain/src/entities/Borrower.js";
import {
  BorrowerNotFoundError,
  createBorrowerAlreadyLockedError,
} from "domain/src/errors/error.js";
import { BorrowerRepository } from "domain/src/repositories/borrower-repository.js";

export async function blockBorrower(
  repository: BorrowerRepository,
  id: string
): Promise<Borrower> {
  const borrower = await repository.findById(id);
  if (!borrower) {
    throw BorrowerNotFoundError(id);
  }

  if (borrower.locked) {
    throw createBorrowerAlreadyLockedError(id);
  }

  borrower.locked = true;
  return repository.update(borrower);
}
