import { createInvalidDataError, createReservationAlreadyExistsError, } from "domain/src/errors/error.js";
export async function createReservation(deps, dto) {
    const { reservationRepository } = deps;
    if (!dto.bookId || !dto.borrowerId) {
        throw createInvalidDataError("Missing bookId or borrowerId");
    }
    // verificar si ya existe una reserva activa para este libro
    const existingReservations = await reservationRepository.findByBookId(dto.bookId);
    const activeReservation = existingReservations.find((r) => r.status === "PENDING" || r.status === "FULFILLED");
    if (activeReservation) {
        throw createReservationAlreadyExistsError(dto.bookId);
    }
    const reservationDate = dto.reservationDate ?? new Date();
    const reservation = {
        ...dto,
        reservationDate,
        expirationDate: dto.expirationDate ??
            new Date(reservationDate.getTime() + 7 * 24 * 60 * 60 * 1000),
        status: dto.status ?? "PENDING",
    };
    return reservationRepository.create(reservation);
}
