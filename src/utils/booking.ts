import { BUSINESS_INFO, MenuCategoryId, MenuItem } from '../data/restaurantData';

export interface ReservationInput {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export interface OrderSelection {
  item: MenuItem;
  quantity: number;
}

export interface BurgerConfig {
  protein: 'Carne (R$ 26,00)' | 'Frango (R$ 25,00)' | 'Vegetariano (R$ 27,00)';
  bread: string;
  doneness: string;
  cheese: string;
  extraPatty: boolean;
  sauce: string;
}

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function filterMenuItems(
  items: MenuItem[],
  category: MenuCategoryId,
): MenuItem[] {
  if (category === 'todos') {
    return items;
  }
  return items.filter((item) => item.category === category);
}

export function calculateOrderTotal(selections: OrderSelection[]): number {
  return selections.reduce((sum, entry) => {
    const qty = Math.max(0, Math.floor(entry.quantity));
    return sum + entry.item.price * qty;
  }, 0);
}

export function calculateCustomBurgerPrice(config: BurgerConfig): number {
  let base = 26;
  if (config.protein.startsWith('Frango')) base = 25;
  if (config.protein.startsWith('Vegetariano')) base = 27;
  const extraPattyCost = config.extraPatty ? 13 : 0;
  const sauceCost = config.sauce !== 'Sem molho extra' ? 2 : 0;
  return base + extraPattyCost + sauceCost;
}

export function validateReservation(
  input: ReservationInput,
  todayIso: string = new Date().toISOString().slice(0, 10),
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Informe seu nome completo.';
  }

  const digits = input.phone.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 13) {
    errors.phone = 'Informe um WhatsApp válido com DDD.';
  }

  if (!input.date) {
    errors.date = 'Escolha a data do agendamento.';
  } else if (input.date < todayIso) {
    errors.date = 'A data não pode estar no passado.';
  }

  if (!input.time) {
    errors.time = 'Selecione um horário.';
  }

  if (!Number.isFinite(input.guests) || input.guests < 1 || input.guests > 20) {
    errors.guests = 'Informe entre 1 e 20 pessoas.';
  }

  return errors;
}

export function validateContactForm(input: ContactInput): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Informe seu nome.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailPattern.test(input.email.trim())) {
    errors.email = 'Informe um e-mail válido.';
  }

  if (!input.message || input.message.trim().length < 10) {
    errors.message = 'Escreva uma mensagem com pelo menos 10 caracteres.';
  }

  return errors;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${BUSINESS_INFO.whatsappDigits}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppReservationUrl(input: ReservationInput): string {
  const formattedDate = input.date.split('-').reverse().join('/');
  const lines = [
    `Olá, São Joaquim Burguers! Gostaria de agendar uma mesa:`,
    `• Nome: ${input.name.trim()}`,
    `• WhatsApp: ${input.phone.trim()}`,
    `• Data: ${formattedDate}`,
    `• Horário: ${input.time}`,
    `• Pessoas: ${input.guests}`,
  ];
  if (input.notes && input.notes.trim()) {
    lines.push(`• Observações: ${input.notes.trim()}`);
  }
  return buildWhatsAppUrl(lines.join('\n'));
}

export function buildWhatsAppCustomBurgerUrl(config: BurgerConfig): string {
  const total = calculateCustomBurgerPrice(config);
  const lines = [
    `Olá, São Joaquim Burguers! Quero montar meu pedido:`,
    `• Base: ${config.protein}`,
    `• Pão: ${config.bread}`,
    ...(config.protein.startsWith('Carne') ? [`• Ponto da carne: ${config.doneness}`] : []),
    `• Queijo: ${config.cheese}`,
    `• Hambúrguer extra (+R$ 13,00): ${config.extraPatty ? 'Sim' : 'Não'}`,
    `• Molho extra: ${config.sauce}`,
    `• Total estimado: ${formatBRL(total)}`,
  ];
  return buildWhatsAppUrl(lines.join('\n'));
}

export function buildWhatsAppContactUrl(input: ContactInput): string {
  const text = [
    `Olá, São Joaquim Burguers! Mensagem enviada pelo site:`,
    `• Nome: ${input.name.trim()}`,
    `• E-mail: ${input.email.trim()}`,
    `• Mensagem: ${input.message.trim()}`,
  ].join('\n');
  return buildWhatsAppUrl(text);
}

export function buildMailtoContactUrl(input: ContactInput): string {
  const subject = encodeURIComponent(`Contato pelo site — ${input.name.trim()}`);
  const body = encodeURIComponent(
    `Nome: ${input.name.trim()}\nE-mail: ${input.email.trim()}\n\nMensagem:\n${input.message.trim()}`,
  );
  return `mailto:${BUSINESS_INFO.email}?subject=${subject}&body=${body}`;
}
