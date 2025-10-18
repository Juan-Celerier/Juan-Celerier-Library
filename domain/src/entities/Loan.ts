export interface Loan {
  id: string;
  bookId: string; // 👈 CAMBIAR de bookCopyId a bookId
  borrowerId: string;
  loanDate: Date;
  dueDate: Date;
  returnDate?: Date;
  status: "active" | "returned" | "overdue"; // 👈 AGREGAR
  fineAmount?: number;
  createdAt: Date;
}

export type CreateLoanDTO = Omit<Loan, "id" | "createdAt">;
