import { createPublisherNotFoundError } from "domain/src/errors/error.js";
import { PublisherRepository } from "domain/src/repositories/publisher-repository.js";

export async function deletePublisher(
  repository: PublisherRepository,
  id: string,
): Promise<void> {
  const publisher = await repository.findById(id);
  if (!publisher) {
    throw createPublisherNotFoundError(id);
  }

  await repository.delete(id);
}
