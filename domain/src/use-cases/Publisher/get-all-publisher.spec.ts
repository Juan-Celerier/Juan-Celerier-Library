import { createInternalServerError } from "domain/src/errors/error.js";
import { createPublisherRepositoryMock } from "domain/src/mocks/mockRepository/publisher-mock-repository.js";
import { createPublisherMock } from "domain/src/mocks/publisher-mock.js";
import { describe, beforeEach, test, expect } from "vitest";
import { getAllPublishers } from "./get-all-publisher.js";


describe("Get All Publishers Use Case", () => {
  let repository: ReturnType<typeof createPublisherRepositoryMock>;

  beforeEach(() => {
    repository = createPublisherRepositoryMock();
  });

  test("should return all publishers", async () => {
    const publisher1 = createPublisherMock({ name: "Publisher 1" });
    const publisher2 = createPublisherMock({ name: "Publisher 2" });
    repository = createPublisherRepositoryMock([publisher1, publisher2]);

    const result = await getAllPublishers(repository);

    expect(result).toHaveLength(2);
    expect(result).toContainEqual(publisher1);
    expect(result).toContainEqual(publisher2);
  });

  test("should return empty array if no publishers exist", async () => {
    const result = await getAllPublishers(repository);

    expect(result).toEqual([]);
  });

  test("should throw error if repository fails", async () => {
    repository.findAll = async () => {
      throw new Error("DB error");
    };

    await expect(getAllPublishers(repository)).rejects.toEqual(
      createInternalServerError("Failed to retrieve publishers")
    );
  });
});
