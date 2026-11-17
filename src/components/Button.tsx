"use client";

import type { MouseEvent, ReactNode } from "react";
import { useSmoothScroll } from "./SmoothScrollProvider";

type Variant = "primary" | "outline" | "ghost";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  icon?: ReactNode;
  ariaLabel?: string;
  onNavigate?: () => void;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-neon text-preto hover:bg-white focus-visible:bg-white",
  outline:
    "border border-white/70 text-white hover:border-neon hover:text-neon",
  ghost: "text-white underline decoration-neon decoration-2 underline-offset-8 hover:text-neon px-0",
};

/**
 * Botão/link. Links internos (#ancora) usam lenis.scrollTo com offset da navbar.
 * Links externos abrem em nova aba.
 */
export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  icon,
  ariaLabel,
  onNavigate,
}: ButtonProps) {
  const { scrollTo } = useSmoothScroll();
  const isAnchor = href.startsWith("#");
  const isExternal = /^https?:\/\//.test(href);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isAnchor) {
      e.preventDefault();
      scrollTo(href);
    }
    onNavigate?.();
  };

  const base =
    "inline-flex min-h-12 items-center justify-center gap-3 px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] transition-colors duration-300 sm:px-8";

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`${base} ${variants[variant]} ${className}`}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {icon}
      <span>{children}</span>
    </a>
  );
}
