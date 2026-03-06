import { describe, test, expect } from "vitest";
import { Borrower, BorrowerRole, CreateBorrowerDTO } from "./Borrower.js";

describe("Borrower Entity", () => {
  test("Borrower should have all required fields", () => {
    const borrower: Borrower = {
      id: "borrower-1",
      name: "John",
      surname: "Doe",
      email: "john@example.com",
      passwordHash: "hashed-password",
      validated: false,
      locked: false,
      role: "STUDENT",
      createdAt: new Date(),
    };

    expect(borrower).toHaveProperty("id");
    expect(borrower).toHaveProperty("name");
    expect(borrower).toHaveProperty("surname");
    expect(borrower).toHaveProperty("email");
    expect(borrower).toHaveProperty("passwordHash");
    expect(borrower).toHaveProperty("validated");
    expect(borrower).toHaveProperty("locked");
    expect(borrower).toHaveProperty("role");
    expect(borrower).toHaveProperty("createdAt");
  });

  test("Borrower should allow optional fields", () => {
    const borrower: Borrower = {
      id: "borrower-1",
      name: "John",
      surname: "Doe",
      email: "john@example.com",
      passwordHash: "hashed-password",
      validated: false,
      locked: false,
      role: "STUDENT",
      createdAt: new Date(),
      // image and token are optional
    };

    expect(borrower).not.toHaveProperty("image");
    expect(borrower).not.toHaveProperty("token");
  });

  test("BorrowerRole should be one of the valid values", () => {
    const roles: BorrowerRole[] = ["STUDENT", "TEACHER"];

    roles.forEach((role) => {
      const borrower: Borrower = {
        id: "borrower-1",
        name: "Test",
        surname: "User",
        email: "test@example.com",
        passwordHash: "hash",
        validated: true,
        locked: false,
        role: role,
        createdAt: new Date(),
      };

      expect(borrower.role).toBe(role);
    });
  });

  test("CreateBorrowerDTO should exclude id and createdAt", () => {
    const borrowerData: CreateBorrowerDTO = {
      name: "Jane",
      surname: "Smith",
      email: "jane@example.com",
      passwordHash: "hashed-password",
      validated: false,
      locked: false,
      role: "TEACHER",
    };

    expect(borrowerData).not.toHaveProperty("id");
    expect(borrowerData).not.toHaveProperty("createdAt");
  });
});
