"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

type CountUpProps = {
  /** Valor final (sempre um número real confirmado em CONTEUDO.md). */
  to: number;
  from?: number;
  decimals?: number;
  className?: string;
  duration?: number;
};

const format = (n: number, decimals: number) => n.toFixed(decimals).replace(".", ",");

/**
 * Número animado ao entrar na viewport.
 * O HTML do servidor já traz o valor final: sem JS ou com movimento reduzido, o número aparece pronto.
 */
export function CountUp({ to, from = 0, decimals = 0, className = "", duration = 2.2 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const finalText = format(to, decimals);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const counter = { value: from };
        el.textContent = format(from, decimals);
        gsap.to(counter, {
          value: to,
          duration,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => {
            el.textContent = format(counter.value, decimals);
          },
          onComplete: () => {
            el.textContent = finalText;
          },
        });
        return () => {
          el.textContent = finalText;
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [to, from, decimals] },
  );

  return (
    <span ref={ref} aria-hidden="true" className={`tabular-nums ${className}`}>
      {finalText}
    </span>
  );
}
