import { BUSINESS_INFO } from '../data/restaurantData';

export function Footer() {
  return (
    <footer className="border-t border-[#2D2924] bg-[#0D0C0A] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div>
          <p className="font-display text-lg font-bold text-[#F6F2EC]">
            {BUSINESS_INFO.name}
          </p>
          <p className="text-xs sm:text-sm text-[#B6AFA5] mt-1">{BUSINESS_INFO.slogan}</p>
          <p className="text-xs text-[#B6AFA5] mt-2">{BUSINESS_INFO.address}</p>
        </div>

        <nav
          aria-label="Links do rodapé"
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-[#B6AFA5]"
        >
          <a href="#cardapio" className="hover:text-[#F6F2EC] transition-colors">
            Cardápio
          </a>
          <a href="#galeria" className="hover:text-[#F6F2EC] transition-colors">
            Galeria
          </a>
          <a href="#agendamento" className="hover:text-[#F6F2EC] transition-colors">
            Agendamento
          </a>
          <a href="#depoimentos" className="hover:text-[#F6F2EC] transition-colors">
            Depoimentos
          </a>
          <a href="#faq" className="hover:text-[#F6F2EC] transition-colors">
            FAQ
          </a>
          <a href="#contato" className="hover:text-[#F6F2EC] transition-colors">
            Contato
          </a>
        </nav>

        <div className="text-xs text-[#B6AFA5] md:text-right">
          <p className="tabular-nums">{BUSINESS_INFO.phoneDisplay}</p>
          <p className="mt-1">© {new Date().getFullYear()} {BUSINESS_INFO.name}</p>
        </div>
      </div>
    </footer>
  );
}
