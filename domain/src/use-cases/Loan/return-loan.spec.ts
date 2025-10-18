import { Loan } from "domain/src/entities/Loan.js";
import {
  createLoanNotFoundError,
  createLoanAlreadyReturnedError,
  createInvalidDataError,
} from "domain/src/errors/error.js";
import { LoanRepository } from "domain/src/repositories/loan-repository.js";
import { describe, beforeEach, test, expect } from "vitest";
import { ReturnLoanDependencies, returnLoan } from "./return-loan.js";

// Helper para mocks de repositorio
const createLoanRepositoryMock = (loan?: Loan): LoanRepository =>
  ({
    findById: async () => loan ?? null,
    returnBook: async (id: string) => ({ ...loan }),
  } as unknown as LoanRepository);

describe("returnLoan", () => {
  let dependencies: ReturnLoanDependencies;

  beforeEach(() => {
    dependencies = { loanRepository: createLoanRepositoryMock() };
  });

  test("debe retornar un préstamo activo correctamente", async () => {
    const activeLoan: Loan = {
      id: "loan-123",
      bookId: "book-456",
      borrowerId: "user-789",
      loanDate: new Date("2025-01-01"),
      dueDate: new Date("2025-01-10"),
      status: "active",
      createdAt: new Date("2025-01-01"),
    };
    dependencies.loanRepository = createLoanRepositoryMock(activeLoan);

    const result = await returnLoan({ id: "loan-123" }, dependencies);

    expect(result.status).toBe("returned");
    expect(result.returnDate).toBeInstanceOf(Date);
  });

  test("debe lanzar LoanNotFoundError si no existe el préstamo", async () => {
    dependencies.loanRepository = createLoanRepositoryMock();

    await expect(
      returnLoan({ id: "unknown-loan" }, dependencies)
    ).rejects.toEqual(createLoanNotFoundError("unknown-loan"));
  });

  test("debe lanzar LoanAlreadyReturnedError si el préstamo ya fue devuelto", async () => {
    const returnedLoan: Loan = {
      id: "loan-123",
      bookId: "book-456",
      borrowerId: "user-789",
      loanDate: new Date(),
      dueDate: new Date(),
      returnDate: new Date(),
      status: "returned",
      createdAt: new Date(),
    };
    dependencies.loanRepository = createLoanRepositoryMock(returnedLoan);

    await expect(returnLoan({ id: "loan-123" }, dependencies)).rejects.toEqual(
      createLoanAlreadyReturnedError("loan-123")
    );
  });

  test("debe lanzar InvalidDataError si el ID está vacío", async () => {
    await expect(returnLoan({ id: "" }, dependencies)).rejects.toEqual(
      createInvalidDataError("Loan ID is required")
    );
  });
});
