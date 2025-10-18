import { Reservation, CreateReservationDTO } from "domain/src/entities/Reservation.js";
import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";
interface UpdateReservationDeps {
    reservationRepository: ReservationRepository;
}
export declare function updateReservation(deps: UpdateReservationDeps, id: string, updates: Partial<CreateReservationDTO>): Promise<Reservation>;
export {};
//# sourceMappingURL=update-reservation.d.ts.map