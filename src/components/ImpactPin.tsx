"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { asset } from "@/lib/asset";

const PHRASES = [
  { text: "Seu objetivo começa com uma decisão.", accent: "decisão." },
  { text: "Sua evolução acontece a cada treino.", accent: "treino." },
  { text: "Sua transformação começa na Veinom Fitness.", accent: "Veinom Fitness." },
] as const;

/**
 * Camadas de foto com tamanhos e profundidades diferentes (nada de 3 cards iguais).
 * depth: quanto maior, mais "perto" da câmera, mais rápido se move no scroll.
 * As posições são em % da seção; no mobile as fotos ficam menores e mais nas bordas.
 */
const LAYERS = [
  {
    src: "/images/maquinas-neon.webp",
    alt: "Máquinas de musculação diante da parede com o logo Veinom Fitness em neon",
    width: 1280,
    height: 720,
    depth: 0.35,
    className:
      "right-[-18%] top-[7%] w-[86%] aspect-[4/3] opacity-45 md:right-[3%] md:top-[9%] md:w-[42%] md:aspect-[16/11] md:opacity-70",
    z: "z-[1]",
  },
  {
    src: "/images/leg-press.webp",
    alt: "Área de treino de pernas com leg press e iluminação verde",
    width: 639,
    height: 360,
    depth: 0.6,
    className:
      "left-[-6%] top-[4%] w-[38%] aspect-[3/4] opacity-35 md:left-auto md:right-[41%] md:top-[5%] md:w-[13%] md:opacity-45",
    z: "z-[2]",
  },
  {
    src: "/images/escultura-veinom.webp",
    alt: "Escultura do mascote Veinom, com o tórax marcado em preto e branco",
    width: 1280,
    height: 720,
    depth: 1,
    className:
      "right-[4%] bottom-[18%] w-[34%] aspect-[3/4] opacity-80 md:right-[27%] md:bottom-[12%] md:top-auto md:w-[19%] md:opacity-95",
    z: "z-[3]",
  },
  {
    src: "/images/halteres.webp",
    alt: "Halteres enfileirados em primeiro plano no salão da Veinom Fitness",
    width: 1280,
    height: 720,
    depth: 1.6,
    className:
      "left-[4%] bottom-[5%] w-[46%] aspect-square opacity-70 md:left-auto md:right-[2%] md:bottom-[6%] md:w-[24%] md:opacity-100",
    z: "z-[4]",
  },
] as const;

/**
 * Seção de impacto fixada (pin). Desktop: ~300% de scroll, frases com blur e fotos em parallax de profundidade.
 * Mobile: ~200% de scroll, sem blur. Movimento reduzido ou sem JS: frases empilhadas, fotos estáticas.
 */
export function ImpactPin() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const phrases = gsap.utils.toArray<HTMLElement>("[data-phrase]");
      const layers = gsap.utils.toArray<HTMLElement>("[data-layer]");
      const counters = gsap.utils.toArray<HTMLElement>("[data-step]");

      const build = (distance: string, heavy: boolean) => {
        stackRef.current?.setAttribute("data-mode", "pin");

        const hidden = heavy
          ? { autoAlpha: 0, yPercent: 30, filter: "blur(12px)" }
          : { autoAlpha: 0, yPercent: 30 };
        const shown = heavy ? { autoAlpha: 1, yPercent: 0, filter: "blur(0px)" } : { autoAlpha: 1, yPercent: 0 };
        const gone = heavy
          ? { autoAlpha: 0, yPercent: -24, filter: "blur(10px)" }
          : { autoAlpha: 0, yPercent: -24 };

        gsap.set(phrases, hidden);

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: distance,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Profundidade: cada camada sobe numa velocidade própria; as fotos se abrem ao longo das frases
        const revealAt = [0, 0.4, 3, 6];
        layers.forEach((layer, i) => {
          const depth = Number(layer.dataset.depth ?? 1);
          const inner = layer.querySelector<HTMLElement>("[data-layer-img]");
          tl.fromTo(layer, { yPercent: 40 * depth }, { yPercent: -40 * depth, ease: "none", duration: 9 }, 0);
          tl.fromTo(
            layer,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out" },
            revealAt[i] ?? 0,
          );
          if (inner) {
            tl.fromTo(inner, { scale: 1.25 }, { scale: 1, ease: "none", duration: 9 }, 0);
          }
        });

        tl.fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 9 }, 0);

        phrases.forEach((el, i) => {
          const start = i * 3;
          tl.fromTo(el, hidden, { ...shown, duration: 1.2 }, start + 0.3);
          tl.fromTo(
            counters[i],
            { autoAlpha: 0.3 },
            { autoAlpha: 1, duration: 0.6 },
            start + 0.3,
          );
          if (i < phrases.length - 1) {
            tl.to(el, { ...gone, duration: 0.9, ease: "power3.in" }, start + 2.2);
            tl.to(counters[i], { autoAlpha: 0.3, duration: 0.6 }, start + 2.2);
          }
        });

        return () => {
          stackRef.current?.removeAttribute("data-mode");
        };
      };

      mm.add(MQ.desktop, () => build("+=300%", true));
      mm.add(MQ.mobile, () => build("+=200%", false));

      mm.add(MQ.reduce, () => {
        gsap.set([...phrases, ...layers, ...counters], { clearProps: "all" });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Sua decisão, sua evolução, sua transformação"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-preto"
    >
      {/* Brilho neon de fundo */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_45%,rgba(43,227,106,0.16),transparent_60%)]"
        aria-hidden="true"
      />

      {/* Colagem de fotos em camadas */}
      <div className="absolute inset-0">
        {LAYERS.map((l) => (
          <figure
            key={l.src}
            data-layer
            data-depth={l.depth}
            className={`absolute m-0 overflow-hidden will-change-transform ${l.z} ${l.className} ${
              l.depth >= 1 ? "box-glow" : ""
            }`}
          >
            <div data-layer-img className="h-full w-full will-change-transform">
              <Image
                src={asset(l.src)}
                alt={l.alt}
                width={l.width}
                height={l.height}
                loading="lazy"
                sizes="(min-width: 768px) 42vw, 86vw"
                className="photo-treat h-full w-full object-cover"
              />
            </div>
          </figure>
        ))}
      </div>

      {/* Véu para garantir leitura do texto sobre as fotos */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-preto via-preto/70 to-transparent md:via-preto/55"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-28 sm:px-8 lg:px-12">
        <div className="flex gap-6 md:gap-10">
          <ol className="hidden flex-col gap-3 pt-3 text-xs font-bold tracking-[0.2em] text-neon sm:flex" aria-hidden="true">
            {PHRASES.map((_, i) => (
              <li key={i} data-step>
                {String(i + 1).padStart(2, "0")}
              </li>
            ))}
          </ol>
          <div ref={stackRef} className="impact-stack">
            {PHRASES.map((p) => {
              const idx = p.text.indexOf(p.accent);
              return (
                <p
                  key={p.text}
                  data-phrase
                  className="impact-phrase max-w-[13ch] text-[clamp(1.75rem,6.2vw,5.75rem)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-white will-change-transform"
                >
                  {p.text.slice(0, idx)}
                  <span className="text-neon text-glow">{p.accent}</span>
                </p>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-5 bottom-10 z-10 sm:inset-x-8 lg:inset-x-12" aria-hidden="true">
        <div className="h-px w-full bg-white/15">
          <span ref={progressRef} className="block h-px w-full origin-left bg-neon" />
        </div>
      </div>
    </section>
  );
}
