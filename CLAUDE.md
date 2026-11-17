# CLAUDE.md

Guia para qualquer agente ou pessoa que for editar este projeto (landing page da Veinom Fitness, Tijucal, Cuiabá - MT).

## Regra obrigatória

**Toda animação deve utilizar Lenis para o scroll e GSAP (com ScrollTrigger) para os movimentos.**

- Não use CSS transitions/keyframes, Framer Motion ou outra lib para mover elementos (posição, escala, rotação, clip-path).
  Transições de cor/filtro no hover em CSS são aceitáveis.
- Nada de `scroll-behavior: smooth`, `element.scrollIntoView({ behavior: "smooth" })` ou outra lib de scroll.
- Duração mínima de qualquer tween temporizado: **0.6s**. Eases padrão: `power3.out` e `expo.out`.
  Tweens ligados ao scroll com `scrub` usam `ease: "none"` (o movimento acompanha o scroll).

## Sincronia Lenis <-> ScrollTrigger

Existe **uma única instância** do Lenis, criada em `src/components/SmoothScrollProvider.tsx` (client component que envolve a página no `layout.tsx`):

```ts
const lenis = new Lenis({ autoRaf: false, ... });
const off = lenis.on("scroll", ScrollTrigger.update);   // ScrollTrigger recalcula a cada frame do Lenis
const tick = (t: number) => lenis.raf(t * 1000);         // o RAF do Lenis é dirigido pelo ticker do GSAP
gsap.ticker.add(tick);
gsap.ticker.lagSmoothing(0);                              // evita saltos entre Lenis e GSAP

// cleanup no unmount
off(); gsap.ticker.remove(tick); lenis.destroy();
```

- Nunca crie outro `new Lenis()`. Use o hook `useSmoothScroll()` para obter `lenis`, `scrollTo`, `lock` e `unlock`.
- Links de âncora: use `scrollTo("#id")` (já desconta a altura da navbar `#site-navbar`). O componente `Button` faz isso para `href="#..."`.
- Menu mobile: `lock()` / `unlock()` chamam `lenis.stop()` / `lenis.start()` para travar o scroll do body.
- Plugins são registrados uma vez, no client, em `src/lib/gsap.ts` (`gsap.registerPlugin(ScrollTrigger, useGSAP)`). Importe `gsap`, `ScrollTrigger` e `useGSAP` sempre de `@/lib/gsap`.

## Padrão por componente

- Toda animação fica dentro de `useGSAP(() => { ... }, { scope: ref })` (cleanup automático via `gsap.context`).
- Use `gsap.matchMedia()` com as queries de `MQ` (`src/lib/gsap.ts`) e retorne `() => mm.revert()`:
  - `MQ.desktop`: animações completas (pin longo, blur).
  - `MQ.mobile`: versões leves (pin mais curto, sem `filter: blur`).
  - `MQ.reduce`: `prefers-reduced-motion`. Nada de animação, conteúdo visível.
- Hover com movimento: use `contextSafe` do `useGSAP` (ver `ActivityCard`).
- Elementos animados pelo GSAP não devem receber classes Tailwind `translate-*`, `scale-*` ou `rotate-*` (no Tailwind v4 elas usam as propriedades CSS `translate`/`scale`/`rotate`, que se somam ao `transform` do GSAP).
- Pré-estado anti "flash" do hero: o script inline em `layout.tsx` adiciona `.js-motion` ao `<html>` só quando há JS e não há movimento reduzido. Ao animar algo que tem pré-estado em CSS, use `fromTo` e zere explicitamente (`y: 0`), senão o GSAP lê o `translateY` do CSS como `y` em px.

## Movimento reduzido

- Lenis com `smoothWheel: false` e `respectReducedMotion: true` (scroll nativo, `scrollTo` instantâneo).
- Sem pin na seção de impacto: as três frases aparecem empilhadas.
- Contador, revelações e menu aparecem no estado final.

## Mobile

- `body { overflow-x: clip }`. Nada pode passar de 360px de largura.
- Pins no mobile são curtos (`+=200%`) e sem blur.
- Títulos com palavras longas (TRANSFORMAÇÃO, EVOLUÇÃO) usam `clamp()` com mínimo de 1.75rem para caber em 360px.
- O botão flutuante do WhatsApp respeita `env(safe-area-inset-*)`, fica escondido no hero e some quando o CTA final (`#comecar`) ou o rodapé (`#rodape`) entram na tela, para nunca cobrir CTAs.

## Dados e imagens

- Todos os dados do negócio ficam em `src/config/site.ts` (fonte: CONTEUDO.md do cliente, pesquisa de 17/11/2026).
- Nada de dado inventado. O que ainda falta (depoimentos nomeados, preços/planos, equipe, história detalhada,
  número de alunos) fica só em comentários `PENDENTE` no código, nunca na página.
- Números animados (`CountUp`) só para valores confirmados: 5,0 (Google), 883 avaliações, 2020, 6 modalidades.
  O HTML estático já traz o valor final; a animação só roda com JS e movimento permitido.
- Toda imagem de `/public` deve passar por `asset()` (`src/lib/asset.ts`), que prefixa o `basePath` (GitHub Pages).
- Só use as fotos reais da academia em `public/images/` (convertidas para WebP a partir dos JPG originais).
- O logo é JPG com fundo preto: use a classe `.logo-screen` (mix-blend-mode: screen) para sumir com o fundo.

## Identidade visual

- Preto (`preto`, `grafite`, `cinza`), branco e verde neon do logo (`neon` = #2BE36A). Classes `text-glow` e `box-glow` imitam o brilho do logo.
- Montserrat 400, 700 e 900.

## Texto

- pt-BR. Sem emojis. Sem travessões (em dash/en dash); use vírgulas e pontos.
- Sem "eyebrow" (texto pequeno decorativo acima de títulos).
