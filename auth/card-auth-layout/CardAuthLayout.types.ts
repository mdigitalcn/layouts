import type { ReactNode } from "react";

export interface CardAuthLayoutProps {
  /** Logo or branding above the card */
  logo?: ReactNode;
  /** Card heading */
  title?: string;
  /** Card subheading */
  description?: string;
  /** Auth form content inside the card */
  children: ReactNode;
  /** Footer below the card (links, legal) */
  footer?: ReactNode;
  /** Background pattern variant */
  background?: "plain" | "gradient" | "dots" | "grid";
  /** Card max width */
  maxWidth?: "xs" | "sm" | "md";
  /** Card visual weight */
  cardVariant?: "elevated" | "outlined" | "flat";
  className?: string;
}
