import { User } from "domain/src/entities/User.js";
import { UserRepository } from "domain/src/repositories/user-repository.js";
export interface MockedUserRepository extends UserRepository {
    users: User[];
}
export declare function createUserRepositoryMock(users?: User[]): MockedUserRepository;
//# sourceMappingURL=user-mock-repository.d.ts.map