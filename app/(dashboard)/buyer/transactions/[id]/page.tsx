import { notFound } from "next/navigation";
import { dummyTransactions } from "@/data/dummy";
import { BuyerTransactionView } from "@/components/dashboard/BuyerTransactionView";

export default function BuyerTransactionDetailPage({ params }: { params: { id: string } }) {
  const t = dummyTransactions.find((tx) => tx.id === params.id);
  if (!t) return notFound();

  return <BuyerTransactionView initialTransaction={t} />;
}
