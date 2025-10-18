import { describe, beforeEach, test, expect } from "vitest";
import { createBookAuthor } from "./Create-bookauthor.js";
const makeMockRepo = () => {
    return {
        findAll: async () => [],
        findById: async () => null,
        create: async (data) => data,
        update: async () => null,
        delete: async () => false,
        searchByName: async () => [],
    };
};
describe("createBookAuthor", () => {
    let repo;
    beforeEach(() => {
        repo = makeMockRepo();
    });
    test("should create book author successfully with valid data", async () => {
        const input = {
            name: "Gabriel",
            surname: "García Márquez",
            biography: "Colombian novelist and Nobel Prize winner",
            birthDate: new Date("1927-03-06"),
            nationality: "Colombian",
            image: "gabriel.jpg",
        };
        const result = await createBookAuthor(input, repo);
        expect(result.success).toBe(true);
        expect(result.author?.name).toBe("Gabriel");
        expect(result.author?.surname).toBe("García Márquez");
        expect(result.error).toBeUndefined();
    });
    test("should create book author with minimal data", async () => {
        const input = {
            name: "Jorge Luis",
            surname: "Borges",
        };
        const result = await createBookAuthor(input, repo);
        expect(result.success).toBe(true);
        expect(result.author?.name).toBe("Jorge Luis");
        expect(result.author?.surname).toBe("Borges");
    });
    test("should fail when name is empty", async () => {
        const input = {
            name: "",
            surname: "X",
        };
        const result = await createBookAuthor(input, repo);
        expect(result.success).toBe(false);
        expect(result.error).toBe("Name is required");
    });
    test("should fail when surname is empty", async () => {
        const input = {
            name: "Gabriel",
            surname: "",
        };
        const result = await createBookAuthor(input, repo);
        expect(result.success).toBe(false);
        expect(result.error).toBe("Surname is required");
    });
    test("should fail when birth date is in the future", async () => {
        const future = new Date();
        future.setFullYear(future.getFullYear() + 1);
        const input = {
            name: "Future",
            surname: "Author",
            birthDate: future,
        };
        const result = await createBookAuthor(input, repo);
        expect(result.success).toBe(false);
        expect(result.error).toBe("Birth date cannot be in the future");
    });
    test("should fail when author already exists", async () => {
        repo.searchByName = async () => [
            {
                id: "1",
                name: "Julio",
                surname: "Cortázar",
                createdAt: new Date(),
            },
        ];
        const input = {
            name: "Julio",
            surname: "Cortázar",
        };
        const result = await createBookAuthor(input, repo);
        expect(result.success).toBe(false);
        expect(result.error).toBe('Author "Julio Cortázar" already exists');
    });
});
