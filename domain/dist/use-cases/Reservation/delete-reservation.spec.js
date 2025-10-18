import { describe, test, expect } from "vitest";
import { createReservationRepositoryMock } from "domain/src/mocks/mockRepository/reservation-mock-repository.js";
import { deleteReservation } from "./delete-reservation.js";
import { createReservationMock } from "domain/src/mocks/reservationMocks.js";
import { createReservationNotFoundError } from "domain/src/errors/error.js";
describe("deleteReservation", () => {
    test("elimina una reserva existente", async () => {
        const reservation = createReservationMock({ id: "reservation-1" });
        const repo = createReservationRepositoryMock([reservation]);
        await deleteReservation({ reservationRepository: repo }, reservation.id);
        const result = await repo.findById(reservation.id);
        expect(result).toBeNull();
        expect(repo.reservations.length).toBe(0);
    });
    test("lanza ReservationNotFoundError si la reserva no existe", async () => {
        const repo = createReservationRepositoryMock();
        await expect(deleteReservation({ reservationRepository: repo }, "not-found-id")).rejects.toEqual(createReservationNotFoundError("not-found-id"));
    });
});
