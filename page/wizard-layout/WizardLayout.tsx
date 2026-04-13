"use client";

import { cn } from "@mdigitalcn/uikit";
import type { WizardLayoutProps, WizardStep } from "./WizardLayout.types";

const mwMap: Record<string, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
};

/* ── Step indicator (horizontal) ──────────────────────── */

function HorizontalSteps({ steps }: { steps: WizardStep[] }) {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol className="flex items-center gap-2">
        {steps.map((step, i) => (
          <li key={step.id} className="flex flex-1 items-center gap-2">
            {/* Circle */}
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                step.status === "completed" && "bg-primary text-white",
                step.status === "active" && "border-2 border-primary text-primary",
                step.status === "upcoming" && "border-2 border-border text-text-secondary",
              )}
              aria-current={step.status === "active" ? "step" : undefined}
            >
              {step.status === "completed" ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 7l3.5 3.5L12 4" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            {/* Label (hidden on small screens) */}
            <div className="hidden min-w-0 sm:block">
              <div
                className={cn(
                  "truncate text-sm font-medium",
                  step.status === "active" ? "text-primary" : "text-text-primary",
                  step.status === "upcoming" && "text-text-secondary",
                )}
              >
                {step.label}
              </div>
            </div>
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div
                className={cn(
                  "h-px flex-1",
                  step.status === "completed" ? "bg-primary" : "bg-border",
                )}
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ── Step indicator (vertical / left sidebar) ─────────── */

function VerticalSteps({ steps }: { steps: WizardStep[] }) {
  return (
    <nav aria-label="Progress">
      <ol className="flex flex-col gap-4">
        {steps.map((step, i) => (
          <li key={step.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  step.status === "completed" && "bg-primary text-white",
                  step.status === "active" && "border-2 border-primary text-primary",
                  step.status === "upcoming" && "border-2 border-border text-text-secondary",
                )}
                aria-current={step.status === "active" ? "step" : undefined}
              >
                {step.status === "completed" ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 7l3.5 3.5L12 4" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "mt-1 w-px flex-1",
                    step.status === "completed" ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </div>
            <div className="pb-4">
              <div
                className={cn(
                  "text-sm font-medium",
                  step.status === "active" ? "text-primary" : "text-text-primary",
                  step.status === "upcoming" && "text-text-secondary",
                )}
              >
                {step.label}
              </div>
              {step.description && (
                <div className="mt-0.5 text-xs text-text-secondary">
                  {step.description}
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ── Main layout ──────────────────────────────────────── */

export default function WizardLayout({
  steps,
  children,
  logo,
  title,
  description,
  actions,
  maxWidth = "md",
  stepPosition = "top",
  className,
}: WizardLayoutProps) {
  if (stepPosition === "left") {
    return (
      <div className={cn("flex min-h-svh bg-background", className)}>
        {/* Left sidebar with steps */}
        <div className="hidden w-64 shrink-0 border-r border-border bg-surface/30 p-6 md:block">
          {logo && <div className="mb-8">{logo}</div>}
          <VerticalSteps steps={steps} />
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col">
          {/* Mobile: horizontal steps */}
          <div className="border-b border-border p-4 md:hidden">
            {logo && <div className="mb-4">{logo}</div>}
            <HorizontalSteps steps={steps} />
          </div>

          <div className="flex flex-1 flex-col items-center justify-center px-4 py-8">
            <div className={cn("w-full", mwMap[maxWidth])}>
              {(title || description) && (
                <div className="mb-6">
                  {title && <h1 className="text-2xl font-bold tracking-tight">{title}</h1>}
                  {description && (
                    <p className="mt-1 text-sm text-text-secondary">{description}</p>
                  )}
                </div>
              )}
              <div>{children}</div>
              {actions && <div className="mt-8">{actions}</div>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // stepPosition === "top" (default)
  return (
    <div className={cn("flex min-h-svh flex-col bg-background", className)}>
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8 sm:px-6">
        {/* Logo */}
        {logo && <div className="mb-8">{logo}</div>}

        {/* Steps */}
        <div className="mb-8">
          <HorizontalSteps steps={steps} />
        </div>

        {/* Content */}
        <div className={cn("mx-auto w-full flex-1", mwMap[maxWidth])}>
          {(title || description) && (
            <div className="mb-6">
              {title && <h1 className="text-2xl font-bold tracking-tight">{title}</h1>}
              {description && (
                <p className="mt-1 text-sm text-text-secondary">{description}</p>
              )}
            </div>
          )}
          <div>{children}</div>
        </div>

        {/* Actions */}
        {actions && (
          <div className="mt-8 border-t border-border pt-6">{actions}</div>
        )}
      </div>
    </div>
  );
}
