import { BorrowerNotFoundError, createBorrowerAlreadyLockedError, } from "domain/src/errors/error.js";
export async function blockBorrower(repository, id) {
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
