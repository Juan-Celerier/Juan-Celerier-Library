import { createUserNotFoundError } from "domain/src/errors/error.js";
export async function assignUserRole(repo, input) {
    const user = await repo.findById(input.userId);
    if (!user) {
        throw createUserNotFoundError(input.userId);
    }
    const updated = { ...user, role: input.role };
    await repo.save(updated);
    return {
        id: updated.id,
        email: updated.email,
        role: updated.role,
    };
}
