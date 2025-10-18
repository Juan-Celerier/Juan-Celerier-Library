export interface Book {
    id: string;
    title: string;
    author: string;
    authors: string[];
    categories: string[];
    publisher: string;
    publicationDate: Date;
    isbn: string;
    image?: string;
    description?: string;
    availableCopies: number;
    totalCopies: number;
    createdAt: Date;
}
export type CreateBookDTO = Omit<Book, "id" | "createdAt">;
export type UpdateBookDTO = Omit<Book, "createdAt">;
//# sourceMappingURL=Book.d.ts.map