// apps/api/src/services/crypto.service-impl.ts
import crypto from "crypto";
import bcrypt from "bcrypt";
import type {
  CryptoService,
  UUID,
} from "domain/src/services/crypto-service.js";

export class BcryptCryptoService implements CryptoService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
  async comparePassword(password: string, hashPass: string): Promise<boolean> {
    return bcrypt.compare(password, hashPass);
  }
  async generateUUID(): Promise<UUID> {
    return crypto.randomUUID();
  }
  async generateRandomToken(): Promise<string> {
    return crypto.randomBytes(32).toString("hex");
  }
}
