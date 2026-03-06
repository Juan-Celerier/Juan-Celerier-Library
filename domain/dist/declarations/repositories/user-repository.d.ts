import { User, UserRole } from "../entities/User.js";
export type CreateUserDTO = Omit<User, "id" | "createdAt">;
export interface UserRepository {
    findAll(): Promise<User[]>;
    findById(userId: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(user: CreateUserDTO): Promise<User>;
    update(user: User): Promise<User>;
    delete(userId: string): Promise<void>;
    updateRole(userId: string, role: UserRole): Promise<User>;
    save(user: User): Promise<User | null>;
}
//# sourceMappingURL=user-repository.d.ts.map