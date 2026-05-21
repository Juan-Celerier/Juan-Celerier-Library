import React, { useState, useRef } from "react";
import { apiClient } from "../../utils/api-client";
import { X, Image as ImageIcon, Loader2 } from "lucide-react";

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

    if (file.size > 5 * 1024 * 1024) {
      onError?.("La imagen no puede superar 5MB");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response: any = await apiClient.call("upload/image", {
        _method: "POST",
        body: formData,
      });

      if (response && response.success && response.data) {
        const imageUrl = response.data;
        setPreview(imageUrl);
        onChange(imageUrl);
      } else {
        console.error("Respuesta del servidor sin datos válidos:", response);
        throw new Error("Respuesta de servidor inválida");
      }
    } catch (error) {
      onError?.("Error al subir la imagen");
      console.error("Upload error detail:", error);
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
      <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] ml-2 block">
        Vista Previa de Portada
      </p>

      {preview ? (
        <div className="relative group w-full aspect-[3/4] max-w-[200px] mx-auto overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={handleRemove}
              className="bg-white/20 backdrop-blur-md text-white p-3 rounded-2xl hover:bg-white/40 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`w-full aspect-[3/4] max-w-[200px] mx-auto border-4 border-dashed rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-all duration-300
            ${uploading ? "border-primary/20 bg-primary/5" : "border-neutral-100 hover:border-primary/40 hover:bg-primary/5"}`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="animate-spin text-primary" size={32} />
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                Subiendo...
              </span>
            </div>
          ) : (
            <>
              <div className="h-12 w-12 rounded-2xl bg-neutral-50 flex items-center justify-center text-neutral-400 mb-4">
                <ImageIcon size={24} />
              </div>
              <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                Añadir Portada
              </span>
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

export default ImageUpload;
