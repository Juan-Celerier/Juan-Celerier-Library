import { Reservation, CreateReservationDTO } from "domain/src/entities/Reservation.js";
export interface ReservationRepository {
    findAll(): Promise<Reservation[]>;
    findById(reservationId: string): Promise<Reservation | null>;
    findByBookCopyId(bookCopyId: string): Promise<Reservation[]>;
    findByBorrowerId(borrowerId: string): Promise<Reservation[]>;
    create(reservation: Omit<Reservation, "id">): Promise<Reservation>;
    update(id: string, reservation: Partial<CreateReservationDTO>): Promise<Reservation>;
    delete(reservationId: string): Promise<void>;
    cancelReservation(id: string): Promise<Reservation>;
}
export interface MockedReservationRepository extends ReservationRepository {
    reservations: Reservation[];
}
export declare function createReservationRepositoryMock(reservations?: Reservation[]): MockedReservationRepository;
