// domain/src/services/auth-service.ts
import type { User } from "../entities/User.js"; // <-- ensure entity has JS extension in imports

export interface CreateUserDTO {
  email: string;
  name: string;
  role?: string;
  hashedPassword: string;
}

export interface AuthService {
  createUser(input: CreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
}
