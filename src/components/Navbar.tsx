"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type MouseEvent } from "react";
import { gsap, ScrollTrigger, useGSAP, MQ, prefersReducedMotion } from "@/lib/gsap";
import { asset } from "@/lib/asset";
import { navLinks, siteConfig } from "@/config/site";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { MobileMenu } from "./MobileMenu";
import { WhatsAppIcon } from "./icons";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          navRef.current,
          { yPercent: -100, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1, ease: "expo.out", delay: 0.3 },
        );
        gsap.fromTo(
          "[data-nav-item]",
          { y: -16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out", stagger: 0.06, delay: 0.55 },
        );
      });
      mm.add(MQ.reduce, () => {
        gsap.set([navRef.current, "[data-nav-item]"], { clearProps: "all", autoAlpha: 1 });
      });

      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => setScrolled(self.scroll() > 40),
      });
      setScrolled(window.scrollY > 40);

      return () => {
        st.kill();
        mm.revert();
      };
    },
    { scope: navRef },
  );

  // Ícone do menu (hambúrguer <-> X) animado com GSAP
  useGSAP(
    () => {
      const reduced = prefersReducedMotion();
      const d = reduced ? 0 : 0.6;
      gsap.to("[data-burger='top']", {
        y: menuOpen ? 7 : 0,
        rotate: menuOpen ? 45 : 0,
        duration: d,
        ease: "power3.out",
      });
      gsap.to("[data-burger='bottom']", {
        y: menuOpen ? -7 : 0,
        rotate: menuOpen ? -45 : 0,
        width: menuOpen ? "100%" : "1rem",
        backgroundColor: menuOpen ? "#FFFFFF" : "#2BE36A",
        duration: d,
        ease: "power3.out",
      });
    },
    { scope: navRef, dependencies: [menuOpen] },
  );

  const handleLink = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href);
  };

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        id="site-navbar"
        ref={navRef}
        className={`nav-pre fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid
            ? "border-b border-neon/20 bg-preto/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <nav
          aria-label="Navegação principal"
          className="mx-auto flex h-18 max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12"
        >
          <a
            href="#inicio"
            onClick={(e) => {
              handleLink(e, "#inicio");
              if (menuOpen) setMenuOpen(false);
            }}
            className="relative z-10 shrink-0"
            data-nav-item
          >
            <Image
              src={asset("/images/logo-veinom.webp")}
              alt="Veinom Fitness, página inicial"
              width={500}
              height={191}
              priority
              className="logo-screen h-10 w-auto sm:h-11"
            />
          </a>

          <ul className="hidden items-center gap-7 xl:gap-9 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href} data-nav-item>
                <a
                  href={link.href}
                  onClick={(e) => handleLink(e, link.href)}
                  className="nav-link text-[0.8rem] font-bold uppercase tracking-[0.16em] text-white/85 hover:text-neon"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={siteConfig.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              data-nav-item
              className="hidden min-h-11 items-center gap-2 bg-neon px-5 text-xs font-bold uppercase tracking-[0.16em] text-preto transition-colors duration-300 hover:bg-white sm:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              QUERO TREINAR
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              data-nav-item
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="relative z-10 flex h-12 w-12 items-center justify-center lg:hidden"
            >
              <span className="relative block h-4 w-7" aria-hidden="true">
                <span data-burger="top" className="absolute left-0 top-0 h-[2px] w-full origin-center bg-white" />
                <span data-burger="bottom" className="absolute bottom-0 left-0 h-[2px] w-4 origin-center bg-neon" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
