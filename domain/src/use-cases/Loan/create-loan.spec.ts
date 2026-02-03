import { createLoanRepositoryMock } from "domain/src/mocks/mockRepository/loan-mock-repository.js";
import { describe, beforeEach, test, expect } from "vitest";
import {
  CreateLoanDependencies,
  CreateLoanRequest,
  createLoan,
} from "./create-loan.js";

describe("createLoan", () => {
  let dependencies: CreateLoanDependencies;

  beforeEach(() => {
    dependencies = {
      loanRepository: createLoanRepositoryMock(),
    };
  });

  test("should create loan successfully with valid data", async () => {
    const request: CreateLoanRequest = {
      bookCopyId: "book-copy-001",
      borrowerId: "borrower-001",
    };

    const result = await createLoan(request, dependencies);

    expect(result.success).toBe(true);
    expect(result.loan).toBeDefined();
    expect(result.loan?.bookCopyId).toBe("book-copy-001");
    expect(result.loan?.borrowerId).toBe("borrower-001");
    expect(result.error).toBeUndefined();
  });

  test("should fail when bookId is empty", async () => {
    const request: CreateLoanRequest = {
      bookCopyId: "",
      borrowerId: "borrower-001",
    };

    const result = await createLoan(request, dependencies);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Book copy ID is required");
  });

  test("should fail when borrowerId is empty", async () => {
    const request: CreateLoanRequest = {
      bookCopyId: "book-copy-001",
      borrowerId: "",
    };

    const result = await createLoan(request, dependencies);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Borrower ID is required");
  });
});
