import { createEmailAlreadyExistsError, createInvalidCredentialsError, } from "domain/src/errors/error.js";
import { createCryptoRepositoryMock } from "domain/src/mocks/mockRepository/crypto-mock-repository.js";
import { createUserRepositoryMock } from "domain/src/mocks/mockRepository/user-mock-repository.js";
import { createVerificationTokenRepositoryMock } from "domain/src/mocks/mockRepository/verification-token-mock-repository.js";
import { describe, beforeEach, test, expect } from "vitest";
import { createAuthService } from "./auth-service.js";
describe("AuthService", () => {
    let userRepo;
    let cryptoRepo;
    let verificationRepo;
    let authService;
    beforeEach(() => {
        userRepo = createUserRepositoryMock();
        cryptoRepo = createCryptoRepositoryMock();
        verificationRepo = createVerificationTokenRepositoryMock();
        authService = createAuthService(userRepo, cryptoRepo, verificationRepo);
    });
    test("should register a new user and return verification token", async () => {
        const token = await authService.register("john.doe@mail.com", "secret", "John", "Doe");
        expect(token).toContain("verification-");
        expect(userRepo.users).toHaveLength(1);
        expect(userRepo.users[0].validated).toBe(false);
    });
    test("should not register if email already exists", async () => {
        await authService.register("john@mail.com", "1234", "John", "Doe");
        await expect(authService.register("john@mail.com", "1234", "John", "Doe")).rejects.toEqual(createEmailAlreadyExistsError("john@mail.com"));
    });
    test("should verify user account", async () => {
        const token = await authService.register("mary@mail.com", "pass", "Mary", "Jane");
        const user = userRepo.users[0];
        await authService.verifyAccount(token);
        expect(user.validated).toBe(true);
        expect(await verificationRepo.verifyToken(token)).toBeNull();
    });
    test("should login successfully with correct credentials", async () => {
        const token = await authService.register("peter@mail.com", "secret", "Peter", "Parker");
        const user = userRepo.users[0];
        // Simula que ya validó la cuenta
        await authService.verifyAccount(token);
        const jwt = await authService.login("peter@mail.com", "secret");
        expect(jwt).toContain("token-");
    });
    test("should fail login with invalid credentials", async () => {
        await authService.register("bruce@mail.com", "batman", "Bruce", "Wayne");
        await expect(authService.login("bruce@mail.com", "wrongpass")).rejects.toEqual(createInvalidCredentialsError());
    });
    //   test("should fail login when user is locked", async () => {
    //     const token = await authService.register(
    //       "locked@mail.com",
    //       "1234",
    //       "Lock",
    //       "User"
    //     );
    //     // Buscar el token dentro del Map de verificationRepo
    //     const foundToken = Array.from(verificationRepo.tokens.values()).find(
    //       (t) => t === token
    //     )!;
    //     await authService.verifyAccount(foundToken);
    //     const user = userRepo.users[0];
    //     user.locked = true;
    //     // Verifica que el usuario esté realmente bloqueado
    //     if (user.locked) {
    //       await expect(
    //         authService.login("locked@mail.com", "1234")
    //       ).rejects.toMatchObject({
    //         name: "UserLockedError",
    //       });
    //     }
    //   });
    test("should fail verifyAccount with invalid token", async () => {
        await expect(authService.verifyAccount("invalid-token")).rejects.toMatchObject({
            name: "InvalidCredentialsError",
        });
    });
    test("should fail verifyAccount if user does not exist", async () => {
        const fakeToken = await verificationRepo.createToken("non-existent-user");
        await expect(authService.verifyAccount(fakeToken)).rejects.toMatchObject({
            name: "UserNotFoundError",
        });
    });
});
