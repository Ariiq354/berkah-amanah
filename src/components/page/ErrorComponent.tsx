import { Link, useRouter } from "@tanstack/react-router";
import { RefreshCw, Home, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

import { Button } from "#/components/ui/button";

interface ErrorComponentProps {
  error: Error & { message?: string; stack?: string };
  reset?: () => void;
}

export function ErrorComponent({ error, reset }: ErrorComponentProps) {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);

  const handleRetry = () => {
    if (reset) {
      reset();
    } else {
      router.invalidate();
    }
  };

  return (
    <div className="bg-background flex min-h-screen w-full flex-col items-center justify-center px-4 py-12 text-center">
      <div className="w-full max-w-md">
        <span className="text-destructive text-sm font-semibold tracking-wider uppercase">
          Terjadi Kesalahan
        </span>
        <h1 className="text-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Error Sistem
        </h1>
        <p className="text-muted-foreground mt-4 text-base leading-relaxed">
          Maaf, sistem mendeteksi adanya kesalahan yang tidak terduga saat
          memproses halaman ini.
        </p>

        {/* Error Message Box */}
        <div className="bg-muted border-border mt-6 rounded-xl border p-4 text-left">
          <span className="text-destructive text-xs font-semibold tracking-wider uppercase">
            Pesan Error
          </span>
          <p className="text-foreground/80 mt-1 font-mono text-xs break-all">
            {error.message || "Unknown error occurred"}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            variant="default"
            onClick={handleRetry}
            className="flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Coba Lagi
          </Button>
          <Button
            variant="outline"
            render={<Link to="/" />}
            className="flex items-center justify-center gap-2"
          >
            <Home className="h-4 w-4" />
            Beranda
          </Button>
        </div>

        {/* Technical Details Toggle */}
        {error.stack && (
          <div className="border-border mt-6 border-t pt-4">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-muted-foreground hover:text-foreground flex w-full items-center justify-between text-xs font-medium outline-none"
            >
              <span>Detail Teknis (Developer)</span>
              {showDetails ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </button>

            {showDetails && (
              <div className="mt-4 text-left">
                <pre className="bg-muted text-muted-foreground border-border max-h-60 overflow-y-auto rounded-xl border p-4 font-mono text-[10px] leading-relaxed break-all whitespace-pre-wrap">
                  {error.stack}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
