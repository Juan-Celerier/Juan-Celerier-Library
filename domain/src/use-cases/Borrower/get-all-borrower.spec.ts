import { createBorrowerMock } from "domain/src/mocks/borrower-mock.js";
import { createBorrowerRepositoryMock } from "domain/src/mocks/mockRepository/borrower-mock-repository.js";
import { describe, test, expect } from "vitest";
import { getAllBorrowers } from "./get-all-borrower.js";

describe("Get All Borrowers Use Case", () => {
  test("should return all borrowers", async () => {
    const borrower1 = createBorrowerMock({ id: "borrower-1" });
    const borrower2 = createBorrowerMock({ id: "borrower-2" });
    const repository = createBorrowerRepositoryMock([borrower1, borrower2]);

    const result = await getAllBorrowers(repository);

    expect(result.length).toBe(2);
    expect(result).toEqual([borrower1, borrower2]);
  });

  test("should return empty array if no borrowers exist", async () => {
    const repository = createBorrowerRepositoryMock([]);

    const result = await getAllBorrowers(repository);

    expect(result).toEqual([]);
  });
});
