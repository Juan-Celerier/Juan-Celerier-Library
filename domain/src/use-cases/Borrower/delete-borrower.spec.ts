import { BorrowerNotFoundError } from "domain/src/errors/error.js";
import { createBorrowerMock } from "domain/src/mocks/borrower-mock.js";
import { createBorrowerRepositoryMock } from "domain/src/mocks/mockRepository/borrower-mock-repository.js";
import { describe, test, expect } from "vitest";
import { deleteBorrower } from "./delete-borrower.js";

describe("Delete Borrower Use Case", () => {
  test("should delete borrower if exists", async () => {
    const borrower = createBorrowerMock({ id: "borrower-1" });
    const repository = createBorrowerRepositoryMock([borrower]);

    await deleteBorrower(repository, "borrower-1");

    expect(repository.borrowers.length).toBe(0);
  });

  test("should throw error if borrower does not exist", async () => {
    const repository = createBorrowerRepositoryMock([]);

    await expect(deleteBorrower(repository, "non-existent")).rejects.toEqual(
      BorrowerNotFoundError("non-existent"),
    );
  });
});
