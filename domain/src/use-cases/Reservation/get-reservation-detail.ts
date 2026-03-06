import { Reservation } from "domain/src/entities/Reservation.js";
import { createReservationNotFoundError } from "domain/src/errors/error.js";
import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";

interface GetReservationDetailDeps {
  reservationRepository: ReservationRepository;
}

export async function getReservationDetail(
  deps: GetReservationDetailDeps,
  id: string,
): Promise<Reservation> {
  const { reservationRepository } = deps;

  const reservation = await reservationRepository.findById(id);

  if (!reservation) {
    throw createReservationNotFoundError(id);
  }

  return reservation;
}
