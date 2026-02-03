import { CryptoRepository } from "domain/src/repositories/crypto-repository.js";
export interface MockedCryptoRepository extends CryptoRepository {
    hashedPasswords: Map<string, string>;
    tokens: Map<string, object>;
}
export declare function createCryptoRepositoryMock(): MockedCryptoRepository;
