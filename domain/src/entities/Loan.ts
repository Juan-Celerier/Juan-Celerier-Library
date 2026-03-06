import {
  MAX_LOAN_RENEWALS,
  DAILY_FINE_RATE,
  MAX_FINE_AMOUNT,
} from "../constants.js";

export interface Loan {
  id: string;
  bookCopyId: string;
  bookId: string;
  borrowerId: string;
  loanDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: "active" | "returned" | "overdue";
  fineAmount?: number;
  renewalCount?: number;
  createdAt: Date;
}

export type CreateLoanDTO = Omit<Loan, "id" | "createdAt" | "renewalCount">;

export function canBeRenewed(
  loan: Loan,
  hasActiveReservations: boolean,
): boolean {
  // Check if loan is not overdue
  if (loan.status === "overdue") {
    return false;
  }

  // Check if there are active reservations
  if (hasActiveReservations) {
    return false;
  }

  // Check if loan hasn't exceeded maximum renewals
  const currentRenewals = loan.renewalCount || 0;
  if (currentRenewals >= MAX_LOAN_RENEWALS) {
    return false;
  }

  return true;
}

export function renew(loan: Loan): Loan {
  if (!canBeRenewed(loan, false)) {
    throw new Error("Loan cannot be renewed");
  }

  // Increment renewal count
  const currentRenewals = loan.renewalCount || 0;

  // Extend due date by 7 days
  const newDueDate = new Date(loan.dueDate);
  newDueDate.setDate(newDueDate.getDate() + 7);

  return {
    ...loan,
    dueDate: newDueDate,
    renewalCount: currentRenewals + 1,
  };
}

export function isOverdue(loan: Loan, currentDate: Date): boolean {
  // Loan is overdue if:
  // 1. It's not returned (no returnDate)
  // 2. Current date is after due date
  // 3. Status is not "returned"
  return (
    !loan.returnDate && loan.status !== "returned" && currentDate > loan.dueDate
  );
}

export function calculateFine(loan: Loan, currentDate: Date): number {
  if (!isOverdue(loan, currentDate)) {
    return 0;
  }

  // Calculate days overdue
  const daysOverdue = Math.floor(
    (currentDate.getTime() - loan.dueDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  // Calculate fine amount
  const fineAmount = daysOverdue * DAILY_FINE_RATE;

  // Apply maximum fine cap
  return Math.min(fineAmount, MAX_FINE_AMOUNT);
}
