import type { ReactNode } from "react";

export interface InsetSidebarLayoutProps {
  /** Sidebar content (inset with gap from edge) */
  sidebar: ReactNode;
  /** Optional sticky header */
  header?: ReactNode;
  /** Main page content */
  children: ReactNode;
  /** Which side the sidebar appears on */
  sidebarPosition?: "left" | "right";
  /** Sidebar width in px */
  sidebarWidth?: number;
  /** Gap between sidebar and content in Tailwind spacing units */
  gap?: "sm" | "md" | "lg";
  /** Mobile sidebar open state (controlled) */
  mobileOpen?: boolean;
  /** Callback when mobile sidebar opens/closes */
  onMobileOpenChange?: (open: boolean) => void;
  className?: string;
}
