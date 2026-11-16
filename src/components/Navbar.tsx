import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BUSINESS_INFO } from '../data/restaurantData';

const NAV_LINKS = [
  { href: '#cardapio', label: 'Cardápio', id: 'cardapio' },
  { href: '#galeria', label: 'Galeria', id: 'galeria' },
  { href: '#agendamento', label: 'Agendamento', id: 'agendamento' },
  { href: '#depoimentos', label: 'Depoimentos', id: 'depoimentos' },
  { href: '#contato', label: 'Contato', id: 'contato' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setScrolled(scrollTop > 24);
      setScrollProgress(progress);
      rafId = 0;
    };

    const onScroll = () => {
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(updateScroll);
      }
    };

    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#11100E]/92 backdrop-blur-md border-b border-[#2D2924]'
          : 'bg-[#11100E]/75 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div
        aria-hidden="true"
        className="h-[2px] bg-gradient-to-r from-[#FF6B35] via-[#FF8254] to-[#D4AF37] origin-left transition-transform duration-75 ease-out will-change-transform"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element brand wordmark */}
        <a
          href="#inicio"
          className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#F6F2EC] hover:text-[#FF6B35] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6B35]"
        >
          {BUSINESS_INFO.name}
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Navegação principal"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#B6AFA5]"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6B35] ${
                  isActive ? 'text-[#F6F2EC]' : 'hover:text-[#F6F2EC]'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#FF6B35] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#agendamento"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-[#11100E] bg-[#FF6B35] hover:bg-[#FF8254] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
          >
            Agendar Mesa
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#2D2924] text-[#F6F2EC] hover:border-[#FF6B35] transition-colors focus-visible:outline-2 focus-visible:outline-[#FF6B35]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Menu móvel"
          className="lg:hidden border-t border-[#2D2924] bg-[#161411] px-4 py-4 space-y-1"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-3 text-base font-medium text-[#F6F2EC] hover:text-[#FF6B35] rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#agendamento"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full py-3 px-4 text-sm font-semibold text-[#11100E] bg-[#FF6B35] hover:bg-[#FF8254] rounded-lg transition-colors"
            >
              Agendar Mesa
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
