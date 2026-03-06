import { User, UserRole } from "domain/src/entities/User.js";
import { UserRepository } from "domain/src/repositories/user-repository.js";

export interface MockedUserRepository extends UserRepository {
  users: User[];
}

export function createUserRepositoryMock(
  users: User[] = [],
): MockedUserRepository {
  return {
    users,

    async findAll() {
      return this.users;
    },

    async findById(userId: string) {
      return this.users.find((u) => u.id === userId) || null;
    },

    async findByEmail(email: string) {
      return this.users.find((u) => u.email === email) || null;
    },

    async create(user: Omit<User, "id">) {
      const newUser: User = {
        id: `user-${Date.now()}`,
        ...user,
      };
      this.users.push(newUser);
      return newUser;
    },

    async update(user: User) {
      const index = this.users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        this.users[index] = user;
      }
      return user;
    },

    async delete(userId: string) {
      this.users = this.users.filter((u) => u.id !== userId);
    },

    async updateRole(userId: string, role: UserRole) {
      const user = await this.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      user.role = role;
      return this.update(user);
    },

    async save(user: User) {
      const index = this.users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        this.users[index] = user;
      } else {
        this.users.push(user);
      }
      return user;
    },
  };
}
