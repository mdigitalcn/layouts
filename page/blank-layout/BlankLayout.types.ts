import type { ReactNode } from "react";

export interface BlankLayoutProps {
  /** Page content */
  children: ReactNode;
  /** Max width constraint */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /** Vertically and horizontally center the content */
  centered?: boolean;
  /** Padding size */
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}
