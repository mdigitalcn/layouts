import type { ReactNode } from "react";

export interface ErrorLayoutProps {
  /** Error code (404, 500, 403, etc.) */
  code?: string | number;
  /** Error heading */
  title: string;
  /** Error description / explanation */
  description?: string;
  /** Illustration or icon above the title */
  illustration?: ReactNode;
  /** Action buttons (Go home, Go back, Retry) */
  actions?: ReactNode;
  /** Whether to show the error code prominently */
  showCode?: boolean;
  className?: string;
}
