import { CreateReservationDTO } from "domain/src/entities/Reservation.js";
import { createReservationRepositoryMock } from "domain/src/mocks/mockRepository/reservation-mock-repository.js";
import { describe, test, expect } from "vitest";
import { createReservation } from "./create-reservation.js";
import {
  createInvalidDataError,
  createReservationAlreadyExistsError,
} from "domain/src/errors/error.js";
import { createReservationMock } from "domain/src/mocks/reservationMocks.js";

describe("createReservation", () => {
  test("crea una reserva con estado PENDING si no se pasa", async () => {
    const repo = createReservationRepositoryMock();
    const reservationDTO: CreateReservationDTO = {
      bookCopyId: "book-copy-123",
      borrowerId: "user-456",
      reservationDate: new Date("2025-01-01"),
      expirationDate: new Date("2025-01-08"),
      status: "PENDING",
    };

    const reservation = await createReservation(
      { reservationRepository: repo },
      reservationDTO,
    );

    expect(reservation).toBeDefined();
    expect(reservation.id).toContain("reservation-");
    expect(reservation.status).toBe("PENDING");
    expect(repo.reservations.length).toBe(1);
  });

  test("usa valores propios del DTO si se proveen", async () => {
    const repo = createReservationRepositoryMock();
    const reservationDTO: CreateReservationDTO = {
      bookCopyId: "book-copy-999",
      borrowerId: "user-999",
      reservationDate: new Date("2025-02-01"),
      expirationDate: new Date("2025-02-10"),
      status: "FULFILLED",
    };

    const reservation = await createReservation(
      { reservationRepository: repo },
      reservationDTO,
    );

    expect(reservation.reservationDate.toISOString()).toBe(
      reservationDTO.reservationDate.toISOString(),
    );
    expect(reservation.expirationDate.toISOString()).toBe(
      reservationDTO.expirationDate.toISOString(),
    );
    expect(reservation.status).toBe("FULFILLED");
  });

  test("asigna reservationDate automáticamente si no se pasa", async () => {
    const repo = createReservationRepositoryMock();
    const reservationDTO = {
      bookCopyId: "book-copy-auto-date",
      borrowerId: "user-auto",
      expirationDate: new Date("2025-03-01"),
      status: "PENDING",
    } as CreateReservationDTO;

    const reservation = await createReservation(
      { reservationRepository: repo },
      reservationDTO,
    );

    expect(reservation.reservationDate).toBeInstanceOf(Date);
  });

  test("asigna expirationDate automáticamente (+7 días) si no se pasa", async () => {
    const repo = createReservationRepositoryMock();
    const reservationDTO = {
      bookCopyId: "book-copy-auto-exp",
      borrowerId: "user-auto-exp",
      reservationDate: new Date("2025-04-01"),
      status: "PENDING",
    } as CreateReservationDTO;

    const reservation = await createReservation(
      { reservationRepository: repo },
      reservationDTO,
    );

    const diff =
      (reservation.expirationDate.getTime() -
        reservation.reservationDate.getTime()) /
      (1000 * 60 * 60 * 24);

    expect(Math.round(diff)).toBe(7);
  });

  test("asigna status=PENDING si no se pasa", async () => {
    const repo = createReservationRepositoryMock();
    const reservationDTO = {
      bookCopyId: "book-copy-auto-status",
      borrowerId: "user-auto-status",
      reservationDate: new Date("2025-05-01"),
      expirationDate: new Date("2025-05-08"),
    } as CreateReservationDTO;

    const reservation = await createReservation(
      { reservationRepository: repo },
      reservationDTO,
    );

    expect(reservation.status).toBe("PENDING");
  });

  test("lanza InvalidDataError si faltan campos obligatorios", async () => {
    const repo = createReservationRepositoryMock();

    await expect(
      createReservation(
        { reservationRepository: repo },
        {} as CreateReservationDTO,
      ),
    ).rejects.toEqual(
      createInvalidDataError("Missing bookCopyId or borrowerId"),
    );
  });

  test("lanza ReservationAlreadyExistsError si ya existe una reserva activa para el libro", async () => {
    const reservation = createReservationMock({
      bookCopyId: "book-copy-dup",
      borrowerId: "user-1",
      status: "PENDING",
    });
    const repo = createReservationRepositoryMock([reservation]);

    const dto: CreateReservationDTO = {
      bookCopyId: "book-copy-dup",
      borrowerId: "user-2",
      reservationDate: new Date(),
      expirationDate: new Date(),
      status: "PENDING",
    };

    await expect(
      createReservation({ reservationRepository: repo }, dto),
    ).rejects.toEqual(createReservationAlreadyExistsError("book-copy-dup"));
  });
});
