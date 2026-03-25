export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function getEmbedUrl(url: string) {
  const regExp =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/;
  const match = url.match(regExp);
  return match
    ? `https://www.youtube.com/embed/${match[1]}`
    : url;
}