export type SVGType = "google" | "growth" | "maps" | "patients";

export type LPTestimonial = {
  name: string;
  role: string;
  location: string;
  text: string;
  initials: string;
  color: string;
};

export type LPPage = {
  slug: string;
  bucket: "easy" | "medium";
  keyword: string;
  meta: { title: string; description: string };
  hero: { badge: string; headline: string[]; sub: string };
  problem: { intro: string; points: { icon: string; title: string; body: string }[] };
  stats: { value: string; label: string; sub: string }[];
  svgType: SVGType;
  copyFeature: string; // first row of comparison table — specialty-specific
  faq: { q: string; a: string }[];
  testimonial: LPTestimonial;
};

const T_MARIANA: LPTestimonial = {
  name: "Dra. Mariana Costa", role: "Psicóloga Clínica", location: "Lisboa",
  text: "Estava completamente invisível no Google. Em menos de 3 semanas o meu site aparecia no topo para 'psicóloga clínica Lisboa'. Recebi a primeira marcação directamente pelo site na primeira semana após o lançamento.",
  initials: "MC", color: "#3b82f6",
};
const T_RUI: LPTestimonial = {
  name: "Dr. Rui Fernandes", role: "Médico de Família", location: "Porto",
  text: "Demorei anos a adiar isto por achar que era complicado. Em 10 dias tinha um site profissional, aparecia no Google Maps e o copy estava escrito melhor do que eu alguma vez conseguiria. Vale cada cêntimo.",
  initials: "RF", color: "#8b5cf6",
};
const T_ANA: LPTestimonial = {
  name: "Dra. Ana Rodrigues", role: "Dermatologista", location: "Braga",
  text: "O que me convenceu foi a garantia. Ou aparecia no Google em 60 dias ou devolvia o dinheiro. Apareci em 18 dias. Hoje tenho uma lista de espera de 3 semanas — algo que nunca tinha acontecido antes.",
  initials: "AR", color: "#ec4899",
};

export const pages: LPPage[] = [
  // ─── BUCKET FÁCIL ────────────────────────────────────────────────────────
  {
    slug: "site-para-psicologos-portugal",
    bucket: "easy",
    keyword: "site para psicólogos portugal",
    meta: {
      title: "Site para Psicólogos em Portugal — Profissional, SEO, Pronto em 10 Dias | André Antunes",
      description: "Crio sites profissionais para psicólogos em Portugal com SEO configurado e Google Maps activo. Entrega em 10 dias e garantia de aparecer no Google em 60 dias ou devolução total.",
    },
    hero: {
      badge: "Especializado em Psicólogos",
      headline: ["Site profissional", "para psicólogos", "em Portugal."],
      sub: "Feito para que os teus futuros pacientes te encontrem quando pesquisam no Google — não ao teu concorrente. Entrega em 10 dias, garantia de 60 dias.",
    },
    problem: {
      intro: "A maioria dos psicólogos independentes em Portugal perde dezenas de pacientes por mês para colegas menos qualificados — apenas porque aparece primeiro no Google.",
      points: [
        { icon: "🔍", title: "Invisível nas pesquisas", body: "Alguém pesquisa 'psicólogo Lisboa' e encontra uma lista de directórios — não o teu nome. Esse paciente nunca chegou a saber que existes." },
        { icon: "🏥", title: "Plataformas que te sugam a margem", body: "Doctoralia e similares cobram comissão por cada paciente. O teu próprio site elimina esse custo e cria um canal directo, teu, para sempre." },
        { icon: "📄", title: "Um site que não converte", body: "Se já tens um site, provavelmente não está optimizado para os termos que os pacientes pesquisam. Um site bonito sem SEO é um cartaz numa cave." },
      ],
    },
    stats: [
      { value: "77%", label: "pesquisam o psicólogo online", sub: "antes de marcar consulta" },
      { value: "3 sem.", label: "lista de espera média", sub: "de clientes meus ao fim de 60 dias" },
      { value: "10 dias", label: "do briefing ao site live", sub: "com SEO e Google Maps activos" },
    ],
    svgType: "google",
    copyFeature: "Copy escrito para a linguagem do paciente de saúde mental",
    faq: [
      { q: "Tenho de saber escrever o copy do site?", a: "Não. Escrevo eu o copy todo, com base numa conversa inicial contigo. Fica com a tua voz, mas optimizado para os termos que os teus futuros pacientes pesquisam." },
      { q: "Posso aparecer no Google para a minha especialidade específica?", a: "Sim — e é isso que fazemos. Psicólogo de casal, psicólogo infantil, psicólogo de ansiedade: cada sub-especialidade tem as suas keywords e optimizamos especificamente para elas." },
      { q: "O site cumpre as regras éticas da Ordem dos Psicólogos?", a: "Sim. O site não faz promessas terapêuticas exageradas, não usa linguagem de \"cura garantida\" e respeita as normas deontológicas da OPP." },
      { q: "E se já tenho site mas quero melhorá-lo?", a: "Faço auditoria gratuita primeiro. Se fizer sentido optimizar o que existe em vez de criar do zero, digo-o directamente — e fazemos isso." },
    ],
    testimonial: T_MARIANA,
  },

  {
    slug: "site-para-medico-de-familia-portugal",
    bucket: "easy",
    keyword: "site para médico de família portugal",
    meta: {
      title: "Site para Médico de Família em Portugal — SEO Local + Google Maps | André Antunes",
      description: "Sites profissionais para médicos de família em Portugal. SEO local configurado, Google Maps activo, copy à medida. Entrega em 10 dias com garantia de 60 dias.",
    },
    hero: {
      badge: "Para Médicos de Família Independentes",
      headline: ["Site para médico", "de família em Portugal", "— sem complicações."],
      sub: "Pacientes privados procuram um médico de família de confiança. Quando pesquisam no Google, apareces tu — ou aparece o teu colega. Resolve isto em 10 dias.",
    },
    problem: {
      intro: "Ter um consultório privado de medicina familiar é exigente. Gerir a tua presença digital não devia ser mais um peso — mas para a maioria dos médicos independentes, é exactamente isso.",
      points: [
        { icon: "🗺️", title: "Invisível no Google Maps", body: "Quando alguém pesquisa 'médico de família privado' na tua cidade, quem aparece? Se o teu consultório não está optimizado no Google Maps, a resposta não és tu." },
        { icon: "👥", title: "Pacientes que poderiam ser teus", body: "Cada mês sem presença online são pacientes que escolhem outro médico — não porque és pior, mas porque apareceste depois." },
        { icon: "⏱️", title: "Sem tempo para aprender marketing", body: "Estudaste anos para seres médico, não marketeer. O teu tempo vale demasiado para o gastar a aprender SEO e WordPress." },
      ],
    },
    stats: [
      { value: "68%", label: "buscam médico de família no Google", sub: "antes de contactar qualquer clínica" },
      { value: "18 dias", label: "média para top 3 Google Maps", sub: "dos meus clientes médicos de família" },
      { value: "100%", label: "devolução garantida", sub: "se não aparecer no Google em 60 dias" },
    ],
    svgType: "maps",
    copyFeature: "Copy que transmite confiança e competência clínica",
    faq: [
      { q: "Posso aceitar pacientes novos pelo site directamente?", a: "Sim. O site inclui um formulário ou botão de marcação que funciona como canal directo. Podes ligar a qualquer sistema de agenda que uses." },
      { q: "Trabalhas com médicos que têm consultório em casa (morada residencial)?", a: "Sim. Nesse caso optimizamos o Google Maps para aparecer em pesquisas da área geográfica sem expor a morada completa — há formas correctas de fazer isto." },
      { q: "O que acontece ao site ao fim de 1 ano?", a: "O site é teu. Domínio, hospedagem, tudo fica em teu nome. Não há contratos de continuidade. Pagas a criação e pronto." },
      { q: "Quanto tempo demoro a aparecer no Google?", a: "A garantia é de 60 dias. Na maioria dos casos acontece entre 2 a 4 semanas. Depende da competitividade da tua cidade e especialidade." },
    ],
    testimonial: T_RUI,
  },

  {
    slug: "presenca-online-medico-independente-portugal",
    bucket: "easy",
    keyword: "presença online médico independente portugal",
    meta: {
      title: "Presença Online para Médico Independente em Portugal | André Antunes",
      description: "Construo a presença online de médicos independentes em Portugal do zero. Site profissional, SEO, Google Maps e Google Business Profile — tudo em 10 dias.",
    },
    hero: {
      badge: "Para Médicos Independentes",
      headline: ["Presença online", "para médico independente", "em Portugal — do zero."],
      sub: "Sem agência, sem mensalidades infinitas, sem aprender tecnologia. Construo a tua presença digital completa em 10 dias — e garanto que apareces no Google em 60.",
    },
    problem: {
      intro: "Um médico independente compete contra clínicas com orçamentos de marketing. Mas tens uma vantagem que elas não têm: és uma pessoa real, com rosto e história. Isso converte melhor — se souberes como o mostrar.",
      points: [
        { icon: "🏢", title: "A ilusão da clínica grande", body: "Os pacientes não escolhem clínicas — escolhem médicos. Um site bem feito mostra quem és, o que tratas, e porque és a melhor escolha. As clínicas não conseguem fazer isso tão bem como tu." },
        { icon: "🌐", title: "Presença zero ou desactualizada", body: "Um site de 2015 ou nenhum site: o resultado é o mesmo. Os pacientes procuram sinais de actividade e profissionalismo — e não encontram." },
        { icon: "📍", title: "Não aparecer nas buscas locais", body: "Quando alguém na tua cidade procura a tua especialidade no Google, a tua cidade precisa de saber que existes. Isso só acontece com SEO local configurado." },
      ],
    },
    stats: [
      { value: "30+", label: "médicos independentes", sub: "que já cresceram online comigo" },
      { value: "2–4 sem.", label: "para aparecer no Google", sub: "na maioria dos casos" },
      { value: "0€", label: "de risco para ti", sub: "graças à garantia de 60 dias" },
    ],
    svgType: "growth",
    copyFeature: "Copy que humaniza o médico e diferencia do atendimento de clínica",
    faq: [
      { q: "Preciso de ter domínio ou site antes?", a: "Não precisas de nada. Trato de tudo: registo do domínio, hospedagem, criação do site e configuração do Google. Só precisas de me dar os teus dados e uma foto." },
      { q: "Qual a diferença entre presença online e apenas ter um site?", a: "Um site é uma peça. Presença online completa inclui: site, Google Business Profile activo, Google Maps optimizado, schema markup para SEO e estratégia de palavras-chave. É isso que faço." },
      { q: "Posso continuar a actualizar o site depois?", a: "Sim. O site fica numa plataforma que consegues editar sozinho (ou eu faço actualizações por ti). Não ficas dependente de mim para o dia-a-dia." },
      { q: "Trabalhas com qualquer especialidade médica?", a: "Sim — clínica geral, medicina interna, ginecologia, ortopedia, otorrino, etc. O processo é o mesmo; o copy e as keywords são adaptados à especialidade." },
    ],
    testimonial: T_RUI,
  },

  {
    slug: "site-para-dermatologista",
    bucket: "easy",
    keyword: "site para dermatologista",
    meta: {
      title: "Site para Dermatologista em Portugal — SEO + Google Maps | André Antunes",
      description: "Sites profissionais para dermatologistas em Portugal. Apareça no Google para consultas médicas e procedimentos estéticos. Entrega em 10 dias, garantia 60 dias.",
    },
    hero: {
      badge: "Para Dermatologistas",
      headline: ["Site para", "dermatologista —", "pacientes que procuram, a encontrar-te."],
      sub: "A dermatologia tem procura crescente em Portugal — consultas médicas e estéticas. O teu site precisa de aparecer para as keywords certas, nos dois contextos.",
    },
    problem: {
      intro: "A dermatologia é uma das especialidades com maior crescimento de pesquisas online em Portugal. A maioria dessa procura não chega a ti — vai para directórios e para os teus colegas com presença digital.",
      points: [
        { icon: "🔬", title: "Duas audiências, uma só página", body: "Os teus pacientes vêm por dois motivos: problemas médicos (acne, psoríase, melanoma) e estética (botox, laser). O site tem de falar para os dois — com linguagem diferente." },
        { icon: "📸", title: "O Instagram não substitui um site", body: "As redes sociais trazem seguidores, não necessariamente pacientes. Quem pesquisa 'dermatologista Porto' no Google não vai ao Instagram — vai ao primeiro resultado." },
        { icon: "🗓️", title: "Agenda sempre cheia? Ainda não.", body: "Uma lista de espera de semanas só existe quando as marcações não param. Isso só acontece com visibilidade constante no Google — não com publicidade paga esporádica." },
      ],
    },
    stats: [
      { value: "+34%", label: "pesquisas por dermatologistas", sub: "crescimento nos últimos 3 anos em PT" },
      { value: "18 dias", label: "para aparecer no Google", sub: "caso real: Dra. Ana Rodrigues, Braga" },
      { value: "3 sem.", label: "lista de espera", sub: "depois de 60 dias online" },
    ],
    svgType: "google",
    copyFeature: "Copy diferenciado para consultas médicas e procedimentos estéticos",
    faq: [
      { q: "Posso ter páginas separadas para dermatologia médica e estética?", a: "Sim, e é o que recomendo. Páginas dedicadas por serviço rankeiam melhor e convertem melhor — um paciente com acne não quer ler sobre botox antes de encontrar o que procura." },
      { q: "Posso mostrar resultados de procedimentos (antes/depois)?", a: "Sim, dentro das normas éticas. Incluo uma secção de resultados com consentimento implícito, dentro do que é permitido pela Ordem dos Médicos." },
      { q: "Apareces para pesquisas estéticas e médicas ao mesmo tempo?", a: "Sim. Optimizamos para os dois clusters de keywords — 'dermatologista [cidade]' e 'botox [cidade]', 'tratamento acne [cidade]', etc." },
      { q: "E se tiver consultório em mais do que uma cidade?", a: "Criamos uma página de localização para cada cidade, cada uma optimizada para as keywords locais. Está incluído." },
    ],
    testimonial: T_ANA,
  },

  {
    slug: "site-para-consultorio-medico-portugal",
    bucket: "easy",
    keyword: "site para consultório médico portugal",
    meta: {
      title: "Site para Consultório Médico em Portugal — Profissional e com SEO | André Antunes",
      description: "Crio sites para consultórios médicos em Portugal com SEO local, Google Maps e copy profissional. Pronto em 10 dias. Garantia de aparecer no Google em 60 dias.",
    },
    hero: {
      badge: "Para Consultórios Médicos",
      headline: ["Site para consultório", "médico em Portugal —", "feito para trazer pacientes."],
      sub: "Não é só um cartaz digital. É uma ferramenta que trabalha 24h para trazer pacientes novos ao teu consultório — sem que tenhas de fazer nada depois do lançamento.",
    },
    problem: {
      intro: "Um consultório médico sem presença online em 2026 é como uma clínica sem placa na porta. Os pacientes não te encontram — e os que te conhecem pessoalmente não conseguem recomendar-te de forma simples.",
      points: [
        { icon: "🏥", title: "Recomendação boca-a-boca tem limites", body: "Um paciente satisfeito quer recomendar-te — mas como? Se não existe um site, não existe um link para partilhar. A recomendação morre na conversa." },
        { icon: "📱", title: "Os teus pacientes estão no Google", body: "Mesmo os pacientes que já são teus pesquisam online para confirmar morada, horário e número de telefone. Um site desactualizado ou inexistente cria fricção desnecessária." },
        { icon: "💼", title: "Credibilidade profissional", body: "Um consultório sem site parece menos estabelecido. Seja justo ou não, é a realidade. Um site profissional comunica confiança antes do primeiro contacto." },
      ],
    },
    stats: [
      { value: "24/7", label: "o teu site trabalha por ti", sub: "marcações às 23h são reais" },
      { value: "10 dias", label: "do briefing ao site live", sub: "tempo médio de entrega" },
      { value: "60 dias", label: "garantia de resultado", sub: "ou devolução total sem condições" },
    ],
    svgType: "patients",
    copyFeature: "Copy profissional que reflecte a identidade do consultório",
    faq: [
      { q: "O site inclui formulário de marcação de consultas?", a: "Sim. Inclui formulário de contacto, botão de chamada e, se quiseres, integração com o teu sistema de agenda online." },
      { q: "Posso ter mais do que um médico no mesmo site?", a: "Sim. Consultórios com vários especialistas têm páginas individuais para cada médico, cada uma com o seu SEO próprio." },
      { q: "O site funciona bem em telemóvel?", a: "100%. A maioria das pesquisas locais acontece no telemóvel. O site é desenhado mobile-first — funciona perfeitamente em todos os tamanhos de ecrã." },
      { q: "Tenho de pagar mensalidade depois?", a: "Não há mensalidade para mim. A hospedagem e o domínio têm um custo anual baixo (tipicamente 30–50€/ano) que pagas directamente ao fornecedor — sem intermediários." },
    ],
    testimonial: T_RUI,
  },

  {
    slug: "como-aparecer-no-google-medico-portugal",
    bucket: "easy",
    keyword: "como aparecer no google médico portugal",
    meta: {
      title: "Como Aparecer no Google Sendo Médico em Portugal | André Antunes",
      description: "Guia prático + serviço completo para médicos que querem aparecer no Google em Portugal. SEO local, Google Maps e site profissional. Resultado garantido em 60 dias.",
    },
    hero: {
      badge: "Guia + Serviço Completo",
      headline: ["Como aparecer", "no Google sendo", "médico em Portugal."],
      sub: "A resposta curta: site optimizado + Google Business Profile + SEO local. A resposta prática: eu faço tudo isso por ti em 10 dias, com garantia de resultado.",
    },
    problem: {
      intro: "Apareceres no Google como médico não é complicado — mas tem uma ordem certa. A maioria dos médicos falha porque tenta uma coisa de cada vez, sem estratégia, e desiste antes de ver resultados.",
      points: [
        { icon: "📊", title: "O Google tem um algoritmo específico para saúde", body: "Sites médicos são avaliados pelo critério E-E-A-T (Experiência, Especialização, Autoridade, Confiança). Um site genérico não passa neste filtro — é preciso saber como construir correctamente." },
        { icon: "📍", title: "SEO local é diferente de SEO geral", body: "Não basta ter um site — tem de estar optimizado para a tua cidade e especialidade. 'Médico Lisboa' e 'médico privado Cascais' são pesquisas completamente diferentes." },
        { icon: "⏳", title: "Tentaste mas não viste resultados", body: "SEO leva tempo — mas leva menos tempo quando está bem feito desde o início. A maioria das tentativas falhadas deve-se a erros técnicos básicos que passam despercebidos." },
      ],
    },
    stats: [
      { value: "3", label: "elementos essenciais", sub: "site + Google Business + SEO local" },
      { value: "2–4 sem.", label: "para aparecer nas pesquisas", sub: "quando está tudo bem configurado" },
      { value: "46%", label: "das pesquisas têm intenção local", sub: "e são as que mais convertem" },
    ],
    svgType: "google",
    copyFeature: "SEO técnico com E-E-A-T para sites de saúde",
    faq: [
      { q: "Qual é a coisa mais importante para aparecer no Google como médico?", a: "O Google Business Profile bem preenchido e verificado. É gratuito e tem o maior impacto imediato para pesquisas locais. Depois vem o site optimizado." },
      { q: "Quanto demora a aparecer no Google depois de criar o site?", a: "Entre 2 a 8 semanas para resultados visíveis, dependendo da competitividade da especialidade e cidade. A minha garantia cobre 60 dias — se não aparecer, devolvo tudo." },
      { q: "O Google Ads (publicidade paga) é necessário?", a: "Não. SEO orgânico e Google Maps têm retorno muito superior a longo prazo e sem custo recorrente por clique. Não recomendo Ads antes de ter o SEO orgânico feito." },
      { q: "Aparecer no Google Maps é diferente de aparecer no Google?", a: "São dois canais diferentes. Google Maps (o pack de 3 resultados com mapa) vem do Google Business Profile. Os resultados orgânicos abaixo vêm do SEO do site. Optimizamos os dois em simultâneo." },
    ],
    testimonial: T_MARIANA,
  },

  {
    slug: "marketing-digital-para-psicologos-portugal",
    bucket: "easy",
    keyword: "marketing digital para psicólogos portugal",
    meta: {
      title: "Marketing Digital para Psicólogos em Portugal | André Antunes",
      description: "Marketing digital especializado para psicólogos em Portugal. Site, SEO, Google Maps — sem agências genéricas. Mais pacientes em 60 dias, garantido.",
    },
    hero: {
      badge: "Marketing para Psicólogos",
      headline: ["Marketing digital", "para psicólogos —", "sem complicar."],
      sub: "Não precisas de aprender marketing. Precisas de mais pacientes. Faço o trabalho todo por ti: site, SEO, Google Maps — e garanto resultados em 60 dias.",
    },
    problem: {
      intro: "Marketing digital para psicólogos tem especificidades que as agências genéricas desconhecem: linguagem clínica vs. linguagem de paciente, limites éticos da comunicação em saúde mental, e como capturar procura em momentos de vulnerabilidade com responsabilidade.",
      points: [
        { icon: "🧠", title: "A linguagem do paciente é diferente da tua", body: "Tu dizes 'perturbação de ansiedade generalizada'. O teu paciente pesquisa 'psicólogo ansiedade Lisboa'. O SEO tem de traduzir o teu conhecimento para o que as pessoas realmente escrevem." },
        { icon: "⚖️", title: "Comunicação ética em saúde mental", body: "Não podes prometer curas ou resultados específicos. O marketing tem de ser honesto, sem ser vago. Há uma arte em comunicar eficazmente dentro das normas da OPP — e sei como fazê-lo." },
        { icon: "🏆", title: "Plataformas não são a solução", body: "Doctoralia e similares criam dependência e margem reduzida. O teu próprio canal — site + Google — cria independência. Cada marcação directa é uma marcação sem custo de intermediário." },
      ],
    },
    stats: [
      { value: "4x", label: "mais pesquisas por psicólogos", sub: "em Portugal desde 2020" },
      { value: "77%", label: "pesquisam online primeiro", sub: "antes de marcar consulta" },
      { value: "60 dias", label: "garantia de resultado", sub: "ou devolução total" },
    ],
    svgType: "growth",
    copyFeature: "Copy em linguagem de paciente, dentro das normas deontológicas da OPP",
    faq: [
      { q: "Podes criar conteúdo que respeita as normas da Ordem dos Psicólogos?", a: "Sim. Escrevo copy que é honesto, sem promessas terapêuticas específicas, sem linguagem que crie expectativas infundadas — e que mesmo assim converte bem." },
      { q: "Preciso de estar nas redes sociais também?", a: "Não obrigatoriamente para ter mais pacientes. O Google traz procura activa (alguém que já quer marcar) — muito mais valiosa do que redes sociais, que trazem audiência passiva. Foco no Google primeiro." },
      { q: "Podes ajudar com sub-especialidades como psicologia infantil ou de casal?", a: "Sim. Cada sub-especialidade tem as suas keywords. Criamos páginas dedicadas para cada uma, optimizadas individualmente." },
      { q: "Qual a diferença entre o teu serviço e uma agência de marketing?", a: "Foco exclusivo em profissionais de saúde, entrego tudo em 10 dias, e dou garantia de resultado. Uma agência genérica não conhece as especificidades do sector e raramente dá garantias." },
    ],
    testimonial: T_MARIANA,
  },

  {
    slug: "como-ter-mais-pacientes-medico",
    bucket: "easy",
    keyword: "como ter mais pacientes médico",
    meta: {
      title: "Como Ter Mais Pacientes Sendo Médico — A Resposta Real | André Antunes",
      description: "Como ter mais pacientes sendo médico em Portugal. A resposta não está em publicidade — está em aparecer no Google quando alguém procura pelo teu serviço. Resultado garantido.",
    },
    hero: {
      badge: "Para Médicos que Querem Crescer",
      headline: ["Como ter mais", "pacientes sendo médico —", "a resposta que funciona."],
      sub: "Não é publicidade no Facebook. Não é cartões de visita. É aparecer no Google quando alguém pesquisa a tua especialidade na tua cidade. Faço isso acontecer em 10 dias.",
    },
    problem: {
      intro: "A maioria dos conselhos de marketing para médicos é genérica e ineficaz. A realidade é simples: os teus futuros pacientes pesquisam no Google. Se não apareças, eles vão para outro lado.",
      points: [
        { icon: "📉", title: "Publicidade paga que não retorna", body: "Google Ads e Facebook Ads sem uma base orgânica sólida são dinheiro pelo ralo. O paciente clica no anúncio, chega a um site fraco, e não marca. O SEO cria resultados permanentes." },
        { icon: "🔄", title: "Dependência de indicações", body: "Indicações de outros médicos são valiosas — mas limitadas e imprevisíveis. Um canal digital trabalha 24/7, sem depender de ninguém." },
        { icon: "😴", title: "O site que não faz nada", body: "Se já tens site, provavelmente não está a trazer pacientes novos. Um site sem SEO é estático — existe, mas não trabalha." },
      ],
    },
    stats: [
      { value: "1ª pág.", label: "recebe 91% dos cliques", sub: "a 2ª página do Google quase não existe" },
      { value: "10 dias", label: "para teres presença activa", sub: "do briefing ao site ao vivo" },
      { value: "30+", label: "médicos já cresceram comigo", sub: "em Portugal" },
    ],
    svgType: "patients",
    copyFeature: "Copy focado em conversão: visitante → contacto → consulta",
    faq: [
      { q: "Qual é a fonte de novos pacientes mais eficaz para médicos?", a: "Google search orgânico + Google Maps. São pacientes com intenção activa — já querem marcar consulta. Têm conversão muito superior a redes sociais ou publicidade de display." },
      { q: "Tenho de fazer algo depois do site estar live?", a: "O mínimo: responder às mensagens que chegam. Em termos de manutenção de SEO, a base que construo é sólida e não exige trabalho contínuo da tua parte." },
      { q: "Quanto tempo até ver os primeiros pacientes novos?", a: "Depende da especialidade e cidade. Em média, 2–6 semanas após o lançamento do site. Alguns clientes receberam o primeiro contacto na primeira semana." },
      { q: "E se a minha agenda já está cheia?", a: "Óptimo problema. Um site profissional ajuda também a criar lista de espera organizada, filtrar o tipo de pacientes que queres, e cobrar o teu valor adequadamente." },
    ],
    testimonial: T_ANA,
  },

  {
    slug: "site-para-pediatra-portugal",
    bucket: "easy",
    keyword: "site para pediatra portugal",
    meta: {
      title: "Site para Pediatra em Portugal — Para Pais que Procuram Urgentemente | André Antunes",
      description: "Sites para pediatras em Portugal com SEO local e Google Maps. Quando os pais pesquisam 'pediatra [cidade]', apareces tu. Entrega em 10 dias, garantia 60 dias.",
    },
    hero: {
      badge: "Para Pediatras Independentes",
      headline: ["Site para pediatra —", "para os pais te", "encontrarem quando precisam."],
      sub: "Os pais pesquisam pediatras com urgência e decidem com base na confiança. O teu site precisa de transmitir essa confiança em segundos — e de aparecer no Google primeiro.",
    },
    problem: {
      intro: "Em pediatria, a decisão é emocional e urgente. Um pai preocupado não compara 10 opções — escolhe o primeiro que parece de confiança. O teu site tem de ser esse.",
      points: [
        { icon: "🆘", title: "Urgência que não espera", body: "Quando uma criança tem febre às 22h, os pais pesquisam 'pediatra privado [cidade]' e ligam para o primeiro resultado. Se não apareças, essa chamada nunca acontece." },
        { icon: "❤️", title: "Confiança como critério principal", body: "A competência clínica não é visível antes da consulta. O que os pais avaliam é: profissionalismo do site, avaliações, e clareza na comunicação. Optimizamos para tudo isso." },
        { icon: "🎯", title: "Diferenciação pela abordagem", body: "Há muitos pediatras. O teu site tem de mostrar a tua abordagem específica — e porque és a escolha certa para aquela família específica." },
      ],
    },
    stats: [
      { value: "83%", label: "dos pais pesquisam pediatra online", sub: "antes de marcar a primeira consulta" },
      { value: "8 seg.", label: "para criar primeira impressão", sub: "é o que tens no site" },
      { value: "10 dias", label: "do briefing ao site live", sub: "com SEO e Google Maps activos" },
    ],
    svgType: "patients",
    copyFeature: "Copy caloroso que transmite confiança aos pais",
    faq: [
      { q: "O site pode ter horários de urgência bem visíveis?", a: "Sim. É uma das primeiras coisas que faço: informação de contacto e horários em destaque acima do scroll, visível em mobile imediatamente." },
      { q: "Posso aparecer no Google Maps para pesquisas de urgência?", a: "Sim. Optimizamos o Google Business Profile com horários actualizados, categorias correctas e keywords específicas de pediatria de urgência." },
      { q: "Posso mostrar a minha abordagem clínica no site?", a: "Absolutamente — e deves. Uma página 'A minha abordagem' que explica como trabalhas diferencia-te de todos os colegas com sites genéricos." },
      { q: "E se eu trabalhar com múltiplos planos de saúde?", a: "Lista-os no site. É um dos factores que os pais verificam antes de ligar — e não tê-los visíveis é perder pacientes desnecessariamente." },
    ],
    testimonial: T_RUI,
  },

  // ─── BUCKET MÉDIO ────────────────────────────────────────────────────────
  {
    slug: "site-para-medicos-portugal",
    bucket: "medium",
    keyword: "site para médicos portugal",
    meta: {
      title: "Site para Médicos em Portugal — À Medida da Tua Especialidade | André Antunes",
      description: "Sites profissionais para médicos em Portugal. Especializado em profissionais de saúde independentes. SEO, Google Maps, copy à medida. Garantia de 60 dias.",
    },
    hero: {
      badge: "Especializado em Profissionais de Saúde",
      headline: ["Sites para médicos", "em Portugal —", "feitos à medida da tua especialidade."],
      sub: "Não é um template. É um site construído para o teu perfil clínico, optimizado para as keywords que os teus futuros pacientes pesquisam, entregue em 10 dias.",
    },
    problem: {
      intro: "Qualquer agência pode criar um site médico. Poucos sabem criar um site que traga pacientes consistentemente — porque poucos percebem o que os pacientes de saúde procuram, como procuram, e o que os faz converter.",
      points: [
        { icon: "🎯", title: "Templates vs. sites que convertem", body: "Um template de WordPress não sabe distinguir um reumatologista de um clínico geral. Um site feito à medida tem o copy, as keywords e a estrutura certas para a tua especialidade específica." },
        { icon: "🔍", title: "SEO para saúde é uma categoria especial", body: "O Google avalia sites médicos pelo critério E-E-A-T — Experiência, Especialização, Autoridade, Confiança. Um site genérico falha neste critério e fica para sempre na página 2." },
        { icon: "📞", title: "Visitas sem conversão", body: "Um site pode ter visitas e não gerar uma única marcação. A arquitectura de conversão — onde está o CTA, como está escrito o copy, qual é a fricção — faz toda a diferença." },
      ],
    },
    stats: [
      { value: "10 dias", label: "entrega garantida", sub: "do briefing ao site live" },
      { value: "4.9★", label: "avaliação média", sub: "de 30+ médicos clientes" },
      { value: "60 dias", label: "para aparecer no Google", sub: "garantido ou devolução total" },
    ],
    svgType: "google",
    copyFeature: "Copy adaptado à especialidade médica específica",
    faq: [
      { q: "Qual a diferença entre o teu serviço e uma agência de web design?", a: "Foco exclusivo em médicos e psicólogos, entrega em 10 dias (não 2–3 meses), copy escrito por mim (não pelo médico), e uma garantia de resultado que nenhuma agência dá." },
      { q: "O site inclui o Google Maps e o Google Business Profile?", a: "Sim. Criação e optimização do Google Business Profile está incluída. É o que permite aparecer no pack de 3 resultados com mapa nas pesquisas locais." },
      { q: "Posso ter um site em português e inglês?", a: "Sim. Para médicos em zonas turísticas ou com pacientes internacionais, crio sites bilingues sem custo adicional de arquitectura." },
      { q: "O que inclui exactamente o pacote?", a: "Site completo, copy escrito à medida, SEO técnico configurado, Google Business Profile criado e optimizado, e suporte nos 30 dias após o lançamento." },
    ],
    testimonial: T_ANA,
  },

  {
    slug: "criar-site-medico-portugal",
    bucket: "medium",
    keyword: "criar site médico portugal",
    meta: {
      title: "Criar Site Médico em Portugal — Profissional, Rápido, com Garantia | André Antunes",
      description: "Crio sites médicos profissionais em Portugal em 10 dias. SEO configurado, Google Maps activo, copy escrito à medida. Garantia de aparecer no Google em 60 dias.",
    },
    hero: {
      badge: "Criação de Sites Médicos",
      headline: ["Criar site médico", "em Portugal —", "profissional, rápido, com garantia."],
      sub: "Não te peço para aprender WordPress ou escrever copy. Faço tudo: design, texto, SEO, Google Maps. Em 10 dias tens um site que trabalha por ti 24 horas por dia.",
    },
    problem: {
      intro: "Criar um site médico parece simples até começares. Depois percebes que há SEO, copy, design, hospedagem, Google Business Profile, schema markup... cada peça pode estar errada de formas que não são óbvias.",
      points: [
        { icon: "🛠️", title: "O caminho do-it-yourself custa caro", body: "Wix e Squarespace são rápidos de montar — mas não são optimizados para SEO médico. Um site feito por ti em Wix raramente compete com um site feito para o Google." },
        { icon: "🏢", title: "Agências demoram e cobram demais", body: "Uma agência de web design pode demorar 2–3 meses e cobrar 3–5x mais. Sem garantia de resultado. Sem conhecimento específico de saúde." },
        { icon: "📋", title: "Quem escreve o copy?", body: "Este é o maior problema ignorado. O médico não tem tempo para escrever. A agência não percebe de medicina. Resultado: copy genérico que não converte." },
      ],
    },
    stats: [
      { value: "10 dias", label: "do briefing ao site live", sub: "sem tu teres de fazer quase nada" },
      { value: "2–4x", label: "mais rápido que agências", sub: "com entrega garantida" },
      { value: "0", label: "linhas de código", sub: "que precisas de escrever" },
    ],
    svgType: "growth",
    copyFeature: "Copy profissional escrito do zero para a tua especialidade",
    faq: [
      { q: "Preciso de saber programação ou design?", a: "Absolutamente não. O teu papel é: uma conversa inicial de 30 minutos para eu perceber o teu perfil, aprovação do rascunho do copy, e aprovação final do site. É tudo." },
      { q: "Quanto tempo leva a criar o site?", a: "10 dias úteis a contar do briefing. Nos casos mais simples, pode ser menos. Nunca mais (ou combinamos prazo específico)." },
      { q: "Posso pedir alterações depois de ver o primeiro rascunho?", a: "Sim. Incluo duas rondas de revisão. Se quiseres algo diferente depois do lançamento, o site está numa plataforma que consegues editar — ou eu faço pequenas alterações." },
      { q: "O site fica hospedado onde?", a: "Numa infraestrutura rápida e segura, com certificado SSL (HTTPS) incluído. Dou-te acesso total — o site é completamente teu." },
    ],
    testimonial: T_RUI,
  },

  {
    slug: "marketing-medico-portugal",
    bucket: "medium",
    keyword: "marketing médico portugal",
    meta: {
      title: "Marketing Médico em Portugal — Sem Agências Genéricas | André Antunes",
      description: "Marketing médico em Portugal especializado para consultórios independentes. Site, SEO, Google Maps — com foco em resultados reais. Garantia de 60 dias.",
    },
    hero: {
      badge: "Marketing Médico Especializado",
      headline: ["Marketing médico", "em Portugal —", "focado no que realmente funciona."],
      sub: "Não é um plano de redes sociais. Não é publicidade paga. É construir uma presença digital que traz pacientes todos os meses, organicamente, sem custo recorrente por clique.",
    },
    problem: {
      intro: "O mercado de marketing médico em Portugal está cheio de agências que não percebem de medicina e de consultores que não percebem de saúde. O resultado são campanhas caras sem retorno medido.",
      points: [
        { icon: "💸", title: "Marketing que custa e não retorna", body: "Publicidade paga sem base orgânica é uma torneira aberta: fecha a torneira, param os pacientes. SEO e Google Maps são activos permanentes que crescem com o tempo." },
        { icon: "📱", title: "Redes sociais são visibilidade, não pacientes", body: "Ter seguidores no Instagram não significa ter a agenda cheia. Os pacientes que marcam consulta chegam via Google — não via posts. São canais diferentes com propósitos diferentes." },
        { icon: "🏥", title: "Agências que não entendem saúde", body: "Uma agência genérica aplica o mesmo playbook a um restaurante e a um consultório. As especificidades do marketing de saúde — éticas, linguísticas, de keyword — requerem especialização." },
      ],
    },
    stats: [
      { value: "91%", label: "dos cliques vão para a 1ª página", sub: "do Google — a 2ª página não existe" },
      { value: "5–10x", label: "ROI vs. publicidade paga", sub: "do SEO orgânico a longo prazo" },
      { value: "30+", label: "profissionais de saúde", sub: "que já cresceram comigo em Portugal" },
    ],
    svgType: "growth",
    copyFeature: "Estratégia de marketing ética e específica para o sector da saúde",
    faq: [
      { q: "Precisas de fazer redes sociais para teres mais pacientes?", a: "Não. O canal com maior retorno para médicos e psicólogos é o Google orgânico. As redes sociais complementam — mas um site com SEO é a fundação. Começa por aí." },
      { q: "Qual é o melhor investimento de marketing para um médico independente?", a: "Pela minha experiência com 30+ profissionais: 1º Google Business Profile, 2º site com SEO local, 3º reviews. Nessa ordem. Dá resultados em semanas." },
      { q: "Precisas de fazer anúncios pagos?", a: "Não obrigatoriamente. SEO orgânico tem custo zero por clique e resultados permanentes. Só recomendo Ads depois de o canal orgânico estar estabelecido." },
      { q: "Como medes o retorno do teu serviço?", a: "Tracejo o Google Business Profile (chamadas, visitas, pedidos de morada), o Google Search Console (pesquisas, cliques, posições) e as marcações recebidas via formulário do site." },
    ],
    testimonial: T_MARIANA,
  },

  {
    slug: "seo-para-medicos-portugal",
    bucket: "medium",
    keyword: "seo para médicos portugal",
    meta: {
      title: "SEO para Médicos em Portugal — Apareça Antes do Teu Concorrente | André Antunes",
      description: "SEO para médicos em Portugal: site optimizado, Google Maps, keywords locais. Especializado em profissionais de saúde independentes. Garantia de resultado em 60 dias.",
    },
    hero: {
      badge: "SEO para Profissionais de Saúde",
      headline: ["SEO para médicos", "em Portugal —", "apareça antes do teu concorrente."],
      sub: "SEO médico não é SEO genérico. Tem regras específicas: E-E-A-T, keywords clínicas vs. de paciente, SEO local por cidade. Faço isso por ti — com resultado garantido.",
    },
    problem: {
      intro: "SEO para médicos é um campo específico onde erros comuns custam posições — e posições custam pacientes. O Google trata sites de saúde com critérios mais exigentes do que outros sectores.",
      points: [
        { icon: "🔬", title: "E-E-A-T: o critério específico para saúde", body: "Experiência, Especialização, Autoridade e Confiança. O Google avalia estes quatro critérios em sites médicos com revisores humanos. Um site sem estas signals vai sempre para a página 2." },
        { icon: "🗺️", title: "SEO local vs. SEO nacional", body: "Um médico de família em Setúbal não compete com um em Lisboa. As keywords são diferentes, a competição é diferente, e a estratégia tem de ser específica à geografia." },
        { icon: "📝", title: "Keywords técnicas vs. keywords de paciente", body: "'Perturbação depressiva maior' é uma keyword de médico. 'Psicólogo depressão Lisboa' é uma keyword de paciente. Um site médico tem de usar as segundas para o SEO funcionar." },
      ],
    },
    stats: [
      { value: "200+", label: "factores de ranking no Google", sub: "os 5 mais importantes para saúde" },
      { value: "60 dias", label: "garantia de resultado", sub: "ou devolução total sem perguntas" },
      { value: "4.9★", label: "classificação média dos clientes", sub: "no Google após 3 meses" },
    ],
    svgType: "google",
    copyFeature: "SEO técnico com E-E-A-T, schema de saúde e keywords locais",
    faq: [
      { q: "O que é E-E-A-T e porque é importante para médicos?", a: "É o critério do Google para avaliar sites de saúde: Experiência, Especialização, Autoridade e Confiança. Implementamos estas signals no site — cédula profissional, formação, testemunhos, schema markup — para que o Google te trate como autoridade." },
      { q: "Precisas de fazer SEO de forma contínua ou é uma vez só?", a: "A base do SEO (estrutura técnica, keywords, schema, Google Business) é feita uma vez e dura. Conteúdo novo (blog, páginas de serviço) ajuda a crescer mais depressa — mas não é obrigatório." },
      { q: "Como sei que o SEO está a funcionar?", a: "Configuro o Google Search Console e o Google Analytics no teu site. Podes ver exactamente que pesquisas te trazem visitas, em que posição apareces, e como evolui ao longo do tempo." },
      { q: "SEO local é diferente para cidades pequenas?", a: "Sim — e é melhor. Em cidades como Évora, Beja ou Leiria, um site minimamente optimizado chega ao top 3 em semanas, porque a competição é quase nula. É a oportunidade maior." },
    ],
    testimonial: T_ANA,
  },

  {
    slug: "site-para-clinica-medica-portugal",
    bucket: "medium",
    keyword: "site para clínica médica portugal",
    meta: {
      title: "Site para Clínica Médica em Portugal — Design Profissional com Resultados | André Antunes",
      description: "Sites para clínicas médicas em Portugal com múltiplos especialistas. SEO por especialidade, Google Maps, copy profissional. Entrega em 10 dias.",
    },
    hero: {
      badge: "Para Clínicas Médicas",
      headline: ["Site para clínica", "médica em Portugal —", "cada especialista encontrado."],
      sub: "Uma clínica com vários especialistas precisa de um site que rankeie para cada um. Crio uma arquitectura que permite aparecer no Google para cada especialidade e cidade.",
    },
    problem: {
      intro: "Um site de clínica não é apenas um site de médico multiplicado. Tem desafios próprios: gerir múltiplos perfis, SEO para várias especialidades, e manter consistência enquanto cada médico tem a sua personalidade.",
      points: [
        { icon: "👥", title: "Múltiplos médicos, múltiplas oportunidades de SEO", body: "Cada médico da clínica pode ter a sua própria página, optimizada para a sua especialidade e cidade. Isso multiplica as oportunidades de aparecer no Google." },
        { icon: "🏥", title: "Credibilidade institucional", body: "Uma clínica com um site profissional transmite estabilidade e profissionalismo. Um site desactualizado ou inexistente faz exactamente o oposto — mesmo que a equipa clínica seja excelente." },
        { icon: "📞", title: "Gestão de marcações de várias especialidades", body: "O site tem de ser claro sobre como marcar com cada especialista — sem confusão, sem fricção. A arquitectura de informação faz toda a diferença na taxa de conversão." },
      ],
    },
    stats: [
      { value: "3–5x", label: "mais keywords indexadas", sub: "com uma página por especialista" },
      { value: "10 dias", label: "entrega do site completo", sub: "independentemente do nº de especialistas" },
      { value: "60 dias", label: "garantia de resultado no Google", sub: "para todas as especialidades" },
    ],
    svgType: "patients",
    copyFeature: "Arquitectura SEO com página dedicada por especialidade médica",
    faq: [
      { q: "Podes criar um site com 5 ou mais especialistas?", a: "Sim. A arquitectura que uso escala bem — cada especialista tem a sua própria página com SEO individual, mas partilham o mesmo domínio e autoridade." },
      { q: "Como gere as marcações para diferentes especialidades?", a: "O site inclui um formulário ou sistema de marcação que distingue a especialidade desejada. Posso integrar com o sistema de agenda que já usas." },
      { q: "E o Google Business Profile para uma clínica?", a: "Uma clínica tem um único perfil no Google Maps. Optimizo-o para as especialidades mais pesquisadas e giro os posts mensais para manter o perfil activo." },
      { q: "O que acontece quando um médico sai da clínica?", a: "A sua página pode ser desactivada ou redireccionada facilmente. O site fica em teu nome — tens controlo total." },
    ],
    testimonial: T_RUI,
  },

  {
    slug: "como-ter-um-site-medico-profissional",
    bucket: "medium",
    keyword: "como ter um site médico profissional",
    meta: {
      title: "Como Ter um Site Médico Profissional — Sem Erros de Principiante | André Antunes",
      description: "Como ter um site médico profissional em Portugal sem perder tempo com tecnologia. Eu faço tudo por ti: design, copy, SEO, Google Maps. Pronto em 10 dias.",
    },
    hero: {
      badge: "Do Zero ao Profissional",
      headline: ["Como ter um site", "médico profissional —", "sem aprender nada novo."],
      sub: "A resposta directa: contrata alguém que já sabe o que funciona. Evitas meses de aprendizagem, erros de principiante e um site que parece profissional mas não traz ninguém.",
    },
    problem: {
      intro: "Existe uma diferença enorme entre um site que existe e um site profissional. A maioria dos médicos que tentam criar o próprio site ficam no primeiro — funcional, mas sem impacto real.",
      points: [
        { icon: "🎨", title: "Design ≠ profissionalismo", body: "Um site pode parecer bonito e não transmitir confiança clínica. Profissionalismo médico online vem do copy, da estrutura, das credenciais visíveis e das avaliações — não só das cores." },
        { icon: "⚡", title: "Velocidade importa mais do que parece", body: "53% dos utilizadores abandona um site que demora mais de 3 segundos a carregar. Um site lento mata a conversão antes do paciente ler uma linha." },
        { icon: "📲", title: "Mobile-first não é opcional", body: "70% das pesquisas por médicos acontece no telemóvel. Um site que não é perfeito em mobile está a perder a maioria dos teus potenciais pacientes." },
      ],
    },
    stats: [
      { value: "3 seg.", label: "tempo máximo de carregamento", sub: "53% abandona se demorar mais" },
      { value: "70%", label: "das pesquisas em mobile", sub: "o site tem de ser perfeito no telemóvel" },
      { value: "10 dias", label: "para ter um site realmente profissional", sub: "sem tu fazeres quase nada" },
    ],
    svgType: "growth",
    copyFeature: "Design profissional com credenciais médicas em destaque",
    faq: [
      { q: "O que distingue um site profissional de um amador?", a: "Velocidade (carrega em menos de 2 segundos), mobile perfeito, copy claro e focado, credenciais visíveis, CTA em lugar óbvio, e SEO configurado. A maioria dos sites médicos falha em pelo menos 3 destes." },
      { q: "Posso ver exemplos de sites que criaste?", a: "Sim. Na conversa inicial mostro-te trabalhos anteriores, contextualizados pela especialidade. Nenhum médico é igual — cada site reflecte a identidade de quem o usa." },
      { q: "E o domínio — como escolho?", a: "Ajudo a escolher. O ideal é o teu nome ou o nome do consultório em .pt (ex: drjoaosilva.pt). Trato do registo e configuração — não precisas de fazer nada." },
      { q: "O site vai ficar desactualizado rapidamente?", a: "Não. A base técnica e de SEO que crio é sólida e não precisa de actualizações constantes. O que muda normalmente é o conteúdo (horários, serviços) — e isso consegues alterar tu, ou eu faço." },
    ],
    testimonial: T_MARIANA,
  },

  {
    slug: "aparecer-no-google-maps-consultorio",
    bucket: "medium",
    keyword: "aparecer no Google Maps consultório",
    meta: {
      title: "Aparecer no Google Maps com o Teu Consultório — Guia + Serviço | André Antunes",
      description: "Como aparecer no Google Maps com o teu consultório. Criação e optimização do Google Business Profile incluídos no serviço. Resultado garantido em 60 dias.",
    },
    hero: {
      badge: "Google Maps para Consultórios",
      headline: ["Aparecer no", "Google Maps com", "o teu consultório."],
      sub: "O Google Maps é o canal de marketing mais poderoso para consultórios — e é gratuito. O que não é gratuito é saber optimizá-lo correctamente. Faço isso por ti.",
    },
    problem: {
      intro: "O pack de 3 resultados do Google Maps recebe mais de 60% dos cliques em pesquisas locais. Se o teu consultório não está lá, estás a oferecer esses pacientes à concorrência.",
      points: [
        { icon: "📍", title: "Não aparecer no pack de 3", body: "Nas pesquisas locais de saúde, os primeiros resultados são sempre o pack de Maps. Aparecer aqui tem 3x mais impacto do que aparecer nos resultados orgânicos abaixo." },
        { icon: "⭐", title: "Avaliações que não tens", body: "O Google Maps favorece perfis com avaliações recentes e positivas. Sem uma estratégia de recolha de avaliações, ficas sempre abaixo de quem tem menos qualidade mas mais reviews." },
        { icon: "🖼️", title: "Perfil vazio ou desactualizado", body: "Um perfil sem fotos, com horários errados ou sem descrição é penalizado pelo algoritmo. E os pacientes que o encontram saem sem ligar — porque não transmite confiança." },
      ],
    },
    stats: [
      { value: "60%", label: "dos cliques em pesquisas locais", sub: "vão para o pack do Google Maps" },
      { value: "3x", label: "mais chamadas", sub: "com perfil Maps optimizado" },
      { value: "3–7 dias", label: "para aparecer no Maps", sub: "após verificação do perfil" },
    ],
    svgType: "maps",
    copyFeature: "Google Business Profile criado, verificado e optimizado",
    faq: [
      { q: "O que é o Google Business Profile?", a: "É o painel de controlo do teu consultório no Google Maps e nos resultados locais do Google. É gratuito. É o que alimenta o teu perfil com morada, horários, fotos e avaliações." },
      { q: "Já tenho um perfil — precisas de criar um novo?", a: "Não. Se já tens, optimizamos o existente: preenchemos todos os campos, adicionamos fotos, corrigimos a categoria, e configuramos posts regulares." },
      { q: "Quanto tempo demora a aparecer no Maps depois de optimizar?", a: "O perfil fica visível 3–7 dias após verificação. Para aparecer no top 3, normalmente 2–6 semanas, dependendo da competição na tua cidade e especialidade." },
      { q: "Como peço avaliações sem ser invasivo?", a: "Dou-te o link directo para o teu perfil e um guião simples para pedir no final de uma consulta. É directo, não invasivo, e funciona — a maioria dos pacientes satisfeitos fica feliz em ajudar." },
    ],
    testimonial: T_ANA,
  },

  {
    slug: "agencia-marketing-medico-portugal",
    bucket: "medium",
    keyword: "agência marketing médico portugal",
    meta: {
      title: "Alternativa a Agências de Marketing Médico em Portugal | André Antunes",
      description: "Não és mais um cliente numa agência. Trabalho com um número limitado de médicos e psicólogos, pessoalmente, com entrega em 10 dias e garantia de 60 dias.",
    },
    hero: {
      badge: "Não Sou uma Agência",
      headline: ["Alternativa às agências", "de marketing médico —", "mais rápido, com garantia."],
      sub: "Numa agência és um número. Comigo és o meu foco. Entrego em 10 dias o que uma agência demora meses — e dou uma garantia que nenhuma agência dá.",
    },
    problem: {
      intro: "As agências de marketing médico em Portugal têm um problema estrutural: não são especialistas em saúde, cobram mensalidades independentemente dos resultados, e distribuis-te por uma carteira de 50+ clientes.",
      points: [
        { icon: "🏭", title: "A fábrica de clientes", body: "Uma agência com 50 clientes divide a atenção por 50. O teu projecto entra numa fila, é tratado por um júnior, e a comunicação passa por três pessoas antes de chegar a quem decide." },
        { icon: "💶", title: "Mensalidades sem garantia de resultado", body: "A maioria das agências cobra mensalmente — independentemente de trazerem ou não novos pacientes. Não tens forma de medir o ROI real." },
        { icon: "🎓", title: "Não percebem de medicina", body: "Copy escrito por alguém sem contexto clínico usa a linguagem errada, ignora as keywords que os pacientes realmente pesquisam, e não sabe onde estão os limites éticos da comunicação médica." },
      ],
    },
    stats: [
      { value: "1 pessoa", label: "trabalha no teu projecto", sub: "eu — do início ao fim" },
      { value: "10 dias", label: "vs. 2–3 meses de agência", sub: "entrega garantida" },
      { value: "60 dias", label: "garantia de resultado", sub: "sem condições — nenhuma agência dá isto" },
    ],
    svgType: "patients",
    copyFeature: "Atenção pessoal e exclusiva ao teu projecto, sem intermediários",
    faq: [
      { q: "Qual é a maior diferença entre ti e uma agência?", a: "Trabalhas directamente comigo — não com um gestor de conta, não com um júnior. Conheço o teu projecto, a tua especialidade e os teus objectivos. E dou garantia de resultado que nenhuma agência dá." },
      { q: "Tens equipa ou trabalhas sozinho?", a: "Trabalho com um número muito limitado de clientes em simultâneo, precisamente para garantir qualidade. Não tenho equipa alargada — tenho foco. E é isso que te interessa." },
      { q: "E o suporte depois do lançamento?", a: "Incluo 30 dias de suporte após o lançamento. Para questões técnicas urgentes, estou acessível directamente. Sem tickets, sem esperas." },
      { q: "Posso começar sem compromisso?", a: "A conversa inicial de 15 minutos é gratuita e sem compromisso. Se não fizer sentido trabalharmos juntos, digo-o directamente — e fico feliz com isso." },
    ],
    testimonial: T_MARIANA,
  },

  {
    slug: "growth-partner-saude-portugal",
    bucket: "easy",
    keyword: "growth partner saúde portugal",
    meta: {
      title: "Growth Partner para Profissionais de Saúde em Portugal | André Antunes",
      description: "Growth partner especializado em médicos e psicólogos em Portugal. Site profissional, SEO, Google Maps — com foco em crescimento real. Garantia de 60 dias.",
    },
    hero: {
      badge: "Growth Partner — Não uma Agência",
      headline: ["Growth partner", "para profissionais", "de saúde em Portugal."],
      sub: "Não construo apenas sites. Construo a tua presença digital de forma a que consigas crescer — mais pacientes, mais visibilidade, mais independência das plataformas de terceiros.",
    },
    problem: {
      intro: "Um growth partner não é um fornecedor de serviços — é um parceiro de crescimento. A diferença está em perceber o teu negócio, os teus objectivos, e construir uma fundação digital que suporte esse crescimento.",
      points: [
        { icon: "🌱", title: "Crescimento ≠ mais publicidade", body: "Crescimento sustentável em saúde vem de visibilidade orgânica — Google Maps, SEO, reputação online. Não de campanhas que param quando o orçamento acaba." },
        { icon: "🤝", title: "Alinhamento de incentivos", body: "Uma agência ganha quando assinares o contrato. Um growth partner ganha quando tiveres resultados. São incentivos completamente diferentes — e fazem toda a diferença na qualidade do trabalho." },
        { icon: "📈", title: "A fundação importa", body: "A maioria dos médicos tenta crescer sem ter a fundação certa: site, Google Maps, SEO. É como construir num terreno instável. Primeiro a fundação — depois o crescimento." },
      ],
    },
    stats: [
      { value: "30+", label: "profissionais de saúde", sub: "que já cresceram comigo" },
      { value: "4.9★", label: "avaliação média dos clientes", sub: "de 30+ médicos e psicólogos" },
      { value: "60 dias", label: "garantia de resultado", sub: "ou devolução total sem condições" },
    ],
    svgType: "growth",
    copyFeature: "Foco em crescimento real e sustentável — não em métricas de vaidade",
    faq: [
      { q: "O que é exactamente um growth partner?", a: "É alguém que trabalha contigo para crescer — não apenas para te entregar um produto. Percebo o teu contexto, os teus objectivos, e construo uma presença digital alinhada com isso. Não são só pixels num ecrã." },
      { q: "O que inclui o serviço de growth partner?", a: "Site profissional, SEO configurado, Google Business Profile optimizado, copy escrito à medida, e suporte pós-lançamento. Tudo com foco em trazer pacientes novos." },
      { q: "Trabalhas com todas as especialidades de saúde?", a: "Sim — médicos, psicólogos, fisioterapeutas, nutricionistas, dentistas. O processo adapta-se à especialidade e ao contexto de cada profissional." },
      { q: "Como medes o crescimento?", a: "Em métricas concretas: posição no Google para as keywords-alvo, número de chamadas a partir do Google Maps, formulários submetidos no site. Não em impressões ou alcance de posts." },
    ],
    testimonial: T_ANA,
  },
];
