"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { navLinks, siteConfig } from "@/config/site";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { WhatsAppIcon, InstagramIcon } from "./icons";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

/** Menu em tela cheia para mobile. Abre/fecha com timeline GSAP e trava o scroll com lenis.stop(). */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const { scrollTo, lock, unlock } = useSmoothScroll();

  useGSAP(
    () => {
      const tl = gsap.timeline({ paused: true });
      tl.set(rootRef.current, { autoAlpha: 1 })
        .fromTo(
          rootRef.current,
          { clipPath: "inset(0% 0% 100% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.out" },
        )
        .fromTo(
          "[data-menu-line]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: "expo.out", stagger: 0.05 },
          0.15,
        )
        .fromTo(
          "[data-menu-link]",
          { yPercent: 110 },
          { yPercent: 0, duration: 0.9, ease: "expo.out", stagger: 0.07 },
          0.2,
        )
        .fromTo(
          "[data-menu-foot]",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
          0.45,
        );
      tlRef.current = tl;
      return () => {
        tl.kill();
        tlRef.current = null;
      };
    },
    { scope: rootRef },
  );

  useEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;
    const reduced = prefersReducedMotion();

    if (open) {
      lock();
      document.documentElement.classList.add("menu-open");
      if (reduced) tl.progress(1).pause();
      else tl.timeScale(1).play();
      const first = rootRef.current?.querySelector<HTMLAnchorElement>("a");
      first?.focus({ preventScroll: true });
    } else {
      unlock();
      document.documentElement.classList.remove("menu-open");
      if (reduced) tl.progress(0).pause();
      else tl.timeScale(1.4).reverse();
    }
  }, [open, lock, unlock]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && onClose();
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, onClose]);

  return (
    <div
      ref={rootRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className="invisible fixed inset-0 z-40 flex flex-col bg-preto px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[calc(6rem+env(safe-area-inset-top))] lg:hidden"
      data-lenis-prevent
    >
      <span className="absolute right-6 top-0 h-full w-px bg-neon/15" aria-hidden="true" />
      <ul className="flex flex-1 flex-col justify-center">
        {navLinks.map((link, i) => (
          <li key={link.href} className="relative">
            <span data-menu-line className="absolute inset-x-0 top-0 h-px origin-left bg-neon/30" aria-hidden="true" />
            <div className="overflow-hidden">
              <a
                data-menu-link
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  window.setTimeout(() => scrollTo(link.href), 80);
                }}
                className="flex min-h-16 items-center justify-between py-3 text-[clamp(2rem,9vw,3.25rem)] font-black uppercase leading-none tracking-tight text-white active:text-neon"
              >
                <span>{link.label}</span>
                <span className="text-sm font-bold tracking-[0.2em] text-neon" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </a>
            </div>
          </li>
        ))}
      </ul>

      <div data-menu-foot className="flex flex-col gap-4">
        <a
          href={siteConfig.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 items-center justify-center gap-3 bg-neon text-sm font-bold uppercase tracking-[0.16em] text-preto"
        >
          <WhatsAppIcon className="h-5 w-5" />
          QUERO TREINAR
        </a>
        <a
          href={siteConfig.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 items-center justify-center gap-3 text-sm font-bold text-white/80"
        >
          <InstagramIcon className="h-5 w-5" />
          {siteConfig.instagram.handle}
        </a>
      </div>
    </div>
  );
}
