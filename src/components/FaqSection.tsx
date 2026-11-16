import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { FAQ_ITEMS } from '../data/restaurantData';
import { ScrollReveal } from './ScrollReveal';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 sm:py-24 border-b border-[#2D2924]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="pb-8 border-b border-[#2D2924]">
            <p className="text-xs sm:text-sm font-semibold text-[#D4AF37]">
              Perguntas Frequentes
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F6F2EC] mt-2">
              Dúvidas comuns antes do seu pedido
            </h2>
            <p className="text-sm sm:text-base text-[#B6AFA5] mt-3 leading-relaxed">
              Tudo o que você precisa saber sobre horários, personalização do lanche e acesso à
              nossa loja na Liberdade.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-8 divide-y divide-[#2D2924] border-b border-[#2D2924]">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openId === item.id;
            const panelId = `faq-panel-${item.id}`;
            return (
              <ScrollReveal key={item.id} delay={idx * 0.04}>
                <div>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(item.id)}
                    className="w-full py-5 flex items-center justify-between gap-4 text-left focus-visible:outline-2 focus-visible:outline-[#FF6B35]"
                  >
                    <span className="font-display text-base sm:text-lg font-bold text-[#F6F2EC] hover:text-[#FF6B35] transition-colors">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#D4AF37] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={panelId}
                      className="pb-5 pr-8 text-sm sm:text-base text-[#B6AFA5] leading-relaxed"
                    >
                      {item.answer}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
