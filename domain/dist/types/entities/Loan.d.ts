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
export declare function canBeRenewed(loan: Loan, hasActiveReservations: boolean): boolean;
export declare function renew(loan: Loan): Loan;
export declare function isOverdue(loan: Loan, currentDate: Date): boolean;
export declare function calculateFine(loan: Loan, currentDate: Date): number;
