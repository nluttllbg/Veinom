"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { ParallaxImage } from "./ParallaxImage";
import { RevealText } from "./RevealText";

/*
 * Texto escrito na voz de quem comanda a academia, só com o posicionamento real:
 * especialistas em iniciantes e idosos, atenção dos professores, amparo e cuidado com a terceira idade,
 * "a Camisa 10 das academias", bairro Tijucal, aberta em 2020.
 * PENDENTE: nome e foto de quem assina o texto (dono ou responsável) e história detalhada da academia.
 */
export function About() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-about-p]",
          { y: 40, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.14,
            scrollTrigger: { trigger: "[data-about-text]", start: "top 80%", once: true },
          },
        );
        gsap.fromTo(
          "[data-about-small]",
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: "[data-about-small]", start: "top 88%", once: true },
          },
        );
        gsap.fromTo(
          "[data-about-frame]",
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: ref.current, start: "top 70%", once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      id="sobre"
      ref={ref}
      aria-labelledby="sobre-title"
      className="relative overflow-hidden bg-cinza py-24 sm:py-32 lg:py-44"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12">
        {/* Fotos: fachada grande, salão menor sobreposto */}
        <div className="relative pb-16 sm:pb-24 lg:col-span-6 lg:pb-0">
          <span
            data-about-frame
            className="absolute -left-3 top-[10%] z-10 hidden h-[70%] w-px origin-top bg-neon shadow-[0_0_12px_rgba(43,227,106,0.7)] sm:block lg:-left-6"
            aria-hidden="true"
          />
          <ParallaxImage
            src="/images/fachada.webp"
            alt="Fachada da Veinom Fitness, prédio de dois andares com letreiro na Avenida Espigão, no Tijucal"
            width={1280}
            height={720}
            amount={14}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] w-[88%] lg:aspect-[4/5] lg:w-[82%]"
          />
          <div
            data-about-small
            className="box-glow absolute bottom-0 right-0 z-10 w-[58%] border-4 border-cinza lg:bottom-[-6%] lg:w-[52%]"
          >
            <ParallaxImage
              src="/images/sobre-musculacao.webp"
              alt="Salão de musculação da Veinom Fitness com o logo iluminado ao fundo"
              width={639}
              height={359}
              amount={12}
              sizes="(min-width: 1024px) 26vw, 58vw"
              className="aspect-[4/3] w-full"
            />
          </div>
        </div>

        <div data-about-text className="lg:col-span-5 lg:col-start-8 lg:self-center">
          <RevealText
            as="h2"
            id="sobre-title"
            text="A CAMISA 10 DAS ACADEMIAS."
            accent={[1, 2]}
            className="text-[clamp(2.2rem,5.2vw,4.75rem)] font-black uppercase leading-[0.92] tracking-[-0.02em] text-white"
          />
          <div className="mt-10 flex flex-col gap-6 text-base leading-relaxed text-white/80 sm:text-lg">
            <p data-about-p>
              Abrimos a Veinom Fitness em 2020, aqui no Tijucal, com uma certeza: academia boa é aquela em que
              todo mundo se sente bem-vindo. Por isso nos tornamos especialistas em quem está começando e em quem
              chegou à terceira idade e quer continuar em movimento.
            </p>
            <p data-about-p>
              Aqui ninguém fica perdido no salão. Nossos professores dão a atenção que cada aluno merece, com
              amparo, carinho e cuidado em cada treino. É assim que a gente honra o nome de Camisa 10 das
              academias.
            </p>
            <p data-about-p>
              Se você ainda tem dúvida se academia é para você, venha nos conhecer. O primeiro passo a gente dá
              junto.
            </p>
            <p data-about-p className="pt-2 text-sm font-bold uppercase tracking-[0.16em] text-neon">
              Equipe Veinom Fitness
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
