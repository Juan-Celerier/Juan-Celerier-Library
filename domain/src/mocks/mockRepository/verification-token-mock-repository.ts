import { VerificationTokenRepository } from "domain/src/repositories/verification-token-repository.js";

export interface MockedVerificationTokenRepository
  extends VerificationTokenRepository {
  tokens: Map<string, string>; // token -> userId
}

export function createVerificationTokenRepositoryMock(): MockedVerificationTokenRepository {
  return {
    tokens: new Map(),

    async createToken(userId: string): Promise<string> {
      const token = `verification-${Date.now()}`;
      this.tokens.set(token, userId);
      return token;
    },

    async verifyToken(token: string): Promise<string | null> {
      return this.tokens.get(token) || null;
    },

    async deleteToken(token: string): Promise<void> {
      this.tokens.delete(token);
    },
  };
}
