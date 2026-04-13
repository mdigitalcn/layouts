"use client";

import { cn } from "@mdigitalcn/uikit";
import type { CardAuthLayoutProps } from "./CardAuthLayout.types";

const bgMap: Record<string, string> = {
  plain: "bg-background",
  gradient: "bg-gradient-to-br from-primary/5 via-background to-primary/10",
  dots: [
    "bg-background",
    "[background-image:radial-gradient(rgba(0,0,0,0.06)_1px,transparent_1px)]",
    "[background-size:20px_20px]",
    "dark:[background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)]",
  ].join(" "),
  grid: [
    "bg-background",
    "[background-image:linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)]",
    "[background-size:40px_40px]",
    "dark:[background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]",
  ].join(" "),
};

const maxWidthMap: Record<string, string> = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
};

const cardVariantMap: Record<string, string> = {
  elevated: "rounded-xl border border-border bg-background shadow-lg sm:p-8",
  outlined: "rounded-xl border border-border bg-background sm:p-8",
  flat: "rounded-xl bg-background sm:p-8",
};

export default function CardAuthLayout({
  logo,
  title,
  description,
  children,
  footer,
  background = "gradient",
  maxWidth = "sm",
  cardVariant = "elevated",
  className,
}: CardAuthLayoutProps) {
  return (
    <div
      className={cn(
        "flex min-h-svh flex-col items-center justify-center px-4 py-8",
        bgMap[background],
        className,
      )}
    >
      <div className={cn("w-full", maxWidthMap[maxWidth])}>
        {/* Logo */}
        {logo && <div className="mb-6 flex justify-center">{logo}</div>}

        {/* Card */}
        <div className={cn("p-6", cardVariantMap[cardVariant])}>
          {(title || description) && (
            <div className="mb-6 text-center">
              {title && (
                <h1 className="text-xl font-bold tracking-tight">{title}</h1>
              )}
              {description && (
                <p className="mt-1 text-sm text-text-secondary">
                  {description}
                </p>
              )}
            </div>
          )}
          <div role="form" aria-label={title ?? "Authentication"}>
            {children}
          </div>
        </div>

        {/* Footer */}
        {footer && (
          <div className="mt-4 text-center text-sm text-text-secondary">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
