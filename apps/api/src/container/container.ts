import { authController } from "../controllers/auth.controller.js";
import { AuthServiceImpl } from "../services/auth-service-ipml.js";
import { BcryptCryptoService } from "../services/crypto-service-impl.js";

const cryptoService = new BcryptCryptoService();
const authService = new AuthServiceImpl(cryptoService);

export const controllers = {
  auth: authController(authService, cryptoService),
};
