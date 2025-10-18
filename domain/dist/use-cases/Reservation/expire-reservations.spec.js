import { createReservationRepositoryMock } from "domain/src/mocks/mockRepository/reservation-mock-repository.js";
import { createReservationMock } from "domain/src/mocks/reservationMocks.js";
import { describe, test, expect } from "vitest";
import { expireReservations } from "./expire-reservations.js";
describe("expireReservations", () => {
    test("expira reservas PENDING con fecha pasada", async () => {
        const pastDate = new Date("2025-01-01");
        const repo = createReservationRepositoryMock([
            createReservationMock({
                id: "r1",
                status: "PENDING",
                expirationDate: pastDate,
            }),
            createReservationMock({
                id: "r2",
                status: "FULFILLED",
                expirationDate: pastDate,
            }),
        ]);
        const result = await expireReservations({ reservationRepository: repo });
        expect(result).toHaveLength(1);
        expect(result[0].id).toBe("r1");
        expect(result[0].status).toBe("EXPIRED");
        // Verificar que se actualizó en el repo
        const updated = await repo.findById("r1");
        expect(updated?.status).toBe("EXPIRED");
    });
    test("no expira reservas si aún no vencieron", async () => {
        const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24); // +1 día
        const repo = createReservationRepositoryMock([
            createReservationMock({
                id: "r3",
                status: "PENDING",
                expirationDate: futureDate,
            }),
        ]);
        const result = await expireReservations({ reservationRepository: repo });
        expect(result).toHaveLength(0);
        expect(repo.reservations[0].status).toBe("PENDING");
    });
    test("ignora reservas que no están en estado PENDING", async () => {
        const pastDate = new Date("2025-01-01");
        const repo = createReservationRepositoryMock([
            createReservationMock({
                id: "r4",
                status: "CANCELLED",
                expirationDate: pastDate,
            }),
        ]);
        const result = await expireReservations({ reservationRepository: repo });
        expect(result).toHaveLength(0);
        expect(repo.reservations[0].status).toBe("CANCELLED");
    });
});
