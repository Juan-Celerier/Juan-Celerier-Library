import { Reservation } from "domain/src/entities/Reservation.js";
import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";
interface GetReservationsByUserDeps {
    reservationRepository: ReservationRepository;
}
export declare function getReservationsByUser(deps: GetReservationsByUserDeps, borrowerId: string): Promise<Reservation[]>;
export {};
