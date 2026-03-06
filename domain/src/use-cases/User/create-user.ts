import { User } from "domain/src/entities/User.js";
import {
  createInvalidDataError,
  createEmailAlreadyExistsError,
} from "domain/src/errors/error.js";
import {
  UserRepository,
  CreateUserDTO,
} from "domain/src/repositories/user-repository.js";

export interface CreateUserDeps {
  userRepository: UserRepository;
}

export async function createUser(
  deps: CreateUserDeps,
  dto: CreateUserDTO,
): Promise<User> {
  const { userRepository } = deps;

  // validaciones mínimas
  if (!dto.email.includes("@")) {
    throw createInvalidDataError("Invalid email");
  }
  if (!dto.name || !dto.surname) {
    throw createInvalidDataError("Name and surname are required");
  }

  const existing = await userRepository.findByEmail(dto.email);
  if (existing) {
    throw createEmailAlreadyExistsError(dto.email);
  }

  return userRepository.create(dto);
}
