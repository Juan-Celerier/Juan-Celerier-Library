import { Reservation, ReservationStatus } from "../entities/Reservation.js";

export function createReservationMock(
  opts: Partial<Reservation> = {}
): Reservation {
  return {
    id: "any-id",
    bookCopyId: "book-copy-123",
    borrowerId: "borrower-456",
    reservationDate: new Date(),
    expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: "PENDING" as ReservationStatus,
    createdAt: new Date(),
    ...opts,
  };
}
