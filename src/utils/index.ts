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

export const formatPrice = (
  price: number,
  currency: string = "BDT",
): string => {
  if (!price && price !== 0) return "";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const getInitials = (name: string): string => {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
