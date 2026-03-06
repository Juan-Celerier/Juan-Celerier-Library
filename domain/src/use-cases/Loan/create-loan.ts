import { Loan, CreateLoanDTO } from "domain/src/entities/Loan.js";
import { UserRole } from "domain/src/entities/User.js";
import { RoleService } from "domain/src/services/role-service.js";
import {
  createInvalidDataError,
  createUnauthorizedError,
} from "domain/src/errors/error.js";
import { LoanRepository } from "domain/src/repositories/loan-repository.js";

export interface CreateLoanRequest {
  bookCopyId: string;
  borrowerId: string;
}

export interface CreateLoanResponse {
  success: boolean;
  loan?: Loan;
  error?: string;
  warning?: string;
}

export interface CreateLoanDependencies {
  loanRepository: LoanRepository;
}

export interface CreateLoanWithUserRequest extends CreateLoanRequest {
  userRole: UserRole;
}

export const createLoan = async (
  request: CreateLoanRequest,
  dependencies: CreateLoanDependencies,
): Promise<CreateLoanResponse> => {
  const { loanRepository } = dependencies;

  // ✅ Validaciones
  const validationError = validateCreateLoanRequest(request);
  if (validationError) {
    return { success: false, error: validationError.message };
  }

  // 📌 Setear fechas y estado inicial
  const loanDate = new Date();
  const dueDate = new Date(loanDate);
  dueDate.setDate(loanDate.getDate() + 14); // +14 días

  const createLoanDTO: CreateLoanDTO = {
    bookCopyId: request.bookCopyId.trim(),
    bookId: request.bookCopyId.trim(), // Using bookCopyId as bookId for now
    borrowerId: request.borrowerId.trim(),
    loanDate,
    dueDate,
    status: "active",
  };

  // 🛠️ Guardar en el repositorio
  const loan = await loanRepository.create(createLoanDTO);

  return {
    success: true,
    loan,
  };
};

const validateCreateLoanRequest = (request: CreateLoanRequest) => {
  if (!request.bookCopyId || request.bookCopyId.trim().length === 0) {
    return createInvalidDataError("Book copy ID is required");
  }

  if (!request.borrowerId || request.borrowerId.trim().length === 0) {
    return createInvalidDataError("Borrower ID is required");
  }

  return null;
};

/**
 * Create loan with role validation
 */
export const createLoanWithRoleValidation = async (
  request: CreateLoanWithUserRequest,
  dependencies: CreateLoanDependencies,
): Promise<CreateLoanResponse> => {
  // Validate user role first
  if (!RoleService.canCreateLoans(request.userRole)) {
    return {
      success: false,
      error: createUnauthorizedError("User role not authorized to create loans")
        .message,
    };
  }

  // If authorized, proceed with normal loan creation
  return createLoan(request, dependencies);
};
