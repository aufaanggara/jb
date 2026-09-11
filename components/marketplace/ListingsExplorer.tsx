"use client";
import { useState, useMemo } from "react";
import { dummyListings } from "@/data/dummy";
import { ListingCard } from "@/components/marketplace/ListingCard";
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  X,
  ShieldCheck,
  CheckCircle2,
  Trophy,
  Coins,
  Wallet,
  Sparkles,
  KeyRound,
  ArrowUpDown,
  Flame,
  AlertCircle,
  Gamepad2,
} from "lucide-react";
import { Slider } from "@/components/ui/Slider";
import { Checkbox } from "@/components/ui/Checkbox";
import { RadioGroup, RadioItem } from "@/components/ui/RadioGroup";
import { formatRupiah } from "@/lib/utils";

// Game categories
const GAME_TABS = [
  { id: "all", label: "Semua Game" },
  { id: "eFootball", label: "eFootball 2025" },
  { id: "Mobile Legends", label: "Mobile Legends" },
  { id: "FC Mobile", label: "FC Mobile" },
];

// Quick shortcut chips for JB Gamers
const QUICK_CHIPS = [
  { id: "nominus", label: "🛡️ Nominus / Siap Ganti" },
  { id: "ovr90", label: "⭐ OVR 90+ (Full Legend)" },
  { id: "warranty", label: "✅ Garansi Anti-Hackback" },
  { id: "budget300", label: "💰 Budget < 350rb" },
  { id: "epic", label: "🔥 Epic Booster / Big Time" },
];

export function ListingsExplorer({ initialSearch = "" }: { initialSearch?: string }) {
  // State
  const [search, setSearch] = useState(initialSearch);
  const [selectedGame, setSelectedGame] = useState("all");
  const [priceRange, setPriceRange] = useState<number[]>([50000, 3000000]);
  const [isNominusOnly, setIsNominusOnly] = useState(false);
  const [hasWarrantyOnly, setHasWarrantyOnly] = useState(false);
  const [selectedLoginMethod, setSelectedLoginMethod] = useState("all");
  const [minOvr, setMinOvr] = useState("all");
  const [minRating, setMinRating] = useState("all");
  const [statusFilter, setStatusFilter] = useState("AVAILABLE");
  const [sortBy, setSortBy] = useState("latest");

  // Filter logic
  const filteredListings = useMemo(() => {
    return dummyListings.filter((l) => {
      // 1. Game filter
      if (selectedGame !== "all" && l.game.toLowerCase() !== selectedGame.toLowerCase()) {
        return false;
      }

      // 2. Keyword search
      if (search.trim()) {
        const query = search.toLowerCase();
        const inTitle = l.title.toLowerCase().includes(query);
        const inDesc = l.description.toLowerCase().includes(query);
        const inNotes = l.details.notes?.toLowerCase().includes(query);
        const inSeller = l.seller.username.toLowerCase().includes(query);
        const inPlayers = l.details.players.some((p) => p.toLowerCase().includes(query));
        const inCards = l.details.cardTypes?.some((c) => c.toLowerCase().includes(query));
        const inLeague = l.details.league?.toLowerCase().includes(query);
        const inLogin = l.details.loginMethod?.toLowerCase().includes(query);

        if (!inTitle && !inDesc && !inNotes && !inSeller && !inPlayers && !inCards && !inLeague && !inLogin) {
          return false;
        }
      }

      // 3. Price range
      if (l.price < priceRange[0] || l.price > priceRange[1]) {
        return false;
      }

      // 4. Nominus
      if (isNominusOnly && !l.details.isNominus) {
        return false;
      }

      // 5. Warranty
      if (hasWarrantyOnly && !l.details.hasWarranty) {
        return false;
      }

      // 6. Login method
      if (selectedLoginMethod !== "all") {
        if (l.details.loginMethod !== selectedLoginMethod) {
          return false;
        }
      }

      // 7. OVR
      if (minOvr !== "all") {
        const minVal = parseInt(minOvr, 10);
        if (l.details.overall < minVal) {
          return false;
        }
      }

      // 8. Seller Rating
      if (minRating !== "all") {
        const minRat = parseFloat(minRating);
        if ((l.seller.rating ?? 0) < minRat) {
          return false;
        }
      }

      // 9. Status
      if (statusFilter !== "ALL" && l.status !== statusFilter) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "ovr_desc") return b.details.overall - a.details.overall;
      if (sortBy === "rating_desc") return (b.seller.rating ?? 0) - (a.seller.rating ?? 0);
      // Default: latest (newest first)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [
    search,
    selectedGame,
    priceRange,
    isNominusOnly,
    hasWarrantyOnly,
    selectedLoginMethod,
    minOvr,
    minRating,
    statusFilter,
    sortBy,
  ]);

  // Reset helper
  const resetFilters = () => {
    setSearch("");
    setSelectedGame("all");
    setPriceRange([50000, 3000000]);
    setIsNominusOnly(false);
    setHasWarrantyOnly(false);
    setSelectedLoginMethod("all");
    setMinOvr("all");
    setMinRating("all");
    setStatusFilter("AVAILABLE");
    setSortBy("latest");
  };

  // Active filter count
  const hasActiveFilters =
    search !== "" ||
    selectedGame !== "all" ||
    priceRange[0] !== 50000 ||
    priceRange[1] !== 3000000 ||
    isNominusOnly ||
    hasWarrantyOnly ||
    selectedLoginMethod !== "all" ||
    minOvr !== "all" ||
    minRating !== "all" ||
    statusFilter !== "AVAILABLE";

  return (
    <div>
      {/* 1. Main Search & Game Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs mb-6">
        <div className="flex flex-col md:flex-row items-stretch gap-3 mb-4">
          {/* Search Input with quick clear */}
          <div className="flex-1 flex items-center gap-2.5 px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:bg-white transition-all">
            <Search size={19} className="text-slate-400 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pemain (Messi, Mbappe, Chou), koin, OVR, no minus, Konami ID, atau nama seller..."
              className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="text-slate-400 hover:text-slate-600 p-1"
                title="Hapus kata kunci"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Game Dropdown */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 rounded-xl border border-slate-200">
              <Gamepad2 size={16} className="text-blue-600 shrink-0" />
              <select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                className="bg-transparent text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                {GAME_TABS.map((tab) => (
                  <option key={tab.id} value={tab.id}>
                    {tab.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Quick Filter Chips (Paling Sering Dicari Gamer JB) */}
        <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-slate-100 text-xs">
          <span className="font-semibold text-slate-500 flex items-center gap-1 text-[11px] uppercase tracking-wider">
            <Flame size={12} className="text-amber-500" /> Filter Cepat JB:
          </span>

          {/* Nominus chip */}
          <button
            onClick={() => setIsNominusOnly(!isNominusOnly)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              isNominusOnly
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
            }`}
          >
            <CheckCircle2 size={13} />
            Nominus (Email Siap Ganti)
          </button>

          {/* Anti-Hackback Warranty chip */}
          <button
            onClick={() => setHasWarrantyOnly(!hasWarrantyOnly)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              hasWarrantyOnly
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
            }`}
          >
            <ShieldCheck size={13} />
            Garansi Anti-Hackback
          </button>

          {/* OVR 90+ chip */}
          <button
            onClick={() => setMinOvr(minOvr === "90" ? "all" : "90")}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
              minOvr === "90"
                ? "bg-amber-500 text-slate-950 font-bold shadow-xs"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
            }`}
          >
            <Trophy size={13} />
            OVR 90+ Squad Meta
          </button>

          {/* Budget < 350k chip */}
          <button
            onClick={() => {
              if (priceRange[1] === 350000) {
                setPriceRange([50000, 3000000]);
              } else {
                setPriceRange([50000, 350000]);
              }
            }}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              priceRange[1] === 350000
                ? "bg-purple-600 text-white shadow-xs"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
            }`}
          >
            Budget &lt; Rp 350.000
          </button>
        </div>
      </div>

      {/* 2. Main Layout: Sidebar Filter & Grid */}
      <div className="grid lg:grid-cols-[270px_1fr] gap-8 items-start">
        {/* Left Sidebar Filter */}
        <aside className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs sticky top-24 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-blue-600" />
              <h3 className="font-bold text-slate-900 text-sm">Filter Spesifik</h3>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={11} /> Reset
              </button>
            )}
          </div>

          {/* Filter: Rentang Harga */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Budget / Harga
              </label>
            </div>
            <Slider
              value={priceRange}
              min={50000}
              max={3000000}
              step={50000}
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between text-xs text-slate-600 mt-2 font-semibold">
              <span>{formatRupiah(priceRange[0])}</span>
              <span>{formatRupiah(priceRange[1])}</span>
            </div>

            {/* Quick Price Buttons */}
            <div className="grid grid-cols-2 gap-1.5 mt-3">
              {[
                { label: "< 200rb", range: [50000, 200000] },
                { label: "200k - 500k", range: [200000, 500000] },
                { label: "500k - 1.5M", range: [500000, 1500000] },
                { label: "> 1.5 Juta", range: [1500000, 3000000] },
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => setPriceRange(p.range)}
                  className={`text-[11px] py-1 px-2 rounded-md font-medium border text-center transition-colors cursor-pointer ${
                    priceRange[0] === p.range[0] && priceRange[1] === p.range[1]
                      ? "bg-blue-50 text-blue-700 border-blue-300 font-bold"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter: Keamanan Akun & Tautan (Paling Ditakuti Buyer JB) */}
          <div className="pt-5 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2.5">
              Keamanan Akun
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer font-medium hover:text-slate-900">
                <Checkbox
                  checked={isNominusOnly}
                  onCheckedChange={(v) => setIsNominusOnly(v === true)}
                />
                <span>Hanya Nominus (Email Bersih)</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer font-medium hover:text-slate-900">
                <Checkbox
                  checked={hasWarrantyOnly}
                  onCheckedChange={(v) => setHasWarrantyOnly(v === true)}
                />
                <span>Garansi Anti-Hackback</span>
              </label>
            </div>
          </div>

          {/* Filter: Tipe Login Akun */}
          <div className="pt-5 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2.5">
              Metode Login
            </label>
            <select
              value={selectedLoginMethod}
              onChange={(e) => setSelectedLoginMethod(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="all">Semua Tipe Login</option>
              <option value="Konami ID">Konami ID (Single Login)</option>
              <option value="Moonton">Moonton (All Unbind)</option>
              <option value="EA Account">EA Account / FC Mobile</option>
            </select>
          </div>

          {/* Filter: Minimal OVR Squad */}
          <div className="pt-5 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2.5">
              Tingkat OVR / Squad
            </label>
            <RadioGroup value={minOvr} onValueChange={setMinOvr} className="space-y-2">
              {[
                { value: "all", label: "Semua OVR" },
                { value: "90", label: "OVR 90+ (Full Legend/Meta)" },
                { value: "85", label: "OVR 85+ (Divisi Tinggi)" },
                { value: "80", label: "OVR 80+ (Kompetitif)" },
              ].map((item) => (
                <label key={item.value} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer font-medium hover:text-slate-900">
                  <RadioItem value={item.value} />
                  <span>{item.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>

          {/* Filter: Status Ketersediaan */}
          <div className="pt-5 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2.5">
              Status Listing
            </label>
            <RadioGroup value={statusFilter} onValueChange={setStatusFilter} className="space-y-2">
              {[
                { value: "AVAILABLE", label: "Tersedia Saja (Ready)" },
                { value: "ALL", label: "Semua (Termasuk Terjual)" },
              ].map((item) => (
                <label key={item.value} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer font-medium hover:text-slate-900">
                  <RadioItem value={item.value} />
                  <span>{item.label}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
        </aside>

        {/* Right Content: Sort Toolbar, Active Filter Chips, Listings Grid */}
        <div>
          {/* Toolbar */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs sm:text-sm text-slate-600 font-medium">
              Menemukan <strong className="text-slate-900 font-bold">{filteredListings.length}</strong> akun game siap transaksi
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <ArrowUpDown size={12} /> Urutkan:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="latest">Terbaru Ditambahkan</option>
                <option value="ovr_desc">OVR Tertinggi</option>
                <option value="price_asc">Harga: Termurah</option>
                <option value="price_desc">Harga: Termahal</option>
                <option value="rating_desc">Rating Penjual Tertinggi</option>
              </select>
            </div>
          </div>

          {/* Active Filter Pills Bar */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap mb-5 text-xs">
              <span className="text-slate-400 text-[11px] font-medium">Filter Aktif:</span>

              {search && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200 font-medium">
                  Cari: &quot;{search}&quot;
                  <button onClick={() => setSearch("")} className="hover:text-blue-900">
                    <X size={12} />
                  </button>
                </span>
              )}

              {selectedGame !== "all" && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200 font-medium">
                  Game: {selectedGame}
                  <button onClick={() => setSelectedGame("all")} className="hover:text-blue-900">
                    <X size={12} />
                  </button>
                </span>
              )}

              {isNominusOnly && (
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200 font-medium">
                  Hanya Nominus
                  <button onClick={() => setIsNominusOnly(false)} className="hover:text-emerald-900">
                    <X size={12} />
                  </button>
                </span>
              )}

              {hasWarrantyOnly && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-200 font-medium">
                  Garansi Anti-Hackback
                  <button onClick={() => setHasWarrantyOnly(false)} className="hover:text-blue-900">
                    <X size={12} />
                  </button>
                </span>
              )}

              {minOvr !== "all" && (
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full border border-amber-200 font-medium">
                  OVR {minOvr}+
                  <button onClick={() => setMinOvr("all")} className="hover:text-amber-950">
                    <X size={12} />
                  </button>
                </span>
              )}

              {selectedLoginMethod !== "all" && (
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 font-medium">
                  Login: {selectedLoginMethod}
                  <button onClick={() => setSelectedLoginMethod("all")} className="hover:text-slate-900">
                    <X size={12} />
                  </button>
                </span>
              )}

              {(priceRange[0] !== 50000 || priceRange[1] !== 3000000) && (
                <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 font-medium">
                  {formatRupiah(priceRange[0])} - {formatRupiah(priceRange[1])}
                  <button onClick={() => setPriceRange([50000, 3000000])} className="hover:text-slate-900">
                    <X size={12} />
                  </button>
                </span>
              )}

              <button
                onClick={resetFilters}
                className="text-xs text-red-600 hover:text-red-700 font-semibold underline ml-1 cursor-pointer"
              >
                Hapus Semua
              </button>
            </div>
          )}

          {/* Listings Cards Grid */}
          {filteredListings.length > 0 ? (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredListings.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
              <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Tidak Ada Akun yang Cocok
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                Tidak ditemukan akun dengan kombinasi filter saat ini. Coba perlebar rentang harga, turunkan filter OVR, atau bersihkan kata kunci pencarian.
              </p>
              <button
                onClick={resetFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
