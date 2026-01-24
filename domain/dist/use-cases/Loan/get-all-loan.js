import { createInternalServerError } from "domain/src/errors/error.js";
export const getAllLoans = async (dependencies) => {
    const { loanRepository } = dependencies;
    try {
        const loans = await loanRepository.findAll();
        return { success: true, loans };
    }
    catch (error) {
        const appError = createInternalServerError("Failed to retrieve loans");
        return { success: false, error: appError.message };
    }
};
