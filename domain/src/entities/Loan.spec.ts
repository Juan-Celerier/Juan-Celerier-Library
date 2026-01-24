import { describe, test, expect } from "vitest";
import { Loan, CreateLoanDTO } from "./Loan.js";

describe("Loan Entity", () => {
  test("Loan should have all required fields", () => {
    const loan: Loan = {
      id: "loan-1",
      bookId: "book-1",
      borrowerId: "borrower-1",
      loanDate: new Date(),
      dueDate: new Date(),
      status: "active",
      createdAt: new Date(),
    };

    expect(loan).toHaveProperty("id");
    expect(loan).toHaveProperty("bookId");
    expect(loan).toHaveProperty("borrowerId");
    expect(loan).toHaveProperty("loanDate");
    expect(loan).toHaveProperty("dueDate");
    expect(loan).toHaveProperty("status");
    expect(loan).toHaveProperty("createdAt");
  });

  test("Loan should allow optional fields", () => {
    const loan: Loan = {
      id: "loan-1",
      bookId: "book-1",
      borrowerId: "borrower-1",
      loanDate: new Date(),
      dueDate: new Date(),
      status: "active",
      createdAt: new Date(),
      // returnDate and fineAmount are optional
    };

    expect(loan).not.toHaveProperty("returnDate");
    expect(loan).not.toHaveProperty("fineAmount");
  });

  test("Loan status should be one of the valid values", () => {
    const validStatuses: Loan["status"][] = ["active", "returned", "overdue"];

    validStatuses.forEach((status) => {
      const loan: Loan = {
        id: "loan-1",
        bookId: "book-1",
        borrowerId: "borrower-1",
        loanDate: new Date(),
        dueDate: new Date(),
        status: status,
        createdAt: new Date(),
      };

      expect(loan.status).toBe(status);
    });
  });

  test("CreateLoanDTO should exclude id and createdAt", () => {
    const loanData: CreateLoanDTO = {
      bookId: "book-1",
      borrowerId: "borrower-1",
      loanDate: new Date(),
      dueDate: new Date(),
      status: "active",
    };

    expect(loanData).not.toHaveProperty("id");
    expect(loanData).not.toHaveProperty("createdAt");
  });
});
