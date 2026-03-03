import type { ReactNode } from "react";

export interface SplitAuthLayoutProps {
  /** Auth form content */
  children: ReactNode;
  /** Branding / illustration panel content */
  panel?: ReactNode;
  /** Which side the branding panel appears on (desktop only) */
  panelPosition?: "left" | "right";
  /** Panel width ratio: "half" = 50/50, "wide" = 60/40 panel-heavy, "narrow" = 40/60 form-heavy */
  panelRatio?: "narrow" | "half" | "wide";
  /** Extra classes for the branding panel */
  panelClassName?: string;
  /** Max width constraint for the form area content */
  formMaxWidth?: "xs" | "sm" | "md";
  className?: string;
}
