import { createPublisherNotFoundError } from "domain/src/errors/error.js";
export async function deletePublisher(repository, id) {
    const publisher = await repository.findById(id);
    if (!publisher) {
        throw createPublisherNotFoundError(id);
    }
    await repository.delete(id);
}
