export function createVerificationTokenRepositoryMock() {
    return {
        tokens: new Map(),
        async createToken(userId) {
            const token = `verification-${Date.now()}`;
            this.tokens.set(token, userId);
            return token;
        },
        async verifyToken(token) {
            return this.tokens.get(token) || null;
        },
        async deleteToken(token) {
            this.tokens.delete(token);
        },
    };
}
