import { User } from "domain/src/entities/User.js";
import { UserRepository } from "domain/src/repositories/user-repository.js";
import { createUserNotFoundError } from "domain/src/errors/error.js";

export interface UpdateUserDTO {
  id: string;
  name?: string;
  surname?: string;
  email?: string;
  image?: string;
  validated?: boolean;
  locked?: boolean;
  role?: "BORROWER" | "LIBRARIAN";
}

export async function updateUser(
  repo: UserRepository,
  input: UpdateUserDTO,
): Promise<User> {
  const existingUser = await repo.findById(input.id);

  if (!existingUser) {
    throw createUserNotFoundError(input.id);
  }

  const updatedUser: User = {
    ...existingUser,
    ...input,
  };

  return repo.update(updatedUser);
}
