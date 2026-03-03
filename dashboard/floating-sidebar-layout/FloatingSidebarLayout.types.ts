import type { ReactNode } from "react";

export interface FloatingSidebarNavItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
}

export interface FloatingSidebarLayoutProps {
  /** Navigation items rendered in the floating sidebar */
  navItems: FloatingSidebarNavItem[];
  /** Top of sidebar (logo, workspace name) */
  sidebarHeader?: ReactNode;
  /** Bottom of sidebar (user menu, settings) */
  sidebarFooter?: ReactNode;
  /** Content header (page title, actions) */
  header?: ReactNode;
  /** Main page content */
  children: ReactNode;
  /** Sidebar width in px when expanded */
  sidebarWidth?: number;
  /** Gap between sidebar and viewport edge in px */
  inset?: number;
  /** Mobile sidebar open state (controlled) */
  mobileOpen?: boolean;
  /** Callback when mobile sidebar opens/closes */
  onMobileOpenChange?: (open: boolean) => void;
  className?: string;
}
