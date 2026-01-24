import { Reservation } from "domain/src/entities/Reservation.js";
import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";
interface ExpireReservationsDeps {
    reservationRepository: ReservationRepository;
}
export declare function expireReservations(deps: ExpireReservationsDeps): Promise<Reservation[]>;
export {};
