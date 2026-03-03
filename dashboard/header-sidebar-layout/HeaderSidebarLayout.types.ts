import type { ReactNode } from "react";

export interface HeaderSidebarLayoutProps {
  /** Full-width top header content */
  header: ReactNode;
  /** Sidebar content (below the header) */
  sidebar: ReactNode;
  /** Main page content */
  children: ReactNode;
  /** Optional breadcrumbs bar between header and content */
  breadcrumbs?: ReactNode;
  /** Sidebar width in px */
  sidebarWidth?: number;
  /** Fixed header height in px */
  headerHeight?: number;
  /** Mobile sidebar open state (controlled) */
  mobileOpen?: boolean;
  /** Callback when mobile sidebar opens/closes */
  onMobileOpenChange?: (open: boolean) => void;
  className?: string;
}
