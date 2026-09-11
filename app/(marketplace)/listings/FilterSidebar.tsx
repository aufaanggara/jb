"use client";
import { useState } from "react";
import { Slider } from "@/components/ui/Slider";
import { Checkbox } from "@/components/ui/Checkbox";
import { RadioGroup, RadioItem } from "@/components/ui/RadioGroup";
import { formatRupiah } from "@/lib/utils";
import { Filter, RotateCcw } from "lucide-react";

export function FilterSidebar() {
  const [price, setPrice] = useState([50000, 5000000]);
  const [rating, setRating] = useState("all");
  const [statuses, setStatuses] = useState<{ available: boolean; sold: boolean }>({
    available: true,
    sold: false,
  });

  return (
    <aside className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs h-fit sticky top-24">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-blue-600" />
          <h3 className="font-bold text-slate-900 text-sm">Filter Pencarian</h3>
        </div>
        <button
          onClick={() => {
            setPrice([50000, 5000000]);
            setRating("all");
            setStatuses({ available: true, sold: false });
          }}
          className="text-[11px] font-medium text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw size={11} /> Reset
        </button>
      </div>

      {/* Filter: Rentang Harga */}
      <div className="mb-6">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
          Rentang Harga
        </label>
        <Slider
          className="mt-2"
          value={price}
          min={50000}
          max={5000000}
          step={50000}
          onValueChange={setPrice}
        />
        <div className="flex justify-between text-xs text-slate-600 mt-2 font-medium">
          <span>{formatRupiah(price[0])}</span>
          <span>{formatRupiah(price[1])}</span>
        </div>
      </div>

      {/* Filter: Rating Penjual */}
      <div className="mb-6 pt-5 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-3">
          Rating Penjual
        </label>
        <RadioGroup value={rating} onValueChange={setRating} className="flex flex-col gap-2.5">
          {[
            { value: "4.5", label: "⭐ 4.5 ke atas (Sangat Baik)" },
            { value: "4", label: "⭐ 4.0 ke atas" },
            { value: "all", label: "Semua Rating" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 hover:text-slate-900 cursor-pointer font-medium">
              <RadioItem value={opt.value} />
              {opt.label}
            </label>
          ))}
        </RadioGroup>
      </div>

      {/* Filter: Status Ketersediaan */}
      <div className="pt-5 border-t border-slate-100">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-3">
          Status Akun
        </label>
        <div className="flex flex-col gap-2.5">
          <label className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 hover:text-slate-900 cursor-pointer font-medium">
            <Checkbox
              checked={statuses.available}
              onCheckedChange={(v) => setStatuses((s) => ({ ...s, available: v === true }))}
            />
            <span>Tersedia (Ready)</span>
          </label>
          <label className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 hover:text-slate-900 cursor-pointer font-medium">
            <Checkbox
              checked={statuses.sold}
              onCheckedChange={(v) => setStatuses((s) => ({ ...s, sold: v === true }))}
            />
            <span>Sudah Terjual</span>
          </label>
        </div>
      </div>
    </aside>
  );
}
