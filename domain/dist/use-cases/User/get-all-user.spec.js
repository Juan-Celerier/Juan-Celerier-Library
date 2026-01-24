import { createUserRepositoryMock } from "domain/src/mocks/mockRepository/user-mock-repository.js";
import { createUserMock } from "domain/src/mocks/userMocks.js";
import { describe, beforeEach, test, expect } from "vitest";
import { getAllUsers } from "./get-all-user.js";
describe("getAllUsers", () => {
    let repo;
    beforeEach(() => {
        repo = createUserRepositoryMock();
    });
    test("retorna un array vacío si no hay usuarios", async () => {
        const result = await getAllUsers(repo);
        expect(result).toEqual([]);
    });
    test("retorna todos los usuarios existentes", async () => {
        const user1 = createUserMock({ id: "user-1" });
        const user2 = createUserMock({ id: "user-2" });
        repo.users.push(user1, user2);
        const result = await getAllUsers(repo);
        expect(result).toHaveLength(2);
        expect(result).toContainEqual(user1);
        expect(result).toContainEqual(user2);
    });
});
