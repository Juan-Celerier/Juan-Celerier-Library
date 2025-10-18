import { Reservation } from "domain/src/entities/Reservation.js";
import { createReservationNotFoundError } from "domain/src/errors/error.js";
import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";


interface GetReservationsForBookDeps {
  reservationRepository: ReservationRepository;
}

export async function getReservationsForBook(
  deps: GetReservationsForBookDeps,
  bookId: string
): Promise<Reservation[]> {
  const { reservationRepository } = deps;

  const reservations = await reservationRepository.findByBookId(bookId);

  if (!reservations || reservations.length === 0) {
    throw createReservationNotFoundError(bookId);
  }

  return reservations;
}
