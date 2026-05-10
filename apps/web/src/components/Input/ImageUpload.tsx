import React, { useState, useRef } from "react";
import { apiClient } from "../../utils/api-client";
import { X, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onError?: (error: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onError,
}) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tamaño (5MB)
    if (file.size > 5 * 1024 * 1024) {
      onError?.("La imagen no puede superar 5MB");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      /**
       * CORRECCIÓN CRÍTICA:
       * El endpoint debe ser 'upload/image' para que coincida con:
       * router.use("/upload", uploadRoutes) + router.post("/image", ...)
       */
      const response = await apiClient.call<{ url: string }>("upload/image", {
        method: "POST",
        body: formData,
        // Importante: No definimos Content-Type aquí para que el navegador
        // setee el boundary del FormData automáticamente.
      });

      if (response && "url" in response) {
        const imageUrl = (response as { url: string }).url;
        setPreview(imageUrl);
        onChange(imageUrl);
      }
    } catch (error) {
      onError?.("Error al subir la imagen");
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Imagen del libro
      </label>

      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
        >
          {uploading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          ) : (
            <>
              <ImageIcon size={24} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-500">Seleccionar imagen</span>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};
