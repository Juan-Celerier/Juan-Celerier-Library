import { v4 as uuid } from "uuid";
export async function createBookAuthor(input, repo) {
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
    if (existing.some((a, index, authors) => a.surname.toLowerCase() === input.surname.trim().toLowerCase())) {
        return {
            success: false,
            error: `Author "${input.name} ${input.surname}" already exists`,
        };
    }
    const newAuthor = {
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
