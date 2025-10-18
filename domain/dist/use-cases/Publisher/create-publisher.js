import { createPublisherAlreadyExistsError } from "domain/src/errors/error.js";
export async function createPublisher(repository, input) {
    const existing = await repository.findByName(input.name);
    if (existing) {
        throw createPublisherAlreadyExistsError(input.name);
    }
    return repository.create(input);
}
