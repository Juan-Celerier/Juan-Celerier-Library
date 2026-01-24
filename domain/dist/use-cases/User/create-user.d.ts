import { User } from "domain/src/entities/User.js";
import { UserRepository, CreateUserDTO } from "domain/src/repositories/user-repository.js";
export interface CreateUserDeps {
    userRepository: UserRepository;
}
export declare function createUser(deps: CreateUserDeps, dto: CreateUserDTO): Promise<User>;
