import type {
  Reservation,
  ReservationStatus,
} from "app-domain/entities/Reservation";

export const mockReservations: Reservation[] = [
  {
    id: "1",

    borrowerId: "1", // Referencia a mockUsers con role "BORROWER" (Juan Pérez)
    bookCopyId: "copy-001", // Ejemplo de ID de copia de libro
    reservationDate: new Date("2023-05-01"),
    expirationDate: new Date("2023-05-08"), // +7 días
    status: "PENDING" as ReservationStatus,
    createdAt: new Date("2023-05-01"),
  },
  {
    id: "2",

    borrowerId: "5", // Luis Rodríguez (BORROWER)
    bookCopyId: "copy-002",
    reservationDate: new Date("2023-05-03"),
    expirationDate: new Date("2023-05-17"), // +14 días
    status: "FULFILLED" as ReservationStatus, // Cumplida (e.g., convertida en préstamo)
    createdAt: new Date("2023-05-03"),
  },
  {
    id: "3",
    bookCopyId: "copy-003",
    borrowerId: "3", // Carlos López (BORROWER, pero locked/validated false para simular edge case)
    reservationDate: new Date("2023-04-20"),
    expirationDate: new Date("2023-04-27"),
    status: "EXPIRED" as ReservationStatus, // Expirada
    createdAt: new Date("2023-04-20"),
  },
  {
    id: "4",
    bookCopyId: "copy-004",
    borrowerId: "1", // Juan Pérez (múltiples reservas)
    reservationDate: new Date("2023-05-05"),
    expirationDate: new Date("2023-05-12"),
    status: "CANCELLED" as ReservationStatus, // Cancelada
    createdAt: new Date("2023-05-05"),
  },
  {
    id: "5",
    bookCopyId: "copy-005",
    borrowerId: "5", // Luis Rodríguez
    reservationDate: new Date("2023-05-07"),
    expirationDate: new Date("2023-05-14"),
    status: "PENDING" as ReservationStatus,
    createdAt: new Date("2023-05-07"),
  },
  {
    id: "6",
    bookCopyId: "copy-006",
    borrowerId: "1", // Juan Pérez
    reservationDate: new Date("2023-05-10"),
    expirationDate: new Date("2023-05-24"),
    status: "FULFILLED" as ReservationStatus,
    createdAt: new Date("2023-05-10"),
  },
];
