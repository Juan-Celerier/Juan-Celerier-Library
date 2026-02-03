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
    createdAt: Date;
    availableCopies: number;
    totalCopies: number;
}
export type CreateBookDTO = Omit<Book, "id" | "createdAt">;
export type UpdateBookDTO = Partial<Omit<Book, "id" | "createdAt">>;
