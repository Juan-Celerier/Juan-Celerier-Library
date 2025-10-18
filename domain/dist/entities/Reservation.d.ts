export interface Reservation {
    id: string;
    bookId: string;
    borrowerId: string;
    reservationDate: Date;
    expirationDate: Date;
    status: ReservationStatus;
    createdAt: Date;
}
export type ReservationStatus = "PENDING" | "EXPIRED" | "CANCELLED" | "FULFILLED";
export type CreateReservationDTO = Omit<Reservation, "id" | "createdAt">;
//# sourceMappingURL=Reservation.d.ts.map