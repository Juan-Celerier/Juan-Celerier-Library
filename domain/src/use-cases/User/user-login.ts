import { User } from "domain/src/entities/User.js";
import {
  createUserNotFoundError,
  createInvalidCredentialsError,
} from "domain/src/errors/error.js";
import { UserRepository } from "domain/src/repositories/user-repository.js";
import bcrypt from "bcryptjs";

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface UserLoginOutput {
  user: User;
}

export async function userLogin(
  repo: UserRepository,
  input: UserLoginInput,
): Promise<UserLoginOutput> {
  const { email, password } = input;

  const user = await repo.findByEmail(email);
  if (!user) {
    throw createUserNotFoundError(email);
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw createInvalidCredentialsError();
  }

  return { user };
}
