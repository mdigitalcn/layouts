"use client";

import { useState, useCallback } from "react";
import { cn } from "@mdigitalcn/uikit";
import type { TopnavLayoutProps } from "./TopnavLayout.types";

const maxWidthMap: Record<string, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "",
};

export default function TopnavLayout({
  logo,
  navItems,
  actions,
  children,
  sticky = true,
  blurHeader = true,
  maxWidth = "full",
  mobileMenuOpen: controlledMobileMenuOpen,
  onMobileMenuOpenChange,
  className,
}: TopnavLayoutProps) {
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const menuOpen = controlledMobileMenuOpen ?? internalMenuOpen;
  const setMenuOpen = useCallback(
    (v: boolean) => {
      setInternalMenuOpen(v);
      onMobileMenuOpenChange?.(v);
    },
    [onMobileMenuOpenChange],
  );

  const hasNav = navItems && navItems.length > 0;

  return (
    <div className={cn("flex min-h-svh flex-col", className)}>
      {/* ── Header ──────────────────────────────────── */}
      <header
        className={cn(
          "z-40 border-b border-border bg-background",
          sticky && "sticky top-0",
          blurHeader && "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        )}
      >
        <div className="flex items-center gap-4 px-4 py-3 sm:gap-6 sm:px-6">
          {logo && <div className="shrink-0">{logo}</div>}

          {/* Desktop nav */}
          {hasNav && (
            <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
              {navItems.map((item, i) => {
                const El = item.href ? "a" : "button";
                return (
                  <El
                    key={i}
                    href={item.href as any}
                    onClick={item.onClick}
                    className={cn(
                      "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors",
                      item.active
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-text-secondary hover:bg-surface hover:text-text-primary",
                    )}
                    aria-current={item.active ? "page" : undefined}
                  >
                    {item.icon && <span className="shrink-0">{item.icon}</span>}
                    {item.label}
                  </El>
                );
              })}
            </nav>
          )}

          {/* Spacer + actions */}
          <div className="ml-auto flex items-center gap-2">
            {actions}
            {/* Mobile hamburger */}
            {hasNav && (
              <button
                className="rounded-md p-2 text-text-secondary hover:bg-surface md:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  {menuOpen ? (
                    <path d="M5 5l10 10M15 5L5 15" />
                  ) : (
                    <path d="M3 5h14M3 10h14M3 15h14" />
                  )}
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {hasNav && menuOpen && (
          <nav className="border-t border-border px-4 py-2 md:hidden" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1">
              {navItems.map((item, i) => {
                const El = item.href ? "a" : "button";
                return (
                  <El
                    key={i}
                    href={item.href as any}
                    onClick={() => {
                      item.onClick?.();
                      setMenuOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                      item.active
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-text-secondary hover:bg-surface hover:text-text-primary",
                    )}
                    aria-current={item.active ? "page" : undefined}
                  >
                    {item.icon && <span className="shrink-0">{item.icon}</span>}
                    {item.label}
                  </El>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {/* ── Content ─────────────────────────────────── */}
      <main className={cn("mx-auto w-full flex-1", maxWidthMap[maxWidth])}>
        {children}
      </main>
    </div>
  );
}
