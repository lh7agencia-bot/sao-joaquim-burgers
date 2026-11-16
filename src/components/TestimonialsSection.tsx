import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/restaurantData';
import { ScrollReveal } from './ScrollReveal';

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-16 sm:py-24 border-b border-[#2D2924]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-2xl pb-8 border-b border-[#2D2924]">
            <p className="text-xs sm:text-sm font-semibold text-[#D4AF37]">
              Depoimentos
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F6F2EC] mt-2">
              Quem prova na Liberdade volta sempre
            </h2>
            <p className="text-sm sm:text-base text-[#B6AFA5] mt-3 leading-relaxed">
              Relatos reais de clientes que passam pela Rua São Joaquim no almoço, entre aulas ou
              no fim de noite.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <ScrollReveal key={item.id} delay={idx * 0.08}>
              <article className="h-full flex flex-col justify-between bg-[#1A1815] border border-[#2D2924] rounded-xl p-6">
                <div>
                  <div
                    className="flex items-center gap-1"
                    aria-label={`${item.rating} de 5 estrelas`}
                  >
                    {Array.from({ length: item.rating }).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <blockquote className="text-sm sm:text-base text-[#F6F2EC] leading-relaxed mt-4">
                    “{item.text}”
                  </blockquote>
                </div>

                <footer className="mt-6 pt-4 border-t border-[#2D2924]">
                  <p className="font-display text-base font-bold text-[#F6F2EC]">
                    {item.name}
                  </p>
                  <p className="text-xs text-[#B6AFA5] mt-0.5">{item.context}</p>
                </footer>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
