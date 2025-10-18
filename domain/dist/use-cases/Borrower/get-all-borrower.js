export async function getAllBorrowers(repository) {
    return repository.findAll();
}
