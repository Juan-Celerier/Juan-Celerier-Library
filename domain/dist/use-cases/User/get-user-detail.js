import { createUserNotFoundError } from "domain/src/errors/error.js";
export async function getUserDetail(repo, userId) {
    const user = await repo.findById(userId);
    if (!user) {
        throw createUserNotFoundError(userId);
    }
    return user;
}
