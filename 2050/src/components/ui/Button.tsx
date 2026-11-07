import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "solid" | "outline" | "quiet";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  variant = "solid",
  className = "",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={["ui-button", `ui-button--${variant}`, className]
        .filter(Boolean)
        .join(" ")}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
