import type { ReactNode } from "react";

export interface TopnavItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export interface TopnavLayoutProps {
  /** Logo or branding element */
  logo?: ReactNode;
  /** Navigation items in the top bar */
  navItems?: TopnavItem[];
  /** Right-side actions (buttons, user menu) */
  actions?: ReactNode;
  /** Main page content */
  children: ReactNode;
  /** Whether the nav bar should be sticky */
  sticky?: boolean;
  /** Whether header gets backdrop blur */
  blurHeader?: boolean;
  /** Max width for the content below the nav */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /** Mobile menu open state (controlled) */
  mobileMenuOpen?: boolean;
  /** Callback when mobile menu opens/closes */
  onMobileMenuOpenChange?: (open: boolean) => void;
  className?: string;
}
