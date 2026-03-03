import type { ReactNode } from "react";

export interface RailItem {
  id: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
}

export interface DualSidebarLayoutProps {
  /** Icon rail items (left edge) */
  railItems: RailItem[];
  /** Called when a rail icon is selected */
  onRailSelect: (id: string) => void;
  /** Expandable side panel content */
  sidePanel?: ReactNode;
  /** Side panel header title */
  sidePanelTitle?: string;
  /** Side panel width in px */
  sidePanelWidth?: number;
  /** Header content above the main area */
  header?: ReactNode;
  /** Main page content */
  children: ReactNode;
  /** Rail bottom items (settings, user, etc.) */
  railFooter?: ReactNode;
  /** Mobile sidebar open state (controlled) */
  mobileOpen?: boolean;
  /** Callback when mobile sidebar opens/closes */
  onMobileOpenChange?: (open: boolean) => void;
  className?: string;
}
