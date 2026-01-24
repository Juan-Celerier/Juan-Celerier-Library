import { createPublisherNotFoundError, createPublisherAlreadyExistsError } from "domain/src/errors/error.js";
import { createPublisherRepositoryMock } from "domain/src/mocks/mockRepository/publisher-mock-repository.js";
import { createPublisherMock } from "domain/src/mocks/publisher-mock.js";
import { describe, test, expect } from "vitest";
import { updatePublisher } from "./update-publisher.js";
describe("Update Publisher Use Case", () => {
    test("should update an existing publisher", async () => {
        const publisher = createPublisherMock({ name: "Old Publisher" });
        const repository = createPublisherRepositoryMock([publisher]);
        const input = {
            name: "Updated Publisher",
            address: "New Address",
        };
        const result = await updatePublisher(repository, publisher.id, input);
        expect(result.name).toBe("Updated Publisher");
        expect(result.address).toBe("New Address");
    });
    test("should throw PublisherNotFoundError if publisher not found", async () => {
        const repository = createPublisherRepositoryMock();
        await expect(updatePublisher(repository, "non-existent-id", { name: "Doesn't Matter" })).rejects.toEqual(createPublisherNotFoundError("non-existent-id"));
    });
    test("should throw PublisherAlreadyExistsError if updating to a name that already exists", async () => {
        const publisher1 = createPublisherMock({ name: "First Publisher" });
        const publisher2 = createPublisherMock({ name: "Second Publisher" });
        const repository = createPublisherRepositoryMock([publisher1, publisher2]);
        await expect(updatePublisher(repository, publisher1.id, { name: "Second Publisher" })).rejects.toEqual(createPublisherAlreadyExistsError("Second Publisher"));
    });
});
