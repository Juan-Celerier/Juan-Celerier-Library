export function createBookMock(opts = {}) {
    return {
        id: "any-id",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publisher: "Charles Scribner's Sons",
        publicationDate: new Date("1925-04-10"),
        authors: ["F. Scott Fitzgerald"],
        categories: ["Fiction", "Classic"],
        isbn: "978-0-7432-7356-5",
        image: "any-book-cover-url",
        description: "A classic American novel set in the Jazz Age",
        createdAt: new Date(),
        availableCopies: 10,
        totalCopies: 20,
        ...opts,
    };
}
