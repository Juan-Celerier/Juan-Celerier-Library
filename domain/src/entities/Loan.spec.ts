import { describe, test, expect } from "vitest";
import { Loan, CreateLoanDTO, canBeRenewed, renew, isOverdue, calculateFine } from "./Loan.js";

describe("Loan Entity", () => {
  test("Loan should have all required fields", () => {
    const loan: Loan = {
      id: "loan-1",
      bookCopyId: "book-copy-1",
      bookId: "book-1",
      borrowerId: "borrower-1",
      loanDate: new Date(),
      dueDate: new Date(),
      status: "active",
      createdAt: new Date(),
    };

    expect(loan).toHaveProperty("id");
    expect(loan).toHaveProperty("bookCopyId");
    expect(loan).toHaveProperty("borrowerId");
    expect(loan).toHaveProperty("loanDate");
    expect(loan).toHaveProperty("dueDate");
    expect(loan).toHaveProperty("status");
    expect(loan).toHaveProperty("createdAt");
  });

  test("Loan should allow optional fields", () => {
    const loan: Loan = {
      id: "loan-1",
      bookCopyId: "book-copy-1",
      bookId: "book-1",
      borrowerId: "borrower-1",
      loanDate: new Date(),
      dueDate: new Date(),
      status: "active",
      createdAt: new Date(),
      // returnDate, fineAmount, and renewalCount are optional
    };

    expect(loan).not.toHaveProperty("returnDate");
    expect(loan).not.toHaveProperty("fineAmount");
    expect(loan).not.toHaveProperty("renewalCount");
  });

  test("Loan status should be one of the valid values", () => {
    const validStatuses: Loan["status"][] = ["active", "returned", "overdue"];

    validStatuses.forEach((status) => {
      const loan: Loan = {
        id: "loan-1",
        bookCopyId: "book-copy-1",
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

  test("CreateLoanDTO should exclude id, createdAt, and renewalCount", () => {
    const loanData: CreateLoanDTO = {
      bookCopyId: "book-copy-1",
      bookId: "book-1",
      borrowerId: "borrower-1",
      loanDate: new Date(),
      dueDate: new Date(),
      status: "active",
    };

    expect(loanData).not.toHaveProperty("id");
    expect(loanData).not.toHaveProperty("createdAt");
    expect(loanData).not.toHaveProperty("renewalCount");
  });
});

describe("Loan Renewal Functionality", () => {
  const baseLoan: Loan = {
    id: "loan-1",
    bookCopyId: "book-copy-1",
    bookId: "book-1",
    borrowerId: "borrower-1",
    loanDate: new Date(),
    dueDate: new Date("2023-12-31"),
    status: "active",
    createdAt: new Date(),
  };

  test("canBeRenewed should return false for overdue loans", () => {
    const overdueLoan: Loan = {
      ...baseLoan,
      status: "overdue",
    };

    const result = canBeRenewed(overdueLoan, false);
    expect(result).toBe(false);
  });

  test("canBeRenewed should return false when there are active reservations", () => {
    const result = canBeRenewed(baseLoan, true);
    expect(result).toBe(false);
  });

  test("canBeRenewed should return false when loan has reached maximum renewals", () => {
    const loanWithMaxRenewals: Loan = {
      ...baseLoan,
      renewalCount: 2, // MAX_LOAN_RENEWALS is 2
    };

    const result = canBeRenewed(loanWithMaxRenewals, false);
    expect(result).toBe(false);
  });

  test("canBeRenewed should return true for eligible loans", () => {
    const eligibleLoan: Loan = {
      ...baseLoan,
      renewalCount: 1,
    };

    const result = canBeRenewed(eligibleLoan, false);
    expect(result).toBe(true);
  });

  test("renew should extend due date by 7 days", () => {
    const originalDueDate = new Date("2023-12-31");
    const loan: Loan = {
      ...baseLoan,
      dueDate: originalDueDate,
      renewalCount: 0,
    };

    const renewedLoan = renew(loan);

    const expectedNewDueDate = new Date(originalDueDate);
    expectedNewDueDate.setDate(expectedNewDueDate.getDate() + 7);

    expect(renewedLoan.dueDate.getTime()).toBe(expectedNewDueDate.getTime());
    expect(renewedLoan.renewalCount).toBe(1);
  });

  test("renew should increment renewal count", () => {
    const loan: Loan = {
      ...baseLoan,
      renewalCount: 1,
    };

    const renewedLoan = renew(loan);
    expect(renewedLoan.renewalCount).toBe(2);
  });

  test("renew should throw error when loan cannot be renewed", () => {
    const overdueLoan: Loan = {
      ...baseLoan,
      status: "overdue",
    };

    expect(() => renew(overdueLoan)).toThrow("Loan cannot be renewed");
  });

  test("renew should handle loans without initial renewalCount", () => {
    const loan: Loan = {
      ...baseLoan,
      // renewalCount is undefined
    };

    const renewedLoan = renew(loan);
    expect(renewedLoan.renewalCount).toBe(1);
  });
});

describe("Loan Fine Calculation Functionality", () => {
  const baseLoan: Loan = {
    id: "loan-1",
    bookCopyId: "book-copy-1",
    bookId: "book-1",
    borrowerId: "borrower-1",
    loanDate: new Date("2023-12-01"),
    dueDate: new Date("2023-12-15"),
    status: "active",
    createdAt: new Date(),
  };

  test("isOverdue should return false for loans returned on time", () => {
    const returnedLoan: Loan = {
      ...baseLoan,
      returnDate: new Date("2023-12-14"),
      status: "returned",
    };

    const currentDate = new Date("2023-12-20");
    const result = isOverdue(returnedLoan, currentDate);
    expect(result).toBe(false);
  });

  test("isOverdue should return false for active loans not yet due", () => {
    const currentDate = new Date("2023-12-10");
    const result = isOverdue(baseLoan, currentDate);
    expect(result).toBe(false);
  });

  test("isOverdue should return true for active loans past due date", () => {
    const currentDate = new Date("2023-12-20");
    const result = isOverdue(baseLoan, currentDate);
    expect(result).toBe(true);
  });

  test("isOverdue should return false for overdue loans that have been returned", () => {
    const returnedOverdueLoan: Loan = {
      ...baseLoan,
      returnDate: new Date("2023-12-20"),
      status: "returned",
    };

    const currentDate = new Date("2023-12-25");
    const result = isOverdue(returnedOverdueLoan, currentDate);
    expect(result).toBe(false);
  });

  test("calculateFine should return 0 for loans that are not overdue", () => {
    const currentDate = new Date("2023-12-10");
    const fine = calculateFine(baseLoan, currentDate);
    expect(fine).toBe(0);
  });

  test("calculateFine should calculate correct fine for 1 day overdue", () => {
    const currentDate = new Date("2023-12-16"); // 1 day after due date
    const fine = calculateFine(baseLoan, currentDate);
    expect(fine).toBe(1.5); // 1 day * $1.5/day
  });

  test("calculateFine should calculate correct fine for multiple days overdue", () => {
    const currentDate = new Date("2023-12-20"); // 5 days after due date
    const fine = calculateFine(baseLoan, currentDate);
    expect(fine).toBe(7.5); // 5 days * $1.5/day
  });

  test("calculateFine should cap fine at maximum amount", () => {
    // Create a loan that's way overdue (more than 33 days)
    const dueDate = new Date("2023-12-15");
    const currentDate = new Date("2024-02-01"); // ~48 days overdue

    const loan: Loan = {
      ...baseLoan,
      dueDate: dueDate,
    };

    const fine = calculateFine(loan, currentDate);
    expect(fine).toBe(50); // Should be capped at MAX_FINE_AMOUNT
  });

  test("calculateFine should return 0 for returned loans even if overdue", () => {
    const returnedLoan: Loan = {
      ...baseLoan,
      returnDate: new Date("2023-12-20"),
      status: "returned",
    };

    const currentDate = new Date("2023-12-25");
    const fine = calculateFine(returnedLoan, currentDate);
    expect(fine).toBe(0);
  });

  test("calculateFine should handle edge case of exact due date", () => {
    const currentDate = new Date("2023-12-15"); // Exact due date
    const fine = calculateFine(baseLoan, currentDate);
    expect(fine).toBe(0); // Not overdue yet
  });

  test("calculateFine should handle edge case of 1 millisecond after due date", () => {
    const dueDate = new Date("2023-12-15");
    const currentDate = new Date(dueDate.getTime() + 1); // 1ms after due date

    const loan: Loan = {
      ...baseLoan,
      dueDate: dueDate,
    };

    const fine = calculateFine(loan, currentDate);
    expect(fine).toBe(0); // Less than 1 full day, so no fine
  });

  test("calculateFine should handle edge case of just over 1 day overdue", () => {
    const dueDate = new Date("2023-12-15");
    const currentDate = new Date(dueDate.getTime() + (24 * 60 * 60 * 1000) + 1); // 1 day + 1ms

    const loan: Loan = {
      ...baseLoan,
      dueDate: dueDate,
    };

    const fine = calculateFine(loan, currentDate);
    expect(fine).toBe(1.5); // 1 full day overdue
  });
});
