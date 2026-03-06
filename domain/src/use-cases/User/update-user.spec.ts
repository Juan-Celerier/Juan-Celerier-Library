import { createUserNotFoundError } from "domain/src/errors/error.js";
import { createUserRepositoryMock } from "domain/src/mocks/mockRepository/user-mock-repository.js";
import { createUserMock } from "domain/src/mocks/userMocks.js";
import { describe, beforeEach, test, expect } from "vitest";
import { updateUser } from "./update-user.js";

describe("updateUser", () => {
  let repo: ReturnType<typeof createUserRepositoryMock>;

  beforeEach(() => {
    repo = createUserRepositoryMock();
  });

  test("actualiza un usuario existente", async () => {
    const existingUser = createUserMock({ id: "user-1", name: "John" });
    repo.users.push(existingUser);

    const result = await updateUser(repo, { id: "user-1", name: "Jane" });

    expect(result.name).toBe("Jane");
    expect(repo.users[0].name).toBe("Jane");
  });

  test("lanza error si el usuario no existe", async () => {
    await expect(
      updateUser(repo, { id: "non-existent", name: "Jane" }),
    ).rejects.toEqual(createUserNotFoundError("non-existent"));
  });
});
