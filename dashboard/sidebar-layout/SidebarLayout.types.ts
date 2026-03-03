import type { ReactNode } from "react";

export interface SidebarNavItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  children?: SidebarNavItem[];
}

export interface SidebarLayoutProps {
  /** Navigation items rendered in the sidebar */
  navItems: SidebarNavItem[];
  /** Content above the main area (page header / toolbar) */
  header?: ReactNode;
  /** Content below the main area (status bar) */
  footer?: ReactNode;
  /** Top of sidebar (logo, workspace switcher) */
  sidebarHeader?: ReactNode;
  /** Bottom of sidebar (user menu, settings) */
  sidebarFooter?: ReactNode;
  /** Main page content */
  children: ReactNode;
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Callback when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Initial collapsed state (uncontrolled) */
  defaultCollapsed?: boolean;
  /** Sidebar behavior: fixed = always open, collapsible = can toggle */
  variant?: "fixed" | "collapsible";
  /** Sidebar width in px when expanded */
  sidebarWidth?: number;
  /** Sidebar width in px when collapsed */
  collapsedWidth?: number;
  /** Mobile sidebar open state (controlled) */
  mobileOpen?: boolean;
  /** Callback when mobile sidebar opens/closes */
  onMobileOpenChange?: (open: boolean) => void;
  className?: string;
}
