"use client";

import { cn } from "@mdigital_ui/ui";
import type { SettingsLayoutProps, SettingsNavItem } from "./SettingsLayout.types";

const mwMap: Record<string, string> = {
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
};

/* ── Settings nav ─────────────────────────────────────── */

function SettingsNav({
  items,
  onSelect,
}: {
  items: SettingsNavItem[];
  onSelect?: (id: string) => void;
}) {
  let lastGroup: string | undefined;

  return (
    <nav className="flex flex-col gap-0.5" aria-label="Settings navigation">
      {items.map((item) => {
        const showGroup = item.group && item.group !== lastGroup;
        if (item.group) lastGroup = item.group;

        const El = item.href ? "a" : "button";

        return (
          <div key={item.id}>
            {showGroup && (
              <div className="mb-1 mt-4 px-3 text-xs font-semibold uppercase tracking-wider text-text-secondary first:mt-0">
                {item.group}
              </div>
            )}
            <El
              href={item.href as any}
              onClick={() => onSelect?.(item.id)}
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
          </div>
        );
      })}
    </nav>
  );
}

/* ── Main layout ──────────────────────────────────────── */

export default function SettingsLayout({
  title,
  description,
  navItems,
  onNavSelect,
  children,
  header,
  maxWidth = "xl",
  navWidth = 220,
  className,
}: SettingsLayoutProps) {
  return (
    <div className={cn("min-h-svh bg-background", className)}>
      {/* Header */}
      {header && (
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          {header}
        </header>
      )}

      <div className={cn("mx-auto px-4 py-6 sm:px-6 lg:px-8", mwMap[maxWidth])}>
        {/* Page title */}
        {(title || description) && (
          <div className="mb-6 border-b border-border pb-6">
            {title && <h1 className="text-2xl font-bold tracking-tight">{title}</h1>}
            {description && (
              <p className="mt-1 text-sm text-text-secondary">{description}</p>
            )}
          </div>
        )}

        {/* Nav + content */}
        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          {/* Nav — horizontal scrolling on mobile, sidebar on desktop */}
          <div className="shrink-0 md:sticky md:top-20 md:self-start" style={{ width: undefined }}>
            {/* Mobile: horizontal pill nav */}
            <div className="flex gap-1 overflow-x-auto pb-2 md:hidden">
              {navItems.map((item) => {
                const El = item.href ? "a" : "button";
                return (
                  <El
                    key={item.id}
                    href={item.href as any}
                    onClick={() => onNavSelect?.(item.id)}
                    className={cn(
                      "shrink-0 rounded-full px-3 py-1.5 text-sm transition-colors",
                      item.active
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-text-secondary hover:bg-surface",
                    )}
                    aria-current={item.active ? "page" : undefined}
                  >
                    {item.label}
                  </El>
                );
              })}
            </div>
            {/* Desktop: vertical sidebar nav */}
            <div className="hidden md:block" style={{ width: navWidth }}>
              <SettingsNav items={navItems} onSelect={onNavSelect} />
            </div>
          </div>

          {/* Content */}
          <main className="min-w-0 flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
