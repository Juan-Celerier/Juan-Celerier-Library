import { createReservationNotFoundError, } from "domain/src/errors/error.js";
export async function updateReservation(deps, id, updates) {
    const { reservationRepository } = deps;
    const existing = await reservationRepository.findById(id);
    if (!existing) {
        throw createReservationNotFoundError(id);
    }
    return reservationRepository.update(id, updates);
}
