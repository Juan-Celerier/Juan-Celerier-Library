import { createPublisherAlreadyExistsError } from "domain/src/errors/error.js";
import { createPublisherRepositoryMock } from "domain/src/mocks/mockRepository/publisher-mock-repository.js";
import { createPublisherMock } from "domain/src/mocks/publisher-mock.js";
import { describe, beforeEach, test, expect } from "vitest";
import { createPublisher } from "./create-publisher.js";
describe("Create Publisher Use Case", () => {
    let repository;
    beforeEach(() => {
        repository = createPublisherRepositoryMock();
    });
    test("should create a new publisher successfully", async () => {
        const input = {
            name: "New Publisher",
            address: "123 Street",
            phone: "555-6789",
            email: "publisher@example.com",
            image: "http://example.com/image.jpg",
        };
        const result = await createPublisher(repository, input);
        expect(result).toHaveProperty("id");
        expect(result.name).toBe(input.name);
        expect(repository.publishers.length).toBe(1);
    });
    test("should fail when publisher name already exists", async () => {
        const existingPublisher = createPublisherMock({
            name: "Duplicate Publisher",
        });
        repository = createPublisherRepositoryMock([existingPublisher]);
        const input = {
            name: "Duplicate Publisher",
            address: "456 Street",
            phone: "555-1234",
            email: "duplicate@example.com",
        };
        await expect(createPublisher(repository, input)).rejects.toEqual(createPublisherAlreadyExistsError(input.name));
    });
});
