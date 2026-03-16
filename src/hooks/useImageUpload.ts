export const useImageUpload = () => {
  const uploadImage = async (
    file: File,
    endpoint: string = `${process.env.REACT_APP_API_URL}/upload`,
  ) => {
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("accessToken");
    const headers: HeadersInit = {};

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Image upload failed");
    }

    const data = await res.json();
    // Adjust based on your NestJS response structure
    return data.url || data.data?.url || data.fileUrl;
  };

  return { uploadImage };
};
