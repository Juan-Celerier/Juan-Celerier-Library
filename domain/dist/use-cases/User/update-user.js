import { createUserNotFoundError } from "domain/src/errors/error.js";
export async function updateUser(repo, input) {
    const existingUser = await repo.findById(input.id);
    if (!existingUser) {
        throw createUserNotFoundError(input.id);
    }
    const updatedUser = {
        ...existingUser,
        ...input,
    };
    return repo.update(updatedUser);
}
