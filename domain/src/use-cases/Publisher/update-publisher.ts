import { Publisher } from "domain/src/entities/Publisher.js";
import {
  createPublisherNotFoundError,
  createPublisherAlreadyExistsError,
} from "domain/src/errors/error.js";
import { PublisherRepository } from "domain/src/repositories/publisher-repository.js";

interface UpdatePublisherInput {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  image?: string;
}

export async function updatePublisher(
  repository: PublisherRepository,
  id: string,
  input: UpdatePublisherInput,
): Promise<Publisher> {
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
