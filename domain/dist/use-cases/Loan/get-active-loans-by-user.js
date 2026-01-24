import { createInvalidDataError, BorrowerNotFoundError } from "domain/src/errors/error.js";
export async function getActiveLoansByUser(request, dependencies) {
    const { borrowerId } = request;
    const { loanRepository } = dependencies;
    if (!borrowerId || borrowerId.trim().length === 0) {
        const error = createInvalidDataError("Borrower ID is required");
        return { success: false, error: error.message };
    }
    const allLoans = await loanRepository.findByBorrowerId(borrowerId);
    const activeLoans = allLoans.filter((loan) => loan.status === "active");
    if (activeLoans.length === 0) {
        const error = BorrowerNotFoundError(borrowerId);
        return { success: false, error: error.message };
    }
    return {
        success: true,
        loans: activeLoans, // ahora devolvemos un array de préstamos activos
    };
}
