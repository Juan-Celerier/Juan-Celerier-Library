export function createUserMock(opts = {}) {
    return {
        id: "any-id",
        name: "John",
        surname: "Doe",
        email: "john.doe@example.com",
        passwordHash: "hashed-password",
        image: "any-image-url",
        token: "any-token",
        validated: true,
        locked: false,
        role: "BORROWER",
        createdAt: new Date(),
        ...opts,
    };
}
