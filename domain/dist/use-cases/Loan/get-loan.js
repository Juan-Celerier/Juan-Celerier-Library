import { createLoanNotFoundError } from "domain/src/errors/error.js";
export async function getLoan({ loanRepository }, id) {
    const loan = await loanRepository.findById(id);
    if (!loan) {
        throw createLoanNotFoundError(id);
    }
    return loan;
}
