"use client";

import { useRef, type ElementType } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

type RevealTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  /** "load": anima ao montar (hero). "scroll": anima ao entrar na viewport. */
  trigger?: "load" | "scroll";
  delay?: number;
  stagger?: number;
  /** Índices das palavras exibidas em verde neon. */
  accent?: number[];
  /** Índices das palavras após as quais o título quebra a linha. */
  breakAfter?: number[];
};

/**
 * Revela o texto palavra por palavra com máscara (yPercent 110 -> 0, expo.out).
 * O texto completo fica disponível para leitores de tela via .sr-only.
 */
export function RevealText({
  text,
  as: Tag = "h2",
  className = "",
  id,
  trigger = "scroll",
  delay = 0,
  stagger = 0.08,
  accent = [],
  breakAfter = [],
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const targets = el.querySelectorAll<HTMLElement>("[data-word]");
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        gsap.fromTo(
          targets,
          // y: 0 zera o translateY do CSS de pré-carregamento (GSAP o leria como px)
          { yPercent: 110, y: 0 },
          {
            yPercent: 0,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
            stagger,
            delay,
            scrollTrigger:
              trigger === "scroll"
                ? { trigger: el, start: "top 85%", once: true }
                : undefined,
          },
        );
      });

      mm.add(MQ.reduce, () => {
        gsap.set(targets, { yPercent: 0, y: 0 });
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={trigger === "load" ? "reveal-load" : undefined}>
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span className="inline-block overflow-hidden pb-[0.06em] align-top leading-[1.02]">
              <span
                data-word
                className={`inline-block will-change-transform ${accent.includes(i) ? "text-neon text-glow" : ""}`}
              >
                {word}
              </span>
            </span>
            {breakAfter.includes(i) ? <br /> : i < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}
