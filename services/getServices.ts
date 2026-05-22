import { IService } from "@/types";
import { API_BASE_URL } from ".";

export async function getServices(): Promise<IService[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/services`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const data = await res.json();

    return data?.data ?? [];
  } catch {
    return [];
  }
}
