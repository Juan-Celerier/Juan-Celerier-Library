import { createInternalServerError } from "domain/src/errors/error.js";
export async function getAllPublishers(repository) {
    try {
        return await repository.findAll();
    }
    catch (error) {
        throw createInternalServerError("Failed to retrieve publishers");
    }
}
