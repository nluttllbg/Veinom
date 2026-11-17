"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { CountUp } from "./CountUp";
import { ParallaxImage } from "./ParallaxImage";
import { RevealText } from "./RevealText";
import { Stars } from "./icons";

/*
 * PENDENTE: número exato de alunos (não exibir até o cliente confirmar).
 * PENDENTE: nomes e formação dos professores para um bloco de equipe.
 */
export function Benefits() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-benefit]",
          { y: 80, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: "[data-benefit-grid]", start: "top 80%", once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  const weekday = siteConfig.hours[0];
  const saturday = siteConfig.hours[1];

  return (
    <section
      id="beneficios"
      ref={ref}
      aria-labelledby="beneficios-title"
      className="relative overflow-hidden bg-grafite py-24 sm:py-32 lg:py-44"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <RevealText
          as="h2"
          id="beneficios-title"
          text="POR QUE TREINAR NA VEINOM."
          accent={[3]}
          className="max-w-[14ch] text-[clamp(2.2rem,6.4vw,6rem)] font-black uppercase leading-[0.92] tracking-[-0.02em] text-white lg:ml-[16%]"
        />

        <div data-benefit-grid className="mt-14 grid grid-cols-1 gap-4 sm:gap-5 lg:mt-24 lg:grid-cols-12">
          {/* Especialistas em iniciantes e idosos: bloco maior, com foto */}
          <article
            data-benefit
            className="relative isolate flex min-h-[420px] flex-col justify-end overflow-hidden border border-white/10 p-7 sm:p-10 lg:col-span-7 lg:row-span-2 lg:min-h-[620px] lg:p-14"
          >
            <div className="absolute inset-0 -z-10">
              <ParallaxImage
                src="/images/anilha-detalhe.webp"
                alt=""
                width={639}
                height={359}
                amount={18}
                overlay={false}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-preto via-preto/80 to-preto/30" aria-hidden="true" />
            </div>
            <h3 className="max-w-[14ch] text-[clamp(1.5rem,4.6vw,4.25rem)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-white">
              Especialistas em iniciantes e <span className="text-neon text-glow">idosos.</span>
            </h3>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/85 sm:text-lg">
              Nunca pisou numa academia ou quer manter o corpo ativo na terceira idade? Este é o seu lugar. Aqui o
              treino respeita o seu ritmo, com amparo, carinho e cuidado.
            </p>
          </article>

          {/* Professores */}
          <article data-benefit className="flex flex-col justify-between gap-10 border border-white/10 bg-cinza p-7 sm:p-10 lg:col-span-5">
            <span className="block h-px w-16 bg-neon" aria-hidden="true" />
            <div>
              <h3 className="text-[clamp(1.5rem,2.6vw,2.25rem)] font-black uppercase leading-[1] text-white">
                Professores que dão atenção
              </h3>
              <p className="mt-4 text-base leading-relaxed text-white/75">
                Você não treina sozinho. Nossos professores dão a atenção que cada aluno merece.
              </p>
            </div>
          </article>

          {/* Desde 2020 */}
          <article data-benefit className="flex flex-col justify-between gap-8 border border-white/10 bg-cinza p-7 sm:p-10 lg:col-span-5">
            <p className="flex flex-col">
              <span className="sr-only">Abertos desde {siteConfig.foundingYear}</span>
              <span aria-hidden="true" className="text-sm font-bold uppercase tracking-[0.16em] text-white/70">
                Abertos desde
              </span>
              <CountUp
                to={siteConfig.foundingYear}
                from={2000}
                duration={1.8}
                className="mt-2 text-[clamp(4rem,8vw,6.5rem)] font-black leading-[0.85] tracking-[-0.03em] text-neon"
              />
            </p>
            <p className="text-base leading-relaxed text-white/75">
              Desde outubro de 2020 cuidando de quem treina no Tijucal.
            </p>
          </article>

          {/* Nota no Google: bloco em verde neon */}
          <article data-benefit className="flex flex-col justify-between gap-8 bg-neon p-7 text-preto sm:p-10 lg:col-span-6">
            <p className="flex flex-wrap items-end gap-x-6 gap-y-3">
              <span className="sr-only">
                Nota {siteConfig.rating.display} no Google, com {siteConfig.rating.count} avaliações
              </span>
              <CountUp
                to={siteConfig.rating.value}
                decimals={1}
                className="text-[clamp(5rem,10vw,8.5rem)] font-black leading-[0.8] tracking-[-0.04em]"
              />
              <span aria-hidden="true" className="flex flex-col gap-2 pb-1">
                <span className="inline-flex gap-1 [&_svg]:text-preto">
                  <Stars className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold uppercase tracking-[0.12em]">no Google</span>
              </span>
            </p>
            <p className="text-lg font-bold leading-snug">
              <CountUp to={siteConfig.rating.count} duration={2} className="font-black" />{" "}
              <span aria-hidden="true">avaliações de quem treina com a gente.</span>
            </p>
          </article>

          {/* Horário */}
          <article data-benefit className="flex flex-col justify-between gap-8 border border-white/10 bg-preto p-7 sm:p-10 lg:col-span-6">
            <p className="text-[clamp(3rem,6.4vw,5.5rem)] font-black leading-[0.9] tracking-[-0.03em] text-white">
              <span aria-hidden="true">
                {weekday.periods[0].opens.slice(0, 2)}h{" "}
                <span className="align-middle text-[0.38em] font-bold uppercase tracking-[0.1em] text-neon">às</span>{" "}
                {weekday.periods[0].closes.slice(0, 2)}h
              </span>
              <span className="sr-only">Das 05h às 22h, de segunda a sexta</span>
            </p>
            <p className="text-base leading-relaxed text-white/75">
              <strong className="font-bold text-white">De segunda a sexta, das 05h às 22h.</strong> Aos sábados,{" "}
              {saturday.display.replace("08h", "das 08h").replace("e 16h", "e das 16h")}.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
