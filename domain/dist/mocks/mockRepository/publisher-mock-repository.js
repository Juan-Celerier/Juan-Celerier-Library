export function createPublisherRepositoryMock(publishers = []) {
    return {
        publishers,
        async create(publisher) {
            const newPublisher = {
                id: `publisher-${Date.now()}`,
                ...publisher,
                createdAt: new Date(),
            };
            this.publishers.push(newPublisher);
            return newPublisher;
        },
        async findById(id) {
            return this.publishers.find((p) => p.id === id) || null;
        },
        async findAll() {
            return this.publishers;
        },
        async update(id, publisher) {
            const index = this.publishers.findIndex((p) => p.id === id);
            if (index === -1)
                throw new Error("Publisher not found");
            this.publishers[index] = {
                ...this.publishers[index],
                ...publisher,
            };
            return this.publishers[index];
        },
        async delete(id) {
            this.publishers = this.publishers.filter((p) => p.id !== id);
        },
        async findByName(name) {
            return this.publishers.find((p) => p.name === name) || null;
        },
    };
}
