export type Post = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readTime: string;
  category: string;
  categoryColor: string;
  image: string;
};

export const posts: Post[] = [
  {
    slug: "seo-para-medicos",
    title: "Como aparecer no Google se és médico independente em Portugal (2026)",
    description: "O guia completo de SEO local para médicos e psicólogos. Desde o Google Business Profile até às palavras-chave certas para a tua especialidade — tudo o que precisas de saber para surgir no topo.",
    publishedAt: "2026-04-07",
    readTime: "9 min",
    category: "SEO",
    categoryColor: "emerald",
    image: "/blog/seo-para-medicos/opengraph-image",
  },
  {
    slug: "google-maps-consultorio",
    title: "Google Maps para consultórios: guia completo para 2026",
    description: "Um perfil de Google Maps bem optimizado pode triplicar o número de chamadas recebidas. Aprende como configurar, optimizar e crescer no Google Maps — passo a passo.",
    publishedAt: "2026-04-05",
    readTime: "7 min",
    category: "Google Maps",
    categoryColor: "blue",
    image: "/blog/google-maps-consultorio/opengraph-image",
  },
  {
    slug: "pacientes-escolhem-concorrente",
    title: "Porque é que os pacientes escolhem o teu concorrente (e não a ti)",
    description: "A razão não é o preço, nem a localização. É o que os pacientes encontram — ou não encontram — quando te pesquisam online. Este artigo explica exactamente o que está a acontecer.",
    publishedAt: "2026-04-02",
    readTime: "6 min",
    category: "Marketing",
    categoryColor: "purple",
    image: "/blog/pacientes-escolhem-concorrente/opengraph-image",
  },
];
