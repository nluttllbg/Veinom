"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import { Button } from "./Button";
import { RevealText } from "./RevealText";
import { ArrowIcon, ClockIcon, PinIcon, WhatsAppIcon } from "./icons";

const WEEKDAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Dia da semana atual no fuso da academia (America/Cuiaba). */
function todayAtGym(): number {
  try {
    const wd = new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone: siteConfig.timezone }).format(
      new Date(),
    );
    return WEEKDAY_INDEX[wd] ?? new Date().getDay();
  } catch {
    return new Date().getDay();
  }
}

export function Location() {
  const ref = useRef<HTMLElement>(null);
  const [today, setToday] = useState<number | null>(null);

  useEffect(() => {
    setToday(todayAtGym());
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          "[data-loc-in]",
          { y: 50, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: "[data-loc-grid]", start: "top 82%", once: true },
          },
        );
        gsap.fromTo(
          "[data-map]",
          { clipPath: "inset(0% 0% 0% 100%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "expo.out",
            scrollTrigger: { trigger: "[data-map]", start: "top 85%", once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <section
      id="contato"
      ref={ref}
      aria-labelledby="contato-title"
      className="relative overflow-hidden bg-preto py-24 sm:py-32 lg:py-44"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <RevealText
          as="h2"
          id="contato-title"
          text="VENHA NOS CONHECER NO TIJUCAL."
          accent={[4]}
          className="max-w-[14ch] text-[clamp(2.2rem,6.6vw,6.25rem)] font-black uppercase leading-[0.92] tracking-[-0.02em] text-white"
        />

        <div data-loc-grid className="mt-14 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col gap-10 lg:col-span-5">
            <address data-loc-in className="not-italic">
              <h3 className="flex items-center gap-3 text-lg font-bold text-white">
                <PinIcon className="h-5 w-5 text-neon" />
                Endereço
              </h3>
              <p className="mt-4 text-lg leading-relaxed text-white">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.neighborhood}, {siteConfig.address.city} - {siteConfig.address.state}
                <br />
                CEP {siteConfig.address.postalCode}
              </p>
              <p className="mt-4 text-base leading-relaxed text-white/70">
                Também encontrada como {siteConfig.address.popularName}, nome popular da avenida. {siteConfig.address.reference}.
              </p>
            </address>

            <div data-loc-in>
              <h3 className="flex items-center gap-3 text-lg font-bold text-white">
                <ClockIcon className="h-5 w-5 text-neon" />
                Horários
              </h3>
              <ul className="mt-4">
                {siteConfig.hours.map((h) => {
                  const isToday = today !== null && (h.days as readonly number[]).includes(today);
                  return (
                    <li
                      key={h.label}
                      className={`flex flex-col gap-1 border-t py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 ${
                        isToday ? "border-neon" : "border-white/15"
                      }`}
                      aria-current={isToday ? "date" : undefined}
                    >
                      <span className={`flex items-center gap-3 font-bold ${isToday ? "text-neon" : "text-white"}`}>
                        {h.label}
                        {isToday ? (
                          <span className="bg-neon px-2 py-0.5 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-preto">
                            Hoje
                          </span>
                        ) : null}
                      </span>
                      <span className={isToday ? "text-white" : "text-white/75"}>{h.display}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div data-loc-in className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button href={siteConfig.geo.mapsUrl} icon={<ArrowIcon className="h-4 w-4" />}>
                ABRIR NO GOOGLE MAPS
              </Button>
              <Button href={siteConfig.whatsapp.url} variant="outline" icon={<WhatsAppIcon className="h-4 w-4" />}>
                {siteConfig.whatsapp.display}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div data-map className="relative border border-neon/30">
              <iframe
                title="Mapa com a localização da Veinom Fitness no Tijucal, em Cuiabá, MT"
                src={siteConfig.geo.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="map-frame block aspect-square w-full sm:aspect-[16/11] lg:aspect-auto lg:h-[560px]"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
