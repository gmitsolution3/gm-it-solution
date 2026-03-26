import { ISalaryRange } from "@/types";

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function getEmbedUrl(url: string) {
  const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/;
  const match = url.match(regExp);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export const formatSalary = (salary: ISalaryRange) => {
  if (!salary) return "Not specified";
  const { min, max, currency, period } = salary;
  const periodMap: Record<string, string> = {
    month: "/month",
    year: "/year",
    hour: "/hour",
    day: "/day",
  };
  return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}${periodMap[period] || ""}`;
};
