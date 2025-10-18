import { createReservationNotFoundError } from "domain/src/errors/error.js";
export async function getReservationsForBook(deps, bookId) {
    const { reservationRepository } = deps;
    const reservations = await reservationRepository.findByBookId(bookId);
    if (!reservations || reservations.length === 0) {
        throw createReservationNotFoundError(bookId);
    }
    return reservations;
}
