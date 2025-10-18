import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
export function CryptoService() {
    return {
        async hashPassword(password) {
            return bcrypt.hash(password, 10);
        },
        async comparePassword(password, hashedPassword) {
            return bcrypt.compare(password, hashedPassword);
        },
        async generateUUID() {
            return uuidv4();
        },
        async generateRandomToken() {
            return crypto.randomBytes(32).toString("hex");
        },
    };
}
