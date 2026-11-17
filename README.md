# Veinom Fitness | Landing page

Site institucional da Veinom Fitness (Tijucal, Cuiabá - MT), feito com Next.js 16 (App Router, TypeScript), Tailwind CSS 4, GSAP + ScrollTrigger e Lenis. Gera um site 100% estático (pasta `out/`).

## Requisitos

- Node.js 20.9 ou superior (recomendado 22)
- npm

## Rodar localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

Para gerar a versão estática e testar:

```bash
npm run build      # gera a pasta out/
npm run start      # serve a pasta out/ (usa npx serve)
```

## Trocar o número do WhatsApp

Todos os dados do negócio ficam em **`src/config/site.ts`**. Para trocar o WhatsApp, altere só estas constantes no topo do arquivo:

```ts
export const WHATSAPP_NUMBER = "5565992488070";      // 55 + DDD + número, só dígitos
export const WHATSAPP_DISPLAY = "(65) 99248-8070";   // como aparece no site
export const WHATSAPP_MESSAGE = "Olá! Conheci a Veinom Fitness pelo site e gostaria de saber mais sobre planos e matrículas.";
```

Todos os botões (navbar, hero, contato, CTA final, rodapé e botão flutuante) usam esse valor. Se mudar o telefone, ajuste também `phone.international` no mesmo arquivo (usado no SEO).

Endereço, horários, Instagram, e-mail, notas do Google e do Wellhub, modalidades, comodidades e coordenadas do mapa também estão nesse arquivo.

## Conteúdo pendente

Ficam só em comentários `PENDENTE` no código (não aparecem no site): depoimentos com nome e foto, preços e planos, equipe, história detalhada, número de alunos, grade de aulas e confirmação de Fisiculturismo.

## Deploy no GitHub Pages (GitHub Actions)

1. Crie um repositório no GitHub e envie este projeto para a branch `main`.
2. Em **Settings > Pages**, em "Build and deployment", escolha **Source: GitHub Actions**.
3. Cada push na `main` roda `.github/workflows/deploy.yml`, que faz o build com `NEXT_PUBLIC_BASE_PATH=/nome-do-repositorio`, cria `out/.nojekyll` e publica.

Para domínio próprio ou Vercel, deixe `NEXT_PUBLIC_BASE_PATH` vazio e defina `NEXT_PUBLIC_SITE_URL` com a URL final (usada no SEO e nas imagens de compartilhamento).

## Deploy na Cloudflare Pages

O projeto `veinom-git` está conectado à branch `main` do GitHub. O build usa `npm run build`, publica a pasta `out/` e define `NEXT_PUBLIC_SITE_URL` como `https://veinom-git.pages.dev`. Cada push na branch `main` dispara uma nova publicação automaticamente.

## Regras do projeto

Leia `CLAUDE.md` antes de editar: Lenis + GSAP para toda animação, duração mínima de 0.6s, respeito a `prefers-reduced-motion`, conteúdo visível sem JS e layout a partir de 360px.
