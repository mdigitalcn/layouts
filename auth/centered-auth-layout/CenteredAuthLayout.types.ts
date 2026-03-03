import type { ReactNode } from "react";

export interface CenteredAuthLayoutProps {
  /** Logo or branding element above the form */
  logo?: ReactNode;
  /** Heading text */
  title?: string;
  /** Subheading / description text */
  description?: string;
  /** Auth form content */
  children: ReactNode;
  /** Footer below the form (links, legal text) */
  footer?: ReactNode;
  /** Max width of the form container */
  maxWidth?: "xs" | "sm" | "md";
  /** Optional background variant */
  background?: "plain" | "subtle" | "gradient";
  className?: string;
}
