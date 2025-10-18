import { Reservation } from "domain/src/entities/Reservation.js";
import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";
interface GetReservationDetailDeps {
    reservationRepository: ReservationRepository;
}
export declare function getReservationDetail(deps: GetReservationDetailDeps, id: string): Promise<Reservation>;
export {};
//# sourceMappingURL=get-reservation-detail.d.ts.map