import {
  createInvalidDataError,
  createEmailAlreadyExistsError,
} from "domain/src/errors/error.js";
import { createUserRepositoryMock } from "domain/src/mocks/mockRepository/user-mock-repository.js";
import { CreateUserDTO } from "domain/src/repositories/user-repository.js";
import { describe, test, expect } from "vitest";
import { createUser } from "./create-user.js";

describe("createUser", () => {
  test("crea un usuario válido", async () => {
    const repo = createUserRepositoryMock();
    const dto: CreateUserDTO = {
      name: "Alice",
      surname: "Smith",
      email: "alice@example.com",
      passwordHash: "hashed-pass",
      validated: false,
      locked: false,
      role: "BORROWER",
      image: "image-url",
      token: "token-123",
    };

    const user = await createUser({ userRepository: repo }, dto);

    expect(user.id).toContain("user-");
    expect(user.email).toBe(dto.email);
    expect(repo.users.length).toBe(1);
  });

  test("lanza error si el email es inválido", async () => {
    const repo = createUserRepositoryMock();
    const dto: CreateUserDTO = {
      name: "Alice",
      surname: "Smith",
      email: "invalid-email",
      passwordHash: "hashed-pass",
      validated: false,
      locked: false,
      role: "BORROWER",
    };

    await expect(createUser({ userRepository: repo }, dto)).rejects.toEqual(
      createInvalidDataError("Invalid email"),
    );
  });

  test("lanza error si no hay nombre o apellido", async () => {
    const repo = createUserRepositoryMock();
    const dto: CreateUserDTO = {
      name: "",
      surname: "",
      email: "alice@example.com",
      passwordHash: "hashed-pass",
      validated: false,
      locked: false,
      role: "BORROWER",
    };

    await expect(createUser({ userRepository: repo }, dto)).rejects.toEqual(
      createInvalidDataError("Name and surname are required"),
    );
  });

  test("lanza error si ya existe un usuario con el mismo email", async () => {
    const repo = createUserRepositoryMock();
    const dto: CreateUserDTO = {
      name: "Alice",
      surname: "Smith",
      email: "alice@example.com",
      passwordHash: "hashed-pass",
      validated: false,
      locked: false,
      role: "BORROWER",
    };

    // crear primero
    await createUser({ userRepository: repo }, dto);

    // intentar crear duplicado
    await expect(createUser({ userRepository: repo }, dto)).rejects.toEqual(
      createEmailAlreadyExistsError(dto.email),
    );
  });
});
