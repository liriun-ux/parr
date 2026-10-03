import React, { useState } from 'react';
import { MessageCircle, X, Flame, Calendar, Send } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getDirectChatUrl = (type: 'delivery' | 'reserva' | 'consulta') => {
    let msg = '¡Hola Fuego & Cifras! ';
    if (type === 'delivery') {
      msg += 'Quisiera hacer un pedido de parrilla para delivery.';
    } else if (type === 'reserva') {
      msg += 'Quisiera consultar disponibilidad de mesa para una reserva.';
    } else {
      msg += 'Tengo una consulta sobre su menú y horarios.';
    }
    return `https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Quick Action Popup when open */}
      {showTooltip && (
        <div className="w-72 bg-stone-900/95 backdrop-blur-md border border-stone-800 rounded-2xl shadow-2xl p-4 text-stone-100 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-xs font-semibold text-stone-300">Asador en Línea</span>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-stone-400 hover:text-white p-1 rounded-md"
              aria-label="Cerrar ventana de WhatsApp"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-stone-300 space-y-1">
            <p className="font-medium text-stone-200">¡Hola! ¿Qué se te antoja hoy?</p>
            <p className="text-stone-400">
              Escríbenos directamente para pedidos rápidos con empaque térmico o reservas.
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <a
              href={getDirectChatUrl('delivery')}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-xs font-medium text-amber-300 hover:text-amber-200 border border-stone-700/50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                Pedir Delivery ahora
              </span>
              <Send className="w-3.5 h-3.5" />
            </a>

            <a
              href={getDirectChatUrl('reserva')}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-xs font-medium text-stone-300 hover:text-white border border-stone-700/50 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-stone-400" />
                Reservar mesa en el local
              </span>
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Main floating circular badge / button */}
      <div className="flex items-center gap-2">
        {!showTooltip && (
          <button
            onClick={() => setShowTooltip(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-900/90 text-stone-200 text-xs font-medium border border-stone-800 shadow-lg hover:border-emerald-500/40 hover:text-white transition-all cursor-pointer"
          >
            <span>💬 ¿Te provocó algo?</span>
          </button>
        )}

        <button
          onClick={() => {
            if (!showTooltip) {
              setShowTooltip(true);
            } else {
              window.open(getDirectChatUrl('delivery'), '_blank');
            }
          }}
          className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-bold shadow-xl shadow-emerald-950/40 hover:scale-105 active:scale-95 transition-all focus:outline-none"
          aria-label="Pedir por WhatsApp"
        >
          {/* Subtle ping pulse */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
          </span>

          <MessageCircle className="w-6 h-6 text-stone-950 fill-stone-950 group-hover:rotate-12 transition-transform" />
          <span className="text-sm tracking-wide font-black hidden md:inline">
            Pedir por WhatsApp
          </span>
        </button>
      </div>
    </div>
  );
};
