export type BookCopyStatus = "AVAILABLE" | "LOANED" | "RESERVED";

export interface BookCopy {
  id: string;
  bookId: string;
  status: BookCopyStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateBookCopyDTO = Omit<BookCopy, "id" | "createdAt" | "updatedAt">;
export type UpdateBookCopyDTO = Omit<BookCopy, "createdAt">;