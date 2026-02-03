import { Reservation, CreateReservationDTO } from "../entities/Reservation.js";

export interface ReservationRepository {
  create(reservation: CreateReservationDTO): Promise<Reservation>;
  findById(id: string): Promise<Reservation | null>;
  findAll(): Promise<Reservation[]>;
  update(
    id: string,
    reservation: Partial<CreateReservationDTO>
  ): Promise<Reservation>;
  delete(id: string): Promise<void>;
  findByBookCopyId(bookCopyId: string): Promise<Reservation[]>;
  findByBorrowerId(borrowerId: string): Promise<Reservation[]>;
  cancelReservation(id: string): Promise<Reservation>;
}
