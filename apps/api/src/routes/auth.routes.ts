import { Router } from "express";
import { controllers } from "../container/container.js";
import { authMiddleware } from "../middlewares/auth-middlewares.js";

const router = Router();

router.post("/register", controllers.auth.register);
router.post("/login", controllers.auth.login);
router.get("/me", authMiddleware, controllers.auth.getProfile);

export default router;
