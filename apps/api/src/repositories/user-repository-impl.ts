import { User } from "domain/src/entities/User.js";
import { UserRepository, CreateUserDTO } from "domain/src/index.js";

import { v4 as uuidv4 } from "uuid";

export function createUserRepository(): UserRepository {
  const users: User[] = [];

  return {
    async findAll() {
      return users;
    },

    async findById(userId: string) {
      return users.find((u) => u.id === userId) || null;
    },

    async findByEmail(email: string) {
      return users.find((u) => u.email === email) || null;
    },

    async create(user: CreateUserDTO) {
      const newUser: User = { ...user, id: uuidv4(), createdAt: new Date() };
      users.push(newUser);
      return newUser;
    },

    async update(user: User) {
      const index = users.findIndex((u) => u.id === user.id);
      if (index !== -1) users[index] = user;
      return user;
    },

    async delete(userId: string) {
      const index = users.findIndex((u) => u.id === userId);
      if (index !== -1) users.splice(index, 1);
    },

    async updateRole(userId: string, role: User["role"]) {
      const user = await this.findById(userId);
      if (!user) throw new Error("User not found");
      user.role = role;
      return user;
    },

    async save(user: User) {
      const index = users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        users[index] = user;
        return user;
      }
      return null;
    },
  };
}
