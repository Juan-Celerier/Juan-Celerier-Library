import { createUserNotFoundError } from "domain/src/errors/error.js";
import { createUserRepositoryMock } from "domain/src/mocks/mockRepository/user-mock-repository.js";
import { createUserMock } from "domain/src/mocks/userMocks.js";
import { describe, beforeEach, test, expect } from "vitest";
import { getUserDetail } from "./get-user-detail.js";
describe("getUserDetail", () => {
    let repo;
    beforeEach(() => {
        repo = createUserRepositoryMock();
    });
    test("retorna un usuario existente", async () => {
        const existingUser = createUserMock({ id: "user-1" });
        repo.users.push(existingUser);
        const user = await getUserDetail(repo, "user-1");
        expect(user).toBeDefined();
        expect(user.id).toBe("user-1");
        expect(user.email).toBe(existingUser.email);
    });
    test("lanza error si el usuario no existe", async () => {
        await expect(getUserDetail(repo, "non-existent")).rejects.toEqual(createUserNotFoundError("non-existent"));
    });
});
