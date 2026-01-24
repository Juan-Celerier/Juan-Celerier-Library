import { Publisher } from "domain/src/entities/Publisher.js";
import { PublisherRepository } from "domain/src/repositories/publisher-repository.js";
export declare function getAllPublishers(repository: PublisherRepository): Promise<Publisher[]>;
