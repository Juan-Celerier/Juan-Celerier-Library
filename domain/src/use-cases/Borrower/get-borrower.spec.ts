import { BorrowerNotFoundError } from "domain/src/errors/error.js";
import { createBorrowerMock } from "domain/src/mocks/borrower-mock.js";
import { createBorrowerRepositoryMock } from "domain/src/mocks/mockRepository/borrower-mock-repository.js";
import { describe, test, expect } from "vitest";
import { getBorrower } from "./get-borrower.js";

describe("Get Borrower Use Case", () => {
  test("should return a borrower by ID", async () => {
    const borrower = createBorrowerMock({ id: "borrower-1" });
    const repository = createBorrowerRepositoryMock([borrower]);

    const result = await getBorrower(repository, "borrower-1");

    expect(result).toEqual(borrower);
  });

  test("should throw error if borrower not found", async () => {
    const repository = createBorrowerRepositoryMock([]);

    await expect(getBorrower(repository, "non-existent")).rejects.toEqual(
      BorrowerNotFoundError("non-existent"),
    );
  });
});
