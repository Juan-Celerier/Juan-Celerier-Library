import { Publisher } from "domain/src/entities/Publisher.js";
import { PublisherRepository } from "domain/src/repositories/publisher-repository.js";
export interface MockedPublisherRepository extends PublisherRepository {
    publishers: Publisher[];
}
export declare function createPublisherRepositoryMock(publishers?: Publisher[]): MockedPublisherRepository;
