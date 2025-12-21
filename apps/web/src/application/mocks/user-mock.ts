import type { User, UserRole } from "app-domain/entities/User";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Juan",
    surname: "Pérez",
    email: "juan.perez@ejemplo.com",
    passwordHash: "hashed_password_user_1", // Placeholder; no uses en prod
    image: "https://example.com/images/juan-perez.jpg",
    token: "jwt_token_user_1",
    validated: true,
    locked: false,
    role: "BORROWER" as UserRole, // Prestatario
    createdAt: new Date("2023-03-01"),
  },
  {
    id: "2",
    name: "María",
    surname: "García",
    email: "maria.garcia@ejemplo.com",
    passwordHash: "hashed_password_user_2",
    validated: true,
    locked: false,
    role: "LIBRARIAN" as UserRole, // Bibliotecario
    createdAt: new Date("2023-03-02"),
  },
  {
    id: "3",
    name: "Carlos",
    surname: "López",
    email: "carlos.lopez@ejemplo.com",
    passwordHash: "hashed_password_user_3",
    image: "https://example.com/images/carlos-lopez.jpg",
    token: "jwt_token_user_3",
    validated: false,
    locked: true, // Ejemplo de bloqueado
    role: "BORROWER" as UserRole,
    createdAt: new Date("2023-03-03"),
  },
  {
    id: "4",
    name: "Ana",
    surname: "Martínez",
    email: "ana.martinez@ejemplo.com",
    passwordHash: "hashed_password_user_4",
    validated: true,
    locked: false,
    role: "LIBRARIAN" as UserRole,
    createdAt: new Date("2023-03-04"),
  },
  {
    id: "5",
    name: "Luis",
    surname: "Rodríguez",
    email: "luis.rodriguez@ejemplo.com",
    passwordHash: "hashed_password_user_5",
    validated: true,
    locked: false,
    role: "BORROWER" as UserRole,
    createdAt: new Date("2023-03-05"),
  },
];

export default mockUsers;
