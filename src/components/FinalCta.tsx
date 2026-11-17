"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { Button } from "./Button";
import { ParallaxImage } from "./ParallaxImage";
import { RevealText } from "./RevealText";
import { WhatsAppIcon } from "./icons";

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: ref.current, start: "top 65%", once: true },
        });
        tl.fromTo("[data-cta-frame='h']", { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: "expo.out" })
          .fromTo("[data-cta-frame='v']", { scaleY: 0 }, { scaleY: 1, duration: 1.4, ease: "expo.out" }, 0)
          .fromTo(
            "[data-cta-in]",
            { y: 40, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out", stagger: 0.12 },
            0.4,
          );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      aria-labelledby="cta-title"
      id="comecar"
      className="relative isolate flex min-h-[90svh] items-center overflow-hidden bg-preto py-28"
    >
      <div className="absolute inset-0 -z-10">
        <ParallaxImage
          src="/images/cta-salao.webp"
          alt="Salão da Veinom Fitness com aparelhos e iluminação de LED verde"
          width={639}
          height={359}
          amount={18}
          overlay={false}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-preto/70" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-preto via-transparent to-preto" aria-hidden="true" />
        <div className="photo-glow absolute inset-0" aria-hidden="true" />
      </div>

      {/* Moldura dourada fina */}
      <span data-cta-frame="h" className="absolute left-5 right-5 top-10 h-px origin-left bg-neon/60 sm:left-8 sm:right-8 lg:left-12 lg:right-12" aria-hidden="true" />
      <span data-cta-frame="h" className="absolute bottom-10 left-5 right-5 h-px origin-right bg-neon/60 sm:left-8 sm:right-8 lg:left-12 lg:right-12" aria-hidden="true" />
      <span data-cta-frame="v" className="absolute bottom-10 right-5 top-10 w-px origin-top bg-neon/60 sm:right-8 lg:right-12" aria-hidden="true" />

      <div className="mx-auto w-full max-w-[1440px] px-7 sm:px-14 lg:px-24">
        <RevealText
          as="h2"
          id="cta-title"
          text="SUA TRANSFORMAÇÃO COMEÇA COM UMA ESCOLHA."
          accent={[5]}
          className="max-w-[14ch] text-[clamp(1.75rem,7vw,7.5rem)] font-black uppercase leading-[0.9] tracking-[-0.03em] text-white"
        />
        <div className="mt-10 grid gap-10 md:ml-[30%] md:max-w-2xl">
          <p data-cta-in className="text-base leading-relaxed text-white/85 sm:text-lg">
            Não deixe para depois o cuidado com você. Venha conhecer a Veinom Fitness e dê o primeiro passo para
            alcançar seus objetivos.
          </p>
          <div data-cta-in>
            <Button href={siteConfig.whatsapp.url} icon={<WhatsAppIcon className="h-5 w-5" />}>
              QUERO COMEÇAR A TREINAR
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
