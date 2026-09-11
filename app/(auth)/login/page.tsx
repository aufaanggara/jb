"use client";
import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // NOTE: sambungkan ke next-auth signIn("credentials", {...}) setelah backend siap.
    setTimeout(() => {
      toast.success("Login berhasil (demo)");
      setLoading(false);
    }, 800);
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <Card>
        <h1 className="font-display text-2xl font-bold mb-1">Masuk ke RekberGG</h1>
        <p className="text-txt-secondary text-sm mb-6">Lanjutkan transaksi Anda dengan aman.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-txt-muted uppercase tracking-wider">Email</label>
            <input type="email" required className="w-full mt-1 bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent-primary" />
          </div>
          <div>
            <label className="text-xs text-txt-muted uppercase tracking-wider">Password</label>
            <input type="password" required className="w-full mt-1 bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent-primary" />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Memproses..." : "Masuk"}</Button>
        </form>
        <p className="text-sm text-txt-secondary text-center mt-6">
          Belum punya akun? <Link href="/register" className="text-accent-primary font-medium">Daftar</Link>
        </p>
      </Card>
    </div>
  );
}
