import { createInvalidDataError } from "domain/src/errors/error.js";
export const createLoan = async (request, dependencies) => {
    const { loanRepository } = dependencies;
    // ✅ Validaciones
    const validationError = validateCreateLoanRequest(request);
    if (validationError) {
        return { success: false, error: validationError.message };
    }
    // 📌 Setear fechas y estado inicial
    const loanDate = new Date();
    const dueDate = new Date(loanDate);
    dueDate.setDate(loanDate.getDate() + 14); // +14 días
    const createLoanDTO = {
        bookId: request.bookId.trim(),
        borrowerId: request.borrowerId.trim(),
        loanDate,
        dueDate,
        status: "active",
    };
    // 🛠️ Guardar en el repositorio
    const loan = await loanRepository.create(createLoanDTO);
    return {
        success: true,
        loan,
    };
};
const validateCreateLoanRequest = (request) => {
    if (!request.bookId || request.bookId.trim().length === 0) {
        return createInvalidDataError("Book ID is required");
    }
    if (!request.borrowerId || request.borrowerId.trim().length === 0) {
        return createInvalidDataError("Borrower ID is required");
    }
    return null;
};
