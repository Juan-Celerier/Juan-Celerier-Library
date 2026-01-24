import { CreatePublisherDTO, Publisher } from "domain/src/entities/Publisher.js";
import { PublisherRepository } from "domain/src/repositories/publisher-repository.js";
export declare function createPublisher(repository: PublisherRepository, input: CreatePublisherDTO): Promise<Publisher>;
