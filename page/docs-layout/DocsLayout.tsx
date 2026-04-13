"use client";

import { useState, useCallback, useEffect } from "react";
import ScrollArea from "@mdigitalcn/uikit/scroll-area";
import { cn } from "@mdigitalcn/uikit";
import type {
  DocsLayoutProps,
  DocsSidebarItem,
  DocsTocItem,
} from "./DocsLayout.types";

/* ── Sidebar nav tree ─────────────────────────────────── */

function SidebarItem({ item, depth = 0 }: { item: DocsSidebarItem; depth?: number }) {
  const El = item.href ? "a" : "button";
  return (
    <div>
      <El
        href={item.href as any}
        className={cn(
          "flex w-full items-center rounded-md px-3 py-1.5 text-sm transition-colors",
          item.active
            ? "bg-primary/10 text-primary font-medium"
            : "text-text-secondary hover:bg-surface hover:text-text-primary",
        )}
        style={{ paddingLeft: 12 + depth * 12 }}
        aria-current={item.active ? "page" : undefined}
      >
        {item.label}
      </El>
      {item.children && item.children.length > 0 && (
        <div className="flex flex-col gap-0.5">
          {item.children.map((child) => (
            <SidebarItem key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Table of contents ────────────────────────────────── */

function TableOfContents({
  items,
  onSelect,
}: {
  items: DocsTocItem[];
  onSelect?: (id: string) => void;
}) {
  return (
    <nav aria-label="Table of contents">
      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-secondary">
        On this page
      </h4>
      <div className="flex flex-col gap-0.5">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect?.(item.id)}
            className={cn(
              "text-left text-sm transition-colors",
              item.active
                ? "text-primary font-medium"
                : "text-text-secondary hover:text-text-primary",
            )}
            style={{ paddingLeft: (item.level - 1) * 12 }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ── Main layout ──────────────────────────────────────── */

export default function DocsLayout({
  header,
  sidebarItems,
  children,
  toc,
  onTocSelect,
  pagination,
  sidebarWidth = 256,
  tocWidth = 220,
  mobileOpen: controlledMobileOpen,
  onMobileOpenChange,
  className,
}: DocsLayoutProps) {
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
    <div className={cn("flex min-h-svh flex-col", className)}>
      {/* ── Header ──────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center">
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

      {/* ── Body ────────────────────────────────────── */}
      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside
          className="hidden shrink-0 border-r border-border md:block"
          style={{ width: sidebarWidth }}
          aria-label="Documentation navigation"
        >
          <div className="sticky top-14">
            <ScrollArea className="h-[calc(100svh-3.5rem)]">
              <div className="flex flex-col gap-0.5 p-3">
                {sidebarItems.map((item) => (
                  <SidebarItem key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
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
              aria-label="Documentation navigation"
            >
              <ScrollArea className="h-full">
                <div className="flex flex-col gap-0.5 p-3">
                  {sidebarItems.map((item) => (
                    <SidebarItem key={item.id} item={item} />
                  ))}
                </div>
              </ScrollArea>
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl">
            <article className="prose-sm">{children}</article>
            {pagination && (
              <div className="mt-12 border-t border-border pt-6">
                {pagination}
              </div>
            )}
          </div>
        </main>

        {/* Desktop TOC */}
        {toc && toc.length > 0 && (
          <div
            className="hidden shrink-0 xl:block"
            style={{ width: tocWidth }}
          >
            <div className="sticky top-14 p-4">
              <TableOfContents items={toc} onSelect={onTocSelect} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
