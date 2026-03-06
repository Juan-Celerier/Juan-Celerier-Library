import { User } from "domain/src/entities/User.js";
import { UserRepository } from "domain/src/repositories/user-repository.js";
export interface AssignUserRoleInput {
    userId: string;
    role: User["role"];
}
export interface AssignUserRoleOutput {
    id: string;
    email: string;
    role: User["role"];
}
export declare function assignUserRole(repo: UserRepository, input: AssignUserRoleInput): Promise<AssignUserRoleOutput>;
//# sourceMappingURL=user-role.d.ts.map