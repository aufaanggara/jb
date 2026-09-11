"use client";
import { useState } from "react";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { UploadCloud } from "lucide-react";
import { toast } from "sonner";

export default function NewListingPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // NOTE: di produksi — upload foto via Uploadthing, lalu POST /api/listings
    setTimeout(() => {
      toast.success("Listing berhasil dibuat (demo)");
      setLoading(false);
    }, 800);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
      <DashboardSidebar role="seller" />
      <div className="flex-1">
        <h1 className="font-display text-2xl font-bold mb-6">Buat Listing Baru</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Card>
            <h3 className="font-semibold mb-4">Informasi Dasar</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-txt-muted uppercase tracking-wider">Judul Listing</label>
                <input required placeholder="Akun eFootball Diamond 89 OVR Full Squad" className="w-full mt-1 bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent-primary" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-txt-muted uppercase tracking-wider">Game</label>
                  <select className="w-full mt-1 bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm outline-none">
                    <option>eFootball</option>
                    <option>Mobile Legends</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-txt-muted uppercase tracking-wider">Harga (Rp)</label>
                  <input required type="number" placeholder="850000" className="w-full mt-1 bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent-primary" />
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold mb-4">Detail Akun</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs text-txt-muted uppercase tracking-wider">Overall Rating</label>
                <input type="number" className="w-full mt-1 bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent-primary" />
              </div>
              <div>
                <label className="text-xs text-txt-muted uppercase tracking-wider">Liga Saat Ini</label>
                <input className="w-full mt-1 bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent-primary" />
              </div>
              <div>
                <label className="text-xs text-txt-muted uppercase tracking-wider">Jumlah Koin</label>
                <input type="number" className="w-full mt-1 bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent-primary" />
              </div>
              <div>
                <label className="text-xs text-txt-muted uppercase tracking-wider">Jumlah GP</label>
                <input type="number" className="w-full mt-1 bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent-primary" />
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs text-txt-muted uppercase tracking-wider">Pemain Bintang</label>
              <textarea rows={2} placeholder="Mbappe, Haaland, Bellingham" className="w-full mt-1 bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent-primary" />
            </div>
            <div>
              <label className="text-xs text-txt-muted uppercase tracking-wider">Info Tambahan</label>
              <textarea rows={3} placeholder="Email pernah ganti? Akun asli? dll." className="w-full mt-1 bg-bg-elevated border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-accent-primary" />
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold mb-4">Upload Foto (maks. 5)</h3>
            <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-txt-muted">
              <UploadCloud size={28} className="mb-2" />
              <p className="text-sm">Klik atau drag foto ke sini</p>
            </div>
          </Card>

          <label className="flex items-center gap-2 text-sm text-txt-secondary">
            <input type="checkbox" required /> Saya menyetujui syarat &amp; ketentuan platform.
          </label>

          <Button type="submit" size="lg" disabled={loading}>{loading ? "Menyimpan..." : "Publikasikan Listing"}</Button>
        </form>
      </div>
    </div>
  );
}
