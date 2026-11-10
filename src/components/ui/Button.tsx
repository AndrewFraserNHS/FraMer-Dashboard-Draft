import { ButtonHTMLAttributes } from "react";
import { Link, LinkProps } from "react-router-dom";

type Variant = "primary" | "secondary";

/** primary is the one main action on a screen; secondary is everything else */
const buttonClass = (variant: Variant, extra: string) =>
  `nhsuk-button${variant === "secondary" ? " nhsuk-button--secondary" : ""} ${extra}`.trim();

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant };

/** NHS design system button. Defaults to type="button" so it never submits a form by accident. */
export function Button({ variant = "primary", className = "", type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClass(variant, className)} {...props} />;
}

/** A link that looks like a button, for actions that go to another page. */
export function ButtonLink({ variant = "primary", className = "", ...props }: LinkProps & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}
