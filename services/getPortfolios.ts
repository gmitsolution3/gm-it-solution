import { IPortfolioItem } from "@/types";
import { API_BASE_URL } from ".";

export async function getPortfolios(): Promise<IPortfolioItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/portfolios`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const data = await res.json();

    return data?.data ?? [];
  } catch {
    return [];
  }
}