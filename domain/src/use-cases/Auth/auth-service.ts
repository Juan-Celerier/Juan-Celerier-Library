import {
  createEmailAlreadyExistsError,
  createInvalidCredentialsError,
  createUserLockedError,
  createUserNotFoundError,
} from "domain/src/errors/error.js";
import { CryptoRepository } from "domain/src/repositories/crypto-repository.js";
import { UserRepository } from "domain/src/repositories/user-repository.js";
import { VerificationTokenRepository } from "domain/src/repositories/verification-token-repository.js";

export interface AuthService {
  register(
    email: string,
    password: string,
    name: string,
    surname: string,
  ): Promise<string>; // verification token
  login(email: string, password: string): Promise<string>; // jwt token
  verifyAccount(token: string): Promise<void>;
}

export function createAuthService(
  userRepo: UserRepository,
  cryptoRepo: CryptoRepository,
  verificationRepo: VerificationTokenRepository,
): AuthService {
  return {
    async register(email, password, name, surname) {
      const existing = await userRepo.findByEmail(email);
      if (existing) {
        throw createEmailAlreadyExistsError(email);
      }

      const passwordHash = await cryptoRepo.hashPassword(password);

      const user = await userRepo.create({
        name,
        surname,
        email,
        passwordHash,
        validated: false,
        locked: false,
        role: "BORROWER",
        image: undefined,
        token: undefined,
      });

      const verificationToken = await verificationRepo.createToken(user.id);
      return verificationToken;
    },

    async login(email, password) {
      const user = await userRepo.findByEmail(email);
      if (!user) {
        throw createInvalidCredentialsError();
      }

      // Verifica que el usuario no esté bloqueado
      if (user.locked) {
        throw createUserLockedError(user.id);
      }

      // Verifica que la cuenta esté validada
      if (!user.validated) {
        throw createInvalidCredentialsError();
      }

      const match = await cryptoRepo.comparePassword(
        password,
        user.passwordHash,
      );
      if (!match) {
        throw createInvalidCredentialsError();
      }

      const token = cryptoRepo.generateToken(
        { userId: user.id, role: user.role },
        "1h",
      );
      return token;
    },

    async verifyAccount(token) {
      const userId = await verificationRepo.verifyToken(token);
      if (!userId) {
        throw createInvalidCredentialsError();
      }

      const user = await userRepo.findById(userId);
      if (!user) {
        throw createUserNotFoundError(userId);
      }

      user.validated = true;
      await userRepo.update(user);

      await verificationRepo.deleteToken(token);
    },
  };
}
