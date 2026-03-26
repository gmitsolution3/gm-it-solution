// components/PdfUploader.tsx
import { useState } from "react";
import { UploadCloud, X, FileText, Loader2 } from "lucide-react";

interface PdfUploaderProps {
  value?: string; // URL of uploaded PDF
  onChange: (url: string) => void;
  uploadEndpoint?: string;
  maxSize?: number; // in MB
}

export const PdfUploader = ({
  value,
  onChange,
  uploadEndpoint = `${import.meta.env.VITE_BACKEND_API_DEV_URL}/upload`,
  maxSize = 10, // 10MB default for PDFs
}: PdfUploaderProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    // Check if it's a PDF
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return false;
    }

    // Check file size
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
    setFileName(file.name);

    if (!validateFile(file)) {
      e.target.value = "";
      setFileName(null);
      return;
    }

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
          setUploading(false);
        } else {
          setError("Upload failed. Please try again.");
          setFileName(null);
          setUploading(false);
        }
      };

      xhr.onerror = () => {
        setError("Upload failed. Please check your connection.");
        setFileName(null);
        setUploading(false);
      };

      xhr.send(formData);
    } catch (err) {
      setError("An unexpected error occurred");
      setFileName(null);
      setUploading(false);
    }
  };

  const removeFile = () => {
    onChange("");
    setFileName(null);
    setError(null);
  };

  const openPdf = () => {
    if (value) {
      window.open(value, "_blank");
    }
  };

  return (
    <div className="w-full">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-gray-100 transition-colors !bg-[#0a131f] text-white">
        {value || fileName ? (
          <div className="relative w-full">
            <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg">
              <FileText className="h-10 w-10 text-blue-400" />
              <div className="flex-1">
                <p className="text-sm font-medium truncate">
                  {fileName || "Uploaded PDF"}
                </p>
                {value && (
                  <button
                    onClick={openPdf}
                    className="text-xs text-blue-400 hover:text-blue-300 mt-1"
                  >
                    View PDF
                  </button>
                )}
              </div>
              <button
                className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                onClick={removeFile}
                disabled={uploading}
              >
                <X size={16} />
              </button>
            </div>

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
              Click to upload PDF
            </span>
            <span className="text-xs text-gray-400">
              PDF only (Max: {maxSize}MB)
            </span>
            <input
              type="file"
              accept=".pdf,application/pdf"
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
