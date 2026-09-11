// Placeholder — ganti dengan React Query + fetch("/api/listings") setelah Prisma/Supabase aktif.
import { dummyListings } from "@/data/dummy";

export function useListings() {
  return { data: dummyListings, isLoading: false };
}
