import type { ReactNode } from "react";

export interface SettingsNavItem {
  id: string;
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  /** Group label — renders as a section header */
  group?: string;
}

export interface SettingsLayoutProps {
  /** Page title shown above the settings area */
  title?: string;
  /** Description below the title */
  description?: string;
  /** Settings navigation items */
  navItems: SettingsNavItem[];
  /** Called when a nav item is selected */
  onNavSelect?: (id: string) => void;
  /** Settings content (form, panel) */
  children: ReactNode;
  /** Header content (back button, breadcrumbs) */
  header?: ReactNode;
  /** Max width of the settings container */
  maxWidth?: "md" | "lg" | "xl" | "2xl";
  /** Navigation width in px */
  navWidth?: number;
  className?: string;
}
