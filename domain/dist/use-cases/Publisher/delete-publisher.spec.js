import { createPublisherNotFoundError } from "domain/src/errors/error.js";
import { createPublisherRepositoryMock } from "domain/src/mocks/mockRepository/publisher-mock-repository.js";
import { createPublisherMock } from "domain/src/mocks/publisher-mock.js";
import { describe, beforeEach, test, expect } from "vitest";
import { deletePublisher } from "./delete-publisher.js";
describe("Delete Publisher Use Case", () => {
    let repository;
    beforeEach(() => {
        repository = createPublisherRepositoryMock();
    });
    test("should delete an existing publisher", async () => {
        const publisher = createPublisherMock();
        repository = createPublisherRepositoryMock([publisher]);
        await deletePublisher(repository, publisher.id);
        expect(repository.publishers.length).toBe(0);
    });
    test("should throw error if publisher does not exist", async () => {
        const nonExistentId = "non-existent-id";
        await expect(deletePublisher(repository, nonExistentId)).rejects.toEqual(createPublisherNotFoundError(nonExistentId));
    });
});
