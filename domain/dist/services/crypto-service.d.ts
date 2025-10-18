export type UUID = string;
export interface CryptoService {
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    generateUUID(): Promise<UUID>;
    generateRandomToken(): Promise<string>;
}
//# sourceMappingURL=crypto-service.d.ts.map