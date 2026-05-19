import { ISalaryRange } from "@/types";

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
