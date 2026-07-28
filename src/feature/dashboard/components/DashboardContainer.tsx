import { useQuery } from "@tanstack/react-query";
import { useRouteContext } from "@tanstack/react-router";
import {
  Users,
  UserCheck,
  Wallet,
  Server,
  Calendar,
  TrendingUp,
} from "lucide-react";

import { AppBarChart } from "#/components/chart/BarChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Skeleton } from "#/components/ui/skeleton";
import { getOptionsKelompokQueryOptions } from "#/feature/kelompok/queries/kelompok-query";

export function DashboardContainer() {
  const { user } = useRouteContext({ from: "/dashboard" });
  const { data: kelompokList, isLoading: isKelompokLoading } = useQuery(
    getOptionsKelompokQueryOptions,
  );

  const displayName = user?.name || user?.displayUsername || "Pengguna";

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="from-primary/10 via-primary/5 border-primary/10 relative overflow-hidden rounded-3xl border bg-linear-to-r to-transparent p-6 sm:p-8">
        <div className="relative z-10 space-y-2">
          <span className="bg-primary/10 text-primary dark:bg-primary/20 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium">
            <span className="bg-primary h-1.5 w-1.5 animate-pulse rounded-full" />
            Portal Berkah Amanah
          </span>
          <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Selamat Datang, {displayName}!
          </h1>
          <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed sm:text-base">
            Berikut adalah ringkasan data kelompok, grafik aktivitas bulanan,
            dan status sistem Anda untuk hari ini.
          </p>
        </div>
        <div className="bg-primary/10 pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full opacity-50 blur-3xl" />
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Kelompok */}
        <Card className="hover:ring-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Total Kelompok
            </CardTitle>
            <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
              <Users className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            {isKelompokLoading ? (
              <Skeleton className="h-9 w-20" />
            ) : (
              <div className="text-3xl font-bold tracking-tight">
                {kelompokList?.length ?? 0}
              </div>
            )}
            <p className="text-muted-foreground mt-2 flex items-center gap-1 text-xs">
              <TrendingUp className="h-3 w-3 text-emerald-500" />
              <span className="font-medium text-emerald-500">Aktif</span> di
              portal database
            </p>
          </CardContent>
        </Card>

        {/* Card 2: Estimasi Anggota */}
        <Card className="hover:ring-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Total Anggota
            </CardTitle>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <UserCheck className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">128</div>
            <p className="text-muted-foreground mt-2 text-xs">
              <span className="font-medium text-emerald-500">+12</span> anggota
              baru bulan ini
            </p>
          </CardContent>
        </Card>

        {/* Card 3: Dana Kas (Estimasi) */}
        <Card className="hover:ring-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Simpanan Kas
            </CardTitle>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Wallet className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">Rp 8.5M</div>
            <p className="text-muted-foreground mt-2 text-xs">
              Rata-rata peningkatan per bulan
            </p>
          </CardContent>
        </Card>

        {/* Card 4: Status Server */}
        <Card className="hover:ring-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-muted-foreground text-sm font-medium">
              Status Sistem
            </CardTitle>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Server className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1.5 text-3xl font-bold tracking-tight text-emerald-500">
              Normal
            </div>
            <p className="text-muted-foreground mt-2 flex items-center gap-1 text-xs">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              Semua server operasional
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Left: Chart Card */}
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-sm lg:col-span-2">
        <CardHeader className="border-border/50 border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">
                Grafik Aktivitas
              </CardTitle>
              <CardDescription>
                Visualisasi aktivitas kunjungan Desktop vs Mobile
              </CardDescription>
            </div>
            <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
              <Calendar className="h-3.5 w-3.5" />
              <span>6 Bulan Terakhir</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <AppBarChart
            data={chartData}
            dataKey={["desktop", "mobile"]}
            columnKey="month"
          />
        </CardContent>
      </Card>
    </div>
  );
}
