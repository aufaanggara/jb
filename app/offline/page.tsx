import { WifiOff, RefreshCw } from "lucide-react";

export const metadata = {
  title: "Offline — Rekberin",
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-12 text-center max-w-md w-full">
        {/* Icon */}
        <div className="h-20 w-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-100">
          <WifiOff size={40} className="text-blue-600" />
        </div>

        <h1 className="text-2xl font-black text-slate-900 mb-2">
          Kamu Sedang Offline
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed mb-8">
          Koneksi internet kamu terputus. Cek WiFi atau data seluler kamu, lalu coba lagi.
        </p>

        <a
          href="/"
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl shadow-md transition-all active:scale-95"
        >
          <RefreshCw size={16} />
          Coba Lagi
        </a>

        <p className="text-[11px] text-slate-400 mt-6">
          Halaman yang sudah pernah kamu kunjungi tetap bisa diakses secara offline.
        </p>
      </div>
    </div>
  );
}
