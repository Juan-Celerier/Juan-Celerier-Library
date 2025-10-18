import { User } from "domain/src/entities/User.js";
import { UserRepository } from "domain/src/repositories/user-repository.js";
export interface UpdateUserDTO {
    id: string;
    name?: string;
    surname?: string;
    email?: string;
    image?: string;
    validated?: boolean;
    locked?: boolean;
    role?: "BORROWER" | "LIBRARIAN";
}
export declare function updateUser(repo: UserRepository, input: UpdateUserDTO): Promise<User>;
