import { Reservation } from "domain/src/entities/Reservation.js";
import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";

interface ExpireReservationsDeps {
  reservationRepository: ReservationRepository;
}

export async function expireReservations(
  deps: ExpireReservationsDeps,
): Promise<Reservation[]> {
  const { reservationRepository } = deps;

  const allReservations = await reservationRepository.findAll();
  const now = Date.now();

  const expiredReservations: Reservation[] = [];

  for (const reservation of allReservations) {
    const isPending = reservation.status === "PENDING";
    const isExpired = reservation.expirationDate.getTime() < now;

    if (isPending && isExpired) {
      const updated = await reservationRepository.update(reservation.id, {
        ...reservation,
        status: "EXPIRED",
      });
      expiredReservations.push(updated);
    }
  }

  return expiredReservations;
}
