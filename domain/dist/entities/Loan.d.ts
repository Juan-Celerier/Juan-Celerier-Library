export interface Loan {
    id: string;
    bookId: string;
    borrowerId: string;
    loanDate: Date;
    dueDate: Date;
    returnDate?: Date;
    status: "active" | "returned" | "overdue";
    fineAmount?: number;
    createdAt: Date;
}
export type CreateLoanDTO = Omit<Loan, "id" | "createdAt">;
