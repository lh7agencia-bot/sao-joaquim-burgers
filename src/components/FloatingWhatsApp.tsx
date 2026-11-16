import { MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data/restaurantData';
import { buildWhatsAppUrl } from '../utils/booking';

export function FloatingWhatsApp() {
  const href = buildWhatsAppUrl(
    `Olá, ${BUSINESS_INFO.name}! Gostaria de fazer um pedido ou tirar uma dúvida.`,
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com São Joaquim Burguers no WhatsApp (11) 96096-5728"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-30 inline-flex items-center gap-2 h-11 px-3.5 sm:h-12 sm:px-5 rounded-full bg-[#FF6B35] hover:bg-[#FF8254] text-[#11100E] font-bold text-xs sm:text-sm shadow-lg shadow-black/40 transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
    >
      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" aria-hidden="true" />
      <span className="whitespace-nowrap">WhatsApp</span>
    </a>
  );
}
