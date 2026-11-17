"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { asset } from "@/lib/asset";
import { siteConfig } from "@/config/site";
import { Button } from "./Button";
import { RevealText } from "./RevealText";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { Stars, WhatsAppIcon, ArrowIcon } from "./icons";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-hero-line]",
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 1.6, ease: "expo.out", delay: 0.6 },
        );
        gsap.fromTo(imgRef.current, { scale: 1.25 }, { scale: 1, duration: 2.4, ease: "expo.out" });
        gsap.fromTo(
          "[data-hero-fade]",
          { y: 32, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.9 },
        );
        // Indicador de rolagem: traço que desce em loop
        gsap.fromTo(
          "[data-scroll-dot]",
          { yPercent: -100 },
          { yPercent: 300, duration: 1.6, ease: "power3.inOut", repeat: -1, delay: 1.6 },
        );
        // Parallax ao rolar: a foto desce mais devagar que o texto
        gsap.to(imgRef.current, {
          yPercent: 16,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-copy]", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      });

      // Intro da foto: recorte diagonal no desktop, cortina simples no mobile
      mm.add(MQ.desktop, () => {
        gsap.fromTo(
          mediaRef.current,
          { clipPath: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", autoAlpha: 1 },
          { clipPath: "polygon(14% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.8, ease: "expo.out", delay: 0.1 },
        );
      });
      mm.add(MQ.mobile, () => {
        gsap.fromTo(
          mediaRef.current,
          { clipPath: "inset(0% 0% 100% 0%)", autoAlpha: 1 },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out", delay: 0.1 },
        );
      });

      mm.add(MQ.reduce, () => {
        gsap.set("[data-hero-fade]", { clearProps: "all" });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="inicio"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative isolate flex h-[100svh] min-h-[640px] items-end overflow-hidden bg-preto"
    >
      {/* Foto à direita com corte diagonal no desktop (composição assimétrica); no mobile ocupa a tela */}
      <div
        ref={mediaRef}
        className="hero-pre absolute inset-y-0 right-0 -z-10 w-full overflow-hidden md:w-[72%] md:[clip-path:polygon(14%_0%,100%_0%,100%_100%,0%_100%)]"
      >
        <div ref={imgRef} className="absolute -inset-y-[10%] inset-x-0 will-change-transform">
          <Image
            src={asset("/images/hero-salao-neon.webp")}
            alt="Salão de musculação da Veinom Fitness com aparelhos e iluminação de LED verde neon"
            width={1280}
            height={720}
            priority
            fetchPriority="high"
            sizes="(min-width: 768px) 72vw, 100vw"
            className="photo-treat h-full w-full object-cover object-[55%_center]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-preto via-preto/45 to-preto/30 md:via-preto/20 md:to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-preto/70 via-transparent to-transparent md:from-preto/40" aria-hidden="true" />
      </div>

      {/* Linha neon que acompanha a diagonal da foto */}
      <svg
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[72%] md:block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          data-hero-line
          x1="14"
          y1="0"
          x2="0"
          y2="100"
          pathLength={1}
          strokeDasharray="1"
          stroke="#2BE36A"
          strokeOpacity="0.8"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          style={{ filter: "drop-shadow(0 0 6px rgba(43,227,106,0.8))" }}
        />
      </svg>

      <div data-hero-copy className="relative mx-auto w-full max-w-[1440px] px-5 pb-24 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
        <div className="max-w-[min(100%,58rem)]">
          <RevealText
            as="h1"
            id="hero-title"
            trigger="load"
            delay={0.35}
            stagger={0.1}
            text="SEU CORPO. SUA FORÇA. SUA EVOLUÇÃO."
            accent={[4, 5]}
            breakAfter={[1, 3]}
            className="text-[clamp(2.5rem,min(9vw,11svh),8.25rem)] font-black uppercase leading-[0.92] tracking-[-0.025em] text-white"
          />

          <div className="mt-8 flex items-stretch gap-5 md:mt-10 md:ml-[12%]">
            <span className="hidden w-px shrink-0 bg-neon sm:block" aria-hidden="true" />
            <p data-hero-fade className="hero-pre max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Na Veinom Fitness, cada treino é uma oportunidade de superar seus limites. Comece hoje a construir a
              sua melhor versão.
            </p>
          </div>

          <div data-hero-fade className="hero-pre mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4 md:ml-[12%]">
            <Button href={siteConfig.whatsapp.url} icon={<WhatsAppIcon className="h-5 w-5" />}>
              QUERO COMEÇAR
            </Button>
            <Button href="#estrutura" variant="outline" icon={<ArrowIcon className="h-4 w-4 rotate-90" />}>
              CONHECER A ACADEMIA
            </Button>
          </div>

          <p data-hero-fade className="hero-pre mt-8 flex flex-wrap items-center gap-3 text-sm text-white/75 md:ml-[12%]">
            <Stars className="h-4 w-4" />
            <span>
              <strong className="font-bold text-white">{siteConfig.rating.display}</strong> no Google,{" "}
              {siteConfig.rating.count} avaliações
            </span>
          </p>
        </div>
      </div>

      {/* Indicador de rolagem */}
      <a
        href="#estrutura"
        onClick={(e) => {
          e.preventDefault();
          scrollTo("#estrutura");
        }}
        data-hero-fade
        aria-label="Rolar para a estrutura da academia"
        className="hero-pre absolute bottom-6 right-5 flex flex-col items-center gap-3 sm:right-8 lg:right-12"
      >
        <span className="hidden text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/70 [writing-mode:vertical-rl] sm:block">
          Role
        </span>
        <span className="relative block h-14 w-px overflow-hidden bg-white/20" aria-hidden="true">
          <span data-scroll-dot className="absolute left-0 top-0 block h-1/3 w-px bg-neon" />
        </span>
      </a>
    </section>
  );
}
