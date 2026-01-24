import { CreateReservationDTO, Reservation } from "domain/src/entities/Reservation.js";
import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";
export interface CreateReservationDependencies {
    reservationRepository: ReservationRepository;
}
export declare function createReservation(deps: CreateReservationDependencies, dto: CreateReservationDTO): Promise<Reservation>;
