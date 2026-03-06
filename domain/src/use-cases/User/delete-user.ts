import { createUserNotFoundError } from "domain/src/errors/error.js";
import { UserRepository } from "domain/src/repositories/user-repository.js";

export async function deleteUser(
  repo: UserRepository,
  userId: string,
): Promise<void> {
  const existingUser = await repo.findById(userId);

  if (!existingUser) {
    throw createUserNotFoundError(userId);
  }

  await repo.delete(userId);
}
