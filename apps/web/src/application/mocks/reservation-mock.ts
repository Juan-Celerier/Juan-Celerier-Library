import type {
  Reservation,
  ReservationStatus,
} from "app-domain/entities/Reservation";

export const mockReservations: Reservation[] = [
  {
    id: "1",
    bookId: "1", // Referencia a mockBooks (Cien Años de Soledad)
    borrowerId: "1", // Referencia a mockUsers con role "BORROWER" (Juan Pérez)
    reservationDate: new Date("2023-05-01"),
    expirationDate: new Date("2023-05-08"), // +7 días
    status: "PENDING" as ReservationStatus,
    createdAt: new Date("2023-05-01"),
  },
  {
    id: "2",
    bookId: "2", // La Casa de los Espíritus
    borrowerId: "5", // Luis Rodríguez (BORROWER)
    reservationDate: new Date("2023-05-03"),
    expirationDate: new Date("2023-05-17"), // +14 días
    status: "FULFILLED" as ReservationStatus, // Cumplida (e.g., convertida en préstamo)
    createdAt: new Date("2023-05-03"),
  },
  {
    id: "3",
    bookId: "3", // Ficciones
    borrowerId: "3", // Carlos López (BORROWER, pero locked/validated false para simular edge case)
    reservationDate: new Date("2023-04-20"),
    expirationDate: new Date("2023-04-27"),
    status: "EXPIRED" as ReservationStatus, // Expirada
    createdAt: new Date("2023-04-20"),
  },
  {
    id: "4",
    bookId: "4", // La Ciudad y los Perros
    borrowerId: "1", // Juan Pérez (múltiples reservas)
    reservationDate: new Date("2023-05-05"),
    expirationDate: new Date("2023-05-12"),
    status: "CANCELLED" as ReservationStatus, // Cancelada
    createdAt: new Date("2023-05-05"),
  },
  {
    id: "5",
    bookId: "5", // El Código Da Vinci
    borrowerId: "5", // Luis Rodríguez
    reservationDate: new Date("2023-05-07"),
    expirationDate: new Date("2023-05-14"),
    status: "PENDING" as ReservationStatus,
    createdAt: new Date("2023-05-07"),
  },
  {
    id: "6",
    bookId: "6", // Sapiens
    borrowerId: "1", // Juan Pérez
    reservationDate: new Date("2023-05-10"),
    expirationDate: new Date("2023-05-24"),
    status: "FULFILLED" as ReservationStatus,
    createdAt: new Date("2023-05-10"),
  },
];
