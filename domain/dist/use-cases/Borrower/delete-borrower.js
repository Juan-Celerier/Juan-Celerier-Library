import { BorrowerNotFoundError } from "domain/src/errors/error.js";
export async function deleteBorrower(repository, id) {
    const borrower = await repository.findById(id);
    if (!borrower) {
        throw BorrowerNotFoundError(id);
    }
    await repository.delete(id);
}
