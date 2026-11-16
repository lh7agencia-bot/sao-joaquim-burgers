import { CheckCircle2, ExternalLink, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { BUSINESS_INFO } from '../data/restaurantData';
import {
  ContactInput,
  buildMailtoContactUrl,
  buildWhatsAppContactUrl,
  validateContactForm,
} from '../utils/booking';
import { ScrollReveal } from './ScrollReveal';

export function ContactSection() {
  const [form, setForm] = useState<ContactInput>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<{
    data: ContactInput;
    channel: 'whatsapp' | 'email';
  } | null>(null);

  const handleSubmit = (channel: 'whatsapp' | 'email') => {
    const validationErrors = validateContactForm(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted({ data: { ...form }, channel });
    }
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit('whatsapp');
  };

  return (
    <section id="contato" className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Location & Contact Info */}
          <ScrollReveal className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#D4AF37]">
                Contato e Localização
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F6F2EC] mt-2">
                Visite nossa loja na Liberdade
              </h2>
              <p className="text-sm sm:text-base text-[#B6AFA5] mt-3 leading-relaxed">
                Tem alguma dúvida sobre encomendas, cardápio ou atendimento aos domingos? Fale
                diretamente com nossa equipe.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-[#2D2924]">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-[#FF6B35] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-[#D4AF37]">Endereço</p>
                  <p className="text-sm text-[#F6F2EC] mt-1 leading-relaxed">
                    {BUSINESS_INFO.address}
                  </p>
                  <a
                    href={BUSINESS_INFO.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FF6B35] hover:text-[#FF8254] mt-2 transition-colors"
                  >
                    <span>Abrir no Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-3 border-t border-[#2D2924]">
                <Phone className="w-5 h-5 text-[#FF6B35] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-[#D4AF37]">Telefone e WhatsApp</p>
                  <a
                    href={`https://wa.me/${BUSINESS_INFO.whatsappDigits}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#F6F2EC] hover:text-[#FF6B35] mt-1 inline-block tabular-nums transition-colors"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-[#2D2924] text-xs text-[#B6AFA5] space-y-1">
                <p>
                  Instagram:{' '}
                  <span className="text-[#F6F2EC] font-medium">{BUSINESS_INFO.instagram}</span>
                </p>
                <p>
                  Facebook:{' '}
                  <span className="text-[#F6F2EC] font-medium">{BUSINESS_INFO.facebook}</span>
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Contact Form */}
          <ScrollReveal delay={0.08} className="lg:col-span-7">
            <div className="bg-[#1A1815] border border-[#2D2924] rounded-xl p-6 sm:p-8">
              {submitted ? (
                <div data-testid="contact-confirmation" className="space-y-6 py-2">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#D4AF37]">Mensagem Validada</p>
                      <h3 className="font-display text-2xl font-bold text-[#F6F2EC] mt-0.5">
                        Tudo certo, {submitted.data.name}
                      </h3>
                      <p className="text-sm text-[#B6AFA5] mt-1">
                        Sua mensagem está pronta para envio direto pelo canal selecionado abaixo.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-[#11100E] border border-[#2D2924] rounded-lg text-sm text-[#B6AFA5] space-y-1">
                    <p>
                      <strong className="text-[#F6F2EC]">E-mail:</strong> {submitted.data.email}
                    </p>
                    <p>
                      <strong className="text-[#F6F2EC]">Mensagem:</strong> {submitted.data.message}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={buildWhatsAppContactUrl(submitted.data)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${
                        submitted.channel === 'whatsapp'
                          ? 'bg-[#FF6B35] text-[#11100E] hover:bg-[#FF8254]'
                          : 'bg-[#221F1B] text-[#F6F2EC] border border-[#2D2924] hover:border-[#FF6B35]'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Enviar pelo WhatsApp</span>
                    </a>

                    <a
                      href={buildMailtoContactUrl(submitted.data)}
                      className={`inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold rounded-lg transition-colors whitespace-nowrap ${
                        submitted.channel === 'email'
                          ? 'bg-[#D4AF37] text-[#11100E] hover:bg-[#e1be49]'
                          : 'bg-[#221F1B] text-[#F6F2EC] border border-[#2D2924] hover:border-[#D4AF37]'
                      }`}
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      <span>Abrir no E-mail</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSubmitted(null)}
                      className="px-4 py-3 text-sm font-semibold text-[#B6AFA5] hover:text-[#F6F2EC] transition-colors"
                    >
                      Editar Mensagem
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={onFormSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold text-[#F6F2EC] mb-2"
                      >
                        Seu nome
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Como podemos te chamar?"
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
                        htmlFor="contact-email"
                        className="block text-xs font-semibold text-[#F6F2EC] mb-2"
                      >
                        E-mail
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="voce@exemplo.com.br"
                        value={form.email}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, email: e.target.value }));
                          if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        className="w-full px-4 py-3 text-sm bg-[#11100E] border border-[#2D2924] focus:border-[#FF6B35] rounded-lg text-[#F6F2EC] placeholder:text-[#B6AFA5]/50 focus:outline-none"
                      />
                      {errors.email && (
                        <p className="text-xs text-[#FF6B35] mt-1.5" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold text-[#F6F2EC] mb-2"
                    >
                      Mensagem
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder="Escreva sua dúvida, sugestão ou pedido especial..."
                      value={form.message}
                      onChange={(e) => {
                        setForm((prev) => ({ ...prev, message: e.target.value }));
                        if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                      }}
                      className="w-full px-4 py-3 text-sm bg-[#11100E] border border-[#2D2924] focus:border-[#FF6B35] rounded-lg text-[#F6F2EC] placeholder:text-[#B6AFA5]/50 focus:outline-none resize-y"
                    />
                    {errors.message && (
                      <p className="text-xs text-[#FF6B35] mt-1.5" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-[#11100E] bg-[#FF6B35] hover:bg-[#FF8254] rounded-lg transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Enviar via WhatsApp</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSubmit('email')}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#F6F2EC] bg-[#221F1B] hover:border-[#D4AF37] border border-[#2D2924] rounded-lg transition-colors whitespace-nowrap"
                    >
                      <Mail className="w-4 h-4 text-[#D4AF37]" aria-hidden="true" />
                      <span>Enviar por E-mail</span>
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
