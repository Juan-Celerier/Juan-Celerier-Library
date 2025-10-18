import { createReservationNotFoundError } from "domain/src/errors/error.js";
export async function cancelReservation(deps, id) {
    const { reservationRepository } = deps;
    const reservation = await reservationRepository.findById(id);
    if (!reservation) {
        throw createReservationNotFoundError(id);
    }
    if (reservation.status === "CANCELLED") {
        return reservation; // ya estaba cancelada
    }
    return reservationRepository.update(id, { status: "CANCELLED" });
}
