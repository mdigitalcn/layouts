"use client";

import { useState, useCallback, useEffect } from "react";
import ScrollArea from "@mdigital_ui/ui/scroll-area";
import Tooltip from "@mdigital_ui/ui/tooltip";
import { cn } from "@mdigital_ui/ui";
import type { SidebarLayoutProps, SidebarNavItem } from "./SidebarLayout.types";

/* ── Nav link ─────────────────────────────────────────── */

function NavLink({ item, collapsed }: { item: SidebarNavItem; collapsed: boolean }) {
  const El = item.href ? "a" : "button";
  const base = cn(
    "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
    item.active
      ? "bg-primary/10 text-primary font-medium"
      : "text-text-secondary hover:bg-surface hover:text-text-primary",
    item.disabled && "pointer-events-none opacity-50",
    collapsed && "justify-center px-2",
  );

  const content = (
    <El
      href={item.href as any}
      className={base}
      aria-current={item.active ? "page" : undefined}
      aria-disabled={item.disabled}
    >
      {item.icon && <span className="shrink-0">{item.icon}</span>}
      {!collapsed && <span className="truncate">{item.label}</span>}
    </El>
  );

  if (collapsed) {
    return (
      <Tooltip content={item.label} side="right">
        {content}
      </Tooltip>
    );
  }

  return (
    <>
      {content}
      {item.children && item.children.length > 0 && (
        <div className="ml-6 flex flex-col gap-0.5">
          {item.children.map((child) => (
            <NavLink key={child.id} item={child} collapsed={false} />
          ))}
        </div>
      )}
    </>
  );
}

/* ── Sidebar content ──────────────────────────────────── */

function SidebarContent({
  navItems,
  sidebarHeader,
  sidebarFooter,
  collapsed,
  isCollapsible,
  onToggle,
}: {
  navItems: SidebarNavItem[];
  sidebarHeader?: React.ReactNode;
  sidebarFooter?: React.ReactNode;
  collapsed: boolean;
  isCollapsible: boolean;
  onToggle: () => void;
}) {
  return (
    <>
      {sidebarHeader && (
        <div className="border-b border-border p-3">{sidebarHeader}</div>
      )}
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-1 p-2" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.id} item={item} collapsed={collapsed} />
          ))}
        </nav>
      </ScrollArea>
      {isCollapsible && (
        <div className="border-t border-border p-2">
          <button
            className="flex w-full items-center justify-center rounded-md p-2 text-sm text-text-secondary hover:bg-surface"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>
      )}
      {sidebarFooter && (
        <div className="border-t border-border p-3">{sidebarFooter}</div>
      )}
    </>
  );
}

/* ── Main layout ──────────────────────────────────────── */

export default function SidebarLayout({
  navItems,
  header,
  footer,
  sidebarHeader,
  sidebarFooter,
  children,
  collapsed: controlledCollapsed,
  onCollapsedChange,
  defaultCollapsed = false,
  variant = "fixed",
  sidebarWidth = 256,
  collapsedWidth = 64,
  mobileOpen: controlledMobileOpen,
  onMobileOpenChange,
  className,
}: SidebarLayoutProps) {
  /* Collapsed state */
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsible = variant === "collapsible";
  const collapsed = isCollapsible
    ? (controlledCollapsed ?? internalCollapsed)
    : false;

  const toggleCollapsed = useCallback(() => {
    const next = !collapsed;
    setInternalCollapsed(next);
    onCollapsedChange?.(next);
  }, [collapsed, onCollapsedChange]);

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

  /* Close mobile sidebar on Escape */
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileOpen, setMobileOpen]);

  const width = collapsed ? collapsedWidth : sidebarWidth;

  return (
    <div className={cn("flex h-svh overflow-hidden", className)}>
      {/* ── Desktop sidebar ─────────────────────────── */}
      <aside
        className="hidden shrink-0 flex-col border-r border-border bg-background transition-[width] duration-200 ease-in-out md:flex"
        style={{ width }}
        aria-label="Sidebar"
      >
        <SidebarContent
          navItems={navItems}
          sidebarHeader={sidebarHeader}
          sidebarFooter={sidebarFooter}
          collapsed={collapsed}
          isCollapsible={isCollapsible}
          onToggle={toggleCollapsed}
        />
      </aside>

      {/* ── Mobile sidebar overlay ──────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          {/* Drawer */}
          <aside
            className="relative z-10 flex w-72 max-w-[85vw] flex-col bg-background shadow-xl animate-in slide-in-from-left duration-200"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
          >
            <SidebarContent
              navItems={navItems}
              sidebarHeader={sidebarHeader}
              sidebarFooter={sidebarFooter}
              collapsed={false}
              isCollapsible={false}
              onToggle={() => {}}
            />
          </aside>
        </div>
      )}

      {/* ── Main area ───────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile topbar with hamburger */}
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
        {footer && (
          <footer className="border-t border-border">{footer}</footer>
        )}
      </div>
    </div>
  );
}
