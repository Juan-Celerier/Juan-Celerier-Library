import { createReservationNotFoundError } from "domain/src/errors/error.js";
export async function deleteReservation(deps, id) {
    const { reservationRepository } = deps;
    const existing = await reservationRepository.findById(id);
    if (!existing) {
        throw createReservationNotFoundError(id);
    }
    await reservationRepository.delete(id);
}
