import { createUserNotFoundError, createInvalidCredentialsError, } from "domain/src/errors/error.js";
import bcrypt from "bcryptjs";
export async function userLogin(repo, input) {
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
