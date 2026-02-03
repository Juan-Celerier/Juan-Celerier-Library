import type { Loan } from "app-domain/entities/Loan";

export const mockLoans: Loan[] = [
  {
    id: "1",
    bookId: "1", // Referencia a mockBooks (Cien Años de Soledad)
    borrowerId: "1", // Referencia a mockBorrowers (Juan Pérez)
    loanDate: new Date("2023-04-01"),
    dueDate: new Date("2023-04-15"),
    returnDate: new Date("2023-04-10"), // Devuelto antes
    status: "returned",
    fineAmount: 0,
    bookCopyId: "copy-001", // Ejemplar específico
    createdAt: new Date("2023-04-01"),
  },
  {
    id: "2",
    bookId: "2", // La Casa de los Espíritus
    borrowerId: "2", // María García
    loanDate: new Date("2023-04-05"),
    dueDate: new Date("2023-04-20"),
    bookCopyId: "copy-002", // Ejemplar específico
    status: "active", // Aún activo
    createdAt: new Date("2023-04-05"),
  },
  {
    id: "3",
    bookId: "3", // Ficciones
    borrowerId: "3", // Carlos López
    loanDate: new Date("2023-03-10"),
    bookCopyId: "copy-003", // Ejemplar específico
    dueDate: new Date("2023-03-25"),
    returnDate: undefined,
    status: "overdue", // Vencido
    fineAmount: 5.5,
    createdAt: new Date("2023-03-10"),
  },
  {
    id: "4",
    bookId: "4", // La Ciudad y los Perros
    borrowerId: "4", // Ana Martínez
    loanDate: new Date("2023-04-08"),
    dueDate: new Date("2023-04-23"),
    returnDate: new Date("2023-04-22"),
    bookCopyId: "copy-004", // Ejemplar específico
    status: "returned",
    createdAt: new Date("2023-04-08"),
  },
  {
    id: "5",
    bookId: "5", // El Código Da Vinci
    borrowerId: "5", // Luis Rodríguez
    loanDate: new Date("2023-04-12"),
    bookCopyId: "copy-005", // Ejemplar específico
    dueDate: new Date("2023-04-27"),
    status: "active",
    createdAt: new Date("2023-04-12"),
  },
  {
    id: "6",
    bookId: "6", // Sapiens
    borrowerId: "1", // Juan Pérez (múltiples préstamos)
    loanDate: new Date("2023-04-15"),
    dueDate: new Date("2023-04-30"),
    returnDate: undefined,
    bookCopyId: "copy-006", // Ejemplar específico
    status: "active",
    fineAmount: undefined,
    createdAt: new Date("2023-04-15"),
  },
];

export default mockLoans;
