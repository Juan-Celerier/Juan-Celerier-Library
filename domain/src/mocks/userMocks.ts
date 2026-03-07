import { User, UserRole } from "../entities/User.js";
export function createUserMock(opts: Partial<User> = {}): User {
  return {
    id: "any-id1",
    name: "John",
    surname: "Doe",
    email: "john.doe@example.com",
    passwordHash: "hashed-password",
    image: "any-image-url",
    token: "any-token",
    validated: true,
    locked: false,
    role: "BORROWER" as UserRole,
    createdAt: new Date(),
    ...opts,
  };
}
