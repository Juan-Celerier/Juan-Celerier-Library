import { BorrowerNotFoundError, BorrowerAlreadyExistsError, } from "domain/src/errors/error.js";
export async function updateBorrower(repository, input) {
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
    const updatedBorrower = {
        ...borrower,
        ...input,
    };
    return repository.update(updatedBorrower);
}
