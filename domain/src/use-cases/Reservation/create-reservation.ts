import {
  CreateReservationDTO,
  Reservation,
} from "domain/src/entities/Reservation.js";
import { UserRole } from "domain/src/entities/User.js";
import { RoleService } from "domain/src/services/role-service.js";
import { ReservationRepository } from "domain/src/repositories/reservation-repository.js";
import {
  createInvalidDataError,
  createReservationAlreadyExistsError,
  createUnauthorizedError,
} from "domain/src/errors/error.js";

export interface CreateReservationDependencies {
  reservationRepository: ReservationRepository;
}

export interface CreateReservationWithUserRequest extends CreateReservationDTO {
  userRole: UserRole;
}

export async function createReservation(
  deps: CreateReservationDependencies,
  dto: CreateReservationDTO,
): Promise<Reservation> {
  const { reservationRepository } = deps;

  if (!dto.bookCopyId || !dto.borrowerId) {
    throw createInvalidDataError("Missing bookCopyId or borrowerId");
  }

  // verificar si ya existe una reserva activa para esta copia de libro
  const existingReservations = await reservationRepository.findByBookCopyId(
    dto.bookCopyId,
  );
  const activeReservation = existingReservations.find(
    (r) => r.status === "PENDING" || r.status === "FULFILLED",
  );

  if (activeReservation) {
    throw createReservationAlreadyExistsError(dto.bookCopyId);
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

/**
 * Create reservation with role validation
 */
export async function createReservationWithRoleValidation(
  deps: CreateReservationDependencies,
  request: CreateReservationWithUserRequest,
): Promise<Reservation> {
  // Validate user role first
  if (!RoleService.canCreateReservations(request.userRole)) {
    throw createUnauthorizedError(
      "User role not authorized to create reservations",
    );
  }

  // If authorized, proceed with normal reservation creation
  return createReservation(deps, request);
}
