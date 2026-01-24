import { createLoanMock } from "domain/src/mocks/loan-mock.js";
import { createLoanRepositoryMock } from "domain/src/mocks/mockRepository/loan-mock-repository.js";
import { describe, test, expect } from "vitest";
import { getActiveLoansByUser } from "./get-active-loans-by-user.js";
describe("getActiveLoansByUser", () => {
    test("should return active loans when they exist", async () => {
        const loan = createLoanMock({ id: "loan-1" });
        const loanRepository = createLoanRepositoryMock([loan]);
        const response = await getActiveLoansByUser({ borrowerId: loan.borrowerId }, { loanRepository });
        expect(response.success).toBe(true);
        expect(response.loans).toEqual([loan]); // ahora es un array
        expect(response.error).toBeUndefined();
    });
    test("should return error if borrower has no active loans", async () => {
        const loanRepository = createLoanRepositoryMock([]);
        const response = await getActiveLoansByUser({ borrowerId: "non-existent-borrower" }, { loanRepository });
        expect(response.success).toBe(false);
        expect(response.error).toBe("Borrower with id non-existent-borrower not found");
        expect(response.loans).toBeUndefined();
    });
    test("should return error if borrowerId is missing", async () => {
        const loanRepository = createLoanRepositoryMock([]);
        const response = await getActiveLoansByUser({ borrowerId: "" }, { loanRepository });
        expect(response.success).toBe(false);
        expect(response.error).toBe("Borrower ID is required");
        expect(response.loans).toBeUndefined();
    });
});
