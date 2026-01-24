import { createLoanNotFoundError } from "domain/src/errors/error.js";
import { createLoanMock } from "domain/src/mocks/loan-mock.js";
import { createLoanRepositoryMock } from "domain/src/mocks/mockRepository/loan-mock-repository.js";
import { describe, test, expect } from "vitest";
import { updateLoan } from "./update-loan.js";
describe("updateLoan Use Case", () => {
    test("debe actualizar un préstamo existente", async () => {
        const loan = createLoanMock({ id: "loan-1", status: "active" });
        const repository = createLoanRepositoryMock([loan]);
        const input = {
            id: "loan-1",
            data: { status: "overdue" },
        };
        const updatedLoan = await updateLoan(repository, input);
        expect(updatedLoan.status).toBe("overdue");
    });
    test("debe lanzar LoanNotFoundError si el préstamo no existe", async () => {
        const repository = createLoanRepositoryMock([]);
        const input = {
            id: "non-existent",
            data: { status: "returned" },
        };
        await expect(updateLoan(repository, input)).rejects.toEqual(createLoanNotFoundError("non-existent"));
    });
});
