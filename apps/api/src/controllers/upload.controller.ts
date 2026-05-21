// apps/api/src/controllers/upload.controller.ts
import { Request, Response } from "express";
import ImageStorageService from "../services/image-storage.services.js";

export class UploadController {
  static async uploadImage(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: "No se encontró archivo",
        });
      }

      // El servicio se encarga de la lógica con MinIO
      const imageUrl = await ImageStorageService.uploadImage(req.file);

      res.json({
        success: true,
        data: imageUrl, // Cambio: Usamos 'data' para que el Frontend lo encuentre fácil
        message: "Imagen subida exitosamente",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({
        success: false,
        error: "Error al subir la imagen",
        details: error instanceof Error ? error.message : "Error desconocido",
      });
    }
  }
}
