import { User } from "domain/src/entities/User.js";
import { createUserNotFoundError } from "domain/src/errors/error.js";
import { UserRepository } from "domain/src/repositories/user-repository.js";

export async function getUserDetail(
  repo: UserRepository,
  userId: string,
): Promise<User> {
  const user = await repo.findById(userId);

  if (!user) {
    throw createUserNotFoundError(userId);
  }

  return user;
}
