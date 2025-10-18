import { createReservationNotFoundError } from "domain/src/errors/error.js";
import { createReservationRepositoryMock } from "domain/src/mocks/mockRepository/reservation-mock-repository.js";
import { createReservationMock } from "domain/src/mocks/reservationMocks.js";
import { describe, test, expect } from "vitest";
import { getReservationsForBook } from "./get-reservations-for-book.js";

describe("getReservationsForBook", () => {
  test("devuelve todas las reservas de un libro existente", async () => {
    const bookId = "book-123";
    const reservations = [
      createReservationMock({ bookId, id: "r1" }),
      createReservationMock({ bookId, id: "r2" }),
    ];
    const repo = createReservationRepositoryMock(reservations);

    const result = await getReservationsForBook(
      { reservationRepository: repo },
      bookId
    );

    expect(result).toHaveLength(2);
    expect(result.every((r) => r.bookId === bookId)).toBe(true);
  });

  test("lanza AppError si el libro no tiene reservas", async () => {
    const repo = createReservationRepositoryMock([]);
    const bookId = "book-empty";

    await expect(
      getReservationsForBook({ reservationRepository: repo }, bookId)
    ).rejects.toEqual(createReservationNotFoundError(bookId));
  });
});
