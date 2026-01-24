import { VerificationTokenRepository } from "domain/src/repositories/verification-token-repository.js";
export interface MockedVerificationTokenRepository extends VerificationTokenRepository {
    tokens: Map<string, string>;
}
export declare function createVerificationTokenRepositoryMock(): MockedVerificationTokenRepository;
