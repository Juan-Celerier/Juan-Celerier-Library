import { Reservation } from "domain/src/entities/Reservation.js";
import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";
interface CancelReservationDeps {
    reservationRepository: ReservationRepository;
}
export declare function cancelReservation(deps: CancelReservationDeps, id: string): Promise<Reservation>;
export {};
