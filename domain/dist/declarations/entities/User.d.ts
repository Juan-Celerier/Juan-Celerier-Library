export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    passwordHash: string;
    image?: string;
    token?: string;
    validated: boolean;
    locked: boolean;
    role: UserRole;
    createdAt: Date;
}
export type UserRole = "BORROWER" | "LIBRARIAN" | "ADMIN" | "MEMBER";
//# sourceMappingURL=User.d.ts.map