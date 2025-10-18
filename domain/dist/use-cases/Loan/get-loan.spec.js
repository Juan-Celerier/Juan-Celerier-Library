import { createLoanMock } from "domain/src/mocks/loan-mock.js";
import { createLoanRepositoryMock } from "domain/src/mocks/mockRepository/loan-mock-repository.js";
import { describe, test, expect } from "vitest";
import { getLoan } from "./get-loan.js";
describe("getLoan Use Case", () => {
    test("should return the loan if it exists", async () => {
        const loan = createLoanMock({ id: "loan-123" });
        const repo = createLoanRepositoryMock([loan]);
        const result = await getLoan({ loanRepository: repo }, "loan-123");
        expect(result).toEqual(loan);
    });
    test("should throw LoanNotFoundError if the loan does not exist", async () => {
        const repo = createLoanRepositoryMock();
        const nonExistentId = "not-found";
        await expect(getLoan({ loanRepository: repo }, nonExistentId)).rejects.toMatchObject({
            name: "LoanNotFoundError",
            message: `Loan with id ${nonExistentId} not found`,
        });
    });
});
