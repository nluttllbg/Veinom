"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { CountUp } from "./CountUp";
import { RevealText } from "./RevealText";
import { Stars, QuoteIcon, ArrowIcon } from "./icons";

/*
 * PENDENTE: depoimentos com nome e foto de alunos (com autorização).
 * Enquanto não chegam, a seção usa só dados públicos reais: nota e número de avaliações
 * do Google e do Wellhub e trechos curtos de avaliações do Google, sem nome do autor.
 */
export function Reviews() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-quote]",
          { yPercent: 40, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.2,
            scrollTrigger: { trigger: "[data-quote-list]", start: "top 82%", once: true },
          },
        );
        gsap.fromTo(
          "[data-rating-meta]",
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: "[data-rating]", start: "top 85%", once: true },
          },
        );
        // Aspas gigantes em parallax lento
        gsap.fromTo(
          "[data-quote-mark]",
          { yPercent: 30 },
          {
            yPercent: -30,
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="depoimentos"
      aria-labelledby="depoimentos-title"
      className="relative overflow-hidden bg-preto py-24 sm:py-32 lg:py-44"
    >
      <div data-quote-mark className="pointer-events-none absolute -right-10 top-10 text-neon/10 sm:right-10" aria-hidden="true">
        <QuoteIcon className="h-48 w-64 sm:h-72 sm:w-96" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <RevealText
          as="h2"
          id="depoimentos-title"
          text="QUEM TREINA, APROVA."
          accent={[2]}
          className="max-w-[12ch] text-[clamp(2.4rem,7vw,6.5rem)] font-black uppercase leading-[0.92] tracking-[-0.02em] text-white"
        />

        <div className="mt-16 grid grid-cols-1 gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          <div data-rating className="lg:col-span-5">
            <p className="flex flex-col">
              <span className="sr-only">
                Nota {siteConfig.rating.display} de 5 no Google, com {siteConfig.rating.count} avaliações
              </span>
              <CountUp
                to={siteConfig.rating.value}
                decimals={1}
                className="text-[clamp(7rem,22vw,15rem)] font-black leading-[0.8] tracking-[-0.05em] text-neon text-glow"
              />
            </p>
            <div data-rating-meta className="mt-8">
              <Stars className="h-6 w-6" />
            </div>
            <p data-rating-meta className="mt-4 text-lg font-bold text-white">
              {siteConfig.rating.count} avaliações no Google
            </p>

            <div data-rating-meta className="mt-10 flex items-center gap-5 border-t border-white/15 pt-8">
              <span className="text-[clamp(2.5rem,5vw,3.5rem)] font-black leading-none text-white tabular-nums">
                {siteConfig.wellhub.display}
              </span>
              <span className="text-sm leading-snug text-white/75">
                no Wellhub,
                <br />
                {siteConfig.wellhub.count} avaliações
              </span>
            </div>
          </div>

          <div data-quote-list className="flex flex-col gap-10 lg:col-span-7 lg:gap-0">
            {siteConfig.googleQuotes.map((q, i) => (
              <figure
                key={q}
                className={`relative overflow-hidden ${i === 1 ? "lg:ml-[28%] lg:mt-16" : "lg:mr-[10%]"}`}
              >
                <div data-quote>
                  <blockquote>
                    <p className="text-[clamp(2.4rem,6vw,5.25rem)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-white">
                      &ldquo;{q}&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="mt-5 flex items-center gap-4 text-sm text-white/70">
                    <span className="block h-px w-10 bg-neon" aria-hidden="true" />
                    <span>Trecho de avaliação pública no Google</span>
                  </figcaption>
                </div>
              </figure>
            ))}

            <a
              href={siteConfig.rating.allReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex min-h-12 items-center gap-3 self-start text-sm font-bold uppercase tracking-[0.14em] text-white underline decoration-neon decoration-2 underline-offset-8 hover:text-neon lg:mt-20"
            >
              Ver avaliações no Google
              <ArrowIcon className="h-4 w-4 text-neon" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
