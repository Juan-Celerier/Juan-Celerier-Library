import { CryptoRepository } from "domain/src/repositories/crypto-repository.js";

export interface MockedCryptoRepository extends CryptoRepository {
  hashedPasswords: Map<string, string>;
  tokens: Map<string, object>;
}

export function createCryptoRepositoryMock(): MockedCryptoRepository {
  return {
    hashedPasswords: new Map(),
    tokens: new Map(),

    async hashPassword(plain: string): Promise<string> {
      const hash = `hashed-${plain}`;
      this.hashedPasswords.set(plain, hash);
      return hash;
    },

    async comparePassword(plain: string, hash: string): Promise<boolean> {
      const expected = this.hashedPasswords.get(plain);
      return expected === hash;
    },

    generateToken(payload: object, expiresIn: string): string {
      const token = `token-${Date.now()}`;
      this.tokens.set(token, payload);
      return token;
    },

    verifyToken(token: string): object | null {
      return this.tokens.get(token) || null;
    },
  };
}
