import { notFound } from "next/navigation";
import { dummyTransactions } from "@/data/dummy";
import { AdminTransactionView } from "@/components/dashboard/AdminTransactionView";

export default function AdminTransactionDetailPage({ params }: { params: { id: string } }) {
  const t = dummyTransactions.find((tx) => tx.id === params.id);
  if (!t) return notFound();

  return <AdminTransactionView initialTransaction={t} />;
}
