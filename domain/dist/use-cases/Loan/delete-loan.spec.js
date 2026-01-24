import { createLoanMock } from "domain/src/mocks/loan-mock.js";
import { createLoanRepositoryMock } from "domain/src/mocks/mockRepository/loan-mock-repository.js";
import { describe, test, expect } from "vitest";
import { deleteLoan } from "./delete-loan.js";
describe("deleteLoan", () => {
    test("should delete an existing loan", async () => {
        const loan = createLoanMock({ id: "loan-1" });
        const repository = createLoanRepositoryMock([loan]);
        const result = await deleteLoan(repository, {
            id: "loan-1",
        });
        expect(result.success).toBe(true);
        expect(repository.loans.length).toBe(0);
    });
    test("should fail if loan ID is empty", async () => {
        const repository = createLoanRepositoryMock();
        const result = await deleteLoan(repository, { id: "" });
        expect(result.success).toBe(false);
        expect(result.error).toBe("Loan ID is required");
    });
    test("should fail if loan does not exist", async () => {
        const repository = createLoanRepositoryMock();
        const result = await deleteLoan(repository, {
            id: "non-existent",
        });
        expect(result.success).toBe(false);
        expect(result.error).toBe("Loan not found");
    });
});
