// src/errors/app-errors.ts

export interface AppError {
  name: string;
  message: string;
  httpStatus: number;
}

function createError(name: string, httpStatus: number, defaultMessage: string) {
  return (message: string = defaultMessage): AppError => ({
    name,
    message,
    httpStatus,
  });
}

// --- Errores genéricos ---
export const createInvalidDataError = createError(
  "InvalidDataError",
  400,
  "Invalid data provided",
);
export const createNotFoundError = createError(
  "NotFoundError",
  404,
  "Resource not found",
);
export const createBadRequestError = createError(
  "BadRequestError",
  400,
  "Bad request",
);
export const createUnauthorizedError = createError(
  "UnauthorizedError",
  401,
  "Unauthorized access",
);
export const createForbiddenError = createError(
  "ForbiddenError",
  403,
  "Access forbidden",
);
export const createConflictError = createError(
  "ConflictError",
  409,
  "Resource already exists",
);
export const createInternalServerError = createError(
  "InternalServerError",
  500,
  "An unexpected internal server error occurred",
);
export const createEmailSendingError = createError(
  "EmailSendingError",
  500,
  "Email sending failed",
);

// --- Book ---
export const createBookNotFoundError = (bookId: string): AppError =>
  createError("BookNotFoundError", 404, `Book with id ${bookId} not found`)();

export const createBookAlreadyExistsError = (isbn: string): AppError =>
  createError(
    "BookAlreadyExistsError",
    409,
    `Book with ISBN ${isbn} already exists`,
  )();

export const createInvalidBookDataError = (): AppError =>
  createError("InvalidBookDataError", 400, "Invalid data for book")();

// --- Author ---
export const createAuthorNotFoundError = (authorId: string): AppError =>
  createError(
    "AuthorNotFoundError",
    404,
    `Author with id ${authorId} not found`,
  )();

export const createAuthorAlreadyExistsError = (name: string): AppError =>
  createError(
    "AuthorAlreadyExistsError",
    409,
    `Author ${name} already exists`,
  )();

// --- Category ---
export const CategoryNotFoundError = (categoryId: string): AppError =>
  createError(
    "CategoryNotFoundError",
    404,
    `Category with id ${categoryId} not found`,
  )();

export const CategoryAlreadyExistsError = (name: string): AppError =>
  createError(
    "CategoryAlreadyExistsError",
    409,
    `Category ${name} already exists`,
  )();

// --- Publisher ---
export const createPublisherNotFoundError = (publisherId: string): AppError =>
  createError(
    "PublisherNotFoundError",
    404,
    `Publisher with id ${publisherId} not found`,
  )();

export const createPublisherAlreadyExistsError = (name: string): AppError =>
  createError(
    "PublisherAlreadyExistsError",
    409,
    `Publisher ${name} already exists`,
  )();

// --- Borrower ---
export const BorrowerNotFoundError = (borrowerId: string): AppError =>
  createError(
    "BorrowerNotFoundError",
    404,
    `Borrower with id ${borrowerId} not found`,
  )();

export const createInvalidBorrowerRoleError = (role: string) =>
  createError(
    "InvalidBorrowerRoleError",
    400,
    `Borrower role '${role}' is invalid`,
  )();

export const BorrowerAlreadyExistsError = (email: string): AppError =>
  createError(
    "BorrowerAlreadyExistsError",
    409,
    `Borrower with email ${email} already exists`,
  )();
export const createBorrowerAlreadyLockedError = (
  borrowerId: string,
): AppError =>
  createError(
    "BorrowerAlreadyLockedError",
    409,
    `Borrower with id ${borrowerId} is already locked`,
  )();

export const createBorrowerAccountLockedError = (
  borrowerId: string,
): AppError =>
  createError(
    "BorrowerAccountLockedError",
    403,
    `Borrower with id ${borrowerId} account is locked`,
  )();

// --- Loan ---
export const createLoanNotFoundError = (loanId: string): AppError =>
  createError("LoanNotFoundError", 404, `Loan with id ${loanId} not found`)();

export const createLoanAlreadyReturnedError = (loanId: string): AppError =>
  createError(
    "LoanAlreadyReturnedError",
    409,
    `Loan with id ${loanId} is already returned`,
  )();

export const createLoanLimitExceededError = (limit: number): AppError =>
  createError(
    "LoanLimitExceededError",
    403,
    `Borrower exceeded loan limit of ${limit}`,
  )();

// --- Reservation ---
export const createReservationNotFoundError = (
  reservationId: string,
): AppError =>
  createError(
    "ReservationNotFoundError",
    404,
    `Reservation with id ${reservationId} not found`,
  )();

export const createReservationAlreadyExistsError = (bookId: string): AppError =>
  createError(
    "ReservationAlreadyExistsError",
    409,
    `Reservation for book ${bookId} already exists`,
  )();

export const createReservationExpiredError = (
  reservationId: string,
): AppError =>
  createError(
    "ReservationExpiredError",
    409,
    `Reservation with id ${reservationId} has expired`,
  )();

// --- User ---
export const createUserNotFoundError = (userId: string): AppError =>
  createError("UserNotFoundError", 404, `User with id ${userId} not found`)();

export const createEmailAlreadyExistsError = (email: string): AppError =>
  createError(
    "EmailAlreadyExistsError",
    409,
    `User with email ${email} already exists`,
  )();

export const createInvalidCredentialsError = (): AppError =>
  createError("InvalidCredentialsError", 401, "Invalid credentials")();

export const createUserLockedError = (userId: string): AppError =>
  createError("UserLockedError", 403, `User with id ${userId} is locked`)();

export const createInvalidCategoryDataError = (): AppError =>
  createError("InvalidCategoryDataError", 400, "Invalid data for category")();
