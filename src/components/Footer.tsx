import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, MapPin, Clock, Phone, Instagram, Facebook, MessageCircle, ShieldCheck, Award, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 border-t border-stone-900 text-stone-400">
      {/* Top Highlights Strip */}
      <div className="border-b border-stone-900/80 py-8 bg-stone-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h4 className="font-semibold text-stone-100 text-sm">Leña 100% Seleccionada</h4>
              <p className="text-xs text-stone-400 mt-0.5">Aromas nobles de roble y frutales.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h4 className="font-semibold text-stone-100 text-sm">Empaque Térmico Sellado</h4>
              <p className="text-xs text-stone-400 mt-0.5">Llega crujiente y caliente a tu mesa.</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold text-stone-100 text-sm">Cortes Premium Madurados</h4>
              <p className="text-xs text-stone-400 mt-0.5">Jugosidad y ternura en cada bocado.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-amber-500" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-lg text-stone-100 tracking-wider">
                  FUEGO & CIFRAS
                </span>
                <span className="text-[10px] tracking-[0.2em] font-semibold text-amber-500 uppercase -mt-1">
                  Parrilla & Ahumados
                </span>
              </div>
            </Link>
            <p className="text-sm text-stone-400 leading-relaxed">
              El auténtico templo de la cocción lenta y la leña viva en La Paz. Brisket 12 horas, cortes nobles a la brasa y parrilladas completas para compartir.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                aria-label="Instagram de Fuego y Cifras"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                aria-label="Facebook de Fuego y Cifras"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/50 transition-colors"
                aria-label="WhatsApp Fuego y Cifras"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-stone-500">Instagram: {RESTAURANT_INFO.instagram}</p>
          </div>

          {/* Col 2: Fast Navigation */}
          <div>
            <h3 className="font-display text-stone-200 font-bold tracking-wider text-sm uppercase mb-4">
              Navegación Rápida
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors">
                  Inicio / Portada
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-amber-400 transition-colors">
                  Menú Digital Completo
                </Link>
              </li>
              <li>
                <Link to="/promociones" className="hover:text-amber-400 transition-colors">
                  Promociones & Combos
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-amber-400 transition-colors">
                  Ubicación & Reservas
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent('Hola! Quisiera consultar si tienen servicio de catering para eventos especiales.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  Eventos & Catering Privado
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Ubicación y Horarios */}
          <div>
            <h3 className="font-display text-stone-200 font-bold tracking-wider text-sm uppercase mb-4">
              Visítanos & Horarios
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                <span>
                  <strong className="text-stone-300 block font-medium">Restaurante Principal</strong>
                  {RESTAURANT_INFO.address}
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                <div>
                  <strong className="text-stone-300 block font-medium">Horarios de Cocina</strong>
                  <span>{RESTAURANT_INFO.schedule}</span>
                  <span className="block text-xs text-stone-500 mt-0.5">Lunes descanso del asador</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Atención & Pedidos */}
          <div>
            <h3 className="font-display text-stone-200 font-bold tracking-wider text-sm uppercase mb-4">
              Pedidos & Delivery
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              Atendemos tus pedidos con empaque térmico especial y entregas rápidas en toda la zona metropolitana.
            </p>
            <div className="space-y-2">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent('¡Hola Fuego & Cifras! Deseo pedir delivery.')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: {RESTAURANT_INFO.whatsappDisplay}</span>
              </a>
              <Link
                to="/contacto"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 hover:border-stone-700 text-stone-300 hover:text-white font-medium text-xs transition-colors"
              >
                <span>📅 Reservar una Mesa</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Fuego & Cifras - Parrilla & Ahumados. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1 text-stone-500">
            <span>Hecho con brasa, fuego y</span>
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500 inline" />
            <span>en Bolivia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
