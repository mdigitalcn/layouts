"use client";

import { cn } from "@mdigital_ui/ui";
import type { ErrorLayoutProps } from "./ErrorLayout.types";

export default function ErrorLayout({
  code,
  title,
  description,
  illustration,
  actions,
  showCode = true,
  className,
}: ErrorLayoutProps) {
  return (
    <div
      className={cn(
        "flex min-h-svh flex-col items-center justify-center bg-background px-4 py-16 text-center",
        className,
      )}
      role="main"
    >
      {/* Illustration */}
      {illustration && <div className="mb-6">{illustration}</div>}

      {/* Error code */}
      {code && showCode && (
        <div className="mb-4 text-7xl font-bold tracking-tighter text-text-secondary/30 sm:text-9xl">
          {code}
        </div>
      )}

      {/* Title */}
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>

      {/* Description */}
      {description && (
        <p className="mx-auto mt-3 max-w-md text-text-secondary">
          {description}
        </p>
      )}

      {/* Actions */}
      {actions && <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>}
    </div>
  );
}
