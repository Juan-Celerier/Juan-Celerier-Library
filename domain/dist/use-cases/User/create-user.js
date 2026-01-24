import { createInvalidDataError, createEmailAlreadyExistsError } from "domain/src/errors/error.js";
export async function createUser(deps, dto) {
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
