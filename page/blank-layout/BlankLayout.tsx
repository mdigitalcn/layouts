"use client";

import { cn } from "@mdigitalcn/uikit";
import type { BlankLayoutProps } from "./BlankLayout.types";

const mwMap: Record<string, string> = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

const padMap: Record<string, string> = {
  none: "",
  sm: "px-3 py-4 sm:px-4",
  md: "px-4 py-6 sm:px-6 lg:px-8",
  lg: "px-6 py-10 sm:px-8 lg:px-12",
};

export default function BlankLayout({
  children,
  maxWidth = "xl",
  centered = false,
  padding = "md",
  className,
}: BlankLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-svh bg-background",
        centered && "flex items-center justify-center",
        className,
      )}
    >
      <div className={cn("mx-auto w-full", mwMap[maxWidth], padMap[padding])}>
        {children}
      </div>
    </div>
  );
}
