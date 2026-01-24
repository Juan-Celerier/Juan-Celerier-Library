import { BorrowerNotFoundError } from "domain/src/errors/error.js";
export async function validateBorrower(repository, id) {
    const borrower = await repository.findById(id);
    if (!borrower) {
        throw new Error(BorrowerNotFoundError(id).message);
    }
    borrower.validated = true;
    return repository.update(borrower);
}
