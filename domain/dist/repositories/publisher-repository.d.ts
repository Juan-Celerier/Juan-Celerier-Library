import { Publisher, CreatePublisherDTO } from "../entities/Publisher.js";
export interface PublisherRepository {
    create(publisher: CreatePublisherDTO): Promise<Publisher>;
    findById(id: string): Promise<Publisher | null>;
    findAll(): Promise<Publisher[]>;
    update(id: string, publisher: Partial<CreatePublisherDTO>): Promise<Publisher>;
    delete(id: string): Promise<void>;
    findByName(name: string): Promise<Publisher | null>;
}
//# sourceMappingURL=publisher-repository.d.ts.map