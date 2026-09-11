import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SpinnerSize = "sm" | "md" | "lg" | "xl";
type SpinnerColor = "blue" | "white" | "black";

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
  color?: SpinnerColor;
}

const sizes: Record<SpinnerSize, string> = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-12",
};

const colors: Record<SpinnerColor, string> = {
  blue: "border-blue-500 border-t-transparent",
  white: "border-white border-t-transparent",
  black: "border-black border-t-transparent",
};

export function Spinner({
  size = "md",
  color = "blue",
  className,
  ...props
}: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block animate-spin rounded-full border-2",
        sizes[size],
        colors[color],
        className,
      )}
      {...props}
    />
  );
}
