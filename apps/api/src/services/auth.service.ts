import { UserRepository, CryptoService } from "domain/dist/index.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "changeme";

export function AuthService(userRepo: UserRepository, crypto: CryptoService) {
  return {
    async register(email: string, password: string) {
      const exists = await userRepo.findByEmail(email);
      if (exists) throw new Error("Email already exists");

      const hashed = await crypto.hashPassword(password);
      return userRepo.create({
        email,
        locked: false,
        passwordHash: hashed,
        validated: false,
        role: "BORROWER",
        name: "Unknown",
        surname: "User",
      });
    },

    async login(email: string, password: string) {
      const user = await userRepo.findByEmail(email);
      if (!user) throw new Error("Invalid credentials");

      const valid = await crypto.comparePassword(password, user.passwordHash);
      if (!valid) throw new Error("Invalid credentials");

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });
      return { user, token };
    },
  };
}
