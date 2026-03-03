"use client";

import { useState, useCallback, useEffect } from "react";
import ScrollArea from "@mdigital_ui/ui/scroll-area";
import Tooltip from "@mdigital_ui/ui/tooltip";
import { cn } from "@mdigital_ui/ui";
import type { DualSidebarLayoutProps, RailItem } from "./DualSidebarLayout.types";

/* ── Rail button ──────────────────────────────────────── */

function RailButton({
  item,
  onClick,
}: {
  item: RailItem;
  onClick: () => void;
}) {
  return (
    <Tooltip content={item.label} side="right">
      <button
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-md text-lg transition-colors",
          item.active
            ? "bg-primary/10 text-primary"
            : "text-text-secondary hover:bg-surface hover:text-text-primary",
        )}
        onClick={onClick}
        aria-label={item.label}
        aria-current={item.active ? "true" : undefined}
      >
        {item.icon}
      </button>
    </Tooltip>
  );
}

/* ── Main layout ──────────────────────────────────────── */

export default function DualSidebarLayout({
  railItems,
  onRailSelect,
  sidePanel,
  sidePanelTitle,
  sidePanelWidth = 240,
  header,
  children,
  railFooter,
  mobileOpen: controlledMobileOpen,
  onMobileOpenChange,
  className,
}: DualSidebarLayoutProps) {
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

  /* Rail content (shared between desktop and mobile) */
  const railContent = (
    <div className="flex flex-col items-center gap-1 py-2">
      {railItems.map((item) => (
        <RailButton
          key={item.id}
          item={item}
          onClick={() => onRailSelect(item.id)}
        />
      ))}
    </div>
  );

  /* Side panel content */
  const panelContent = sidePanel && (
    <>
      {sidePanelTitle && (
        <div className="border-b border-border px-3 py-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            {sidePanelTitle}
          </h3>
        </div>
      )}
      <ScrollArea className="h-full">{sidePanel}</ScrollArea>
    </>
  );

  return (
    <div className={cn("flex h-svh overflow-hidden", className)}>
      {/* ── Desktop: icon rail ──────────────────────── */}
      <div className="hidden w-14 shrink-0 flex-col items-center border-r border-border bg-surface/30 md:flex">
        <div className="flex-1">{railContent}</div>
        {railFooter && (
          <div className="border-t border-border py-2">{railFooter}</div>
        )}
      </div>

      {/* ── Desktop: side panel ─────────────────────── */}
      {sidePanel && (
        <aside
          className="hidden shrink-0 border-r border-border md:block"
          style={{ width: sidePanelWidth }}
          aria-label="Side panel"
        >
          {panelContent}
        </aside>
      )}

      {/* ── Mobile overlay ──────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="relative z-10 flex animate-in slide-in-from-left duration-200">
            {/* Rail */}
            <div className="flex w-14 flex-col items-center border-r border-border bg-surface/30">
              <div className="flex-1">{railContent}</div>
              {railFooter && (
                <div className="border-t border-border py-2">{railFooter}</div>
              )}
            </div>
            {/* Panel */}
            {sidePanel && (
              <aside
                className="w-60 bg-background shadow-xl"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation"
              >
                {panelContent}
              </aside>
            )}
          </div>
        </div>
      )}

      {/* ── Main area ───────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
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
