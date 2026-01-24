import { createReservationNotFoundError } from "domain/src/errors/error.js";
import { createReservationRepositoryMock } from "domain/src/mocks/mockRepository/reservation-mock-repository.js";
import { createReservationMock } from "domain/src/mocks/reservationMocks.js";
import { describe, test, expect } from "vitest";
import { cancelReservation } from "./cancel-reservation.js";
describe("cancelReservation", () => {
    test("cancela una reserva activa", async () => {
        const reservation = createReservationMock({ status: "PENDING" });
        const repo = createReservationRepositoryMock([reservation]);
        const cancelled = await cancelReservation({ reservationRepository: repo }, reservation.id);
        expect(cancelled.status).toBe("CANCELLED");
        expect(repo.reservations[0].status).toBe("CANCELLED");
    });
    test("lanza ReservationNotFoundError si la reserva no existe", async () => {
        const repo = createReservationRepositoryMock();
        const reservationId = "nonexistent-id";
        await expect(cancelReservation({ reservationRepository: repo }, reservationId)).rejects.toEqual(createReservationNotFoundError(reservationId));
    });
    test("si ya está cancelada la devuelve sin modificar", async () => {
        const reservation = createReservationMock({ status: "CANCELLED" });
        const repo = createReservationRepositoryMock([reservation]);
        const result = await cancelReservation({ reservationRepository: repo }, reservation.id);
        expect(result.status).toBe("CANCELLED");
        expect(repo.reservations[0].status).toBe("CANCELLED");
    });
});
