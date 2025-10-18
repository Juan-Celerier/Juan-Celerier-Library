import {
  Reservation,
  CreateReservationDTO,
} from "domain/src/entities/Reservation.js";
import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";
import {
  createReservationNotFoundError,
  AppError,
} from "domain/src/errors/error.js";

interface UpdateReservationDeps {
  reservationRepository: ReservationRepository;
}

export async function updateReservation(
  deps: UpdateReservationDeps,
  id: string,
  updates: Partial<CreateReservationDTO>
): Promise<Reservation> {
  const { reservationRepository } = deps;

  const existing = await reservationRepository.findById(id);
  if (!existing) {
    throw createReservationNotFoundError(id);
  }

  return reservationRepository.update(id, updates);
}
