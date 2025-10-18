import {
  Publisher,
  CreatePublisherDTO,
} from "domain/src/entities/Publisher.js";
import { PublisherRepository } from "domain/src/repositories/publisher-repository.js";

export interface MockedPublisherRepository extends PublisherRepository {
  publishers: Publisher[];
}

export function createPublisherRepositoryMock(
  publishers: Publisher[] = []
): MockedPublisherRepository {
  return {
    publishers,

    async create(publisher: CreatePublisherDTO) {
      const newPublisher: Publisher = {
        id: `publisher-${Date.now()}`,
        ...publisher,
        createdAt: new Date(),
      };
      this.publishers.push(newPublisher);
      return newPublisher;
    },

    async findById(id: string) {
      return this.publishers.find((p) => p.id === id) || null;
    },

    async findAll() {
      return this.publishers;
    },

    async update(id: string, publisher: Partial<CreatePublisherDTO>) {
      const index = this.publishers.findIndex((p) => p.id === id);
      if (index === -1) throw new Error("Publisher not found");

      this.publishers[index] = {
        ...this.publishers[index],
        ...publisher,
      };
      return this.publishers[index];
    },

    async delete(id: string) {
      this.publishers = this.publishers.filter((p) => p.id !== id);
    },

    async findByName(name: string) {
      return this.publishers.find((p) => p.name === name) || null;
    },
  };
}
