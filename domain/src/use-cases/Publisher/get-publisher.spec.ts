import { createPublisherNotFoundError } from "domain/src/errors/error.js";
import { createPublisherRepositoryMock } from "domain/src/mocks/mockRepository/publisher-mock-repository.js";
import { createPublisherMock } from "domain/src/mocks/publisher-mock.js";
import { describe, test, expect } from "vitest";
import { getPublisherById } from "./get-publisher.js";

describe("Get Publisher By ID Use Case", () => {
  test("should return publisher if exists", async () => {
    const publisher = createPublisherMock();
    const repository = createPublisherRepositoryMock([publisher]);

    const result = await getPublisherById(repository, publisher.id);

    expect(result).toEqual(publisher);
  });

  test("should throw PublisherNotFoundError if publisher does not exist", async () => {
    const repository = createPublisherRepositoryMock();

    await expect(
      getPublisherById(repository, "non-existent-id")
    ).rejects.toEqual(createPublisherNotFoundError("non-existent-id"));
  });
});
