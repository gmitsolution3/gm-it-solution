import { ISlider } from "@/types";
import { API_BASE_URL } from ".";

export async function getSliders(): Promise<ISlider[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/sliders`, {
      // Revalidate every 60 seconds (ISR). Adjust as needed:
      // - next: { revalidate: 0 }  → always fresh (SSR)
      // - next: { tags: ["sliders"] } → on-demand revalidation
      // next: { revalidate: 60 },
      cache: "no-store", // Disable caching to always fetch fresh data
    });

    if (!res.ok) return [];

    const data = await res.json();

    return data?.data ?? [];
  } catch {
    return [];
  }
}
