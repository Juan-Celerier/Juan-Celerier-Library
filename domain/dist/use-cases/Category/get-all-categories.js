export async function getAllCategories(repository) {
    const categories = await repository.findAll();
    return {
        success: true,
        categories,
    };
}
