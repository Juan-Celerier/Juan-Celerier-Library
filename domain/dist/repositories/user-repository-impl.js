// domain/src/repositories/user-repository-impl.ts
import { v4 as uuidv4 } from "uuid";
export function createUserRepository() {
    const users = [];
    return {
        async findAll() {
            return users;
        },
        async findById(userId) {
            return users.find((u) => u.id === userId) || null;
        },
        async findByEmail(email) {
            return users.find((u) => u.email === email) || null;
        },
        async create(user) {
            const newUser = { ...user, id: uuidv4(), createdAt: new Date() };
            users.push(newUser);
            return newUser;
        },
        async update(user) {
            const index = users.findIndex((u) => u.id === user.id);
            if (index !== -1)
                users[index] = user;
            return user;
        },
        async delete(userId) {
            const index = users.findIndex((u) => u.id === userId);
            if (index !== -1)
                users.splice(index, 1);
        },
        async updateRole(userId, role) {
            const user = await this.findById(userId);
            if (!user)
                throw new Error("User not found");
            user.role = role;
            return user;
        },
        async save(user) {
            const index = users.findIndex((u) => u.id === user.id);
            if (index !== -1) {
                users[index] = user;
                return user;
            }
            return null;
        },
    };
}
