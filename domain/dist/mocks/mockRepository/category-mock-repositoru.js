"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategoryRepositoryMock = createCategoryRepositoryMock;
const category_mock_1 = require("../category-mock");
function createCategoryRepositoryMock(categories = [(0, category_mock_1.createCategoryMock)()]) {
    return {
        categories,
        async create(category) {
            const newCategory = (0, category_mock_1.createCategoryMock)(category);
            this.categories.push(newCategory);
            return newCategory;
        },
        async findById(id) {
            return this.categories.find((category) => category.id === id) || null;
        },
        async findAll() {
            return this.categories;
        },
        async update(id, category) {
            const index = this.categories.findIndex((category) => category.id === id);
            if (index === -1)
                throw new Error("Category not found");
            this.categories[index] = { ...this.categories[index], ...category };
            return this.categories[index];
        },
        async delete(id) {
            const index = this.categories.findIndex((category) => category.id === id);
            if (index !== -1) {
                this.categories.splice(index, 1);
            }
        },
        async findByName(name) {
            return (this.categories.find((category) => category.name.toLowerCase() === name.toLowerCase()) || null);
        },
    };
}
