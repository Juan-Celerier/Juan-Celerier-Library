import { describe, test, expect } from "vitest";
import { BookAuthor, CreateBookAuthorDTO } from "./BookAuthor.js";

describe("BookAuthor Entity", () => {
  test("BookAuthor should have all required fields", () => {
    const author: BookAuthor = {
      id: "author-1",
      name: "Gabriel",
      surname: "García Márquez",
      createdAt: new Date(),
    };

    expect(author).toHaveProperty("id");
    expect(author).toHaveProperty("name");
    expect(author).toHaveProperty("surname");
    expect(author).toHaveProperty("createdAt");
  });

  test("BookAuthor should allow optional fields", () => {
    const author: BookAuthor = {
      id: "author-1",
      name: "Gabriel",
      surname: "García Márquez",
      createdAt: new Date(),
      // biography, birthDate, nationality, and image are optional
    };

    expect(author).not.toHaveProperty("biography");
    expect(author).not.toHaveProperty("birthDate");
    expect(author).not.toHaveProperty("nationality");
    expect(author).not.toHaveProperty("image");
  });

  test("BookAuthor should allow all optional fields", () => {
    const author: BookAuthor = {
      id: "author-1",
      name: "Gabriel",
      surname: "García Márquez",
      biography: "Colombian novelist and Nobel Prize winner",
      birthDate: new Date("1927-03-06"),
      nationality: "Colombian",
      image: "https://example.com/gabriel.jpg",
      createdAt: new Date(),
    };

    expect(author).toHaveProperty("biography");
    expect(author).toHaveProperty("birthDate");
    expect(author).toHaveProperty("nationality");
    expect(author).toHaveProperty("image");
  });

  test("CreateBookAuthorDTO should exclude id and createdAt", () => {
    const authorData: CreateBookAuthorDTO = {
      name: "Isabel",
      surname: "Allende",
    };

    expect(authorData).not.toHaveProperty("id");
    expect(authorData).not.toHaveProperty("createdAt");
  });
});
