export interface Borrower {
    id: string;
    name: string;
    surname: string;
    email: string;
    passwordHash: string;
    image?: string;
    token?: string;
    validated: boolean;
    locked: boolean;
    role: BorrowerRole;
    createdAt: Date;
}
export type BorrowerRole = "STUDENT" | "TEACHER";
export type CreateBorrowerDTO = Omit<Borrower, "id" | "createdAt">;
