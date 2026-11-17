"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MQ, prefersReducedMotion } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { WhatsAppIcon } from "./icons";

/**
 * Botão flutuante do WhatsApp (canto inferior direito, respeita safe-area).
 * Para nunca cobrir os CTAs, ele fica escondido no hero (que já tem os botões) e
 * some quando o CTA final ou o rodapé entram na tela.
 */
export function WhatsAppFloat() {
  const ref = useRef<HTMLAnchorElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = prefersReducedMotion();
    const hero = document.getElementById("inicio");
    const cta = document.getElementById("comecar");
    const footer = document.getElementById("rodape");

    let pastHero = !hero;
    let nearEnd = false;
    let shown: boolean | null = null;

    const apply = () => {
      const show = pastHero && !nearEnd;
      if (show === shown) return;
      shown = show;
      gsap.to(el, {
        autoAlpha: show ? 1 : 0,
        scale: show ? 1 : 0.6,
        duration: reduced ? 0 : 0.7,
        ease: show ? "expo.out" : "power3.out",
        overwrite: true,
      });
    };

    gsap.set(el, { autoAlpha: 0, scale: 0.6 });

    const triggers: ScrollTrigger[] = [];
    if (hero) {
      triggers.push(
        ScrollTrigger.create({
          trigger: hero,
          start: "bottom 60%",
          onEnter: () => {
            pastHero = true;
            apply();
          },
          onLeaveBack: () => {
            pastHero = false;
            apply();
          },
        }),
      );
    }
    const endTarget = cta ?? footer;
    if (endTarget) {
      triggers.push(
        ScrollTrigger.create({
          trigger: endTarget,
          start: "top bottom",
          endTrigger: footer ?? endTarget,
          end: "bottom bottom",
          onToggle: (self) => {
            nearEnd = self.isActive || self.progress >= 1;
            apply();
          },
        }),
      );
    }
    apply();

    // Pulso sutil do anel (só com movimento permitido)
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      gsap.fromTo(
        ringRef.current,
        { scale: 1, autoAlpha: 0.55 },
        { scale: 1.6, autoAlpha: 0, duration: 1.8, ease: "power3.out", repeat: -1, repeatDelay: 1.4 },
      );
    });

    return () => {
      triggers.forEach((t) => t.kill());
      mm.revert();
    };
  });

  return (
    <a
      ref={ref}
      href={siteConfig.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Veinom Fitness pelo WhatsApp"
      className="float-pre fixed z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] ring-1 ring-black/10 sm:h-16 sm:w-16"
      style={{
        bottom: "max(1.25rem, calc(env(safe-area-inset-bottom) + 0.75rem))",
        right: "max(1.25rem, calc(env(safe-area-inset-right) + 0.75rem))",
      }}
    >
      <span ref={ringRef} className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]" aria-hidden="true" />
      <WhatsAppIcon className="relative h-7 w-7 sm:h-8 sm:w-8" />
    </a>
  );
}
