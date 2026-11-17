/**
 * Todos os dados do negócio ficam aqui (fonte: CONTEUDO.md, pesquisa de 17/11/2026).
 * Para trocar o WhatsApp, altere apenas WHATSAPP_NUMBER (formato internacional, só dígitos),
 * WHATSAPP_DISPLAY (como aparece no site) e, se quiser, WHATSAPP_MESSAGE.
 *
 * PENDENTE (não exibir no site até o cliente enviar):
 * - Depoimentos com nome e foto de alunos.
 * - Preços e planos.
 * - Equipe (nomes, fotos e formação dos professores).
 * - História detalhada da academia e nome de quem assina o texto do "Sobre nós".
 * - Número exato de alunos.
 * - Fisiculturismo: aparece só no Wellhub. Confirmar com o cliente antes de listar como modalidade.
 */
export const WHATSAPP_NUMBER = "5565992488070";
export const WHATSAPP_DISPLAY = "(65) 99248-8070";
export const WHATSAPP_MESSAGE =
  "Olá! Conheci a Veinom Fitness pelo site e gostaria de saber mais sobre planos e matrículas.";

export const whatsappUrl = (message: string = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

const LAT = -15.6349583;
const LNG = -56.020869;

export type HoursEntry = {
  label: string;
  /** Dias da semana (0 = domingo ... 6 = sábado) */
  days: number[];
  /** Períodos no formato HH:MM */
  periods: { opens: string; closes: string }[];
  /** Texto exibido */
  display: string;
};

export const siteConfig = {
  name: "Veinom Fitness",
  legalName: "VEINOM FITNESS ACADEMIA LTDA",
  cnpj: "39.396.495/0001-55",
  foundingDate: "2020-10-13",
  foundingYear: 2020,
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  title: "Veinom Fitness | Academia no Tijucal, Cuiabá - MT",
  description:
    "Academia no Tijucal, em Cuiabá, especialista em iniciantes e idosos. Musculação, funcional, boxe, capoeira, jump e fitness dance. Nota 5,0 no Google com 883 avaliações. Segunda a sexta, das 05h às 22h.",
  tagline: "Especialistas em iniciantes e idosos.",
  slogan: "A Camisa 10 das academias.",
  address: {
    street: "Avenida Radialista Edson Luis da Silva, 44",
    popularName: "Av. Espigão, 44",
    neighborhood: "Tijucal",
    city: "Cuiabá",
    state: "MT",
    postalCode: "78088-000",
    country: "BR",
    reference: "Próximo ao Sicredi",
    full: "Avenida Radialista Edson Luis da Silva, 44, Tijucal, Cuiabá - MT, CEP 78088-000",
  },
  phone: {
    display: WHATSAPP_DISPLAY,
    international: "+55-65-99248-8070",
  },
  whatsapp: {
    number: WHATSAPP_NUMBER,
    display: WHATSAPP_DISPLAY,
    message: WHATSAPP_MESSAGE,
    url: whatsappUrl(),
  },
  email: "veinomfitness@gmail.com",
  instagram: {
    handle: "@veinomfitness",
    url: "https://instagram.com/veinomfitness",
  },
  facebook: "https://facebook.com/veinomfitness",
  /** Matrícula online real. Não está no brief do site; fica disponível aqui para uso futuro. */
  enrollUrl: "https://veinomfitness.sitesca.com/matricular",
  rating: {
    value: 5,
    display: "5,0",
    count: 883,
    source: "Google",
    asOf: "2026-11-04",
    allReviewsUrl:
      "https://www.google.com/maps/search/?api=1&query=Academia%20Veinom%20Fitness%20Tijucal%20Cuiab%C3%A1",
  },
  wellhub: {
    value: 4.75,
    display: "4,75",
    count: 81,
  },
  /** Trechos reais curtos de avaliações do Google, sem nome do autor. */
  googleQuotes: ["Top a academia", "Academia top"],
  geo: {
    lat: LAT,
    lng: LNG,
    embedUrl: `https://maps.google.com/maps?q=${LAT},${LNG}&z=17&output=embed`,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Academia%20Veinom%20Fitness%20Tijucal%20Cuiab%C3%A1",
  },
  timezone: "America/Cuiaba",
  hours: [
    {
      label: "Segunda a sexta",
      days: [1, 2, 3, 4, 5],
      periods: [{ opens: "05:00", closes: "22:00" }],
      display: "05h às 22h",
    },
    {
      label: "Sábado",
      days: [6],
      periods: [
        { opens: "08:00", closes: "11:00" },
        { opens: "16:00", closes: "19:00" },
      ],
      display: "08h às 11h e 16h às 19h",
    },
    {
      label: "Domingo",
      days: [0],
      periods: [],
      display: "Fechado",
    },
  ] satisfies HoursEntry[],
} as const;

export const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Estrutura", href: "#estrutura" },
  { label: "Benefícios", href: "#beneficios" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Contato", href: "#contato" },
] as const;

/** Modalidades confirmadas (Instagram + Wellhub). */
export const modalities = [
  {
    title: "Musculação",
    benefit: "Mais força, massa muscular e disposição para o dia a dia, no ritmo de quem está começando.",
  },
  {
    title: "Funcional",
    benefit: "Movimentos do cotidiano treinados com mais equilíbrio, mobilidade e resistência.",
  },
  {
    title: "Boxe",
    benefit: "Condicionamento, coordenação e um jeito eficiente de descarregar o estresse.",
  },
  {
    title: "Capoeira",
    benefit: "Agilidade, flexibilidade e ritmo, unindo luta, música e cultura brasileira.",
  },
  {
    title: "Jump",
    benefit: "Aula aeróbica no mini trampolim que acelera o gasto calórico e fortalece as pernas.",
  },
  {
    title: "Fitness dance",
    benefit: "Coreografias animadas para melhorar o fôlego e queimar calorias se divertindo.",
  },
] as const;

/** Comodidades: Wellhub + acessibilidade informada no Google. */
export const amenities = [
  "Ar-condicionado",
  "Chuveiro",
  "Estacionamento",
  "Itens de higiene pessoal",
  "Loja de artigos esportivos",
  "Mini bar",
  "Nutricionista",
  "Personal trainer",
  "Wi-Fi",
  "Entrada e banheiro acessíveis para cadeirantes",
] as const;
