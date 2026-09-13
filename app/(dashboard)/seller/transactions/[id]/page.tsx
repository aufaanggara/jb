import { notFound } from "next/navigation";
import { dummyTransactions } from "@/data/dummy";
import { SellerTransactionView } from "@/components/dashboard/SellerTransactionView";

export default function SellerTransactionDetailPage({ params }: { params: { id: string } }) {
  const t = dummyTransactions.find((tx) => tx.id === params.id);
  if (!t) return notFound();

  return <SellerTransactionView initialTransaction={t} />;
}
