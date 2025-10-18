import { createInternalServerError } from "domain/src/errors/error.js";
import { describe, beforeEach, test, expect } from "vitest";
import { getAllLoans } from "./get-all-loan.js";
const createMockDependencies = () => {
    const mockLoanRepository = {
        findAll: async () => [],
    };
    return {
        loanRepository: mockLoanRepository,
    };
};
describe("getAllLoans Use Case", () => {
    let dependencies;
    beforeEach(() => {
        dependencies = createMockDependencies();
    });
    test("should return all loans successfully", async () => {
        const loans = [
            {
                id: "loan-1",
                bookId: "book-1",
                borrowerId: "borrower-1",
                loanDate: new Date(),
                dueDate: new Date(),
                status: "active",
                createdAt: new Date(),
            },
            {
                id: "loan-2",
                bookId: "book-2",
                borrowerId: "borrower-2",
                loanDate: new Date(),
                dueDate: new Date(),
                status: "returned",
                createdAt: new Date(),
            },
        ];
        dependencies.loanRepository.findAll = async () => loans;
        const result = await getAllLoans(dependencies);
        expect(result.success).toBe(true);
        expect(result.loans).toHaveLength(2);
        expect(result.loans?.[0]).toEqual(loans[0]);
        expect(result.loans?.[1]).toEqual(loans[1]);
    });
    test("should return empty list when no loans exist", async () => {
        dependencies.loanRepository.findAll = async () => [];
        const result = await getAllLoans(dependencies);
        expect(result.success).toBe(true);
        expect(result.loans).toEqual([]);
    });
    test("should return InternalServerError when repository throws", async () => {
        dependencies.loanRepository.findAll = async () => {
            throw new Error("DB error");
        };
        const result = await getAllLoans(dependencies);
        expect(result.success).toBe(false);
        // Validamos que se use el mensaje de createInternalServerError
        const expectedError = createInternalServerError("Failed to retrieve loans");
        expect(result.error).toBe(expectedError.message);
    });
});
