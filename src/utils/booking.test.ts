import test from 'node:test';
import assert from 'node:assert/strict';
import { MENU_ITEMS } from '../data/restaurantData';
import {
  buildWhatsAppReservationUrl,
  calculateCustomBurgerPrice,
  calculateOrderTotal,
  filterMenuItems,
  validateContactForm,
  validateReservation,
} from './booking';

test('filterMenuItems returns all items for "todos" and subsets per category', () => {
  assert.equal(filterMenuItems(MENU_ITEMS, 'todos').length, MENU_ITEMS.length);
  const burgers = filterMenuItems(MENU_ITEMS, 'hamburgueres');
  assert.ok(burgers.length > 0);
  assert.ok(burgers.every((item) => item.category === 'hamburgueres'));
});

test('calculateOrderTotal sums prices accurately', () => {
  const carne = MENU_ITEMS.find((i) => i.id === 'burger-carne')!;
  const fritas = MENU_ITEMS.find((i) => i.id === 'porcao-fritas')!;
  const total = calculateOrderTotal([
    { item: carne, quantity: 2 },
    { item: fritas, quantity: 1 },
  ]);
  assert.equal(total, 26 * 2 + 12);
});

test('calculateCustomBurgerPrice computes base + extra patty + extra sauce', () => {
  assert.equal(
    calculateCustomBurgerPrice({
      protein: 'Carne (R$ 26,00)',
      bread: 'Pão Australiano',
      doneness: 'Ao Ponto',
      cheese: 'Cheddar',
      extraPatty: false,
      sauce: 'Sem molho extra',
    }),
    26,
  );

  assert.equal(
    calculateCustomBurgerPrice({
      protein: 'Vegetariano (R$ 27,00)',
      bread: 'Com Gergelim',
      doneness: 'Ao Ponto',
      cheese: 'Mussarela',
      extraPatty: true,
      sauce: 'Molho Picante (+R$ 2,00)',
    }),
    42,
  );
});

test('validateReservation rejects past dates and invalid phone numbers', () => {
  const errors = validateReservation(
    {
      name: 'A',
      phone: '1199',
      date: '2026-01-01',
      time: '',
      guests: 0,
    },
    '2026-11-16',
  );
  assert.ok(errors.name);
  assert.ok(errors.phone);
  assert.ok(errors.date);
  assert.ok(errors.time);
  assert.ok(errors.guests);

  const valid = validateReservation(
    {
      name: 'Rafael Nakamura',
      phone: '(11) 96096-5728',
      date: '2026-11-20',
      time: '19:30',
      guests: 4,
    },
    '2026-11-16',
  );
  assert.deepEqual(valid, {});
});

test('validateContactForm enforces valid email and message length', () => {
  const invalid = validateContactForm({
    name: '',
    email: 'invalido',
    message: 'oi',
  });
  assert.ok(invalid.name);
  assert.ok(invalid.email);
  assert.ok(invalid.message);

  const valid = validateContactForm({
    name: 'Camila Ferreira',
    email: 'camila@exemplo.com.br',
    message: 'Gostaria de consultar reserva para 8 pessoas no sábado.',
  });
  assert.deepEqual(valid, {});
});

test('buildWhatsAppReservationUrl targets official phone 5511960965728', () => {
  const url = buildWhatsAppReservationUrl({
    name: 'Thiago',
    phone: '11960965728',
    date: '2026-11-21',
    time: '20:00',
    guests: 2,
  });
  assert.ok(url.startsWith('https://wa.me/5511960965728?text='));
  assert.ok(decodeURIComponent(url).includes('21/11/2026'));
});
