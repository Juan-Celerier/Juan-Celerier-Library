import { User } from "domain/src/entities/User.js";
import { UserRepository } from "domain/src/repositories/user-repository.js";
export interface UserLoginInput {
    email: string;
    password: string;
}
export interface UserLoginOutput {
    user: User;
}
export declare function userLogin(repo: UserRepository, input: UserLoginInput): Promise<UserLoginOutput>;
//# sourceMappingURL=user-login.d.ts.map