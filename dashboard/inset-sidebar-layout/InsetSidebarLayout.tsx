"use client";

import { useState, useCallback, useEffect } from "react";
import ScrollArea from "@mdigital_ui/ui/scroll-area";
import { cn } from "@mdigital_ui/ui";
import type { InsetSidebarLayoutProps } from "./InsetSidebarLayout.types";

const gapMap: Record<string, string> = {
  sm: "gap-2 p-2",
  md: "gap-4 p-4",
  lg: "gap-6 p-6",
};

export default function InsetSidebarLayout({
  sidebar,
  header,
  children,
  sidebarPosition = "left",
  sidebarWidth = 256,
  gap = "md",
  mobileOpen: controlledMobileOpen,
  onMobileOpenChange,
  className,
}: InsetSidebarLayoutProps) {
  /* Mobile state */
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);
  const mobileOpen = controlledMobileOpen ?? internalMobileOpen;
  const setMobileOpen = useCallback(
    (v: boolean) => {
      setInternalMobileOpen(v);
      onMobileOpenChange?.(v);
    },
    [onMobileOpenChange],
  );

  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileOpen, setMobileOpen]);

  const sidebarEl = (
    <aside
      className="hidden shrink-0 rounded-lg border border-border bg-surface/30 md:block"
      style={{ width: sidebarWidth }}
      aria-label="Sidebar"
    >
      <ScrollArea className="h-full">{sidebar}</ScrollArea>
    </aside>
  );

  return (
    <div className={cn("flex min-h-svh flex-col", className)}>
      {/* Header */}
      {header && (
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center">
            {/* Mobile hamburger */}
            <button
              className="ml-2 rounded-md p-2 text-text-secondary hover:bg-surface md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M3 5h14M3 10h14M3 15h14" />
              </svg>
            </button>
            <div className="flex-1">{header}</div>
          </div>
        </header>
      )}

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <aside
            className={cn(
              "relative z-10 w-72 max-w-[85vw] bg-background shadow-xl animate-in duration-200",
              sidebarPosition === "left"
                ? "slide-in-from-left"
                : "ml-auto slide-in-from-right",
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <ScrollArea className="h-full">{sidebar}</ScrollArea>
          </aside>
        </div>
      )}

      {/* Content area */}
      <div className={cn("flex flex-1", gapMap[gap])}>
        {sidebarPosition === "left" && sidebarEl}
        <main className="flex-1 overflow-auto">{children}</main>
        {sidebarPosition === "right" && sidebarEl}
      </div>
    </div>
  );
}
