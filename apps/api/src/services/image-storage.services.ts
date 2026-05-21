import { HeadBucketCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import { s3Client, BUCKET_NAME } from "../config/minio.js";
import multer from "multer";

export class ImageStorageService {
  static async ensureBucketExists() {
    try {
      await s3Client.send(new HeadBucketCommand({ Bucket: BUCKET_NAME }));
    } catch (error) {
      console.log(
        "Bucket will be created on first upload or check configuration",
      );
    }
  }

  static async uploadImage(file: Express.Multer.File): Promise<string> {
    await this.ensureBucketExists();

    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`;

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3Client.send(new PutObjectCommand(uploadParams));

    // CORRECCIÓN DE ARQUITECTURA:
    // Usamos una variable dedicada para las URLs del cliente (Frontend).
    // Si no está definida en las variables de entorno, clavamos 'http://localhost:9000'
    // para que tu Fedora pueda renderizar la imagen sin problemas de host.
    const publicEndpoint =
      process.env.MINIO_PUBLIC_URL || "http://localhost:9000";

    return `${publicEndpoint}/${BUCKET_NAME}/${fileName}`;
  }
}

export default ImageStorageService;

function uuidv4() {
  return crypto.randomUUID();
}
