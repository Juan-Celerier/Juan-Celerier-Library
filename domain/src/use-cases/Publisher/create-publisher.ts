import {
  CreatePublisherDTO,
  Publisher,
} from "domain/src/entities/Publisher.js";
import { createPublisherAlreadyExistsError } from "domain/src/errors/error.js";
import { PublisherRepository } from "domain/src/repositories/publisher-repository.js";

export async function createPublisher(
  repository: PublisherRepository,
  input: CreatePublisherDTO
): Promise<Publisher> {
  const existing = await repository.findByName(input.name);
  if (existing) {
    throw createPublisherAlreadyExistsError(input.name);
  }

  return repository.create(input);
}
