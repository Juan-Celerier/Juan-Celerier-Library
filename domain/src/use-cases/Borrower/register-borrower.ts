import { CreateBorrowerDTO, Borrower } from "domain/src/entities/Borrower.js";
import { BorrowerAlreadyExistsError } from "domain/src/errors/error.js";
import { BorrowerRepository } from "domain/src/repositories/borrower-repository.js";

export async function registerBorrower(
  repository: BorrowerRepository,
  input: CreateBorrowerDTO
): Promise<Borrower> {
  const existing = await repository.findByEmail(input.email);
  if (existing) {
    throw BorrowerAlreadyExistsError(input.email);
  }

  return repository.create({
    name: input.name,
    surname: input.surname,
    email: input.email,
    passwordHash: input.passwordHash,
    image: input.image,
    token: input.token,
    validated: input.validated,
    locked: input.locked,
    role: input.role,
  });
}
