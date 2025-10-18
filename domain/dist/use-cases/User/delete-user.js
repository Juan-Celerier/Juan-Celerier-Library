import { createUserNotFoundError } from "domain/src/errors/error.js";
export async function deleteUser(repo, userId) {
    const existingUser = await repo.findById(userId);
    if (!existingUser) {
        throw createUserNotFoundError(userId);
    }
    await repo.delete(userId);
}
