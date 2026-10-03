/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CartDrawer } from './components/CartDrawer';
import { ScrollToTop } from './components/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { PromocionesPage } from './pages/PromocionesPage';
import { ContactoPage } from './pages/ContactoPage';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-stone-950 text-stone-100 selection:bg-amber-500 selection:text-stone-950">
          {/* Global Sticky Header */}
          <Header />

          {/* Interactive Cart Slide-over Drawer */}
          <CartDrawer />

          {/* Persistent Floating WhatsApp Button */}
          <FloatingWhatsApp />

          {/* Main Content Router */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/promociones" element={<PromocionesPage />} />
              <Route path="/contacto" element={<ContactoPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
