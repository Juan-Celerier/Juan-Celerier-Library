export interface CryptoRepository {
  hashPassword(plain: string): Promise<string>;
  comparePassword(plain: string, hash: string): Promise<boolean>;
  generateToken(payload: object, expiresIn: string): string;
  verifyToken(token: string): object | null;
}
