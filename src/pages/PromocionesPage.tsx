import React from 'react';
import { Tag, Sparkles, MessageCircle, Clock, ShieldCheck, Flame, ArrowRight } from 'lucide-react';
import { PROMOTIONS_DATA, RESTAURANT_INFO } from '../data/restaurantData';
import { useCart } from '../context/CartContext';
import { PromoItem } from '../types';

export const PromocionesPage: React.FC = () => {
  const { addToCart } = useCart();

  const handleOrderPromoWhatsApp = (promo: PromoItem) => {
    const message =
      `¡Hola *${RESTAURANT_INFO.name}*! 🔥\n\n` +
      `Quiero aprovechar la siguiente promoción especial:\n` +
      `🏷️ *${promo.title}*\n` +
      `💰 *Precio Promo:* Bs. ${promo.promoPrice}` +
      (promo.regularPrice ? ` (Precio regular Bs. ${promo.regularPrice})` : '') +
      `\n📌 *Detalle:* ${promo.description}\n` +
      `\n¿Me confirman disponibilidad para pedido hoy? ¡Muchas gracias!`;

    window.open(`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleAddPromoToCart = (promo: PromoItem) => {
    addToCart(
      {
        id: promo.id,
        name: promo.title,
        category: 'parrilladas',
        description: promo.description,
        price: promo.promoPrice,
        image: promo.image,
        tags: promo.tags,
        badge: promo.badge,
      },
      1
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Ahorro & Combos Especiales</span>
        </div>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-stone-100">
          Promociones & Combos Delivery
        </h1>
        <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
          Diseñados para compartir en familia, reuniones con amigos o disfrutar de tus cortes favoritos a precios inmejorables.
        </p>
      </div>

      {/* Promotions Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {PROMOTIONS_DATA.map((promo) => {
          const discountPct = promo.regularPrice
            ? Math.round(((promo.regularPrice - promo.promoPrice) / promo.regularPrice) * 100)
            : null;

          return (
            <div
              key={promo.id}
              className="group relative rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden flex flex-col justify-between hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-950/20 transition-all duration-300"
            >
              {/* Image banner */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-stone-950/90 border border-amber-500/50 text-amber-300 text-xs font-black shadow-lg backdrop-blur-md">
                    {promo.badge}
                  </span>
                </div>

                {/* Discount Percentage Pill */}
                {discountPct && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-xl bg-red-600 text-white text-xs font-black shadow-lg">
                      -{discountPct}%
                    </span>
                  </div>
                )}
              </div>

              {/* Promo Details */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <h3 className="font-display font-black text-2xl text-stone-100 group-hover:text-amber-400 transition-colors">
                    {promo.title}
                  </h3>

                  <p className="text-sm text-stone-300/90 leading-relaxed">
                    {promo.description}
                  </p>

                  {/* Conditions box */}
                  <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 text-xs text-stone-400 flex items-start gap-2">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-stone-300 font-medium">Condición: </strong>
                      {promo.condition}
                    </span>
                  </div>
                </div>

                {/* Price and CTA Area */}
                <div className="pt-4 border-t border-stone-800 space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      {promo.regularPrice && (
                        <span className="text-xs text-stone-500 line-through mr-2">
                          Bs. {promo.regularPrice}
                        </span>
                      )}
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-500">
                        Precio Promo
                      </span>
                    </div>
                    <span className="font-display font-black text-3xl text-emerald-400">
                      Bs. {promo.promoPrice}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleOrderPromoWhatsApp(promo)}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-black text-xs sm:text-sm tracking-wide shadow-lg shadow-emerald-950/30 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-stone-950" />
                      <span>{promo.id === 'promo-jueves-costillares' ? '🔥 Aprovechar Promo' : '🛵 Pedir Combo'}</span>
                    </button>

                    <button
                      onClick={() => handleAddPromoToCart(promo)}
                      className="w-full py-2.5 px-4 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white text-xs font-bold border border-stone-700/70 transition-colors"
                    >
                      + Añadir a mi Canasta de Pedido
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Delivery Promise Section */}
      <div className="rounded-3xl bg-stone-900/60 border border-stone-800 p-8 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <h4 className="font-bold text-stone-100 text-sm">Carne Recién Asada</h4>
              <p className="text-xs text-stone-400 mt-1">
                No recalentamos. Salen directamente del fuego a tu caja térmica.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-bold text-stone-100 text-sm">Empaque Térmico Gratuito</h4>
              <p className="text-xs text-stone-400 mt-1">
                Mantiene la temperatura ideal durante el traslado sin condensación.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
              <Tag className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h4 className="font-bold text-stone-100 text-sm">Promociones Acumulables</h4>
              <p className="text-xs text-stone-400 mt-1">
                Puedes complementar cualquier combo con guarniciones o bebidas de la carta.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
