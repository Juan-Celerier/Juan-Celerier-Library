import { BorrowerNotFoundError } from "domain/src/errors/error.js";
import { createBorrowerMock } from "domain/src/mocks/borrower-mock.js";
import { createBorrowerRepositoryMock } from "domain/src/mocks/mockRepository/borrower-mock-repository.js";
import { describe, test, expect } from "vitest";
import { validateBorrower } from "./validate-borrower.js";

describe("Validate Borrower Use Case", () => {
  test("should validate a borrower successfully", async () => {
    const borrower = createBorrowerMock({ id: "borrower-1", validated: false });
    const repository = createBorrowerRepositoryMock([borrower]);

    const result = await validateBorrower(repository, "borrower-1");

    expect(result.validated).toBe(true);
    expect(repository.borrowers[0].validated).toBe(true);
  });

  test("should throw error if borrower does not exist", async () => {
    const repository = createBorrowerRepositoryMock([]);

    await expect(validateBorrower(repository, "non-existent")).rejects.toThrow(
      BorrowerNotFoundError("non-existent").message
    );
  });
});
