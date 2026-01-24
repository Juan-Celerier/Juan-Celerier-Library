export async function getAllUsers(repo) {
    return await repo.findAll();
}
