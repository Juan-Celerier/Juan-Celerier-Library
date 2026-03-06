import { Reservation } from "domain/src/entities/Reservation.js";
import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";
import { BookCopyRepository } from "domain/src/repositories/book-copy-repository.js";
interface GetReservationsForBookDeps {
    reservationRepository: ReservationRepository;
    bookCopyRepository: BookCopyRepository;
}
export declare function getReservationsForBook(deps: GetReservationsForBookDeps, bookId: string): Promise<Reservation[]>;
export {};
//# sourceMappingURL=get-reservations-for-book.d.ts.map