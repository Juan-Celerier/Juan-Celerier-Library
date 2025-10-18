import { createUserNotFoundError } from "domain/src/errors/error.js";
import { createUserRepositoryMock } from "domain/src/mocks/mockRepository/user-mock-repository.js";
import { createUserMock } from "domain/src/mocks/userMocks.js";
import { describe, beforeEach, test, expect } from "vitest";
import { deleteUser } from "./delete-user.js";

describe("deleteUser", () => {
  let repo: ReturnType<typeof createUserRepositoryMock>;

  beforeEach(() => {
    repo = createUserRepositoryMock();
  });

  test("elimina un usuario existente", async () => {
    const existingUser = createUserMock({ id: "user-1" });
    repo.users.push(existingUser);

    await deleteUser(repo, "user-1");

    expect(repo.users.length).toBe(0);
  });

  test("lanza error si el usuario no existe", async () => {
    await expect(deleteUser(repo, "non-existent")).rejects.toEqual(
      createUserNotFoundError("non-existent")
    );
  });
});
