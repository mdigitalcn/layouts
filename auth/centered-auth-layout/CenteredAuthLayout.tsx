"use client";

import { cn } from "@mdigital_ui/ui";
import type { CenteredAuthLayoutProps } from "./CenteredAuthLayout.types";

const maxWidthMap: Record<string, string> = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
};

const bgMap: Record<string, string> = {
  plain: "bg-background",
  subtle: "bg-surface/30",
  gradient: "bg-gradient-to-b from-surface/50 to-background",
};

export default function CenteredAuthLayout({
  logo,
  title,
  description,
  children,
  footer,
  maxWidth = "sm",
  background = "subtle",
  className,
}: CenteredAuthLayoutProps) {
  return (
    <div
      className={cn(
        "flex min-h-svh flex-col items-center justify-center px-4 py-8 sm:px-6",
        bgMap[background],
        className,
      )}
    >
      <div className={cn("w-full space-y-6", maxWidthMap[maxWidth])}>
        {/* Branding */}
        {(logo || title || description) && (
          <div className="flex flex-col items-center gap-2 text-center">
            {logo && <div className="mb-2">{logo}</div>}
            {title && (
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            )}
            {description && (
              <p className="text-sm text-text-secondary">{description}</p>
            )}
          </div>
        )}

        {/* Form region */}
        <div role="form" aria-label={title ?? "Authentication"}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="text-center text-sm text-text-secondary">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
