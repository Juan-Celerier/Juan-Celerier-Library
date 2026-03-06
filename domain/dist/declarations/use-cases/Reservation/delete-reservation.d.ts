import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";
interface DeleteReservationDeps {
    reservationRepository: ReservationRepository;
}
export declare function deleteReservation(deps: DeleteReservationDeps, id: string): Promise<void>;
export {};
//# sourceMappingURL=delete-reservation.d.ts.map