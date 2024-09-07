import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva("rounded transition-color duration-150 ease-out", {
  variants: {
    intent: {
      primary: [
        "bg-blue-500",
        "text-white",
        "border-transparent",
        "hover:bg-blue-600",
      ],
      secondary: [
        "text-white",
        "border",
        "border-blue-500",
        "hover:bg-blue-500"
      ],
    },
    size: {
      small: ["text-sm", "py-1", "px-2"],
      medium: ["text-base", "py-2", "px-4"],
      lg: ["text-lg", "py-3", "px-5"]
    },
  },
  compoundVariants: [{ intent: "primary", size: "medium"}],
  defaultVariants: {
    intent: "primary",
    size: "medium",
  },
});

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>;

export const ThemeButton: React.FC<ButtonProps> = ({
  className,
  intent,
  size,
  ...props
}) => <button className={button({ intent, size, className })} {...props} />;
