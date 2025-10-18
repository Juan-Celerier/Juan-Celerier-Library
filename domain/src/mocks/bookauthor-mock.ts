import { BookAuthor } from "../entities/BookAuthor.js";

export function createAuthorMock(opts: Partial<BookAuthor> = {}): BookAuthor {
  return {
    id: "any-id",
    name: "Jane",
    surname: "Smith",
    biography: "any-biography",
    birthDate: new Date(),
    nationality: "any-nationality",
    image: "any-image-url",

    createdAt: new Date(),
    ...opts,
  };
}
