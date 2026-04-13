"use client";

import { useState, useCallback, useEffect } from "react";
import ScrollArea from "@mdigitalcn/uikit/scroll-area";
import { cn } from "@mdigitalcn/uikit";
import type { HeaderSidebarLayoutProps } from "./HeaderSidebarLayout.types";

export default function HeaderSidebarLayout({
  header,
  sidebar,
  children,
  breadcrumbs,
  sidebarWidth = 256,
  headerHeight = 56,
  mobileOpen: controlledMobileOpen,
  onMobileOpenChange,
  className,
}: HeaderSidebarLayoutProps) {
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
      {/* ── Full-width header ───────────────────────── */}
      <header
        className="z-40 flex shrink-0 items-center border-b border-border bg-background"
        style={{ height: headerHeight }}
      >
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

      {/* ── Below header: sidebar + content ─────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <aside
          className="hidden shrink-0 border-r border-border md:block"
          style={{ width: sidebarWidth }}
          aria-label="Sidebar"
        >
          <ScrollArea className="h-full">{sidebar}</ScrollArea>
        </aside>

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden" style={{ top: headerHeight }}>
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
              <ScrollArea className="h-full">{sidebar}</ScrollArea>
            </aside>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {breadcrumbs && (
            <div className="border-b border-border bg-surface/30 px-4 py-2 text-sm sm:px-6">
              {breadcrumbs}
            </div>
          )}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
