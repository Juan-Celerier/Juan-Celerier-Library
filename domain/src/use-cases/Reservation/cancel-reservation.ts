import { Reservation } from "domain/src/entities/Reservation.js";
import { createReservationNotFoundError } from "domain/src/errors/error.js";
import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";

interface CancelReservationDeps {
  reservationRepository: ReservationRepository;
}

export async function cancelReservation(
  deps: CancelReservationDeps,
  id: string,
): Promise<Reservation> {
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
