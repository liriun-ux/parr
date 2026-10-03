import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Flame, ShoppingBag, Menu as MenuIcon, X, MapPin, Clock, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();

  const navLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Menú Digital', path: '/menu' },
    { label: 'Promociones & Combos', path: '/promociones' },
    { label: 'Ubicación & Reservas', path: '/contacto' },
  ];

  return (
    <>
      {/* Top micro banner */}
      <div className="bg-stone-900 border-b border-stone-800 text-xs text-stone-300 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Abierto Hoy hasta las 23:30
            </span>
            <span className="flex items-center gap-1.5 text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-stone-500" />
              Av. Las Américas #1420, La Paz
            </span>
            <span className="flex items-center gap-1.5 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-stone-500" />
              Cocción a la leña de 12 horas
            </span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <a
              href={`tel:${RESTAURANT_INFO.whatsappRaw}`}
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              {RESTAURANT_INFO.whatsappDisplay}
            </a>
            <span className="text-stone-700">|</span>
            <span className="text-amber-300/90 font-medium">🛵 Delivery Térmico Garantizado</span>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 p-0.5 shadow-lg shadow-orange-950/40 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-stone-950 rounded-[10px] flex items-center justify-center">
                  <Flame className="w-6 h-6 text-amber-500 group-hover:text-orange-400 transition-colors" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl tracking-wider text-stone-100 group-hover:text-amber-400 transition-colors">
                  FUEGO & CIFRAS
                </span>
                <span className="text-[10px] tracking-[0.25em] font-semibold text-amber-500 uppercase -mt-1">
                  Parrilla & Ahumados
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-stone-900/60 p-1.5 rounded-full border border-stone-800/80">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-amber-500 text-stone-950 shadow-md font-semibold'
                        : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Actions: Cart & Delivery CTA */}
            <div className="flex items-center gap-3">
              {/* Order Cart Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 hover:text-amber-400 hover:border-amber-500/50 hover:bg-stone-850 transition-all flex items-center gap-2 group"
                aria-label="Abrir canasta de pedidos"
              >
                <ShoppingBag className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-stone-300">
                  Mi Pedido
                </span>
                {totalItems > 0 && (
                  <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-stone-950 bg-amber-400 rounded-full animate-bounce">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Delivery CTA */}
              <Link
                to="/menu"
                className="hidden sm:inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-stone-950 font-bold text-sm shadow-lg shadow-orange-950/30 hover:from-amber-400 hover:to-orange-500 active:scale-[0.98] transition-all"
              >
                <span>🛵</span>
                <span>Pedir Delivery</span>
              </Link>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white lg:hidden"
                aria-label="Abrir menú de navegación"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-stone-800 bg-stone-950 px-4 pt-3 pb-6 space-y-3">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 font-semibold'
                        : 'text-stone-300 hover:bg-stone-900 hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-800 flex flex-col gap-2">
              <Link
                to="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-stone-950 font-bold text-center"
              >
                <span>🛵</span>
                <span>Ver Menú & Pedir Delivery</span>
              </Link>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent('¡Hola Fuego & Cifras! Deseo hacer una consulta o pedido.')}`}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 font-medium text-center hover:bg-stone-850"
              >
                <span>💬</span>
                <span>Chat Directo WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
