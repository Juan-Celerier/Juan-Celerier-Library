import { createInvalidBorrowerRoleError } from "domain/src/errors/error.js";
import { createBorrowerMock } from "domain/src/mocks/borrower-mock.js";
import { createBorrowerRepositoryMock } from "domain/src/mocks/mockRepository/borrower-mock-repository.js";
import { describe, test, expect } from "vitest";
import { getBorrowersByRole } from "./get-borrowers-by-role.js";
describe("Get Borrowers By Role Use Case", () => {
    test("should return borrowers with specified role", async () => {
        const borrower1 = createBorrowerMock({ id: "b1", role: "STUDENT" });
        const borrower2 = createBorrowerMock({ id: "b2", role: "TEACHER" });
        const borrower3 = createBorrowerMock({ id: "b3", role: "STUDENT" });
        const repository = createBorrowerRepositoryMock([
            borrower1,
            borrower2,
            borrower3,
        ]);
        const result = await getBorrowersByRole(repository, "STUDENT");
        expect(result.length).toBe(2);
        expect(result).toEqual([borrower1, borrower3]);
    });
    test("should return empty array if no borrowers match role", async () => {
        const borrower = createBorrowerMock({ role: "TEACHER" });
        const repository = createBorrowerRepositoryMock([borrower]);
        const result = await getBorrowersByRole(repository, "STUDENT");
        expect(result).toEqual([]);
    });
    test("should throw error if role is invalid", async () => {
        const repository = createBorrowerRepositoryMock([]);
        await expect(getBorrowersByRole(repository, "ADMIN")).rejects.toThrowError(createInvalidBorrowerRoleError("ADMIN").message);
    });
});
