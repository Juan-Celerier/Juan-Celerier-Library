import { Reservation } from "domain/src/entities/Reservation.js";
import { createReservationNotFoundError } from "domain/src/errors/error.js";
import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";
import { BookCopyRepository } from "domain/src/repositories/book-copy-repository.js";

interface GetReservationsForBookDeps {
  reservationRepository: ReservationRepository;
  bookCopyRepository: BookCopyRepository;
}

export async function getReservationsForBook(
  deps: GetReservationsForBookDeps,
  bookId: string,
): Promise<Reservation[]> {
  const { reservationRepository, bookCopyRepository } = deps;

  // Find all book copies for this book
  const bookCopies = await bookCopyRepository.findByBookId(bookId);

  if (!bookCopies || bookCopies.length === 0) {
    throw createReservationNotFoundError(bookId);
  }

  // Find reservations for all book copies
  const allReservations: Reservation[] = [];

  for (const bookCopy of bookCopies) {
    const reservations = await reservationRepository.findByBookCopyId(
      bookCopy.id,
    );
    allReservations.push(...reservations);
  }

  if (allReservations.length === 0) {
    throw createReservationNotFoundError(bookId);
  }

  return allReservations;
}
