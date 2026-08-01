import {
  Activity,
  BadgeCheck,
  ChartColumn,
  ChartNoAxesCombined,
  Landmark,
  LayoutDashboard,
  ShoppingCart,
  Store,
  Truck,
  Wallet,
  Percent,
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "#/components/ui/sidebar";

import { NavMain, type NavGroup } from "./NavMain";
import { NavUser } from "./NavUser";

const navMain: NavGroup[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Beranda",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "Operasional",
    items: [
      {
        title: "Monitoring Simpanan",
        url: "#",
        icon: Activity,
      },
      {
        title: "Monitoring Pembiayaan",
        url: "#",
        icon: Activity,
      },
      {
        title: "Monitoring",
        icon: ChartColumn,
        items: [
          {
            title: "Anggota",
            url: "#",
          },
          {
            title: "Simpanan",
            url: "#",
          },
          {
            title: "Pembiayaan",
            url: "#",
          },
          {
            title: "Hutang Agen",
            url: "#",
          },
          {
            title: "SHU",
            url: "#",
          },
        ],
      },
      {
        title: "Bagi Hasil Usaha",
        url: "#",
        icon: ChartNoAxesCombined,
      },
      {
        title: "Transaksi",
        icon: Wallet,
        items: [
          {
            title: "Input Transaksi",
            url: "#",
          },
          {
            title: "Setoran",
            url: "#",
          },
          {
            title: "Penarikan",
            url: "#",
          },
          {
            title: "Pemindahbukuan",
            url: "#",
          },
          {
            title: "Angsuran",
            items: [
              {
                title: "Internal",
                url: "#",
              },
              {
                title: "External",
                url: "#",
              },
            ],
          },
          {
            title: "Pembiayaan",
            items: [
              {
                title: "Internal",
                url: "#",
              },
              {
                title: "External",
                url: "#",
              },
              {
                title: "Hutang",
                url: "#",
              },
            ],
          },
        ],
      },
      {
        title: "Persetujuan",
        icon: BadgeCheck,
        items: [
          {
            title: "Setoran",
            url: "#",
          },
          {
            title: "Penarikan",
            url: "#",
          },
          {
            title: "Pemindahbukuan",
            url: "#",
          },
          {
            title: "Angsuran Internal",
            url: "#",
          },
          {
            title: "Angsuran External",
            url: "#",
          },
          {
            title: "Pembiayaan Internal",
            url: "#",
          },
          {
            title: "Pembiayaan External",
            url: "#",
          },
          {
            title: "Pembiayaan TDS-0",
            url: "#",
          },
          {
            title: "Anggota Baru",
            url: "#",
          },
        ],
      },
    ],
  },

  {
    title: "Keuangan",
    items: [
      {
        title: "Daftar Margin",
        url: "#",
        icon: Percent,
      },
      {
        title: "Laporan Keuangan",
        icon: Landmark,
        items: [
          {
            title: "Daftar Akun",
            url: "/dashboard/akun",
          },
          {
            title: "Daftar Transaksi",
            url: "#",
          },
          {
            title: "Summary Unbalance",
            url: "#",
          },
          {
            title: "Neraca",
            items: [
              {
                title: "Bulanan",
                url: "#",
              },
              {
                title: "Summary",
                url: "#",
              },
            ],
          },
          {
            title: "Laba Rugi",
            items: [
              {
                title: "Bulanan",
                url: "#",
              },
              {
                title: "Summary",
                url: "#",
              },
            ],
          },
        ],
      },
    ],
  },

  {
    title: "Bisnis",
    items: [
      {
        title: "Jual Beli",
        icon: ShoppingCart,
        items: [
          {
            title: "Pembelian",
            url: "#",
          },
          {
            title: "Penjualan",
            url: "#",
          },
          {
            title: "Daftar Mobil",
            url: "#",
          },
        ],
      },

      {
        title: "Distributor TDS-0",
        icon: Truck,
        items: [
          {
            title: "Pembelian",
            url: "#",
          },
          {
            title: "Penjualan",
            items: [
              {
                title: "Athar",
                url: "#",
              },
              {
                title: "TDS-0 Kemasan",
                url: "#",
              },
            ],
          },
          {
            title: "Pembayaran",
            items: [
              {
                title: "Input",
                url: "#",
              },
              {
                title: "Monitoring",
                url: "#",
              },
            ],
          },
          {
            title: "Daftar Hutang Agen",
            url: "#",
          },
          {
            title: "Monitoring Anggota",
            url: "#",
          },
        ],
      },

      {
        title: "Agen TDS-0",
        icon: Store,
        items: [
          {
            title: "Pemesanan Athar",
            url: "#",
          },
          {
            title: "Daftar Hutang Athar",
            url: "#",
          },
        ],
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex h-14 w-full items-center gap-2 overflow-hidden px-3 py-2 text-left text-sm">
              <img src="/logo.webp" alt="Berkah Amanah" className="size-8" />

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Berkah Amanah</span>
                <span className="truncate text-xs">Koperasi</span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
