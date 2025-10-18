export function createUserRepositoryMock(users = []) {
    return {
        users,
        async findAll() {
            return this.users;
        },
        async findById(userId) {
            return this.users.find((u) => u.id === userId) || null;
        },
        async findByEmail(email) {
            return this.users.find((u) => u.email === email) || null;
        },
        async create(user) {
            const newUser = {
                id: `user-${Date.now()}`,
                ...user,
            };
            this.users.push(newUser);
            return newUser;
        },
        async update(user) {
            const index = this.users.findIndex((u) => u.id === user.id);
            if (index !== -1) {
                this.users[index] = user;
            }
            return user;
        },
        async delete(userId) {
            this.users = this.users.filter((u) => u.id !== userId);
        },
        async updateRole(userId, role) {
            const user = await this.findById(userId);
            if (!user) {
                throw new Error("User not found");
            }
            user.role = role;
            return this.update(user);
        },
        async save(user) {
            const index = this.users.findIndex((u) => u.id === user.id);
            if (index !== -1) {
                this.users[index] = user;
            }
            else {
                this.users.push(user);
            }
            return user;
        },
    };
}
