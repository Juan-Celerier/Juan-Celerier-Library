// src/errors/app-errors.ts
function createError(name, httpStatus, defaultMessage) {
    return (message = defaultMessage) => ({
        name,
        message,
        httpStatus,
    });
}
// --- Errores genéricos ---
export const createInvalidDataError = createError("InvalidDataError", 400, "Invalid data provided");
export const createNotFoundError = createError("NotFoundError", 404, "Resource not found");
export const createBadRequestError = createError("BadRequestError", 400, "Bad request");
export const createUnauthorizedError = createError("UnauthorizedError", 401, "Unauthorized access");
export const createForbiddenError = createError("ForbiddenError", 403, "Access forbidden");
export const createConflictError = createError("ConflictError", 409, "Resource already exists");
export const createInternalServerError = createError("InternalServerError", 500, "An unexpected internal server error occurred");
export const createEmailSendingError = createError("EmailSendingError", 500, "Email sending failed");
// --- Book ---
export const createBookNotFoundError = (bookId) => createError("BookNotFoundError", 404, `Book with id ${bookId} not found`)();
export const createBookAlreadyExistsError = (isbn) => createError("BookAlreadyExistsError", 409, `Book with ISBN ${isbn} already exists`)();
export const createInvalidBookDataError = () => createError("InvalidBookDataError", 400, "Invalid data for book")();
// --- Author ---
export const createAuthorNotFoundError = (authorId) => createError("AuthorNotFoundError", 404, `Author with id ${authorId} not found`)();
export const createAuthorAlreadyExistsError = (name) => createError("AuthorAlreadyExistsError", 409, `Author ${name} already exists`)();
// --- Category ---
export const CategoryNotFoundError = (categoryId) => createError("CategoryNotFoundError", 404, `Category with id ${categoryId} not found`)();
export const CategoryAlreadyExistsError = (name) => createError("CategoryAlreadyExistsError", 409, `Category ${name} already exists`)();
// --- Publisher ---
export const createPublisherNotFoundError = (publisherId) => createError("PublisherNotFoundError", 404, `Publisher with id ${publisherId} not found`)();
export const createPublisherAlreadyExistsError = (name) => createError("PublisherAlreadyExistsError", 409, `Publisher ${name} already exists`)();
// --- Borrower ---
export const BorrowerNotFoundError = (borrowerId) => createError("BorrowerNotFoundError", 404, `Borrower with id ${borrowerId} not found`)();
export const createInvalidBorrowerRoleError = (role) => createError("InvalidBorrowerRoleError", 400, `Borrower role '${role}' is invalid`)();
export const BorrowerAlreadyExistsError = (email) => createError("BorrowerAlreadyExistsError", 409, `Borrower with email ${email} already exists`)();
export const createBorrowerAlreadyLockedError = (borrowerId) => createError("BorrowerAlreadyLockedError", 409, `Borrower with id ${borrowerId} is already locked`)();
export const createBorrowerAccountLockedError = (borrowerId) => createError("BorrowerAccountLockedError", 403, `Borrower with id ${borrowerId} account is locked`)();
// --- Loan ---
export const createLoanNotFoundError = (loanId) => createError("LoanNotFoundError", 404, `Loan with id ${loanId} not found`)();
export const createLoanAlreadyReturnedError = (loanId) => createError("LoanAlreadyReturnedError", 409, `Loan with id ${loanId} is already returned`)();
export const createLoanLimitExceededError = (limit) => createError("LoanLimitExceededError", 403, `Borrower exceeded loan limit of ${limit}`)();
// --- Reservation ---
export const createReservationNotFoundError = (reservationId) => createError("ReservationNotFoundError", 404, `Reservation with id ${reservationId} not found`)();
export const createReservationAlreadyExistsError = (bookId) => createError("ReservationAlreadyExistsError", 409, `Reservation for book ${bookId} already exists`)();
export const createReservationExpiredError = (reservationId) => createError("ReservationExpiredError", 409, `Reservation with id ${reservationId} has expired`)();
// --- User ---
export const createUserNotFoundError = (userId) => createError("UserNotFoundError", 404, `User with id ${userId} not found`)();
export const createEmailAlreadyExistsError = (email) => createError("EmailAlreadyExistsError", 409, `User with email ${email} already exists`)();
export const createInvalidCredentialsError = () => createError("InvalidCredentialsError", 401, "Invalid credentials")();
export const createUserLockedError = (userId) => createError("UserLockedError", 403, `User with id ${userId} is locked`)();
export const createInvalidCategoryDataError = () => createError("InvalidCategoryDataError", 400, "Invalid data for category")();
