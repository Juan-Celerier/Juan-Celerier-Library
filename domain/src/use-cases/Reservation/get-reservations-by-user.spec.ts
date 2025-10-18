import { createReservationRepositoryMock } from "domain/src/mocks/mockRepository/reservation-mock-repository.js";
import { createReservationMock } from "domain/src/mocks/reservationMocks.js";
import { describe, test, expect } from "vitest";
import { getReservationsByUser } from "./get-reservations-by-user.js";

describe("getReservationsByUser", () => {
  test("devuelve todas las reservas de un usuario", async () => {
    const userId = "user-123";
    const reservations = [
      createReservationMock({ borrowerId: userId, id: "r1" }),
      createReservationMock({ borrowerId: userId, id: "r2" }),
      createReservationMock({ borrowerId: "other-user", id: "r3" }),
    ];
    const repo = createReservationRepositoryMock(reservations);

    const result = await getReservationsByUser(
      { reservationRepository: repo },
      userId
    );

    expect(result).toHaveLength(2);
    expect(result.every((r) => r.borrowerId === userId)).toBe(true);
  });

  test("devuelve array vacío si el usuario no tiene reservas", async () => {
    const repo = createReservationRepositoryMock([
      createReservationMock({ borrowerId: "other-user", id: "r1" }),
    ]);

    const result = await getReservationsByUser(
      { reservationRepository: repo },
      "no-reservations-user"
    );

    expect(result).toEqual([]);
  });
});
