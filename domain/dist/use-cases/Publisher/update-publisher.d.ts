import { Publisher } from "domain/src/entities/Publisher.js";
import { PublisherRepository } from "domain/src/repositories/publisher-repository.js";
interface UpdatePublisherInput {
    name?: string;
    address?: string;
    phone?: string;
    email?: string;
    image?: string;
}
export declare function updatePublisher(repository: PublisherRepository, id: string, input: UpdatePublisherInput): Promise<Publisher>;
export {};
//# sourceMappingURL=update-publisher.d.ts.map