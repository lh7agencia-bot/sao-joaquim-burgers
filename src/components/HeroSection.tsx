import { ArrowRight, Calendar, Clock, MapPin, Phone } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { BUSINESS_INFO } from '../data/restaurantData';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let rafId = 0;

    const updateParallax = () => {
      const section = sectionRef.current;
      const img = imgRef.current;
      if (section && img) {
        const rect = section.getBoundingClientRect();
        const total = rect.height || 1;
        const progress = Math.min(1, Math.max(0, -rect.top / total));
        const translateY = progress * 24;
        const scale = 1 + progress * 0.05;
        img.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
      }
      rafId = 0;
    };

    const onScroll = () => {
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(updateParallax);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative pt-24 sm:pt-28 pb-12 lg:pb-16 border-b border-[#2D2924] overflow-hidden"
    >
      {/* Subtle warm radial glow behind hero media */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 w-[520px] h-[520px] rounded-full bg-[#FF6B35]/10 blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Copy Column */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm font-medium text-[#D4AF37]">
                <span>Liberdade, São Paulo</span>
                <span aria-hidden="true" className="text-[#B6AFA5]">·</span>
                <span className="text-[#B6AFA5]">Hamburgueria Artesanal</span>
              </div>

              <h1 className="font-display text-[clamp(2.35rem,4.5vw,4rem)] font-extrabold leading-[1.06] tracking-tight text-[#F6F2EC]">
                {BUSINESS_INFO.slogan}
              </h1>

              <p className="text-base sm:text-lg text-[#B6AFA5] leading-relaxed max-w-xl">
                Na <strong className="text-[#F6F2EC] font-semibold">São Joaquim Burguers</strong>,
                cada lanche é montado na hora no ponto exato da sua escolha — com pão australiano ou
                tradicional, carnes suculentas, queijos derretidos e molhos preparados na casa.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#cardapio"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-[#11100E] bg-[#FF6B35] hover:bg-[#FF8254] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
                >
                  <span>Explorar Cardápio</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href="#agendamento"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-[#F6F2EC] bg-[#1A1815] hover:bg-[#221F1B] border border-[#2D2924] hover:border-[#D4AF37]/60 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6B35]"
                >
                  <Calendar className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                  <span>Agendar Mesa</span>
                </a>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[#2D2924] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-[#B6AFA5]">
              <span className="whitespace-nowrap">
                Burgers a partir de <strong className="text-[#D4AF37] tabular-nums">R$ 25,00</strong>
              </span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="whitespace-nowrap">Carne, Frango e Vegetariano</span>
              <span aria-hidden="true" className="hidden sm:inline">·</span>
              <span className="whitespace-nowrap">Acompanhamentos e Drinks</span>
            </div>
          </div>

          {/* Right Media Column */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 rounded-xl overflow-hidden border border-[#2D2924] bg-[#1A1815] aspect-[16/9] lg:aspect-auto lg:min-h-[420px]">
              {!imageError ? (
                <img
                  ref={imgRef}
                  src="/images/sao-joaquim-1.jpg"
                  alt="Hambúrguer artesanal do São Joaquim Burguers no pão australiano com cheddar derretido, bacon crocante e salada fresca"
                  width={1024}
                  height={576}
                  decoding="async"
                  fetchPriority="high"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover object-center will-change-transform"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#221F1B] to-[#11100E]">
                  <span className="font-display text-xl font-bold text-[#F6F2EC]">
                    {BUSINESS_INFO.name}
                  </span>
                  <span className="text-sm text-[#B6AFA5] mt-1">{BUSINESS_INFO.slogan}</span>
                </div>
              )}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#11100E]/85 via-transparent to-transparent"
              />

              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#D4AF37]">Destaque da chapa</p>
                  <p className="font-display text-lg sm:text-xl font-bold text-[#F6F2EC] mt-0.5">
                    Burger Artesanal no Pão Australiano
                  </p>
                </div>
                <span className="font-display text-lg font-bold text-[#FF6B35] tabular-nums">
                  R$ 26,00
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Quick Info Strip */}
        <div
          data-aos="fade-up"
          data-aos-delay="80"
          className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#2D2924] border border-[#2D2924] rounded-xl overflow-hidden"
        >
          <div className="bg-[#1A1815] p-5 flex items-start gap-3.5">
            <MapPin className="w-5 h-5 text-[#FF6B35] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-[#D4AF37]">Localização</p>
              <p className="text-sm font-medium text-[#F6F2EC] mt-1">
                R. São Joaquim, 193 · Liberdade
              </p>
            </div>
          </div>

          <div className="bg-[#1A1815] p-5 flex items-start gap-3.5">
            <Clock className="w-5 h-5 text-[#FF6B35] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-[#D4AF37]">Segunda a Sábado</p>
              <p className="text-sm font-medium text-[#F6F2EC] mt-1 tabular-nums">
                12h às 00:00h
              </p>
            </div>
          </div>

          <div className="bg-[#1A1815] p-5 flex items-start gap-3.5">
            <Calendar className="w-5 h-5 text-[#FF6B35] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-[#D4AF37]">Aos Domingos</p>
              <p className="text-sm font-medium text-[#F6F2EC] mt-1">
                Consultar via WhatsApp
              </p>
            </div>
          </div>

          <div className="bg-[#1A1815] p-5 flex items-start gap-3.5">
            <Phone className="w-5 h-5 text-[#FF6B35] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-[#D4AF37]">Telefone / WhatsApp</p>
              <a
                href={`https://wa.me/${BUSINESS_INFO.whatsappDigits}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#F6F2EC] hover:text-[#FF6B35] transition-colors mt-1 inline-block tabular-nums"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
