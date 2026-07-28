import { Link } from "@tanstack/react-router";
import { ArrowLeft, Home } from "lucide-react";

import { Button } from "#/components/ui/button";

export function NotFoundComponent() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="bg-background flex min-h-screen w-full flex-col items-center justify-center px-4 text-center">
      <div className="w-full max-w-md">
        <span className="text-primary text-sm font-semibold tracking-wider uppercase">
          Error 404
        </span>
        <h1 className="text-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Halaman Tidak Ditemukan
        </h1>
        <p className="text-muted-foreground mt-4 text-base leading-relaxed">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman
          tersebut telah dipindahkan, dihapus, atau link yang Anda tuju salah.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
          <Button
            variant="default"
            render={<Link to="/" />}
            className="flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            Menu Utama
          </Button>
        </div>
      </div>
    </div>
  );
}
