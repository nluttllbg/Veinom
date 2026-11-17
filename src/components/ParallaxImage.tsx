"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { asset } from "@/lib/asset";

type ParallaxImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imageClassName?: string;
  /** Intensidade do deslocamento vertical, em % da altura da imagem. */
  amount?: number;
  priority?: boolean;
  sizes?: string;
  /** Overlay escuro/quente padrão por cima da foto. */
  overlay?: boolean;
};

/**
 * Imagem com parallax vertical via ScrollTrigger (scrub).
 * O wrapper corta o excesso; a imagem é um pouco maior que o quadro.
 */
export function ParallaxImage({
  src,
  alt,
  width,
  height,
  className = "",
  imageClassName = "",
  amount = 10,
  priority = false,
  sizes = "100vw",
  overlay = true,
}: ParallaxImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          innerRef.current,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: wrapRef, dependencies: [amount] },
  );

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <div
        ref={innerRef}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: `-${amount / 2 + 2}%`, bottom: `-${amount / 2 + 2}%` }}
      >
        <Image
          src={asset(src)}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes={sizes}
          className={`photo-treat h-full w-full object-cover ${imageClassName}`}
        />
      </div>
      {overlay ? <div className="photo-overlay pointer-events-none absolute inset-0" aria-hidden="true" /> : null}
    </div>
  );
}
