// Placeholder — ganti dengan React Query + fetch("/api/transactions") setelah Prisma/Supabase aktif.
import { dummyTransactions } from "@/data/dummy";

export function useTransactions() {
  return { data: dummyTransactions, isLoading: false };
}
