import { createReservationRepositoryMock } from "domain/src/mocks/mockRepository/reservation-mock-repository.js";
import { createReservationMock } from "domain/src/mocks/reservationMocks.js";
import { describe, test, expect } from "vitest";
import { getReservationDetail } from "./get-reservation-detail.js";
describe("GetReservationDetail Use Case", () => {
    test("devuelve la reserva correcta por id", async () => {
        const reservation1 = createReservationMock({ id: "res-1" });
        const reservation2 = createReservationMock({ id: "res-2" });
        const repo = createReservationRepositoryMock([reservation1, reservation2]);
        const result = await getReservationDetail({ reservationRepository: repo }, "res-2");
        expect(result).toEqual(reservation2);
        expect(repo.reservations).toHaveLength(2);
    });
    test("lanza error si la reserva no existe", async () => {
        const repo = createReservationRepositoryMock();
        await expect(getReservationDetail({ reservationRepository: repo }, "non-existent-id")).rejects.toMatchObject({
            name: "ReservationNotFoundError",
            httpStatus: 404,
        });
        expect(repo.reservations).toHaveLength(0);
    });
});
