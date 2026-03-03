import type { ReactNode } from "react";

export interface LandingLayoutProps {
  /** Sticky navigation bar content */
  navbar: ReactNode;
  /** Page sections (hero, features, pricing, etc.) */
  children: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Announcement bar above the navbar */
  announcement?: ReactNode;
  /** Whether the navbar is sticky */
  stickyNavbar?: boolean;
  /** Whether navbar gets backdrop blur */
  blurNavbar?: boolean;
  className?: string;
}
