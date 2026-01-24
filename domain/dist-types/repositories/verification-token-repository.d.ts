export interface VerificationTokenRepository {
    createToken(userId: string): Promise<string>;
    verifyToken(token: string): Promise<string | null>;
    deleteToken(token: string): Promise<void>;
}
