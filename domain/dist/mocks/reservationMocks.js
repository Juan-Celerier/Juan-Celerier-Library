export function createReservationMock(opts = {}) {
    return {
        id: "any-id",
        bookId: "book-123",
        borrowerId: "borrower-456",
        reservationDate: new Date(),
        expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: "PENDING",
        createdAt: new Date(),
        ...opts,
    };
}
