import { BorrowerAlreadyExistsError } from "domain/src/errors/error.js";
import { createBorrowerMock } from "domain/src/mocks/borrower-mock.js";
import { createBorrowerRepositoryMock } from "domain/src/mocks/mockRepository/borrower-mock-repository.js";
import { describe, test, expect } from "vitest";
import { registerBorrower } from "./register-borrower.js";
describe("Register Borrower Use Case", () => {
    test("should register a new borrower", async () => {
        const repository = createBorrowerRepositoryMock([]);
        const input = {
            name: "Alice",
            surname: "Smith",
            email: "alice.smith@example.com",
            passwordHash: "hashed-pass",
            image: "image-url",
            token: "token-xyz",
            validated: false,
            locked: false,
            role: "STUDENT",
        };
        const result = await registerBorrower(repository, input);
        expect(result).toHaveProperty("id");
        expect(result.email).toBe(input.email);
        expect(repository.borrowers.length).toBe(1);
    });
    test("should not allow duplicate email", async () => {
        const borrower = createBorrowerMock({ email: "duplicate@example.com" });
        const repository = createBorrowerRepositoryMock([borrower]);
        const input = {
            name: "Bob",
            surname: "Brown",
            email: "duplicate@example.com",
            passwordHash: "hashed-pass",
            image: "image-url",
            token: "token-abc",
            validated: false,
            locked: false,
            role: "TEACHER",
        };
        await expect(registerBorrower(repository, input)).rejects.toThrow(BorrowerAlreadyExistsError(input.email).message);
    });
});
