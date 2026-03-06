import { describe, test, expect } from "vitest";
import { createReservationRepositoryMock } from "domain/src/mocks/mockRepository/reservation-mock-repository.js";
import { createReservationMock } from "domain/src/mocks/reservationMocks.js";
import { updateReservation } from "./update-reservation.js";
import { createReservationNotFoundError } from "domain/src/errors/error.js";

describe("updateReservation", () => {
  test("actualiza los campos de una reserva existente", async () => {
    const original = createReservationMock({ status: "PENDING" });
    const repo = createReservationRepositoryMock([original]);

    const result = await updateReservation(
      { reservationRepository: repo },
      original.id,
      { status: "FULFILLED" },
    );

    expect(result.status).toBe("FULFILLED");

    const updated = await repo.findById(original.id);
    expect(updated?.status).toBe("FULFILLED");
  });

  test("lanza AppError si la reserva no existe", async () => {
    const repo = createReservationRepositoryMock();

    await expect(
      updateReservation({ reservationRepository: repo }, "non-existent-id", {
        status: "CANCELLED",
      }),
    ).rejects.toEqual(createReservationNotFoundError("non-existent-id"));
  });
});
