import { Borrower } from "domain/src/entities/Borrower.js";
import {
  BorrowerNotFoundError,
  BorrowerAlreadyExistsError,
} from "domain/src/errors/error.js";
import { BorrowerRepository } from "domain/src/repositories/borrower-repository.js";

interface UpdateBorrowerInput {
  id: string;
  name?: string;
  surname?: string;
  email?: string;
  passwordHash?: string;
  image?: string;
  token?: string;
  validated?: boolean;
  locked?: boolean;
  role?: "STUDENT" | "TEACHER";
}

export async function updateBorrower(
  repository: BorrowerRepository,
  input: UpdateBorrowerInput
): Promise<Borrower> {
  const borrower = await repository.findById(input.id);
  if (!borrower) {
    throw BorrowerNotFoundError(input.id);
  }

  if (input.email && input.email !== borrower.email) {
    const existing = await repository.findByEmail(input.email);
    if (existing) {
      throw BorrowerAlreadyExistsError(input.email);
    }
  }

  const updatedBorrower: Borrower = {
    ...borrower,
    ...input,
  };

  return repository.update(updatedBorrower);
}
