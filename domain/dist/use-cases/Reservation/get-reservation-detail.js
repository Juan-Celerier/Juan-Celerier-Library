import { createReservationNotFoundError } from "domain/src/errors/error.js";
export async function getReservationDetail(deps, id) {
    const { reservationRepository } = deps;
    const reservation = await reservationRepository.findById(id);
    if (!reservation) {
        throw createReservationNotFoundError(id);
    }
    return reservation;
}
