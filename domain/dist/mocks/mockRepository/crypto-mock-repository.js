export function createCryptoRepositoryMock() {
    return {
        hashedPasswords: new Map(),
        tokens: new Map(),
        async hashPassword(plain) {
            const hash = `hashed-${plain}`;
            this.hashedPasswords.set(plain, hash);
            return hash;
        },
        async comparePassword(plain, hash) {
            const expected = this.hashedPasswords.get(plain);
            return expected === hash;
        },
        generateToken(payload, expiresIn) {
            const token = `token-${Date.now()}`;
            this.tokens.set(token, payload);
            return token;
        },
        verifyToken(token) {
            return this.tokens.get(token) || null;
        },
    };
}
