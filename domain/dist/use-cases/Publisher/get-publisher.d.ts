import { Publisher } from "domain/src/entities/Publisher.js";
import { PublisherRepository } from "domain/src/repositories/publisher-repository.js";
export declare function getPublisherById(repository: PublisherRepository, id: string): Promise<Publisher>;
