import { createUserNotFoundError } from "domain/src/errors/error.js";
import { createUserRepositoryMock } from "domain/src/mocks/mockRepository/user-mock-repository.js";
import { createUserMock } from "domain/src/mocks/userMocks.js";
import { describe, test, expect } from "vitest";
import { assignUserRole } from "./user-role.js";
describe("assignUserRole", () => {
    test("should assign a new role to an existing user", async () => {
        const user = createUserMock({
            id: "1",
            email: "user@test.com",
            role: "BORROWER",
        });
        const repo = createUserRepositoryMock([user]);
        const result = await assignUserRole(repo, {
            userId: "1",
            role: "LIBRARIAN",
        });
        expect(result).toEqual({
            id: "1",
            email: "user@test.com",
            role: "LIBRARIAN",
        });
        const updatedUser = await repo.findById("1");
        expect(updatedUser?.role).toBe("LIBRARIAN");
    });
    test("should throw error if user not found", async () => {
        const repo = createUserRepositoryMock([]);
        await expect(assignUserRole(repo, {
            userId: "999",
            role: "LIBRARIAN",
        })).rejects.toEqual(createUserNotFoundError("999"));
    });
});
