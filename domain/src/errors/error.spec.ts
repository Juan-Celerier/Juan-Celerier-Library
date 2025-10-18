import { describe, test, expect } from "vitest";
import {
  AppError,
  // genéricos
  createInvalidDataError,
  createNotFoundError,
  createBadRequestError,
  createUnauthorizedError,
  createForbiddenError,
  createConflictError,
  createInternalServerError,
  createEmailSendingError,
  // book
  createBookNotFoundError,
  createBookAlreadyExistsError,
  createInvalidBookDataError,
  // author
  createAuthorNotFoundError,
  createAuthorAlreadyExistsError,
  // category
  CategoryNotFoundError,
  CategoryAlreadyExistsError,
  // publisher
  createPublisherNotFoundError,
  createPublisherAlreadyExistsError,
  // borrower
  BorrowerNotFoundError,
  createBorrowerAccountLockedError,
  // loan
  createLoanNotFoundError,
  createLoanAlreadyReturnedError,
  createLoanLimitExceededError,
  // reservation
  createReservationNotFoundError,
  createReservationAlreadyExistsError,
  createReservationExpiredError,
  // user
  createUserNotFoundError,
  createEmailAlreadyExistsError,
  createInvalidCredentialsError,
  createUserLockedError,
} from "./error.js";

function expectError(
  error: AppError,
  expectedName: string,
  expectedStatus: number,
  expectedMessage: string
) {
  expect(error.name).toBe(expectedName);
  expect(error.httpStatus).toBe(expectedStatus);
  expect(error.message).toBe(expectedMessage);
}

describe("Error factories", () => {
  // --- Genéricos ---
  test("createInternalServerError default", () => {
    const error = createInternalServerError();
    expectError(
      error,
      "InternalServerError",
      500,
      "An unexpected internal server error occurred"
    );
  });

  test("createInternalServerError custom", () => {
    const msg = "Something went wrong!";
    const error = createInternalServerError(msg);
    expectError(error, "InternalServerError", 500, msg);
  });

  test("createUnauthorizedError custom", () => {
    const msg = "Custom unauthorized!";
    const error = createUnauthorizedError(msg);
    expectError(error, "UnauthorizedError", 401, msg);
  });

  test("createNotFoundError default", () => {
    const error = createNotFoundError();
    expectError(error, "NotFoundError", 404, "Resource not found");
  });

  test("createBadRequestError default", () => {
    const error = createBadRequestError();
    expectError(error, "BadRequestError", 400, "Bad request");
  });

  test("createConflictError default", () => {
    const error = createConflictError();
    expectError(error, "ConflictError", 409, "Resource already exists");
  });

  test("createInvalidDataError default", () => {
    const error = createInvalidDataError();
    expectError(error, "InvalidDataError", 400, "Invalid data provided");
  });

  test("createForbiddenError default", () => {
    const error = createForbiddenError();
    expectError(error, "ForbiddenError", 403, "Access forbidden");
  });

  test("createEmailSendingError default", () => {
    const error = createEmailSendingError();
    expectError(error, "EmailSendingError", 500, "Email sending failed");
  });

  // --- Book ---
  test("createBookNotFoundError", () => {
    const error = createBookNotFoundError("123");
    expectError(error, "BookNotFoundError", 404, "Book with id 123 not found");
  });

  test("createBookAlreadyExistsError", () => {
    const error = createBookAlreadyExistsError("978-1234567890");
    expectError(
      error,
      "BookAlreadyExistsError",
      409,
      "Book with ISBN 978-1234567890 already exists"
    );
  });

  test("createInvalidBookDataError", () => {
    const error = createInvalidBookDataError();
    expectError(error, "InvalidBookDataError", 400, "Invalid data for book");
  });

  // --- Author ---
  test("createAuthorNotFoundError", () => {
    const error = createAuthorNotFoundError("42");
    expectError(
      error,
      "AuthorNotFoundError",
      404,
      "Author with id 42 not found"
    );
  });

  test("createAuthorAlreadyExistsError", () => {
    const error = createAuthorAlreadyExistsError("J.K. Rowling");
    expectError(
      error,
      "AuthorAlreadyExistsError",
      409,
      "Author J.K. Rowling already exists"
    );
  });

  // --- Category ---
  test("CategoryNotFoundError", () => {
    const error = CategoryNotFoundError("10");
    expectError(
      error,
      "CategoryNotFoundError",
      404,
      "Category with id 10 not found"
    );
  });

  test("CategoryAlreadyExistsError", () => {
    const error = CategoryAlreadyExistsError("Fantasy");
    expectError(
      error,
      "CategoryAlreadyExistsError",
      409,
      "Category Fantasy already exists"
    );
  });

  // --- Publisher ---
  test("createPublisherNotFoundError", () => {
    const error = createPublisherNotFoundError("7");
    expectError(
      error,
      "PublisherNotFoundError",
      404,
      "Publisher with id 7 not found"
    );
  });

  test("createPublisherAlreadyExistsError", () => {
    const error = createPublisherAlreadyExistsError("Penguin");
    expectError(
      error,
      "PublisherAlreadyExistsError",
      409,
      "Publisher Penguin already exists"
    );
  });

  // --- Borrower ---
  test("BorrowerNotFoundError", () => {
    const error = BorrowerNotFoundError("55");
    expectError(
      error,
      "BorrowerNotFoundError",
      404,
      "Borrower with id 55 not found"
    );
  });

  test("createBorrowerAccountLockedError", () => {
    const error = createBorrowerAccountLockedError("55");
    expectError(
      error,
      "BorrowerAccountLockedError",
      403,
      "Borrower with id 55 account is locked"
    );
  });

  // --- Loan ---
  test("createLoanNotFoundError", () => {
    const error = createLoanNotFoundError("99");
    expectError(error, "LoanNotFoundError", 404, "Loan with id 99 not found");
  });

  test("createLoanAlreadyReturnedError", () => {
    const error = createLoanAlreadyReturnedError("99");
    expectError(
      error,
      "LoanAlreadyReturnedError",
      409,
      "Loan with id 99 is already returned"
    );
  });

  test("createLoanLimitExceededError", () => {
    const error = createLoanLimitExceededError(3);
    expectError(
      error,
      "LoanLimitExceededError",
      403,
      "Borrower exceeded loan limit of 3"
    );
  });

  // --- Reservation ---
  test("createReservationNotFoundError", () => {
    const error = createReservationNotFoundError("888");
    expectError(
      error,
      "ReservationNotFoundError",
      404,
      "Reservation with id 888 not found"
    );
  });

  test("createReservationAlreadyExistsError", () => {
    const error = createReservationAlreadyExistsError("123");
    expectError(
      error,
      "ReservationAlreadyExistsError",
      409,
      "Reservation for book 123 already exists"
    );
  });

  test("createReservationExpiredError", () => {
    const error = createReservationExpiredError("999");
    expectError(
      error,
      "ReservationExpiredError",
      409,
      "Reservation with id 999 has expired"
    );
  });

  // --- User ---
  test("createUserNotFoundError", () => {
    const error = createUserNotFoundError("1");
    expectError(error, "UserNotFoundError", 404, "User with id 1 not found");
  });

  test("createEmailAlreadyExistsError", () => {
    const error = createEmailAlreadyExistsError("test@example.com");
    expectError(
      error,
      "EmailAlreadyExistsError",
      409,
      "User with email test@example.com already exists"
    );
  });

  test("createInvalidCredentialsError", () => {
    const error = createInvalidCredentialsError();
    expectError(error, "InvalidCredentialsError", 401, "Invalid credentials");
  });

  test("createUserLockedError", () => {
    const error = createUserLockedError("2");
    expectError(error, "UserLockedError", 403, "User with id 2 is locked");
  });
});
