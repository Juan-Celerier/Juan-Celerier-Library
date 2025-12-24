import { Router } from "express";
import { reservationController } from "../controllers/reservation.controller.js";

const router = Router();

router.get("/", reservationController.getAll);
router.get("/user/:userId", reservationController.getByUser);
router.get("/:id", reservationController.getById);
router.post("/", reservationController.create);
router.put("/:id", reservationController.update);
router.delete("/:id", reservationController.delete);

export default router;
