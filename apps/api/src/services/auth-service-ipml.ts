// apps/api/src/services/auth.service-impl.ts
import type {
  AuthService,
  CreateUserDTO,
} from "domain/src/services/auth-service.js";
import type { User } from "domain/src/entities/User.js";
import { AppDataSource } from "../config/data.js";
import { UserEntity } from "../entities/user.entity.js"; // TypeORM entity
import type { CryptoService } from "domain/src/services/crypto-service.js";

export class AuthServiceImpl implements AuthService {
  private repo = AppDataSource.getRepository(UserEntity);

  constructor(private cryptoService: CryptoService) {}

  async createUser(input: CreateUserDTO): Promise<User> {
    // mapea DTO -> entidad; genera id si hace falta
    const user = this.repo.create({
      ...input,
      // si tu entidad usa hashedPassword, etc.
    } as any);
    return this.repo.save(user) as unknown as Promise<User>;
  }

  async findByEmail(email: string): Promise<User | null> {
    const u = await this.repo.findOne({ where: { email } });
    return (u as unknown as User) ?? null;
  }

  async findById(id: string): Promise<User | null> {
    const u = await this.repo.findOne({ where: { id } });
    return (u as unknown as User) ?? null;
  }
}
