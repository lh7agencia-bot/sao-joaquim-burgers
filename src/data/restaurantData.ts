export type MenuCategoryId =
  | 'todos'
  | 'hamburgueres'
  | 'acompanhamentos'
  | 'lanches'
  | 'bebidas';

export interface MenuCategory {
  id: MenuCategoryId;
  label: string;
}

export interface MenuItem {
  id: string;
  category: Exclude<MenuCategoryId, 'todos'>;
  categoryLabel: string;
  name: string;
  price: number;
  description: string;
  details?: string;
  highlight?: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  title: string;
  caption: string;
  category: string;
  aspectClass: string;
  width: number;
  height: number;
}

export interface Testimonial {
  id: string;
  name: string;
  context: string;
  rating: number;
  text: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const BUSINESS_INFO = {
  name: 'São Joaquim Burguers',
  slogan: 'Sabor desafiador em cada mordida',
  address: 'R. São Joaquim, 193 - Liberdade, São Paulo - SP, 01508-000',
  shortAddress: 'R. São Joaquim, 193 · Liberdade, SP',
  phoneDisplay: '(11) 96096-5728',
  whatsappDigits: '5511960965728',
  email: 'contato@saojoaquimburguers.com.br',
  instagram: '@sjburguer_',
  facebook: 'saojoaquimburger',
  hoursWeekday: 'Segunda a Sábado: 12h às 00h',
  hoursSunday: 'Aos Domingos: consultar via WhatsApp',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=R.+S%C3%A3o+Joaquim%2C+193+-+Liberdade%2C+S%C3%A3o+Paulo+-+SP%2C+01508-000',
} as const;

export const MENU_CATEGORIES: MenuCategory[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'hamburgueres', label: 'Hambúrgueres' },
  { id: 'acompanhamentos', label: 'Acompanhamentos e Molhos' },
  { id: 'lanches', label: 'Lanches' },
  { id: 'bebidas', label: 'Bebidas e Drinks' },
];

export const CUSTOMIZATION_OPTIONS = {
  breads: ['Pão Australiano', 'Com Gergelim', 'Sem Gergelim'],
  doneness: ['Ao Ponto', 'Mal Passada', 'Bem Passada'],
  cheeses: ['Cheddar', 'Prato', 'Mussarela'],
  ingredients: ['Alface', 'Tomate', 'Cebola', 'Pickles', 'Bacon', 'Maionese da Casa'],
  sauces: ['Molho Picante', 'Molho de Ervas'],
} as const;

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'burger-carne',
    category: 'hamburgueres',
    categoryLabel: 'Hambúrgueres',
    name: 'Burger de Carne Artesanal',
    price: 26,
    description:
      'Hambúrguer suculento grelhado no ponto de sua preferência (mal passada, ao ponto ou bem passada), com queijo derretido e acompanhamentos frescos.',
    details: 'Escolha pão (Australiano, Com ou Sem Gergelim), queijo (Cheddar, Prato ou Mussarela) e salada/bacon/maionese.',
    highlight: 'Clássico da Casa',
  },
  {
    id: 'burger-frango',
    category: 'hamburgueres',
    categoryLabel: 'Hambúrgueres',
    name: 'Burger de Frango',
    price: 25,
    description:
      'Filé de frango temperado e dourado na chapa, servido no pão selecionado com queijo derretido, alface crocante, tomate e maionese artesanal.',
    details: 'Personalizável com pão Australiano, com ou sem gergelim e queijo à sua escolha.',
  },
  {
    id: 'burger-vegetariano',
    category: 'hamburgueres',
    categoryLabel: 'Hambúrgueres',
    name: 'Burger Vegetariano',
    price: 27,
    description:
      'Disco vegetariano preparado na hora, combinado com queijo derretido, alface fresca, tomate, cebola, pickles e maionese da casa.',
    details: 'Opção 100% sem carne com toda a montagem artesanal da casa.',
  },
  {
    id: 'hamburguer-extra',
    category: 'hamburgueres',
    categoryLabel: 'Hambúrgueres',
    name: 'Hambúrguer Extra',
    price: 13,
    description:
      'Adicional de hambúrguer artesanal na chapa para turbinar seu lanche com dupla camada de sabor e suculência.',
    details: 'Disponível para qualquer burger do cardápio.',
    highlight: 'Adicional',
  },
  {
    id: 'porcao-fritas',
    category: 'acompanhamentos',
    categoryLabel: 'Acompanhamentos',
    name: 'Batata Frita Crocante',
    price: 12,
    description:
      'Porção generosa de batatas fritas douradas na hora, sequinhas por fora e macias por dentro.',
    details: 'Combina com nossos molhos artesanais.',
  },
  {
    id: 'porcao-onion-rings',
    category: 'acompanhamentos',
    categoryLabel: 'Acompanhamentos',
    name: 'Onion Rings',
    price: 12,
    description:
      'Anéis de cebola empanados e fritos até atingirem textura crocante e coloração dourada.',
    details: 'Servidos quentes na porção individual.',
  },
  {
    id: 'porcao-mini-chicken',
    category: 'acompanhamentos',
    categoryLabel: 'Acompanhamentos',
    name: 'Mini Chicken',
    price: 12,
    description:
      'Iscas de frango empanadas, crocantes e temperadas para dividir na mesa ou acompanhar seu burger.',
    details: 'Ideal para combinar com molho de ervas ou picante.',
  },
  {
    id: 'molho-picante-ervas',
    category: 'acompanhamentos',
    categoryLabel: 'Molhos',
    name: 'Molhos Artesanais (Picante ou Ervas)',
    price: 2,
    description:
      'Potinho extra dos molhos exclusivos da casa: versão Picante com toque defumado ou Ervas frescas.',
    details: 'Valor por unidade · Escolha Picante ou Ervas.',
  },
  {
    id: 'lanche-chamblole',
    category: 'lanches',
    categoryLabel: 'Lanches',
    name: 'Lanche Chamblole',
    price: 22,
    description:
      'Receita especial da chapa do São Joaquim Burguers, montada na hora com ingredientes selecionados e pão prensado.',
    details: 'Consulte opções de queijo e complementos no balcão.',
  },
  {
    id: 'lanche-misto-bauru',
    category: 'lanches',
    categoryLabel: 'Lanches',
    name: 'Misto Quente ou Bauru',
    price: 18,
    description:
      'Clássicos paulistanos preparados na chapa com queijo derretido na medida certa e tomate fresco no Bauru.',
    details: 'Servidos quentes do meio-dia à meia-noite.',
  },
  {
    id: 'bebidas-sem-alcool',
    category: 'bebidas',
    categoryLabel: 'Bebidas',
    name: 'Refrigerantes, Sucos e Águas',
    price: 7,
    description:
      'Água com ou sem gás, Refrigerante lata, Suco One, Suco Del Valle, Tônica, Água de Coco, Chá Ice Tea, Gatorade e Guara Viton.',
    details: 'Preços a partir de R$ 7,00 conforme a bebida escolhida.',
  },
  {
    id: 'bebidas-cervejas-drinks',
    category: 'bebidas',
    categoryLabel: 'Cervejas e Drinks',
    name: 'Cervejas Especiais e Drinks',
    price: 14,
    description:
      'Heineken, Spaten, Xeque Mate, Smirnoff Ice, Skol Beats e carta de drinks preparados na casa.',
    details: 'Venda e consumo de bebidas alcoólicas apenas para maiores de 18 anos.',
    highlight: '+18 Anos',
  },
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'foto-burger-classico',
    src: '/images/sao-joaquim-1.jpg',
    alt: 'Hambúrguer artesanal do São Joaquim Burguers no pão australiano com cheddar derretido, bacon, alface, tomate e maionese da casa',
    title: 'Burger no Pão Australiano',
    caption: 'Carne alta suculenta, cheddar cremoso, bacon crocante, salada fresca e maionese da casa no pão australiano.',
    category: 'Hambúrgueres',
    aspectClass: 'aspect-[16/9]',
    width: 1024,
    height: 576,
  },
  {
    id: 'foto-mordida-sabor',
    src: '/images/sao-joaquim-2.jpg',
    alt: 'Detalhe de hambúrguer artesanal mordido mostrando suculência da carne, queijo derretido e molho cremoso',
    title: 'Suculência em Cada Mordida',
    caption: 'Blend preparado na chapa no ponto escolhido, queijo derretido e folhas frescas embrulhados na hora.',
    category: 'Na Prática',
    aspectClass: 'aspect-[3/4]',
    width: 1024,
    height: 1365,
  },
  {
    id: 'foto-cozinha-equipe',
    src: '/images/sao-joaquim-3.jpg',
    alt: 'Equipe do São Joaquim Burguers preparando pedidos na cozinha aberta sob o quadro de cardápio',
    title: 'Balcão e Chapa na Liberdade',
    caption: 'Nossa cozinha em plena produção na Rua São Joaquim, 193 — preparo artesanal feito na hora do seu pedido.',
    category: 'Ambiente',
    aspectClass: 'aspect-[4/3]',
    width: 1024,
    height: 768,
  },
  {
    id: 'foto-cardapio-impresso',
    src: '/images/sao-joaquim-4.jpg',
    alt: 'Cardápio oficial impresso do São Joaquim Burguers com preços de carnes, frango, vegetariano, acompanhamentos e bebidas',
    title: 'Nosso Cardápio Tradicional',
    caption: 'Transparência e variedade: monte do seu jeito escolhendo pão, ponto da carne, queijo, ingredientes e molhos.',
    category: 'Cardápio',
    aspectClass: 'aspect-[9/16]',
    width: 1024,
    height: 1820,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'dep-1',
    name: 'Rafael Nakamura',
    context: 'Frequentador da Liberdade · Pedido presencial',
    rating: 5,
    text: 'Passo sempre pela Rua São Joaquim saindo da faculdade e o burger no pão australiano ao ponto nunca decepciona. Carne alta de verdade, queijo bem derretido e preço justo no coração de São Paulo.',
  },
  {
    id: 'dep-2',
    name: 'Camila Ferreira',
    context: 'Almoço em grupo · Retirada e salão',
    rating: 5,
    text: 'Adoramos poder escolher exatamente o ponto da carne, o tipo de pão e os ingredientes sem frescura. A batata com molho de ervas e o burger vegetariano salvaram nosso almoço em equipe.',
  },
  {
    id: 'dep-3',
    name: 'Thiago Mendonça',
    context: 'Noite de sexta · Chapa e drinks',
    rating: 5,
    text: 'Atendimento direto no balcão, lanche montado na hora e aberto até meia-noite de segunda a sábado. O bacon crocante com cheddar e uma Spaten gelada fecham a semana no nível máximo.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-horario',
    question: 'Qual é o horário de funcionamento do São Joaquim Burguers?',
    answer:
      'Funcionamos de segunda a sábado, das 12h às 00h00. Aos domingos, o atendimento acontece sob consulta prévia pelo nosso WhatsApp (11) 96096-5728.',
  },
  {
    id: 'faq-personalizacao',
    question: 'Posso personalizar o pão, o ponto da carne e os ingredientes?',
    answer:
      'Sim. Você escolhe entre Pão Australiano, Com Gergelim ou Sem Gergelim; carne mal passada, ao ponto ou bem passada; queijo cheddar, prato ou mussarela; além de alface, tomate, cebola, pickles, bacon e maionese.',
  },
  {
    id: 'faq-vegetariano',
    question: 'Vocês têm opção vegetariana ou de frango no cardápio?',
    answer:
      'Temos sim. Além do Burger de Carne (R$ 26,00), oferecemos o Burger de Frango (R$ 25,00) e o Burger Vegetariano (R$ 27,00), todos montados com os pães e queijos da casa.',
  },
  {
    id: 'faq-localizacao',
    question: 'Onde fica a hamburgueria e é fácil chegar de metrô?',
    answer:
      'Estamos na R. São Joaquim, 193 - Liberdade, São Paulo - SP (CEP 01508-000), a poucos minutos a pé da estação São Joaquim da Linha 1-Azul do Metrô.',
  },
  {
    id: 'faq-agendamento',
    question: 'Como funciona o agendamento online de mesa ou encomenda?',
    answer:
      'Você pode preencher a data, o horário desejado e a quantidade de pessoas aqui no formulário de agendamento e confirmar em um clique pelo WhatsApp (11) 96096-5728 com nossa equipe.',
  },
];

export const TIME_SLOTS = [
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
];
