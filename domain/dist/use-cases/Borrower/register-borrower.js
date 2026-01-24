import { BorrowerAlreadyExistsError } from "domain/src/errors/error.js";
export async function registerBorrower(repository, input) {
    const existing = await repository.findByEmail(input.email);
    if (existing) {
        throw BorrowerAlreadyExistsError(input.email);
    }
    return repository.create({
        name: input.name,
        surname: input.surname,
        email: input.email,
        passwordHash: input.passwordHash,
        image: input.image,
        token: input.token,
        validated: input.validated,
        locked: input.locked,
        role: input.role,
    });
}
