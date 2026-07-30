import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export function LoadingBar() {
  const routerIsLoading = useRouterState({
    select: (s) => s.status === "pending",
  });

  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    let frame1: number | undefined;
    let frame2: number | undefined;
    let finishTimeout: ReturnType<typeof setTimeout> | undefined;
    let resetTimeout: ReturnType<typeof setTimeout> | undefined;

    if (routerIsLoading) {
      frame1 = requestAnimationFrame(() => {
        setVisible(true);
        setOpacity(1);
        setIsAnimating(true);
        setProgress(0);

        frame2 = requestAnimationFrame(() => {
          setProgress(90);
        });
      });
    } else if (visible) {
      frame1 = requestAnimationFrame(() => {
        setIsAnimating(false);
        setProgress(100);

        finishTimeout = setTimeout(() => {
          setOpacity(0);

          resetTimeout = setTimeout(() => {
            setVisible(false);
            setProgress(0);
          }, 300);
        }, 250);
      });
    }

    return () => {
      if (frame1) cancelAnimationFrame(frame1);
      if (frame2) cancelAnimationFrame(frame2);
      if (finishTimeout) clearTimeout(finishTimeout);
      if (resetTimeout) clearTimeout(resetTimeout);
    };
  }, [routerIsLoading, visible]);

  if (!visible) return null;

  return (
    <div
      className="bg-primary fixed top-0 right-0 left-0 z-9999 h-1 shadow-[0_0_10px_rgba(79,70,229,0.5)]"
      style={{
        width: `${progress}%`,
        opacity,
        transition: isAnimating
          ? "width 10s cubic-bezier(0.08, 0.8, 0.1, 1), opacity 200ms ease"
          : "width 250ms ease-out, opacity 300ms ease",
      }}
    />
  );
}
