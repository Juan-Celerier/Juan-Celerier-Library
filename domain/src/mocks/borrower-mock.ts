import { Borrower } from "../entities/Borrower.js";

export function createBorrowerMock(opts: Partial<Borrower> = {}): Borrower {
  return {
    id: "borrower-123",
    name: "John Doe",
    surname: "Doe",
    email: "john.doe@example.com",
    passwordHash: "password123",
    image: "image-url",
    token: "token-abc-123",
    validated: true,
    locked: false,
    role: "STUDENT",
    createdAt: new Date(),
    ...opts,
  };
}
