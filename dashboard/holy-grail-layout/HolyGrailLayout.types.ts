import type { ReactNode } from "react";

export interface HolyGrailLayoutProps {
  /** Full-width header */
  header: ReactNode;
  /** Left sidebar content (navigation) */
  leftSidebar: ReactNode;
  /** Main page content */
  children: ReactNode;
  /** Right sidebar/panel content (details, filters, info) */
  rightPanel?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Left sidebar width in px */
  leftWidth?: number;
  /** Right panel width in px */
  rightWidth?: number;
  /** Whether right panel is visible (toggle-able) */
  rightPanelOpen?: boolean;
  /** Mobile sidebar open state (controlled) */
  mobileOpen?: boolean;
  /** Callback when mobile sidebar opens/closes */
  onMobileOpenChange?: (open: boolean) => void;
  className?: string;
}
