"use client";
import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export default function RegisterPage() {
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success(
        role === "ADMIN"
          ? "Pendaftaran admin rekber terkirim, menunggu approval (demo)"
          : "Registrasi berhasil (demo)"
      );
      setLoading(false);
    }, 800);
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <Card>
        <h1 className="font-display text-2xl font-bold mb-1">Daftar RekberGG</h1>
        <p className="text-txt-secondary text-sm mb-6">Pilih peran Anda untuk memulai.</p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setRole("USER")}
            className={`rounded-xl border p-4 text-left text-sm ${role === "USER" ? "border-accent-primary bg-accent-primary/5" : "border-border"}`}
          >
            <p className="font-semibold mb-1">Beli / Jual Akun</p>
            <p className="text-txt-secondary text-xs">Sebagai buyer &amp; seller</p>
          </button>
          <button
            type="button"
            onClick={() => setRole("ADMIN")}
            className={`rounded-xl border p-4 text-left text-sm ${role === "ADMIN" ? "border-accent-primary bg-accent-primary/5" : "border-border"}`}
          >
            <p className="font-semibold mb-1">Admin Rekber</p>
            <p className="text-txt-secondary text-xs">Perlu approval</p>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-txt-muted uppercase tracking-wider">Nama Lengkap</label>
            <input required className="w-full mt-1 bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent-primary" />
          </div>
          <div>
            <label className="text-xs text-txt-muted uppercase tracking-wider">Username</label>
            <input required className="w-full mt-1 bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent-primary" />
          </div>
          <div>
            <label className="text-xs text-txt-muted uppercase tracking-wider">Email</label>
            <input type="email" required className="w-full mt-1 bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent-primary" />
          </div>
          <div>
            <label className="text-xs text-txt-muted uppercase tracking-wider">No. WhatsApp</label>
            <input required placeholder="628xxxxxxxxxx" className="w-full mt-1 bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent-primary" />
          </div>
          <div>
            <label className="text-xs text-txt-muted uppercase tracking-wider">Password</label>
            <input type="password" required className="w-full mt-1 bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent-primary" />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Memproses..." : "Daftar"}</Button>
        </form>

        <p className="text-sm text-txt-secondary text-center mt-6">
          Sudah punya akun? <Link href="/login" className="text-accent-primary font-medium">Masuk</Link>
        </p>
      </Card>
    </div>
  );
}
