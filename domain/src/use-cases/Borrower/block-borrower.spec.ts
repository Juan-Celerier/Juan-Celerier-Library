import {
  BorrowerNotFoundError,
  createBorrowerAlreadyLockedError,
} from "domain/src/errors/error.js";
import { createBorrowerMock } from "domain/src/mocks/borrower-mock.js";
import { createBorrowerRepositoryMock } from "domain/src/mocks/mockRepository/borrower-mock-repository.js";
import { describe, test, expect } from "vitest";
import { blockBorrower } from "./block-borrower.js";

describe("Block Borrower Use Case", () => {
  test("should block a borrower successfully", async () => {
    const borrower = createBorrowerMock({ id: "borrower-1", locked: false });
    const repository = createBorrowerRepositoryMock([borrower]);

    const result = await blockBorrower(repository, "borrower-1");

    expect(result.locked).toBe(true);
    expect(repository.borrowers[0].locked).toBe(true);
  });

  test("should throw error if borrower does not exist", async () => {
    const repository = createBorrowerRepositoryMock([]);

    await expect(blockBorrower(repository, "non-existent")).rejects.toEqual(
      BorrowerNotFoundError("non-existent")
    );
  });

  test("should throw error if borrower is already locked", async () => {
    const borrower = createBorrowerMock({ id: "borrower-2", locked: true });
    const repository = createBorrowerRepositoryMock([borrower]);

    await expect(blockBorrower(repository, "borrower-2")).rejects.toEqual(
      createBorrowerAlreadyLockedError("borrower-2")
    );
  });
});
