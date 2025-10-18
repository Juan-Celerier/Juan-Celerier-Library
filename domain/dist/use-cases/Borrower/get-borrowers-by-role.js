import { createInvalidBorrowerRoleError } from "domain/src/errors/error.js";
export async function getBorrowersByRole(repository, role) {
    const validRoles = ["STUDENT", "TEACHER"];
    if (!validRoles.includes(role)) {
        throw createInvalidBorrowerRoleError(role);
    }
    return repository.findByRole(role);
}
