import { Reservation } from "domain/src/entities/Reservation.js";
import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";


interface GetReservationsByUserDeps {
  reservationRepository: ReservationRepository;
}

export async function getReservationsByUser(
  deps: GetReservationsByUserDeps,
  borrowerId: string
): Promise<Reservation[]> {
  const { reservationRepository } = deps;

  const reservations = await reservationRepository.findByBorrowerId(borrowerId);

  return reservations;
}
