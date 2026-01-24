import { describe, test, expect } from "vitest";
import { Publisher, CreatePublisherDTO } from "./Publisher.js";

describe("Publisher Entity", () => {
  test("Publisher should have all required fields", () => {
    const publisher: Publisher = {
      id: "publisher-1",
      name: "Penguin Books",
      address: "123 Main St",
      phone: "555-1234",
      email: "contact@penguin.com",
      createdAt: new Date(),
    };

    expect(publisher).toHaveProperty("id");
    expect(publisher).toHaveProperty("name");
    expect(publisher).toHaveProperty("address");
    expect(publisher).toHaveProperty("phone");
    expect(publisher).toHaveProperty("email");
    expect(publisher).toHaveProperty("createdAt");
  });

  test("Publisher should allow optional image field", () => {
    const publisher: Publisher = {
      id: "publisher-1",
      name: "Penguin Books",
      address: "123 Main St",
      phone: "555-1234",
      email: "contact@penguin.com",
      createdAt: new Date(),
      // image is optional
    };

    expect(publisher).not.toHaveProperty("image");
  });

  test("CreatePublisherDTO should exclude id and createdAt", () => {
    const publisherData: CreatePublisherDTO = {
      name: "HarperCollins",
      address: "456 Oak Ave",
      phone: "555-5678",
      email: "info@harpercollins.com",
    };

    expect(publisherData).not.toHaveProperty("id");
    expect(publisherData).not.toHaveProperty("createdAt");
  });
});
