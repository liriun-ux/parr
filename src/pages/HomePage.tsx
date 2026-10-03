import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, MessageCircle, ArrowRight, Clock, ShieldCheck, Sparkles, Plus } from 'lucide-react';
import { CATEGORIES_DATA, STARRED_PRODUCTS, EXPERIENCE_PILLARS, RESTAURANT_INFO } from '../data/restaurantData';
import { useCart } from '../context/CartContext';
import { MenuItem } from '../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart, generateWhatsAppItemUrl } = useCart();

  const handleCategoryClick = (category: (typeof CATEGORIES_DATA)[0]) => {
    if (category.link) {
      navigate(category.link);
    } else {
      navigate(`/menu?categoria=${category.filterId}`);
    }
  };

  const handleDirectWhatsApp = (item: MenuItem) => {
    const url = generateWhatsAppItemUrl(item);
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-24 pb-20">
      {/* SECCIÓN 1: HERO / PORTADA (Primer impacto) */}
      <section className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with warm gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000&auto=format&fit=crop"
            alt="Parrilla con cortes de carne y fuego a la leña"
            className="w-full h-full object-cover object-center scale-105 "
          />
          {/* Subtle dark gradient overlay to give high readability and clean atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/60" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 flex flex-col items-center">
          {/* Badges / Quick Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/40 text-amber-300 text-xs font-semibold backdrop-blur-sm shadow-md">
              <span>🔥</span>
              <span>Ahumados a fuego lento</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-sm shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Abierto hoy hasta las 23:30</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-orange-500/40 text-orange-300 text-xs font-semibold backdrop-blur-sm shadow-md">
              <span>🛵</span>
              <span>Delivery térmico garantizado</span>
            </span>
          </div>

          {/* H1 Title */}
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-stone-100 tracking-tight leading-[1.1] max-w-4xl drop-shadow-sm">
            El auténtico sabor de la parrilla & ahumados a la leña
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-stone-300 max-w-2xl font-light leading-relaxed">
            Cortes seleccionados, cocción lenta de 12 horas y la mejor carne a tu mesa o a la puerta de tu casa.
          </p>

          {/* Buttons (CTAs) */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            {/* Primary CTA */}
            <Link
              to="/menu"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-stone-950 font-black text-base shadow-xl shadow-orange-950/50 hover:shadow-orange-950/70 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>🔥 Ver Menú y Pedir</span>
            </Link>

            {/* Secondary CTA */}
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent('¡Hola Fuego & Cifras! Deseo pedir la parrillada por WhatsApp.')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-stone-900/90 hover:bg-stone-850 text-stone-100 border border-stone-700/80 hover:border-emerald-500/60 font-bold text-base backdrop-blur-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
              <span>📲 Pedir por WhatsApp</span>
            </a>
          </div>

          {/* Subtle trust note */}
          <div className="mt-12 flex items-center gap-6 text-xs text-stone-400 font-medium border-t border-stone-800/80 pt-6">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-500" />
              12h Low & Slow
            </span>
            <span className="text-stone-700">•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              Zona Central, La Paz
            </span>
            <span className="text-stone-700">•</span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              100% Leña Natural
            </span>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: CATEGORÍAS DE LA PARRILLA (Cards de navegación rápida) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
            Explora Nuestra Oferta
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-stone-100 mt-2">
            ¿Qué se te antoja hoy?
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Grilla de 4 columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES_DATA.map((category) => (
            <div
              key={category.id}
              className="group relative rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden flex flex-col justify-between hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-950/20 transition-all duration-300"
            >
              {/* Image Container with smooth zoom */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent" />
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-stone-100 group-hover:text-amber-400 transition-colors">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-xs text-stone-400 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-stone-800/80">
                  <button
                    onClick={() => handleCategoryClick(category)}
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 text-xs font-bold tracking-wide transition-colors flex items-center justify-center gap-2 group/btn"
                  >
                    <span>{category.buttonText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 3: PLATOS ESTRELLA / DESTACADOS */}
      <section className="bg-stone-900/40 border-y border-stone-800/60 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                Selección de los Maestros Asadores
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-stone-100 mt-2">
                Los más pedidos de la casa
              </h2>
            </div>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
            >
              <span>Ver carta completa</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Grilla de 3 productos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STARRED_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="group relative rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden flex flex-col justify-between hover:border-amber-500/60 transition-all duration-300 shadow-lg"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/30" />

                  {/* Top Badge */}
                  {prod.badge && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-stone-950/90 border border-amber-500/50 text-amber-300 text-xs font-bold backdrop-blur-md shadow-md">
                        {prod.badge}
                      </span>
                    </div>
                  )}

                  {/* Serves info */}
                  {prod.serves && (
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[11px] font-medium bg-black/70 px-2.5 py-1 rounded-md text-stone-300 backdrop-blur-sm">
                        👥 {prod.serves}
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display font-bold text-xl text-stone-100 group-hover:text-amber-400 transition-colors">
                        {prod.name}
                      </h3>
                    </div>

                    <p className="mt-3 text-sm text-stone-300/90 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-800">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs uppercase tracking-wider text-stone-400 font-semibold">
                        Precio
                      </span>
                      <span className="font-display font-black text-2xl text-amber-400">
                        Bs. {prod.price}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleDirectWhatsApp(prod)}
                        className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
                        title="Abrir WhatsApp con este producto prellenado"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Pedir en WhatsApp</span>
                      </button>

                      <button
                        onClick={() => addToCart(prod, 1)}
                        className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-amber-500 hover:text-stone-950 text-stone-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-stone-700"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Agregar al Carrito</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 4: LA EXPERIENCIA FUEGO & CIFRAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-stone-900/90 to-stone-950 border border-stone-800 p-8 sm:p-12 lg:p-16">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
              Nuestra Filosofía
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-stone-100 mt-2">
              Carne, Fuego y Pasión por el Ahumado
            </h2>
            <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed">
              No solo hacemos parrilla: dominamos el arte de la cocción lenta. Cada corte pasa por horas de preparación con humo de maderas seleccionadas para garantizar jugosidad, textura y un sabor inigualable.
            </p>
          </div>

          {/* 3 Pilares (Cards informativas) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EXPERIENCE_PILLARS.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-stone-950/60 border border-stone-800/80 hover:border-amber-500/30 transition-colors flex flex-col items-center text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-stone-900 border border-stone-700/60 flex items-center justify-center text-2xl shadow-inner">
                  {pillar.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-stone-100">
                  {pillar.title}
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN 5: BANNER DE LLAMADO A LA ACCIÓN (CTA Final) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-stone-900 p-10 sm:p-14 lg:p-16 text-center">
          {/* Subtle warm glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 via-orange-600/20 to-red-600/20 opacity-40 pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <Flame className="w-6 h-6 text-amber-500" />
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl text-stone-100 leading-tight">
              ¿Listo para disfrutar de la mejor parrillada?
            </h2>

            <p className="text-base text-stone-300 font-light">
              Haz tu pedido por WhatsApp en menos de 2 minutos o visítanos en nuestro local.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent('¡Hola Fuego & Cifras! Deseo pedir mi parrillada ahora mismo.')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-black text-base shadow-xl shadow-emerald-950/40 active:scale-95 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-stone-950" />
                <span>📲 Pedir mi Parrillada Ahora</span>
              </a>

              <Link
                to="/contacto"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 font-bold text-sm transition-colors"
              >
                <span>Ver Ubicación & Horarios</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
