import { CreateReservationDTO, Reservation } from "domain/src/entities/Reservation.js";
import { UserRole } from "domain/src/entities/User.js";
import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";
export interface CreateReservationDependencies {
    reservationRepository: ReservationRepository;
}
export interface CreateReservationWithUserRequest extends CreateReservationDTO {
    userRole: UserRole;
}
export declare function createReservation(deps: CreateReservationDependencies, dto: CreateReservationDTO): Promise<Reservation>;
/**
 * Create reservation with role validation
 */
export declare function createReservationWithRoleValidation(deps: CreateReservationDependencies, request: CreateReservationWithUserRequest): Promise<Reservation>;
