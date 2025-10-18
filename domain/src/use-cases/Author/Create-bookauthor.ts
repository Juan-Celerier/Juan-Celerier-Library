import {
  BookAuthor,
  CreateBookAuthorDTO,
} from "domain/src/entities/BookAuthor.js";
import { BookAuthorRepository } from "domain/src/repositories/author-repository.js";
import { v4 as uuid } from "uuid";

interface CreateBookAuthorResult {
  success: boolean;
  author?: BookAuthor;
  error?: string;
}

export async function createBookAuthor(
  input: CreateBookAuthorDTO,
  repo: BookAuthorRepository
): Promise<CreateBookAuthorResult> {
  if (!input.name || input.name.trim() === "") {
    return { success: false, error: "Name is required" };
  }

  if (!input.surname || input.surname.trim() === "") {
    return { success: false, error: "Surname is required" };
  }

  if (input.birthDate && input.birthDate > new Date()) {
    return { success: false, error: "Birth date cannot be in the future" };
  }

  const existing = await repo.searchByName(input.name.trim());
  if (
    existing.some(
      (a: BookAuthor, index: number, authors: BookAuthor[]) =>
        a.surname.toLowerCase() === input.surname.trim().toLowerCase()
    )
  ) {
    return {
      success: false,
      error: `Author "${input.name} ${input.surname}" already exists`,
    };
  }

  const newAuthor: BookAuthor = {
    id: uuid(),
    createdAt: new Date(),
    ...input,
    name: input.name.trim(),
    surname: input.surname.trim(),
    biography: input.biography?.trim(),
    nationality: input.nationality?.trim(),
    image: input.image?.trim(),
  };

  const saved = await repo.create(newAuthor);

  return { success: true, author: saved };
}
