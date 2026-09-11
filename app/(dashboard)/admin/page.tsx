"use client";
import { Activity, Clock, CheckCircle2, Wallet } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { dummyTransactions } from "@/data/dummy";
import { formatRupiah } from "@/lib/utils";

const weeklyData = [
  { week: "W1", transaksi: 12 },
  { week: "W2", transaksi: 18 },
  { week: "W3", transaksi: 15 },
  { week: "W4", transaksi: 24 },
];

export default function AdminDashboardPage() {
  const active = dummyTransactions.filter((t) => !["COMPLETED", "CANCELLED"].includes(t.status));
  const pending = dummyTransactions.filter((t) => t.status === "PENDING_PAYMENT");
  const completed = dummyTransactions.filter((t) => t.status === "COMPLETED");
  const totalFee = dummyTransactions.reduce((sum, t) => sum + t.adminFee, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
      <DashboardSidebar role="admin" />
      <div className="flex-1">
        <h1 className="font-display text-2xl font-bold mb-6">Dashboard Admin Rekber</h1>

        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          <StatsCard label="Transaksi Aktif" value={active.length} icon={Activity} />
          <StatsCard label="Pending Konfirmasi" value={pending.length} icon={Clock} accent="warning" />
          <StatsCard label="Selesai Bulan Ini" value={completed.length} icon={CheckCircle2} accent="success" />
          <StatsCard label="Pendapatan Fee" value={formatRupiah(totalFee)} icon={Wallet} accent="gold" />
        </div>

        <Card className="mb-8">
          <h3 className="font-semibold mb-4">Transaksi Sukses per Minggu</h3>
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3452" />
                <XAxis dataKey="week" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1a1e2e", border: "1px solid #2d3452", borderRadius: 8 }} />
                <Line type="monotone" dataKey="transaksi" stroke="#4f9cf9" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button variant="secondary">Konfirmasi Dana Masuk</Button>
          <Button variant="secondary">Buka Sengketa</Button>
          <Button variant="secondary">Export Laporan</Button>
        </div>
      </div>
    </div>
  );
}
