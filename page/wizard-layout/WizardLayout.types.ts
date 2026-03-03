import type { ReactNode } from "react";

export interface WizardStep {
  id: string;
  label: string;
  description?: string;
  /** "completed" | "active" | "upcoming" */
  status: "completed" | "active" | "upcoming";
}

export interface WizardLayoutProps {
  /** Wizard steps definition */
  steps: WizardStep[];
  /** Current step content */
  children: ReactNode;
  /** Logo or branding element */
  logo?: ReactNode;
  /** Title for the current step */
  title?: string;
  /** Description for the current step */
  description?: string;
  /** Footer actions (Back / Next buttons) */
  actions?: ReactNode;
  /** Max width of the content area */
  maxWidth?: "sm" | "md" | "lg";
  /** Step indicator position */
  stepPosition?: "top" | "left";
  className?: string;
}
