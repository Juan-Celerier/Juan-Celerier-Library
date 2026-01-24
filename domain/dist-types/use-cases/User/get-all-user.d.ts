import { User } from "domain/src/entities/User.js";
import { UserRepository } from "domain/src/repositories/user-repository.js";
export declare function getAllUsers(repo: UserRepository): Promise<User[]>;
