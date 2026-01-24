import { createLoanNotFoundError } from "domain/src/errors/error.js";
export const updateLoan = async (repository, { id, data }) => {
    const loan = await repository.findById(id);
    if (!loan)
        throw createLoanNotFoundError(id);
    return repository.updateLoan(id, data);
};
