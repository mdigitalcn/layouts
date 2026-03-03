import type { ReactNode } from "react";

export interface StackedLayoutProps {
  /** Sticky header content (navbar) */
  header: ReactNode;
  /** Optional subheader (tabs, breadcrumbs, filters) */
  subheader?: ReactNode;
  /** Main page content */
  children: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Max width constraint for content container */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /** Whether header should be sticky */
  stickyHeader?: boolean;
  /** Whether header gets backdrop blur */
  blurHeader?: boolean;
  className?: string;
}
