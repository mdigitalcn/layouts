"use client";

import { cn } from "@mdigitalcn/uikit";
import type { StackedLayoutProps } from "./StackedLayout.types";

const mwMap: Record<string, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

export default function StackedLayout({
  header,
  subheader,
  children,
  footer,
  maxWidth = "xl",
  stickyHeader = true,
  blurHeader = true,
  className,
}: StackedLayoutProps) {
  return (
    <div className={cn("flex min-h-svh flex-col bg-background", className)}>
      {/* Header */}
      <header
        className={cn(
          "z-40 border-b border-border bg-background",
          stickyHeader && "sticky top-0",
          blurHeader && "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        )}
      >
        {header}
      </header>

      {/* Subheader */}
      {subheader && (
        <div className="border-b border-border bg-surface/30">
          <div className={cn("mx-auto px-4 py-3 sm:px-6 lg:px-8", mwMap[maxWidth])}>
            {subheader}
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1">
        <div className={cn("mx-auto px-4 py-6 sm:px-6 lg:px-8", mwMap[maxWidth])}>
          {children}
        </div>
      </main>

      {/* Footer */}
      {footer && (
        <footer className="border-t border-border">
          <div className={cn("mx-auto px-4 py-6 sm:px-6 lg:px-8", mwMap[maxWidth])}>
            {footer}
          </div>
        </footer>
      )}
    </div>
  );
}
