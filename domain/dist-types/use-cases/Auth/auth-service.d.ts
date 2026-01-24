import { CryptoRepository } from "domain/src/repositories/crypto-repository.js";
import { UserRepository } from "domain/src/repositories/user-repository.js";
import { VerificationTokenRepository } from "domain/src/repositories/verification-token-repository.js";
export interface AuthService {
    register(email: string, password: string, name: string, surname: string): Promise<string>;
    login(email: string, password: string): Promise<string>;
    verifyAccount(token: string): Promise<void>;
}
export declare function createAuthService(userRepo: UserRepository, cryptoRepo: CryptoRepository, verificationRepo: VerificationTokenRepository): AuthService;
