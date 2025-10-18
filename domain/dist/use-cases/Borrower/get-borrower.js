import { BorrowerNotFoundError } from "domain/src/errors/error.js";
export async function getBorrower(repository, id) {
    const borrower = await repository.findById(id);
    if (!borrower) {
        throw BorrowerNotFoundError(id);
    }
    return borrower;
}
