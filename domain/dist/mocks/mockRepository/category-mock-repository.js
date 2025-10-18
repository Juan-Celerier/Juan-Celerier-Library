import { v4 as uuid } from "uuid";
export function createCategoryRepositoryMock(categories = []) {
    return {
        categories,
        async create(data) {
            const newCategory = {
                id: uuid(),
                createdAt: new Date(),
                ...data,
            };
            this.categories.push(newCategory);
            return newCategory;
        },
        async findById(id) {
            return this.categories.find((c) => c.id === id) || null;
        },
        async findAll() {
            return this.categories;
        },
        async update(id, data) {
            const index = this.categories.findIndex((c) => c.id === id);
            if (index === -1)
                throw new Error("Category not found");
            this.categories[index] = {
                ...this.categories[index],
                ...data,
            };
            return this.categories[index];
        },
        async delete(id) {
            const initialLength = this.categories.length;
            this.categories = this.categories.filter((c) => c.id !== id);
            return this.categories.length < initialLength;
        },
        async findByName(name) {
            return (this.categories.find((c) => c.name.toLowerCase() === name.toLowerCase()) || null);
        },
    };
}
