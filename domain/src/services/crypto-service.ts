// domain/src/services/crypto-service.ts
export type UUID = string;

export interface CryptoService {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hashPass: string): Promise<boolean>;
  generateUUID(): Promise<UUID>;
  generateRandomToken(): Promise<string>;
}
