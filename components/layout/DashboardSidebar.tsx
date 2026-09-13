"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ListChecks, Receipt, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const navByRole = {
  buyer: [
    { href: "/buyer", label: "Overview", icon: LayoutDashboard },
    { href: "/buyer/transactions", label: "Riwayat Transaksi", icon: Receipt },
  ],
  seller: [
    { href: "/seller", label: "Overview", icon: LayoutDashboard },
    { href: "/seller/transactions", label: "Transaksi Penjualan", icon: Receipt },
    { href: "/seller/listings", label: "Kelola Listing", icon: Package },
  ],
  admin: [
    { href: "/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/transactions", label: "Transaksi", icon: ListChecks },
  ],
};

export function DashboardSidebar({ role }: { role: "buyer" | "seller" | "admin" }) {
  const pathname = usePathname();
  const items = navByRole[role];
  return (
    <aside className="w-full lg:w-56 shrink-0">
      {/* Link back to Home / Marketplace */}
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200 w-full"
        >
          <span>←</span> Kembali ke Marketplace (Home)
        </Link>
      </div>

      <nav className="flex lg:flex-col gap-2 overflow-x-auto">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (!["/buyer", "/seller", "/admin"].includes(item.href) && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm whitespace-nowrap",
                active ? "bg-accent-primary/10 text-accent-primary border border-border-accent" : "text-txt-secondary hover:text-txt-primary"
              )}
            >
              <item.icon size={16} /> {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
