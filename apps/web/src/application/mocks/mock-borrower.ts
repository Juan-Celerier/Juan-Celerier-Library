import type { Borrower, BorrowerRole } from "app-domain/entities/Borrower";

export const mockBorrowers: Borrower[] = [
  {
    id: "1",
    name: "Juan",
    surname: "Pérez",
    email: "juan.perez@ejemplo.com",
    passwordHash: "hashed_password_1", // Placeholder; no uses en prod
    image: "https://example.com/images/juan-perez.jpg",
    token: "jwt_token_1",
    validated: true,
    locked: false,
    role: "STUDENT" as BorrowerRole, // Directamente como string, con assertion para el tipo
    createdAt: new Date("2023-03-01"),
  },
  {
    id: "2",
    name: "María",
    surname: "García",
    email: "maria.garcia@ejemplo.com",
    passwordHash: "hashed_password_2",
    validated: true,
    locked: false,
    role: "TEACHER" as BorrowerRole,
    createdAt: new Date("2023-03-02"),
  },
  {
    id: "3",
    name: "Carlos",
    surname: "López",
    email: "carlos.lopez@ejemplo.com",
    passwordHash: "hashed_password_3",
    image: "https://example.com/images/carlos-lopez.jpg",
    token: "jwt_token_3",
    validated: false,
    locked: true, // Ejemplo de bloqueado
    role: "STUDENT" as BorrowerRole,
    createdAt: new Date("2023-03-03"),
  },
  {
    id: "4",
    name: "Ana",
    surname: "Martínez",
    email: "ana.martinez@ejemplo.com",
    passwordHash: "hashed_password_4",
    validated: true,
    locked: false,
    role: "TEACHER" as BorrowerRole,
    createdAt: new Date("2023-03-04"),
  },
  {
    id: "5",
    name: "Luis",
    surname: "Rodríguez",
    email: "luis.rodriguez@ejemplo.com",
    passwordHash: "hashed_password_5",
    validated: true,
    locked: false,
    role: "STUDENT" as BorrowerRole,
    createdAt: new Date(),
  },
];
