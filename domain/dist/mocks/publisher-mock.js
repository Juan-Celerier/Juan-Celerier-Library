export function createPublisherMock(opts = {}) {
    return {
        id: "publisher-123",
        name: "Default Publisher",
        address: "123 Main St",
        phone: "555-1234",
        email: "publisher@example.com",
        image: "default-image.png",
        createdAt: new Date(),
        ...opts,
    };
}
