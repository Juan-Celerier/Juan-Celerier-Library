import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";
import { createReservationNotFoundError } from "domain/src/errors/error.js";

interface DeleteReservationDeps {
  reservationRepository: ReservationRepository;
}

export async function deleteReservation(
  deps: DeleteReservationDeps,
  id: string,
): Promise<void> {
  const { reservationRepository } = deps;

  const existing = await reservationRepository.findById(id);
  if (!existing) {
    throw createReservationNotFoundError(id);
  }

  await reservationRepository.delete(id);
}
