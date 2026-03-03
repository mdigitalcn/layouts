import type { ReactNode } from "react";

export interface DocsTocItem {
  id: string;
  label: string;
  level: number;
  active?: boolean;
}

export interface DocsSidebarItem {
  id: string;
  label: string;
  href?: string;
  active?: boolean;
  children?: DocsSidebarItem[];
}

export interface DocsLayoutProps {
  /** Full-width header / navbar */
  header: ReactNode;
  /** Left sidebar navigation tree */
  sidebarItems: DocsSidebarItem[];
  /** Main documentation content */
  children: ReactNode;
  /** Right-side table of contents */
  toc?: DocsTocItem[];
  /** Called when TOC item is clicked */
  onTocSelect?: (id: string) => void;
  /** Prev/Next navigation at the bottom */
  pagination?: ReactNode;
  /** Left sidebar width in px */
  sidebarWidth?: number;
  /** Right TOC width in px */
  tocWidth?: number;
  /** Mobile sidebar open state */
  mobileOpen?: boolean;
  /** Callback when mobile sidebar opens/closes */
  onMobileOpenChange?: (open: boolean) => void;
  className?: string;
}
