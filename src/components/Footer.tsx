"use client";

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { asset } from "@/lib/asset";
import { navLinks, siteConfig } from "@/config/site";
import { useSmoothScroll } from "./SmoothScrollProvider";
import { InstagramIcon, MailIcon, WhatsAppIcon } from "./icons";

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const [year, setYear] = useState(() => new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href);
  };

  return (
    <footer
      id="rodape"
      className="relative border-t border-neon/30 bg-preto pb-[calc(7rem+env(safe-area-inset-bottom))] pt-20 sm:pb-28"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-4">
          <Image
            src={asset("/images/logo-veinom.webp")}
            alt="Veinom Fitness"
            width={500}
            height={191}
            loading="lazy"
            className="logo-screen h-16 w-auto"
          />
          <p className="mt-6 max-w-xs leading-relaxed text-white/75">
            Academia no Tijucal, em Cuiabá. Especialistas em iniciantes e idosos, a Camisa 10 das academias.
          </p>
          <address className="mt-6 max-w-xs not-italic leading-relaxed text-white/60">
            {siteConfig.address.full}
            <br />
            {siteConfig.address.reference}
          </address>
        </div>

        <nav aria-label="Rodapé" className="lg:col-span-2 lg:col-start-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-neon">Navegação</h2>
          <ul className="mt-5 flex flex-col gap-1">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  className="inline-flex min-h-10 items-center text-white/80 hover:text-neon"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-neon">Horários</h2>
          <ul className="mt-5 flex flex-col gap-3 text-white/80">
            {siteConfig.hours.map((h) => (
              <li key={h.label}>
                <span className="block font-bold text-white">{h.label}</span>
                {h.display}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-neon">Contato</h2>
          <ul className="mt-5 flex flex-col gap-2">
            <li>
              <a
                href={siteConfig.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-3 text-white/85 hover:text-neon"
              >
                <WhatsAppIcon className="h-5 w-5 text-neon" />
                {siteConfig.whatsapp.display}
              </a>
            </li>
            <li>
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center gap-3 text-white/85 hover:text-neon"
              >
                <InstagramIcon className="h-5 w-5 text-neon" />
                {siteConfig.instagram.handle}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex min-h-10 items-center gap-3 break-all text-white/85 hover:text-neon"
              >
                <MailIcon className="h-5 w-5 shrink-0 text-neon" />
                {siteConfig.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-2 border-t border-white/10 pt-8 text-sm text-white/55 md:flex-row md:justify-between">
          <span>© {year} Veinom Fitness. Todos os direitos reservados.</span>
          <span>
            {siteConfig.legalName}, CNPJ {siteConfig.cnpj}
          </span>
        </div>
      </div>
    </footer>
  );
}
