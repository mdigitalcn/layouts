"use client";

import { cn } from "@mdigital_ui/ui";
import type { SplitAuthLayoutProps } from "./SplitAuthLayout.types";

const formMaxWidthMap: Record<string, string> = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-md",
};

const panelRatioMap: Record<string, { form: string; panel: string }> = {
  narrow: { form: "lg:basis-3/5", panel: "lg:basis-2/5" },
  half: { form: "lg:basis-1/2", panel: "lg:basis-1/2" },
  wide: { form: "lg:basis-2/5", panel: "lg:basis-3/5" },
};

export default function SplitAuthLayout({
  children,
  panel,
  panelPosition = "right",
  panelRatio = "half",
  panelClassName,
  formMaxWidth = "sm",
  className,
}: SplitAuthLayoutProps) {
  const ratio = panelRatioMap[panelRatio];

  const formSide = (
    <div
      className={cn(
        "flex min-h-svh flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8",
        ratio.form,
      )}
    >
      <div className={cn("w-full", formMaxWidthMap[formMaxWidth])}>
        {children}
      </div>
    </div>
  );

  const panelSide = panel && (
    <div
      className={cn(
        "relative hidden flex-1 items-center justify-center overflow-hidden bg-primary/5 lg:flex",
        ratio.panel,
        panelClassName,
      )}
    >
      {panel}
    </div>
  );

  return (
    <div className={cn("flex min-h-svh", className)}>
      {panelPosition === "left" ? (
        <>
          {panelSide}
          {formSide}
        </>
      ) : (
        <>
          {formSide}
          {panelSide}
        </>
      )}
    </div>
  );
}
