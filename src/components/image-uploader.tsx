import { useState } from "react";
import { UploadCloud, X } from "lucide-react";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  uploadEndpoint?: string; // Your NestJS API endpoint
  maxSize?: number; // in MB
  allowedTypes?: string[];
}

export const ImageUploader = ({
  value,
  onChange,
  uploadEndpoint = `${process.env.REACT_APP_API_URL}/upload`, // Configure your API URL
  maxSize = 5, // 5MB default
  allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ],
}: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(
    value || null,
  );
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    if (!allowedTypes.includes(file.type)) {
      setError(
        `File type not supported. Please upload: ${allowedTypes.join(", ")}`,
      );
      return false;
    }

    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`);
      return false;
    }

    return true;
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (!validateFile(file)) {
      e.target.value = "";
      return;
    }

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      setProgress(0);

      const xhr = new XMLHttpRequest();

      xhr.open("POST", uploadEndpoint);

      const token = localStorage.getItem("accessToken");
      if (token) {
        xhr.setRequestHeader("Authorization", `Bearer ${token}`);
      }

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round(
            (event.loaded * 100) / event.total,
          );
          setProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);

          const url = data.url || data.data?.url || data.fileUrl;

          onChange(url);
          setPreview(url);
          setUploading(false);
        } else {
          setError("Upload failed. Please try again.");
          setPreview(null);
          setUploading(false);
        }
      };

      xhr.onerror = () => {
        setError("Upload failed. Please check your connection.");
        setPreview(null);
        setUploading(false);
      };

      xhr.send(formData);
    } catch (err) {
      setError("An unexpected error occurred");
      setPreview(null);
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onChange("");
    setError(null);
  };

  return (
    <div className="w-full">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-gray-100 transition-colors !bg-[#0a131f] text-white">
        {preview ? (
          <div className="relative w-full h-60">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-md"
            />

            <button
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              onClick={removeImage}
              disabled={uploading}
            >
              <X size={16} />
            </button>

            {uploading && (
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 rounded-md px-6">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-white">
                  {progress}% uploading
                </p>
              </div>
            )}
          </div>
        ) : (
          <label className="flex flex-col items-center gap-2 cursor-pointer w-full py-8">
            <UploadCloud className="h-8 w-8 text-gray-400" />

            <span className="text-sm text-gray-500 text-center">
              Click to upload image
            </span>

            <span className="text-xs text-gray-400">
              {allowedTypes.join(", ")} (Max: {maxSize}MB)
            </span>

            <input
              type="file"
              accept={allowedTypes.join(",")}
              className="hidden"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
        )}
      </div>

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};
