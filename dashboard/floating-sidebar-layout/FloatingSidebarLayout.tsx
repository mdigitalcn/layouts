"use client";

import { useState, useCallback, useEffect } from "react";
import ScrollArea from "@mdigitalcn/uikit/scroll-area";
import { cn } from "@mdigitalcn/uikit";
import type {
  FloatingSidebarLayoutProps,
  FloatingSidebarNavItem,
} from "./FloatingSidebarLayout.types";

/* ── Nav link ─────────────────────────────────────────── */

function NavLink({ item }: { item: FloatingSidebarNavItem }) {
  const El = item.href ? "a" : "button";
  return (
    <El
      href={item.href as any}
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
        item.active
          ? "bg-primary/10 text-primary font-medium"
          : "text-text-secondary hover:bg-surface hover:text-text-primary",
      )}
      aria-current={item.active ? "page" : undefined}
    >
      {item.icon && <span className="shrink-0">{item.icon}</span>}
      <span className="truncate">{item.label}</span>
    </El>
  );
}

/* ── Sidebar content ──────────────────────────────────── */

function SidebarContent({
  navItems,
  sidebarHeader,
  sidebarFooter,
}: {
  navItems: FloatingSidebarNavItem[];
  sidebarHeader?: React.ReactNode;
  sidebarFooter?: React.ReactNode;
}) {
  return (
    <>
      {sidebarHeader && (
        <div className="border-b border-border/50 p-3">{sidebarHeader}</div>
      )}
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 p-2" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.id} item={item} />
          ))}
        </nav>
      </ScrollArea>
      {sidebarFooter && (
        <div className="border-t border-border/50 p-3">{sidebarFooter}</div>
      )}
    </>
  );
}

/* ── Main layout ──────────────────────────────────────── */

export default function FloatingSidebarLayout({
  navItems,
  sidebarHeader,
  sidebarFooter,
  header,
  children,
  sidebarWidth = 256,
  inset = 12,
  mobileOpen: controlledMobileOpen,
  onMobileOpenChange,
  className,
}: FloatingSidebarLayoutProps) {
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
    <div
      className={cn("flex h-svh overflow-hidden bg-surface/30", className)}
      style={{ padding: inset }}
    >
      {/* ── Desktop floating sidebar ────────────────── */}
      <aside
        className="hidden shrink-0 flex-col rounded-xl border border-border bg-background shadow-sm md:flex"
        style={{ width: sidebarWidth }}
        aria-label="Sidebar"
      >
        <SidebarContent
          navItems={navItems}
          sidebarHeader={sidebarHeader}
          sidebarFooter={sidebarFooter}
        />
      </aside>

      {/* ── Mobile overlay ──────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <aside
            className="relative z-10 m-2 flex w-72 max-w-[85vw] flex-col rounded-xl border border-border bg-background shadow-xl animate-in slide-in-from-left duration-200"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <SidebarContent
              navItems={navItems}
              sidebarHeader={sidebarHeader}
              sidebarFooter={sidebarFooter}
            />
          </aside>
        </div>
      )}

      {/* ── Main area ───────────────────────────────── */}
      <div
        className="flex flex-1 flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm"
        style={{ marginLeft: inset }}
      >
        {/* Mobile topbar */}
        <div className="flex items-center border-b border-border px-3 py-2 md:hidden">
          <button
            className="rounded-md p-2 text-text-secondary hover:bg-surface"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 5h14M3 10h14M3 15h14" />
            </svg>
          </button>
        </div>

        {header && (
          <header className="border-b border-border">{header}</header>
        )}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
