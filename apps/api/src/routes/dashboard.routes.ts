import { Router } from "express";
import { controllers } from "../container/container.js";

const router = Router();

router.post("/", controllers.dashboard.getStats);

export default router;
