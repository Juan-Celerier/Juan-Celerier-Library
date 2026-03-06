import { Borrower } from "domain/src/entities/Borrower.js";
import { BorrowerRepository } from "domain/src/repositories/borrower-repository.js";

export async function getAllBorrowers(
  repository: BorrowerRepository,
): Promise<Borrower[]> {
  return repository.findAll();
}
