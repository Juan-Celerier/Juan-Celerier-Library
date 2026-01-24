import { Reservation } from "domain/src/entities/Reservation.js";
import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";
interface GetReservationsForBookDeps {
    reservationRepository: ReservationRepository;
}
export declare function getReservationsForBook(deps: GetReservationsForBookDeps, bookId: string): Promise<Reservation[]>;
export {};
