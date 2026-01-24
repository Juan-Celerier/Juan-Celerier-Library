export function createAuthorMock(opts = {}) {
    return {
        id: "any-id",
        name: "Jane",
        surname: "Smith",
        biography: "any-biography",
        birthDate: new Date(),
        nationality: "any-nationality",
        image: "any-image-url",
        createdAt: new Date(),
        ...opts,
    };
}
