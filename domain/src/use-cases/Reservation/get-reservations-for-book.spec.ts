import { createReservationNotFoundError } from "domain/src/errors/error.js";
import { createReservationRepositoryMock } from "domain/src/mocks/mockRepository/reservation-mock-repository.js";
import { createBookCopyRepositoryMock } from "domain/src/mocks/mockRepository/book-copy-mock-repository.js";
import { createReservationMock } from "domain/src/mocks/reservationMocks.js";
import { describe, test, expect } from "vitest";
import { getReservationsForBook } from "./get-reservations-for-book.js";

describe("getReservationsForBook", () => {
  test("devuelve todas las reservas de un libro existente", async () => {
    const bookId = "book-123";
    const bookCopyId1 = "book-copy-1";
    const bookCopyId2 = "book-copy-2";

    // Create book copies for the book
    const bookCopyRepo = createBookCopyRepositoryMock([
      {
        id: bookCopyId1,
        bookId,
        status: "AVAILABLE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: bookCopyId2,
        bookId,
        status: "AVAILABLE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Create reservations for the book copies
    const reservations = [
      createReservationMock({ bookCopyId: bookCopyId1, id: "r1" }),
      createReservationMock({ bookCopyId: bookCopyId2, id: "r2" }),
    ];
    const reservationRepo = createReservationRepositoryMock(reservations);

    const result = await getReservationsForBook(
      { reservationRepository: reservationRepo, bookCopyRepository: bookCopyRepo },
      bookId
    );

    expect(result).toHaveLength(2);
    expect(result.every((r) => r.bookCopyId === bookCopyId1 || r.bookCopyId === bookCopyId2)).toBe(true);
  });

  test("lanza AppError si el libro no tiene reservas", async () => {
    const bookId = "book-empty";

    // Create empty book copy repository (no copies for this book)
    const bookCopyRepo = createBookCopyRepositoryMock([]);

    // Create empty reservation repository
    const reservationRepo = createReservationRepositoryMock([]);

    await expect(
      getReservationsForBook(
        { reservationRepository: reservationRepo, bookCopyRepository: bookCopyRepo },
        bookId
      )
    ).rejects.toEqual(createReservationNotFoundError(bookId));
  });
});
