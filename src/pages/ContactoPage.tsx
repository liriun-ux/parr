import React, { useState } from 'react';
import { MapPin, Clock, Phone, Calendar, Users, MessageCircle, ExternalLink, ShieldCheck, Sparkles, Navigation } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const ContactoPage: React.FC = () => {
  // Booking Form State
  const [name, setName] = useState('');
  const [guests, setGuests] = useState(4);
  const [date, setDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('20:00');
  const [occasion, setOccasion] = useState('Cena con amigos');
  const [notes, setNotes] = useState('');

  const generateWhatsAppReservationMessage = () => {
    let msg = `Hola *${RESTAURANT_INFO.name}*, me gustaría reservar una mesa para *${guests} personas* para el día *${date}* a las *${time}*`;
    if (name.trim()) {
      msg += ` a nombre de *${name.trim()}*`;
    }
    if (occasion) {
      msg += ` por motivo de: *${occasion}*`;
    }
    if (notes.trim()) {
      msg += ` (Detalle: ${notes.trim()})`;
    }
    msg += `. ¿Tienen disponibilidad confirmada? ¡Muchas gracias!`;
    return msg;
  };

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(generateWhatsAppReservationMessage());
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
          Encuéntranos & Reserva tu Mesa
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-stone-100">
          Ubicación, Horarios & Reservas
        </h1>
        <p className="text-sm sm:text-base text-stone-400">
          Ven a vivir la experiencia del fuego directo en nuestro salón o agenda tu mesa con antelación para fechas especiales.
        </p>
      </div>

      {/* SECCIÓN 1: CARD DOBLE (Ubicación & Horarios + Mapa Interactivo) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Information Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-7 rounded-3xl bg-stone-900 border border-stone-800 space-y-6 shadow-xl">
            <h2 className="font-display font-bold text-2xl text-stone-100 border-b border-stone-800 pb-4">
              Información del Restaurante
            </h2>

            {/* Dirección */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-amber-500" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Dirección
                </h3>
                <p className="text-sm font-semibold text-stone-100">
                  {RESTAURANT_INFO.address}
                </p>
                <p className="text-xs text-stone-400">
                  A media cuadra de la plaza principal. Zona de fácil acceso y transporte.
                </p>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold pt-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Cómo llegar con GPS (Google Maps)</span>
                </a>
              </div>
            </div>

            {/* Horarios */}
            <div className="flex items-start gap-4 pt-4 border-t border-stone-800/80">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Horarios de Atención
                </h3>
                <p className="text-sm font-semibold text-stone-100">
                  {RESTAURANT_INFO.schedule}
                </p>
                <div className="text-xs text-stone-400 space-y-0.5">
                  <p>• Lunes: Cerrado (Mantenimiento de ahumadores)</p>
                  <p>• Martes a Domingo: 18:00 a 23:30 (Salón y Delivery)</p>
                </div>
              </div>
            </div>

            {/* Contacto Directo */}
            <div className="flex items-start gap-4 pt-4 border-t border-stone-800/80">
              <div className="w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-orange-400" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Contacto Directo
                </h3>
                <p className="text-sm font-semibold text-stone-100">
                  {RESTAURANT_INFO.whatsappDisplay}
                </p>
                <p className="text-xs text-stone-400">
                  Atención ágil por WhatsApp para pedidos y reservas.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Perks */}
          <div className="p-6 rounded-2xl bg-stone-900/50 border border-stone-800/80 flex items-center justify-between text-xs text-stone-400">
            <span className="flex items-center gap-2 text-stone-300">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              Parqueo cercano vigilado
            </span>
            <span className="text-stone-700">•</span>
            <span className="flex items-center gap-2 text-stone-300">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Ambiente climatizado
            </span>
          </div>
        </div>

        {/* Right Column: Google Maps Embed Card */}
        <div className="lg:col-span-7 h-full">
          <div className="rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden shadow-xl flex flex-col h-[460px] lg:h-[500px]">
            <div className="p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-stone-200">
                  Ubicación Satelital / Mapa Interactivo
                </span>
              </div>
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
              >
                <span>Abrir en Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Embedded interactive map */}
            <div className="flex-1 w-full h-full relative bg-stone-950">
              <iframe
                title="Ubicación Fuego & Cifras La Paz"
                src="https://maps.google.com/maps?q=Av.%20Am%C3%A9rica%20La%20Paz%20Bolivia&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(95%)' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: FORMULARIO / BOTÓN DE RESERVAS */}
      <section className="rounded-3xl bg-stone-900 border border-stone-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        {/* Subtle accent light */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto space-y-8 relative z-10">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserva Inmediata</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-stone-100">
              ¿Mesa para una ocasión especial?
            </h2>
            <p className="text-sm text-stone-400 max-w-lg mx-auto">
              Planifica tu visita. Completa los datos y confirma tu mesa directamente por WhatsApp en un toque.
            </p>
          </div>

          <form onSubmit={handleReservationSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Nombre */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                  Nombre de quien reserva <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Carlos Mendoza"
                  className="w-full bg-stone-950 border border-stone-700/80 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Número de personas */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                  Cantidad de Personas ({guests})
                </label>
                <div className="flex items-center gap-2">
                  {[2, 4, 6, 8, 10, 15].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuests(num)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-colors ${
                        guests === num
                          ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-md'
                          : 'bg-stone-950 text-stone-300 border-stone-700/80 hover:border-stone-500'
                      }`}
                    >
                      {num} {num === 15 ? '+' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fecha */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                  Fecha Deseada <span className="text-amber-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700/80 rounded-xl px-4 py-3 text-sm text-stone-100 focus:outline-none focus:border-amber-500 [color-scheme:dark]"
                />
              </div>

              {/* Horario */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                  Hora de Llegada
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700/80 rounded-xl px-4 py-3 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="18:30">18:30 (Apertura)</option>
                  <option value="19:00">19:00</option>
                  <option value="19:30">19:30</option>
                  <option value="20:00">20:00 (Recomendado)</option>
                  <option value="20:30">20:30</option>
                  <option value="21:00">21:00</option>
                  <option value="21:30">21:30</option>
                  <option value="22:00">22:00</option>
                </select>
              </div>

              {/* Motivo / Ocasión */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                  Ocasión Especial
                </label>
                <select
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700/80 rounded-xl px-4 py-3 text-sm text-stone-100 focus:outline-none focus:border-amber-500"
                >
                  <option value="Cena con amigos">Cena con amigos</option>
                  <option value="Cumpleaños">Cumpleaños 🎂</option>
                  <option value="Aniversario / Romántico">Aniversario / Pareja 🥂</option>
                  <option value="Reunión familiar">Reunión familiar</option>
                  <option value="Cena de negocios / Corporativo">Cena de negocios</option>
                  <option value="Otro motivo">Otro motivo</option>
                </select>
              </div>

              {/* Notas especiales */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-2">
                  Peticiones Especiales (Opcional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej. Cerca al asador, sillita para bebé..."
                  className="w-full bg-stone-950 border border-stone-700/80 rounded-xl px-4 py-3 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Live Message Preview */}
            <div className="p-4 rounded-2xl bg-stone-950/70 border border-stone-800 text-xs text-stone-300 space-y-1">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                Vista previa del mensaje a enviar:
              </span>
              <p className="font-mono text-[11px] text-stone-400 bg-stone-900/60 p-2.5 rounded-lg border border-stone-800">
                "{generateWhatsAppReservationMessage()}"
              </p>
            </div>

            {/* Direct Submit to WhatsApp */}
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-black text-base shadow-xl shadow-emerald-950/40 flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-stone-950" />
              <span>Reservar Mesa por WhatsApp</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
