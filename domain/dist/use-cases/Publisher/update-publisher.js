import { createPublisherNotFoundError, createPublisherAlreadyExistsError } from "domain/src/errors/error.js";
export async function updatePublisher(repository, id, input) {
    const publisher = await repository.findById(id);
    if (!publisher) {
        throw createPublisherNotFoundError(id);
    }
    if (input.name && input.name !== publisher.name) {
        const existingPublisher = await repository.findByName(input.name);
        if (existingPublisher) {
            throw createPublisherAlreadyExistsError(input.name);
        }
    }
    return repository.update(id, input);
}
