"use client";

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { CreateListingForm } from "@/components/marketplace/CreateListingForm";

export default function SellerNewListingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
      <DashboardSidebar role="seller" />
      <div className="flex-1">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-slate-900">Buat Iklan Akun Baru</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Unggah foto screenshot dan lengkapi detail akun untuk diterbitkan ke katalog RekberGG.
          </p>
        </div>

        <CreateListingForm />
      </div>
    </div>
  );
}
