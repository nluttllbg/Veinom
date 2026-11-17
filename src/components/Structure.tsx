"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { amenities, modalities } from "@/config/site";
import { CountUp } from "./CountUp";
import { ParallaxImage } from "./ParallaxImage";
import { RevealText } from "./RevealText";
import { CheckIcon } from "./icons";

/*
 * PENDENTE: grade de horários das aulas coletivas (boxe, capoeira, jump, fitness dance, funcional).
 * PENDENTE: confirmar Fisiculturismo (listado só no Wellhub) antes de incluir como modalidade.
 */
export function Structure() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-mod-row]",
          { y: 60, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: "[data-mod-list]", start: "top 80%", once: true },
          },
        );
        gsap.fromTo(
          "[data-mod-line]",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.1,
            scrollTrigger: { trigger: "[data-mod-list]", start: "top 80%", once: true },
          },
        );
        gsap.fromTo(
          "[data-amenity]",
          { y: 28, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: { trigger: "[data-amenity-list]", start: "top 85%", once: true },
          },
        );
        gsap.fromTo(
          "[data-intro]",
          { y: 30, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      id="estrutura"
      ref={ref}
      aria-labelledby="estrutura-title"
      className="relative overflow-hidden bg-preto py-24 sm:py-32 lg:py-44"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Cabeçalho assimétrico: título à esquerda, número de modalidades deslocado à direita */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <RevealText
            as="h2"
            id="estrutura-title"
            text="ESTRUTURA E MODALIDADES PARA O SEU RITMO."
            accent={[5, 6]}
            className="text-[clamp(2rem,6.4vw,6rem)] font-black uppercase leading-[0.92] tracking-[-0.02em] text-white lg:col-span-8"
          />
          <div className="flex items-end gap-5 lg:col-span-3 lg:col-start-10">
            <p className="flex items-end gap-4">
              <span className="sr-only">6 modalidades</span>
              <CountUp
                to={modalities.length}
                className="text-[clamp(5rem,12vw,9rem)] font-black leading-[0.8] text-neon text-glow"
              />
              <span aria-hidden="true" className="pb-2 text-sm font-bold uppercase leading-snug tracking-[0.16em] text-white/80">
                modalidades
                <br />
                para escolher
              </span>
            </p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <ParallaxImage
                src="/images/salao-aulas-boxe.webp"
                alt="Salão de aulas coletivas da Veinom Fitness com sacos de pancada, espelhos e luz neon no teto"
                width={1280}
                height={720}
                amount={14}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="aspect-[4/3] w-full lg:aspect-[4/5]"
              />
              <p data-intro className="mt-6 max-w-md text-base leading-relaxed text-white/75">
                Musculação no salão de aparelhos e aulas coletivas em um salão próprio, com sacos de pancada,
                espelhos e muito espaço para se movimentar.
              </p>
            </div>
          </div>

          <ol data-mod-list className="lg:col-span-7">
            {modalities.map((m, i) => (
              <li key={m.title} className="relative">
                <span data-mod-line className="absolute inset-x-0 top-0 h-px origin-left bg-white/15" aria-hidden="true" />
                <div
                  data-mod-row
                  className="group grid grid-cols-[auto_1fr] gap-x-5 py-7 sm:gap-x-8 sm:py-9 md:grid-cols-[auto_minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-baseline"
                >
                  <span className="text-xs font-bold tracking-[0.2em] text-neon" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[clamp(1.6rem,3.4vw,2.75rem)] font-black uppercase leading-none tracking-[-0.01em] text-white transition-colors duration-500 group-hover:text-neon">
                    {m.title}
                  </h3>
                  <p className="col-start-2 mt-3 text-base leading-relaxed text-white/75 md:col-start-3 md:mt-0">
                    {m.benefit}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Comodidades */}
        <div className="mt-24 grid grid-cols-1 gap-8 lg:mt-40 lg:grid-cols-12 lg:gap-10">
          <div className="relative lg:col-span-7">
            <ParallaxImage
              src="/images/area-cardio.webp"
              alt="Área de cardio da Veinom Fitness com esteiras, elípticos e iluminação neon"
              width={1280}
              height={720}
              amount={12}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="aspect-[16/10] w-full"
            />
          </div>

          <div className="lg:col-span-5 lg:pl-6">
            <h3 className="text-[clamp(2rem,4.2vw,3.75rem)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-white">
              Tudo para você treinar com <span className="text-neon">conforto.</span>
            </h3>
            <ul data-amenity-list className="mt-8 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
              {amenities.map((a) => (
                <li
                  key={a}
                  data-amenity
                  className="flex items-start gap-3 border-t border-white/10 py-3.5 text-[0.95rem] leading-snug text-white/85"
                >
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-neon" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-12 lg:grid-cols-12 lg:gap-10">
            <ParallaxImage
              src="/images/escada-jardim-vertical.webp"
              alt="Escada de madeira ao lado de um jardim vertical na Veinom Fitness"
              width={1280}
              height={720}
              amount={16}
              sizes="(min-width: 1024px) 40vw, 50vw"
              className="aspect-[4/5] w-full lg:col-span-5 lg:col-start-2 lg:-mt-10 lg:aspect-[4/3]"
            />
            <ParallaxImage
              src="/images/bikes-escada.webp"
              alt="Bicicletas ergométricas e simulador de escada na área de cardio"
              width={1280}
              height={720}
              amount={16}
              sizes="(min-width: 1024px) 40vw, 50vw"
              className="mt-12 aspect-[4/5] w-full lg:col-span-5 lg:col-start-8 lg:mt-28 lg:aspect-[16/11]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
