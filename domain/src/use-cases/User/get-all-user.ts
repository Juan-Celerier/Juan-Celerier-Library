import { User } from "domain/src/entities/User.js";
import { UserRepository } from "domain/src/repositories/user-repository.js";

export async function getAllUsers(repo: UserRepository): Promise<User[]> {
  return await repo.findAll();
}
