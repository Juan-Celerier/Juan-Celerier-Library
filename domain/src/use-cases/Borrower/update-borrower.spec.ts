import {
  BorrowerNotFoundError,
  BorrowerAlreadyExistsError,
} from "domain/src/errors/error.js";
import { createBorrowerMock } from "domain/src/mocks/borrower-mock.js";
import { createBorrowerRepositoryMock } from "domain/src/mocks/mockRepository/borrower-mock-repository.js";
import { describe, test, expect } from "vitest";
import { updateBorrower } from "./update-borrower.js";

describe("Update Borrower Use Case", () => {
  test("should update borrower details", async () => {
    const borrower = createBorrowerMock({ name: "Old Name" });
    const repository = createBorrowerRepositoryMock([borrower]);

    const updated = await updateBorrower(repository, {
      id: borrower.id,
      name: "New Name",
    });

    expect(updated.name).toBe("New Name");
    expect(repository.borrowers[0].name).toBe("New Name");
  });

  test("should throw if borrower does not exist", async () => {
    const repository = createBorrowerRepositoryMock([]);

    await expect(
      updateBorrower(repository, { id: "non-existent", name: "Name" }),
    ).rejects.toThrow(BorrowerNotFoundError("non-existent").message);
  });

  test("should not allow email duplication", async () => {
    const borrower1 = createBorrowerMock({ id: "1", email: "a@example.com" });
    const borrower2 = createBorrowerMock({ id: "2", email: "b@example.com" });
    const repository = createBorrowerRepositoryMock([borrower1, borrower2]);

    await expect(
      updateBorrower(repository, { id: "1", email: "b@example.com" }),
    ).rejects.toThrow(BorrowerAlreadyExistsError("b@example.com").message);
  });
});
