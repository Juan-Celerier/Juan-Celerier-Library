import bcrypt from "bcrypt";
import { UUID } from "crypto";
import { CryptoService } from "domain/src/index.js";


export class CryptoServiceImplementation implements CryptoService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async generateUUID(): Promise<UUID> {
    return crypto.randomUUID();
  }

  async generateRandomToken(): Promise<string> {
    return crypto.randomUUID().toString();
  }
}
export { CryptoService };

