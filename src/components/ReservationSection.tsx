import { Calendar, CheckCircle2, Clock, MessageCircle, Users } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { BUSINESS_INFO, TIME_SLOTS } from '../data/restaurantData';
import {
  ReservationInput,
  buildWhatsAppReservationUrl,
  validateReservation,
} from '../utils/booking';
import { ScrollReveal } from './ScrollReveal';

export function ReservationSection() {
  const todayIso = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState<ReservationInput>({
    name: '',
    phone: '',
    date: todayIso,
    time: '19:30',
    guests: 2,
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState<ReservationInput | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateReservation(form, todayIso);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setConfirmed({ ...form });
    }
  };

  return (
    <section id="agendamento" className="py-16 sm:py-24 border-b border-[#2D2924]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Explanation Column */}
          <ScrollReveal className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#D4AF37]">
                Agendamento Online
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F6F2EC] mt-2">
                Reserve sua mesa ou horário na chapa
              </h2>
              <p className="text-sm sm:text-base text-[#B6AFA5] mt-3 leading-relaxed">
                Garanta lugar para o almoço, happy hour ou jantar na{' '}
                <strong className="text-[#F6F2EC] font-medium">R. São Joaquim, 193</strong>. Escolha
                a data, o horário e a quantidade de pessoas e finalize a confirmação direto pelo
                nosso WhatsApp.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#2D2924] text-sm text-[#B6AFA5]">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#FF6B35] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[#F6F2EC]">{BUSINESS_INFO.hoursWeekday}</p>
                  <p className="text-xs text-[#B6AFA5] mt-0.5">{BUSINESS_INFO.hoursSunday}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[#FF6B35] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[#F6F2EC]">Grupos e Confraternizações</p>
                  <p className="text-xs text-[#B6AFA5] mt-0.5">
                    Reservas para 1 a 20 pessoas com preparo coordenado para a mesa.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Form Column */}
          <ScrollReveal delay={0.08} className="lg:col-span-7">
            <div className="bg-[#1A1815] border border-[#2D2924] rounded-xl p-6 sm:p-8">
              {confirmed ? (
                <div
                  data-testid="reservation-confirmation"
                  className="space-y-6 py-2"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#D4AF37]">
                        Solicitação Pronta
                      </p>
                      <h3 className="font-display text-2xl font-bold text-[#F6F2EC] mt-0.5">
                        Agendamento preparado para {confirmed.name}
                      </h3>
                      <p className="text-sm text-[#B6AFA5] mt-1">
                        Clique abaixo para enviar os dados diretamente para o WhatsApp da{' '}
                        {BUSINESS_INFO.name} e confirmar sua disponibilidade na hora.
                      </p>
                    </div>
                  </div>

                  <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#11100E] border border-[#2D2924] rounded-lg text-sm">
                    <div>
                      <dt className="text-xs text-[#B6AFA5]">Data</dt>
                      <dd className="font-semibold text-[#F6F2EC] mt-1 tabular-nums">
                        {confirmed.date.split('-').reverse().join('/')}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#B6AFA5]">Horário</dt>
                      <dd className="font-semibold text-[#F6F2EC] mt-1 tabular-nums">
                        {confirmed.time}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#B6AFA5]">Pessoas</dt>
                      <dd className="font-semibold text-[#F6F2EC] mt-1 tabular-nums">
                        {confirmed.guests}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs text-[#B6AFA5]">WhatsApp</dt>
                      <dd className="font-semibold text-[#F6F2EC] mt-1 tabular-nums truncate">
                        {confirmed.phone}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={buildWhatsAppReservationUrl(confirmed)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#11100E] bg-[#FF6B35] hover:bg-[#FF8254] rounded-lg transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Confirmar no WhatsApp</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setConfirmed(null)}
                      className="px-4 py-3.5 text-sm font-semibold text-[#B6AFA5] hover:text-[#F6F2EC] border border-[#2D2924] rounded-lg transition-colors whitespace-nowrap"
                    >
                      Alterar Dados
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="res-name"
                        className="block text-xs font-semibold text-[#F6F2EC] mb-2"
                      >
                        Nome completo
                      </label>
                      <input
                        id="res-name"
                        type="text"
                        required
                        placeholder="Seu nome"
                        value={form.name}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, name: e.target.value }));
                          if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        className="w-full px-4 py-3 text-sm bg-[#11100E] border border-[#2D2924] focus:border-[#FF6B35] rounded-lg text-[#F6F2EC] placeholder:text-[#B6AFA5]/50 focus:outline-none"
                      />
                      {errors.name && (
                        <p className="text-xs text-[#FF6B35] mt-1.5" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="res-phone"
                        className="block text-xs font-semibold text-[#F6F2EC] mb-2"
                      >
                        Telefone / WhatsApp
                      </label>
                      <input
                        id="res-phone"
                        type="tel"
                        required
                        placeholder="(11) 99999-9999"
                        value={form.phone}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, phone: e.target.value }));
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                        }}
                        className="w-full px-4 py-3 text-sm bg-[#11100E] border border-[#2D2924] focus:border-[#FF6B35] rounded-lg text-[#F6F2EC] placeholder:text-[#B6AFA5]/50 focus:outline-none tabular-nums"
                      />
                      {errors.phone && (
                        <p className="text-xs text-[#FF6B35] mt-1.5" role="alert">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div>
                      <label
                        htmlFor="res-date"
                        className="block text-xs font-semibold text-[#F6F2EC] mb-2"
                      >
                        Data
                      </label>
                      <input
                        id="res-date"
                        type="date"
                        min={todayIso}
                        required
                        value={form.date}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, date: e.target.value }));
                          if (errors.date) setErrors((prev) => ({ ...prev, date: '' }));
                        }}
                        className="w-full px-4 py-3 text-sm bg-[#11100E] border border-[#2D2924] focus:border-[#FF6B35] rounded-lg text-[#F6F2EC] focus:outline-none tabular-nums"
                      />
                      {errors.date && (
                        <p className="text-xs text-[#FF6B35] mt-1.5" role="alert">
                          {errors.date}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="res-time"
                        className="block text-xs font-semibold text-[#F6F2EC] mb-2"
                      >
                        Horário
                      </label>
                      <select
                        id="res-time"
                        value={form.time}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, time: e.target.value }));
                          if (errors.time) setErrors((prev) => ({ ...prev, time: '' }));
                        }}
                        className="w-full px-4 py-3 text-sm bg-[#11100E] border border-[#2D2924] focus:border-[#FF6B35] rounded-lg text-[#F6F2EC] focus:outline-none tabular-nums"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                      {errors.time && (
                        <p className="text-xs text-[#FF6B35] mt-1.5" role="alert">
                          {errors.time}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="res-guests"
                        className="block text-xs font-semibold text-[#F6F2EC] mb-2"
                      >
                        Pessoas
                      </label>
                      <input
                        id="res-guests"
                        type="number"
                        min={1}
                        max={20}
                        required
                        value={form.guests}
                        onChange={(e) => {
                          setForm((prev) => ({
                            ...prev,
                            guests: Number(e.target.value) || 0,
                          }));
                          if (errors.guests) setErrors((prev) => ({ ...prev, guests: '' }));
                        }}
                        className="w-full px-4 py-3 text-sm bg-[#11100E] border border-[#2D2924] focus:border-[#FF6B35] rounded-lg text-[#F6F2EC] focus:outline-none tabular-nums"
                      />
                      {errors.guests && (
                        <p className="text-xs text-[#FF6B35] mt-1.5" role="alert">
                          {errors.guests}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="res-notes"
                      className="block text-xs font-semibold text-[#F6F2EC] mb-2"
                    >
                      Observações (opcional)
                    </label>
                    <input
                      id="res-notes"
                      type="text"
                      placeholder="Ex.: preferência de mesa, aniversário, pedido antecipado"
                      value={form.notes ?? ''}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, notes: e.target.value }))
                      }
                      className="w-full px-4 py-3 text-sm bg-[#11100E] border border-[#2D2924] focus:border-[#FF6B35] rounded-lg text-[#F6F2EC] placeholder:text-[#B6AFA5]/50 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-xs text-[#B6AFA5]">
                      Aos domingos, o agendamento depende de confirmação via WhatsApp.
                    </p>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#11100E] bg-[#FF6B35] hover:bg-[#FF8254] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
                    >
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      <span>Agendar Horário</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
