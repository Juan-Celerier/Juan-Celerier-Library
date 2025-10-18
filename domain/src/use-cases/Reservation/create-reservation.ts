import {
  CreateReservationDTO,
  Reservation,
} from "domain/src/entities/Reservation.js";
import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";
import {
  createInvalidDataError,
  createReservationAlreadyExistsError,
} from "domain/src/errors/error.js";

export interface CreateReservationDependencies {
  reservationRepository: ReservationRepository;
}

export async function createReservation(
  deps: CreateReservationDependencies,
  dto: CreateReservationDTO
): Promise<Reservation> {
  const { reservationRepository } = deps;

  if (!dto.bookId || !dto.borrowerId) {
    throw createInvalidDataError("Missing bookId or borrowerId");
  }

  // verificar si ya existe una reserva activa para este libro
  const existingReservations = await reservationRepository.findByBookId(
    dto.bookId
  );
  const activeReservation = existingReservations.find(
    (r) => r.status === "PENDING" || r.status === "FULFILLED"
  );

  if (activeReservation) {
    throw createReservationAlreadyExistsError(dto.bookId);
  }

  const reservationDate = dto.reservationDate ?? new Date();

  const reservation: CreateReservationDTO = {
    ...dto,
    reservationDate,
    expirationDate:
      dto.expirationDate ??
      new Date(reservationDate.getTime() + 7 * 24 * 60 * 60 * 1000),
    status: dto.status ?? "PENDING",
  };

  return reservationRepository.create(reservation);
}
