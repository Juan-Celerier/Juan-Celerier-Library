import {
  Reservation,
  CreateReservationDTO,
} from "domain/src/entities/Reservation.js";

export interface ReservationRepository {
  findAll(): Promise<Reservation[]>;
  findById(reservationId: string): Promise<Reservation | null>;
  findByBookCopyId(bookCopyId: string): Promise<Reservation[]>;
  findByBorrowerId(borrowerId: string): Promise<Reservation[]>;
  create(reservation: Omit<Reservation, "id">): Promise<Reservation>;
  update(
    id: string,
    reservation: Partial<CreateReservationDTO>
  ): Promise<Reservation>;
  delete(reservationId: string): Promise<void>;
  cancelReservation(id: string): Promise<Reservation>;
}

export interface MockedReservationRepository extends ReservationRepository {
  reservations: Reservation[];
}

export function createReservationRepositoryMock(
  reservations: Reservation[] = []
): MockedReservationRepository {
  return {
    reservations,

    async findAll() {
      return this.reservations;
    },

    async findById(reservationId: string) {
      return this.reservations.find((r) => r.id === reservationId) || null;
    },

    async findByBookCopyId(bookCopyId: string) {
      return this.reservations.filter((r) => r.bookCopyId === bookCopyId);
    },

    async findByBorrowerId(borrowerId: string) {
      return this.reservations.filter((r) => r.borrowerId === borrowerId);
    },

    async create(reservation: Omit<Reservation, "id">) {
      const newReservation: Reservation = {
        id: `reservation-${Date.now()}`,
        ...reservation,
      };
      this.reservations.push(newReservation);
      return newReservation;
    },

    async update(id: string, updateData: Partial<CreateReservationDTO>) {
      const index = this.reservations.findIndex((r) => r.id === id);
      if (index === -1) {
        throw new Error("Reservation not found");
      }

      this.reservations[index] = {
        ...this.reservations[index],
        ...updateData,
      };

      return this.reservations[index];
    },

    async delete(reservationId: string) {
      this.reservations = this.reservations.filter(
        (r) => r.id !== reservationId
      );
    },

    async cancelReservation(id: string) {
      const reservation = await this.findById(id);
      if (!reservation) {
        throw new Error("Reservation not found");
      }

      reservation.status = "CANCELLED";
      return reservation;
    },
  };
}
