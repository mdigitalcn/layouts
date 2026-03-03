"use client";

import { useState, useCallback, useEffect } from "react";
import ScrollArea from "@mdigital_ui/ui/scroll-area";
import { cn } from "@mdigital_ui/ui";
import type { HolyGrailLayoutProps } from "./HolyGrailLayout.types";

export default function HolyGrailLayout({
  header,
  leftSidebar,
  children,
  rightPanel,
  footer,
  leftWidth = 256,
  rightWidth = 280,
  rightPanelOpen = true,
  mobileOpen: controlledMobileOpen,
  onMobileOpenChange,
  className,
}: HolyGrailLayoutProps) {
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

  return (
    <div className={cn("flex h-svh flex-col overflow-hidden", className)}>
      {/* ── Header ──────────────────────────────────── */}
      <header className="z-40 flex shrink-0 items-center border-b border-border bg-background">
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
      </header>

      {/* ── Body: left + main + right ───────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop left sidebar */}
        <aside
          className="hidden shrink-0 border-r border-border md:block"
          style={{ width: leftWidth }}
          aria-label="Left sidebar"
        >
          <ScrollArea className="h-full">{leftSidebar}</ScrollArea>
        </aside>

        {/* Mobile left sidebar overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <aside
              className="relative z-10 w-72 max-w-[85vw] bg-background shadow-xl animate-in slide-in-from-left duration-200"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
            >
              <ScrollArea className="h-full">{leftSidebar}</ScrollArea>
            </aside>
          </div>
        )}

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-auto">{children}</main>
          {footer && (
            <footer className="border-t border-border">{footer}</footer>
          )}
        </div>

        {/* Desktop right panel */}
        {rightPanel && rightPanelOpen && (
          <aside
            className="hidden shrink-0 border-l border-border lg:block"
            style={{ width: rightWidth }}
            aria-label="Right panel"
          >
            <ScrollArea className="h-full">{rightPanel}</ScrollArea>
          </aside>
        )}
      </div>
    </div>
  );
}
