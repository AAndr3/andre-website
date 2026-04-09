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
    slug: "site-para-medico-o-que-precisa",
    title: "O que precisa um site de médico para funcionar a sério (2026)",
    description: "Não basta ter um site bonito. Um site de médico que traz pacientes precisa de SEO técnico, copy certo, velocidade, e estrutura que o Google consiga ler. Aqui está o checklist completo.",
    publishedAt: "2026-04-09",
    readTime: "8 min",
    category: "Sites",
    categoryColor: "emerald",
    image: "/blog/site-para-medico-o-que-precisa/opengraph-image",
  },
  {
    slug: "google-business-profile-saude",
    title: "Google Business Profile para profissionais de saúde: guia passo a passo (2026)",
    description: "Como criar, verificar e optimizar o teu Google Business Profile para aparecer no mapa quando os pacientes pesquisam a tua especialidade. Com exemplos reais e erros a evitar.",
    publishedAt: "2026-04-08",
    readTime: "10 min",
    category: "Google Maps",
    categoryColor: "blue",
    image: "/blog/google-business-profile-saude/opengraph-image",
  },
  {
    slug: "doctoralia-vs-site-proprio",
    title: "Doctoralia vs site próprio: o que compensa mais para médicos independentes?",
    description: "Doctoralia, Topdoctors, ou site próprio? Análise honesta dos custos, benefícios e riscos de cada opção — para médicos e psicólogos independentes em Portugal.",
    publishedAt: "2026-04-06",
    readTime: "7 min",
    category: "Marketing",
    categoryColor: "purple",
    image: "/blog/doctoralia-vs-site-proprio/opengraph-image",
  },
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
