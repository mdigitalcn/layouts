"use client";

import { cn } from "@mdigitalcn/uikit";
import type { LandingLayoutProps } from "./LandingLayout.types";

export default function LandingLayout({
  navbar,
  children,
  footer,
  announcement,
  stickyNavbar = true,
  blurNavbar = true,
  className,
}: LandingLayoutProps) {
  return (
    <div className={cn("flex min-h-svh flex-col", className)}>
      {/* Announcement bar */}
      {announcement && (
        <div className="border-b border-border bg-primary/5 px-4 py-2 text-center text-sm">
          {announcement}
        </div>
      )}

      {/* Navbar */}
      <header
        className={cn(
          "z-50 border-b border-border bg-background",
          stickyNavbar && "sticky top-0",
          blurNavbar && "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        )}
      >
        {navbar}
      </header>

      {/* Main content — page sections */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      {footer && (
        <footer className="border-t border-border">{footer}</footer>
      )}
    </div>
  );
}
