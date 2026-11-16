import AOS from 'aos';
import { Check, MessageCircle, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import {
  CUSTOMIZATION_OPTIONS,
  MENU_CATEGORIES,
  MENU_ITEMS,
  MenuCategoryId,
  MenuItem,
} from '../data/restaurantData';
import {
  BurgerConfig,
  buildWhatsAppCustomBurgerUrl,
  buildWhatsAppUrl,
  calculateCustomBurgerPrice,
  calculateOrderTotal,
  filterMenuItems,
  formatBRL,
} from '../utils/booking';
import { ScrollReveal } from './ScrollReveal';

export function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategoryId>('todos');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const [burgerConfig, setBurgerConfig] = useState<BurgerConfig>({
    protein: 'Carne (R$ 26,00)',
    bread: CUSTOMIZATION_OPTIONS.breads[0],
    doneness: CUSTOMIZATION_OPTIONS.doneness[0],
    cheese: CUSTOMIZATION_OPTIONS.cheeses[0],
    extraPatty: false,
    sauce: 'Sem molho extra',
  });

  const filteredItems = useMemo(
    () => filterMenuItems(MENU_ITEMS, selectedCategory),
    [selectedCategory],
  );

  useEffect(() => {
    AOS.refresh();
  }, [selectedCategory]);

  const selectedOrders = useMemo(() => {
    return MENU_ITEMS.filter((item) => (quantities[item.id] ?? 0) > 0).map((item) => ({
      item,
      quantity: quantities[item.id],
    }));
  }, [quantities]);

  const totalItemsCount = useMemo(
    () => selectedOrders.reduce((acc, entry) => acc + entry.quantity, 0),
    [selectedOrders],
  );

  const orderTotal = useMemo(() => calculateOrderTotal(selectedOrders), [selectedOrders]);
  const customBurgerTotal = useMemo(
    () => calculateCustomBurgerPrice(burgerConfig),
    [burgerConfig],
  );

  const updateQuantity = (item: MenuItem, delta: number) => {
    setQuantities((prev) => {
      const current = prev[item.id] ?? 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [item.id]: next };
    });
  };

  const orderWhatsAppHref = useMemo(() => {
    if (selectedOrders.length === 0) return '';
    const lines = [
      'Olá, São Joaquim Burguers! Gostaria de fazer o seguinte pedido:',
      ...selectedOrders.map(
        ({ item, quantity }) =>
          `• ${quantity}x ${item.name} (${formatBRL(item.price * quantity)})`,
      ),
      `Total estimado: ${formatBRL(orderTotal)}`,
    ];
    return buildWhatsAppUrl(lines.join('\n'));
  }, [selectedOrders, orderTotal]);

  return (
    <section id="cardapio" className="py-16 sm:py-24 border-b border-[#2D2924]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 border-b border-[#2D2924]">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-semibold text-[#D4AF37]">
                Cardápio Digital
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F6F2EC] mt-2">
                Feito na chapa, do seu jeito
              </h2>
              <p className="text-sm sm:text-base text-[#B6AFA5] mt-3 leading-relaxed">
                Confira os valores oficiais da casa. Selecione os itens para montar seu resumo de
                pedido ou personalize seu hambúrguer abaixo.
              </p>
            </div>

            {/* Category filter tabs */}
            <div
              role="tablist"
              aria-label="Categorias do cardápio"
              className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#1A1815] border border-[#2D2924] rounded-xl"
            >
              {MENU_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#FF6B35] ${
                      isActive
                        ? 'bg-[#FF6B35] text-[#11100E]'
                        : 'text-[#B6AFA5] hover:text-[#F6F2EC] hover:bg-[#221F1B]'
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Menu Items Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const qty = quantities[item.id] ?? 0;
            return (
              <ScrollReveal key={item.id} delay={Math.min(idx * 0.04, 0.2)}>
                <article className="h-full flex flex-col justify-between bg-[#1A1815] border border-[#2D2924] hover:border-[#FF6B35]/50 rounded-xl p-6 transition-colors duration-150">
                  <div>
                    <div className="flex items-center justify-between gap-3 text-xs text-[#B6AFA5]">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-[#D4AF37]">{item.categoryLabel}</span>
                        {item.highlight && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{item.highlight}</span>
                          </>
                        )}
                      </div>
                      <span className="font-display text-lg font-bold text-[#F6F2EC] tabular-nums">
                        {formatBRL(item.price)}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#F6F2EC] mt-3">
                      {item.name}
                    </h3>

                    <p className="text-sm text-[#B6AFA5] leading-relaxed mt-2">
                      {item.description}
                    </p>

                    {item.details && (
                      <p className="text-xs text-[#B6AFA5]/80 mt-3 pt-3 border-t border-[#2D2924]">
                        {item.details}
                      </p>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#2D2924] flex items-center justify-between gap-3">
                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => updateQuantity(item, 1)}
                        aria-label={`Adicionar ${item.name} ao pedido`}
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-semibold text-[#F6F2EC] bg-[#221F1B] hover:bg-[#FF6B35] hover:text-[#11100E] border border-[#2D2924] hover:border-[#FF6B35] rounded-lg transition-colors duration-150 whitespace-nowrap"
                      >
                        <Plus className="w-4 h-4" aria-hidden="true" />
                        <span>Adicionar ao Pedido</span>
                      </button>
                    ) : (
                      <div className="w-full flex items-center justify-between gap-2 bg-[#221F1B] border border-[#FF6B35]/60 rounded-lg p-1">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item, -1)}
                          aria-label={`Remover uma unidade de ${item.name}`}
                          className="w-9 h-9 inline-flex items-center justify-center rounded-md text-[#F6F2EC] hover:bg-[#2D2924] transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-bold text-[#F6F2EC] tabular-nums">
                          {qty} no pedido
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item, 1)}
                          aria-label={`Adicionar mais uma unidade de ${item.name}`}
                          className="w-9 h-9 inline-flex items-center justify-center rounded-md bg-[#FF6B35] text-[#11100E] hover:bg-[#FF8254] transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Selected Order Summary Bar */}
        {totalItemsCount > 0 && (
          <div
            data-testid="order-summary-bar"
            className="mt-8 p-5 sm:p-6 bg-[#1A1815] border border-[#D4AF37]/60 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#F6F2EC] tabular-nums">
                  {totalItemsCount} {totalItemsCount === 1 ? 'item selecionado' : 'itens selecionados'} ·{' '}
                  <span className="text-[#D4AF37]">{formatBRL(orderTotal)}</span>
                </p>
                <p className="text-xs text-[#B6AFA5] mt-0.5">
                  {selectedOrders.map((o) => `${o.quantity}x ${o.item.name}`).join(' · ')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setQuantities({})}
                className="px-3.5 py-2.5 text-xs font-semibold text-[#B6AFA5] hover:text-[#F6F2EC] border border-[#2D2924] rounded-lg transition-colors whitespace-nowrap"
              >
                Limpar
              </button>
              <a
                href={orderWhatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-[#11100E] bg-[#FF6B35] hover:bg-[#FF8254] rounded-lg transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Pedir no WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* Custom Burger Builder (Authentic to physical menu choices) */}
        <ScrollReveal delay={0.1}>
          <div className="mt-12 bg-[#1A1815] border border-[#2D2924] rounded-xl p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-[#2D2924]">
              <div>
                <p className="text-xs font-semibold text-[#D4AF37]">Personalização da Casa</p>
                <h3 className="font-display text-2xl font-bold text-[#F6F2EC] mt-1">
                  Monte seu Hambúrguer do Seu Jeito
                </h3>
                <p className="text-sm text-[#B6AFA5] mt-1">
                  Inclui alface, tomate, cebola, pickles, bacon e maionese — escolha o pão, o
                  ponto e o queijo.
                </p>
              </div>
              <div className="flex items-baseline gap-2 shrink-0">
                <span className="text-xs text-[#B6AFA5]">Valor montado:</span>
                <span
                  data-testid="custom-burger-total"
                  className="font-display text-2xl font-bold text-[#D4AF37] tabular-nums"
                >
                  {formatBRL(customBurgerTotal)}
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Base */}
              <div>
                <label
                  htmlFor="builder-protein"
                  className="block text-xs font-semibold text-[#F6F2EC] mb-2"
                >
                  Escolha a Base
                </label>
                <select
                  id="builder-protein"
                  value={burgerConfig.protein}
                  onChange={(e) =>
                    setBurgerConfig((prev) => ({
                      ...prev,
                      protein: e.target.value as BurgerConfig['protein'],
                    }))
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-[#11100E] border border-[#2D2924] focus:border-[#FF6B35] rounded-lg text-[#F6F2EC] focus:outline-none"
                >
                  <option value="Carne (R$ 26,00)">Carne (R$ 26,00)</option>
                  <option value="Frango (R$ 25,00)">Frango (R$ 25,00)</option>
                  <option value="Vegetariano (R$ 27,00)">Vegetariano (R$ 27,00)</option>
                </select>
              </div>

              {/* Bread */}
              <div>
                <label
                  htmlFor="builder-bread"
                  className="block text-xs font-semibold text-[#F6F2EC] mb-2"
                >
                  Tipo de Pão
                </label>
                <select
                  id="builder-bread"
                  value={burgerConfig.bread}
                  onChange={(e) =>
                    setBurgerConfig((prev) => ({ ...prev, bread: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-[#11100E] border border-[#2D2924] focus:border-[#FF6B35] rounded-lg text-[#F6F2EC] focus:outline-none"
                >
                  {CUSTOMIZATION_OPTIONS.breads.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Cheese */}
              <div>
                <label
                  htmlFor="builder-cheese"
                  className="block text-xs font-semibold text-[#F6F2EC] mb-2"
                >
                  Queijo
                </label>
                <select
                  id="builder-cheese"
                  value={burgerConfig.cheese}
                  onChange={(e) =>
                    setBurgerConfig((prev) => ({ ...prev, cheese: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-[#11100E] border border-[#2D2924] focus:border-[#FF6B35] rounded-lg text-[#F6F2EC] focus:outline-none"
                >
                  {CUSTOMIZATION_OPTIONS.cheeses.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doneness */}
              <div>
                <label
                  htmlFor="builder-doneness"
                  className="block text-xs font-semibold text-[#F6F2EC] mb-2"
                >
                  Ponto da Carne
                </label>
                <select
                  id="builder-doneness"
                  value={burgerConfig.doneness}
                  disabled={!burgerConfig.protein.startsWith('Carne')}
                  onChange={(e) =>
                    setBurgerConfig((prev) => ({ ...prev, doneness: e.target.value }))
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-[#11100E] border border-[#2D2924] focus:border-[#FF6B35] rounded-lg text-[#F6F2EC] disabled:opacity-50 focus:outline-none"
                >
                  {CUSTOMIZATION_OPTIONS.doneness.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#2D2924] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  role="switch"
                  aria-checked={burgerConfig.extraPatty}
                  onClick={() =>
                    setBurgerConfig((prev) => ({ ...prev, extraPatty: !prev.extraPatty }))
                  }
                  className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg border transition-colors ${
                    burgerConfig.extraPatty
                      ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-[#D4AF37]'
                      : 'bg-[#11100E] border-[#2D2924] text-[#B6AFA5] hover:text-[#F6F2EC]'
                  }`}
                >
                  <Check
                    className={`w-4 h-4 ${burgerConfig.extraPatty ? 'opacity-100' : 'opacity-30'}`}
                    aria-hidden="true"
                  />
                  <span>Hambúrguer Extra (+R$ 13,00)</span>
                </button>

                <div className="flex items-center gap-2">
                  <label htmlFor="builder-sauce" className="text-xs text-[#B6AFA5] whitespace-nowrap">
                    Molho extra:
                  </label>
                  <select
                    id="builder-sauce"
                    value={burgerConfig.sauce}
                    onChange={(e) =>
                      setBurgerConfig((prev) => ({ ...prev, sauce: e.target.value }))
                    }
                    className="px-3 py-2 text-xs sm:text-sm bg-[#11100E] border border-[#2D2924] focus:border-[#FF6B35] rounded-lg text-[#F6F2EC] focus:outline-none"
                  >
                    <option value="Sem molho extra">Nenhum</option>
                    <option value="Molho Picante (+R$ 2,00)">Molho Picante (+R$ 2,00)</option>
                    <option value="Molho de Ervas (+R$ 2,00)">Molho de Ervas (+R$ 2,00)</option>
                  </select>
                </div>
              </div>

              <a
                href={buildWhatsAppCustomBurgerUrl(burgerConfig)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-[#11100E] bg-[#D4AF37] hover:bg-[#e1be49] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Enviar Burger Personalizado</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
