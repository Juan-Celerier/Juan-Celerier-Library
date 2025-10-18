import { Publisher } from "domain/src/entities/Publisher.js";
import { createInternalServerError } from "domain/src/errors/error.js";
import { PublisherRepository } from "domain/src/repositories/publisher-repository.js";

export async function getAllPublishers(
  repository: PublisherRepository
): Promise<Publisher[]> {
  try {
    return await repository.findAll();
  } catch (error) {
    throw createInternalServerError("Failed to retrieve publishers");
  }
}
