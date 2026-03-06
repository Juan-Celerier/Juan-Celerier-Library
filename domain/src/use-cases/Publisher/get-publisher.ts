import { Publisher } from "domain/src/entities/Publisher.js";
import { createPublisherNotFoundError } from "domain/src/errors/error.js";
import { PublisherRepository } from "domain/src/repositories/publisher-repository.js";

export async function getPublisherById(
  repository: PublisherRepository,
  id: string,
): Promise<Publisher> {
  const publisher = await repository.findById(id);
  if (!publisher) {
    throw createPublisherNotFoundError(id);
  }
  return publisher;
}
