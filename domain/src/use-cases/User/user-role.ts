import { User } from "domain/src/entities/User.js";
import { createUserNotFoundError } from "domain/src/errors/error.js";
import { UserRepository } from "domain/src/repositories/user-repository.js";

export interface AssignUserRoleInput {
  userId: string;
  role: User["role"];
}

export interface AssignUserRoleOutput {
  id: string;
  email: string;
  role: User["role"];
}

export async function assignUserRole(
  repo: UserRepository,
  input: AssignUserRoleInput
): Promise<AssignUserRoleOutput> {
  const user = await repo.findById(input.userId);

  if (!user) {
    throw createUserNotFoundError(input.userId);
  }

  const updated: User = { ...user, role: input.role };
  await repo.save(updated);

  return {
    id: updated.id,
    email: updated.email,
    role: updated.role,
  };
}
