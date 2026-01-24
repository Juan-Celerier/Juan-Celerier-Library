import { Borrower } from "domain/src/entities/Borrower.js";
import { BorrowerRepository } from "domain/src/repositories/borrower-repository.js";
interface UpdateBorrowerInput {
    id: string;
    name?: string;
    surname?: string;
    email?: string;
    passwordHash?: string;
    image?: string;
    token?: string;
    validated?: boolean;
    locked?: boolean;
    role?: "STUDENT" | "TEACHER";
}
export declare function updateBorrower(repository: BorrowerRepository, input: UpdateBorrowerInput): Promise<Borrower>;
export {};
