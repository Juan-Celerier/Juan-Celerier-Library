import { describe, test, expect } from "vitest";
import {
  Reservation,
  ReservationStatus,
  CreateReservationDTO,
} from "./Reservation.js";

describe("Reservation Entity", () => {
  test("Reservation should have all required fields", () => {
    const reservation: Reservation = {
      id: "reservation-1",
      bookId: "book-1",
      borrowerId: "borrower-1",
      reservationDate: new Date(),
      expirationDate: new Date(),
      status: "PENDING",
      createdAt: new Date(),
    };

    expect(reservation).toHaveProperty("id");
    expect(reservation).toHaveProperty("bookId");
    expect(reservation).toHaveProperty("borrowerId");
    expect(reservation).toHaveProperty("reservationDate");
    expect(reservation).toHaveProperty("expirationDate");
    expect(reservation).toHaveProperty("status");
    expect(reservation).toHaveProperty("createdAt");
  });

  test("CreateReservationDTO should exclude id and createdAt", () => {
    const reservationData: CreateReservationDTO = {
      bookId: "book-1",
      borrowerId: "borrower-1",
      reservationDate: new Date(),
      expirationDate: new Date(),
      status: "PENDING",
    };

    expect(reservationData).not.toHaveProperty("id");
    expect(reservationData).not.toHaveProperty("createdAt");
  });

  test("ReservationStatus should be one of the valid values", () => {
    const validStatuses: ReservationStatus[] = [
      "PENDING",
      "EXPIRED",
      "CANCELLED",
      "FULFILLED",
    ];

    validStatuses.forEach((status) => {
      const reservation: Reservation = {
        id: "reservation-1",
        bookId: "book-1",
        borrowerId: "borrower-1",
        reservationDate: new Date(),
        expirationDate: new Date(),
        status: status,
        createdAt: new Date(),
      };

      expect(reservation.status).toBe(status);
    });
  });
});
