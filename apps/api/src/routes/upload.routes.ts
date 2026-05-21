// apps/api/src/routes/upload.routes.ts
import { Router } from "express";
import { UploadController } from "../controllers/upload.controller.js";
import { uploadImage } from "../middlewares/upload.middleware.js";

const router = Router();

router.post(
  "/image",
  uploadImage.single("image"),
  UploadController.uploadImage,
);

router.get("/image", (req, res) => {
  res.json({
    message: "La ruta de upload está activa. Usá POST para subir archivos.",
  });
});

export default router;
