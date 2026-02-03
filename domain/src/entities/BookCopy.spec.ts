import { describe, test, expect } from "vitest";
import {
  BookCopy,
  CreateBookCopyDTO,
  UpdateBookCopyDTO,
  BookCopyStatus,
} from "./BookCopy.js";

describe("BookCopy Entity", () => {
  test("BookCopy should have all required fields", () => {
    const bookCopy: BookCopy = {
      id: "book-copy-1",
      bookId: "book-1",
      status: "AVAILABLE",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    expect(bookCopy).toHaveProperty("id");
    expect(bookCopy).toHaveProperty("bookId");
    expect(bookCopy).toHaveProperty("status");
    expect(bookCopy).toHaveProperty("createdAt");
    expect(bookCopy).toHaveProperty("updatedAt");
  });

  test("CreateBookCopyDTO should exclude id, createdAt, and updatedAt", () => {
    const bookCopyData: CreateBookCopyDTO = {
      bookId: "book-1",
      status: "AVAILABLE",
    };

    expect(bookCopyData).not.toHaveProperty("id");
    expect(bookCopyData).not.toHaveProperty("createdAt");
    expect(bookCopyData).not.toHaveProperty("updatedAt");
  });

  test("UpdateBookCopyDTO should exclude createdAt", () => {
    const bookCopyData: UpdateBookCopyDTO = {
      id: "book-copy-1",
      bookId: "book-1",
      status: "LOANED",
      updatedAt: new Date(),
    };

    expect(bookCopyData).toHaveProperty("id");
    expect(bookCopyData).not.toHaveProperty("createdAt");
  });

  test("BookCopyStatus should be one of the valid values", () => {
    const validStatuses: BookCopyStatus[] = ["AVAILABLE", "LOANED", "RESERVED"];

    validStatuses.forEach((status) => {
      const bookCopy: BookCopy = {
        id: "book-copy-1",
        bookId: "book-1",
        status: status,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(bookCopy.status).toBe(status);
    });
  });

  test("BookCopy should allow status transitions", () => {
    const availableCopy: BookCopy = {
      id: "book-copy-1",
      bookId: "book-1",
      status: "AVAILABLE",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Transition from AVAILABLE to LOANED
    const loanedCopy: BookCopy = {
      ...availableCopy,
      status: "LOANED",
      updatedAt: new Date(),
    };

    expect(loanedCopy.status).toBe("LOANED");

    // Transition from LOANED to AVAILABLE
    const returnedCopy: BookCopy = {
      ...loanedCopy,
      status: "AVAILABLE",
      updatedAt: new Date(),
    };

    expect(returnedCopy.status).toBe("AVAILABLE");

    // Transition from AVAILABLE to RESERVED
    const reservedCopy: BookCopy = {
      ...availableCopy,
      status: "RESERVED",
      updatedAt: new Date(),
    };

    expect(reservedCopy.status).toBe("RESERVED");
  });
});
