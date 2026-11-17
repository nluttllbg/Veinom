"use client";

import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

type ScrollTarget = string | number | HTMLElement;

type SmoothScrollContextValue = {
  lenis: Lenis | null;
  /** Rola até um alvo (seletor, elemento ou número) descontando a altura da navbar. */
  scrollTo: (target: ScrollTarget) => void;
  /** Trava/destrava o scroll (menu mobile). */
  lock: () => void;
  unlock: () => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

function navbarOffset(): number {
  const nav = document.getElementById("site-navbar");
  return nav ? nav.getBoundingClientRect().height : 0;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = prefersReducedMotion();

    // Instância única do Lenis. O RAF é controlado pelo ticker do GSAP (autoRaf: false).
    const instance = new Lenis({
      autoRaf: false,
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduced,
      respectReducedMotion: true,
    });

    // Sincronia Lenis <-> ScrollTrigger
    const offScroll = instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    lenisRef.current = instance;
    setLenis(instance);
    ScrollTrigger.refresh();

    return () => {
      offScroll();
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  const scrollTo = useCallback((target: ScrollTarget) => {
    const reduced = prefersReducedMotion();
    const isTop = target === "#inicio" || target === "#" || target === 0;
    const offset = isTop ? 0 : -navbarOffset();
    const instance = lenisRef.current;

    if (instance) {
      instance.scrollTo(isTop ? 0 : target, {
        offset,
        immediate: reduced,
        duration: 1.4,
        force: true,
      });
      return;
    }

    // Fallback sem Lenis
    let top = 0;
    if (typeof target === "number") top = target;
    else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (el) top = el.getBoundingClientRect().top + window.scrollY + offset;
    }
    window.scrollTo({ top: isTop ? 0 : top, behavior: reduced ? "auto" : "smooth" });
  }, []);

  const lock = useCallback(() => lenisRef.current?.stop(), []);
  const unlock = useCallback(() => lenisRef.current?.start(), []);

  const value = useMemo(
    () => ({ lenis, scrollTo, lock, unlock }),
    [lenis, scrollTo, lock, unlock],
  );

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}

export function useSmoothScroll(): SmoothScrollContextValue {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) throw new Error("useSmoothScroll deve ser usado dentro de <SmoothScrollProvider>");
  return ctx;
}
