export interface BookAuthor {
    id: string;
    name: string;
    surname: string;
    biography?: string;
    birthDate?: Date;
    nationality?: string;
    image?: string;
    createdAt: Date;
}
export type CreateBookAuthorDTO = Omit<BookAuthor, "id" | "createdAt">;
//# sourceMappingURL=BookAuthor.d.ts.map