import { describe, test, expect } from "vitest";
import { User, UserRole } from "./User.js";

describe("User Entity", () => {
  test("User should have all required fields", () => {
    const user: User = {
      id: "user-1",
      name: "John",
      surname: "Doe",
      email: "john@example.com",
      passwordHash: "hashed-password",
      validated: false,
      locked: false,
      role: "BORROWER",
      createdAt: new Date(),
    };

    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("surname");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("passwordHash");
    expect(user).toHaveProperty("validated");
    expect(user).toHaveProperty("locked");
    expect(user).toHaveProperty("role");
    expect(user).toHaveProperty("createdAt");
  });

  test("User should allow optional fields", () => {
    const user: User = {
      id: "user-1",
      name: "John",
      surname: "Doe",
      email: "john@example.com",
      passwordHash: "hashed-password",
      validated: false,
      locked: false,
      role: "BORROWER",
      createdAt: new Date(),
      // image and token are optional
    };

    expect(user).not.toHaveProperty("image");
    expect(user).not.toHaveProperty("token");
  });

  test("UserRole should be one of the valid values", () => {
    const roles: UserRole[] = ["BORROWER", "LIBRARIAN"];

    roles.forEach((role) => {
      const user: User = {
        id: "user-1",
        name: "Test",
        surname: "User",
        email: "test@example.com",
        passwordHash: "hash",
        validated: true,
        locked: false,
        role: role,
        createdAt: new Date(),
      };

      expect(user.role).toBe(role);
    });
  });
});
