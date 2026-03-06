import { describe, expect, test } from "vitest";
import { userLogin } from "./user-login.js";
import bcrypt from "bcryptjs";
import { createUserRepositoryMock } from "domain/src/mocks/mockRepository/user-mock-repository.js";
import {
  createUserNotFoundError,
  createInvalidCredentialsError,
} from "domain/src/errors/error.js";

describe("userLogin", () => {
  const password = "secret123";
  const passwordHash = bcrypt.hashSync(password, 10);

  const testUser = {
    id: "1",
    email: "test@example.com",
    name: "Test",
    surname: "User",
    passwordHash,
    validated: true,
    locked: false,
    role: "BORROWER" as const,
    createdAt: new Date(),
  };

  test("should login successfully with correct credentials", async () => {
    const repo = createUserRepositoryMock([testUser]);
    const result = await userLogin(repo, {
      email: "test@example.com",
      password,
    });

    expect(result.user).toHaveProperty("email", "test@example.com");
  });

  test("should throw UserNotFoundError if user does not exist", async () => {
    const repo = createUserRepositoryMock([]);
    await expect(
      userLogin(repo, {
        email: "nope@example.com",
        password,
      }),
    ).rejects.toEqual(createUserNotFoundError("nope@example.com"));
  });

  test("should throw InvalidCredentialsError if password is invalid", async () => {
    const repo = createUserRepositoryMock([testUser]);
    await expect(
      userLogin(repo, {
        email: "test@example.com",
        password: "wrong",
      }),
    ).rejects.toEqual(createInvalidCredentialsError());
  });
});
