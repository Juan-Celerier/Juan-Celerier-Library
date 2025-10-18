import { BorrowerNotFoundError } from "domain/src/errors/error.js";
import { BorrowerRepository } from "domain/src/repositories/borrower-repository.js";


export async function deleteBorrower(
  repository: BorrowerRepository,
  id: string
): Promise<void> {
  const borrower = await repository.findById(id);
  if (!borrower) {
    throw BorrowerNotFoundError(id);
  }

  await repository.delete(id);
}
