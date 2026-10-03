import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageCircle, UtensilsCrossed } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalPrice,
    clearCart,
    generateWhatsAppCartUrl,
  } = useCart();

  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Transferencia QR Simple');
  const [generalNotes, setGeneralNotes] = useState('');
  const [validationError, setValidationError] = useState('');

  if (!isCartOpen) return null;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderType === 'delivery' && !address.trim()) {
      setValidationError('Por favor ingresa la dirección de entrega para el delivery.');
      return;
    }
    setValidationError('');

    const url = generateWhatsAppCartUrl({
      customerName,
      phone,
      orderType,
      address,
      paymentMethod,
      generalNotes,
    });

    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex ">
        <div className="w-screen max-w-md bg-stone-900 border-l border-stone-800 shadow-2xl flex flex-col text-stone-100">
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-800 flex items-center justify-between bg-stone-950">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-stone-100">
                  Tu Pedido Parrillero
                </h3>
                <p className="text-xs text-stone-400">
                  {items.length === 0 ? 'Sin productos aún' : `${items.length} ítem(s) en tu orden`}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-stone-800/80 border border-stone-700/60 flex items-center justify-center text-stone-400">
                  <UtensilsCrossed className="w-8 h-8 text-stone-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-stone-200 text-base">Tu pedido está vacío</h4>
                  <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto">
                    Explora nuestros cortes a la brasa, tablas familiares o ahumados de 12 horas y agrégalos a tu orden.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs transition-colors"
                >
                  <span>Ver Menú Digital</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                {/* Item List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-400 border-b border-stone-800/80 pb-2">
                    <span>Platos seleccionados</span>
                    <button
                      onClick={clearCart}
                      className="text-stone-400 hover:text-red-400 transition-colors"
                    >
                      Vaciar todo
                    </button>
                  </div>

                  {items.map((cartItem) => (
                    <div
                      key={cartItem.item.id + (cartItem.doneness || '')}
                      className="p-3 rounded-xl bg-stone-800/50 border border-stone-800 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <img
                          src={cartItem.item.image}
                          alt={cartItem.item.name}
                          className="w-14 h-14 rounded-lg object-cover shrink-0 border border-stone-700/60"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-stone-100 truncate">
                            {cartItem.item.name}
                          </h4>
                          <span className="text-xs font-bold text-amber-400">
                            Bs. {cartItem.item.price * cartItem.quantity}
                          </span>
                          {cartItem.doneness && (
                            <span className="block text-[11px] text-stone-400">
                              🥩 Término: {cartItem.doneness}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => removeFromCart(cartItem.item.id)}
                          className="text-stone-500 hover:text-red-400 p-1 rounded-md"
                          title="Eliminar plato"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quantity row */}
                      <div className="flex items-center justify-between pt-1 border-t border-stone-700/40 text-xs">
                        <span className="text-stone-400">Bs. {cartItem.item.price} c/u</span>
                        <div className="flex items-center gap-2 bg-stone-900 px-2 py-1 rounded-lg border border-stone-700">
                          <button
                            onClick={() => updateQuantity(cartItem.item.id, -1)}
                            className="text-stone-400 hover:text-white p-0.5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-stone-200 px-1">{cartItem.quantity}</span>
                          <button
                            onClick={() => updateQuantity(cartItem.item.id, 1)}
                            className="text-stone-400 hover:text-white p-0.5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Form */}
                <form id="orderForm" onSubmit={handleCheckout} className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                      Tipo de Entrega
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setOrderType('delivery')}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                          orderType === 'delivery'
                            ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                            : 'bg-stone-800/40 border-stone-700 text-stone-400 hover:text-white'
                        }`}
                      >
                        <span>🛵</span>
                        <span>Delivery Térmico</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('pickup')}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all ${
                          orderType === 'pickup'
                            ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                            : 'bg-stone-800/40 border-stone-700 text-stone-400 hover:text-white'
                        }`}
                      >
                        <span>🏪</span>
                        <span>Retiro en Local</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1">
                        Tu Nombre
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Ej. Juan Pérez"
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {orderType === 'delivery' && (
                      <div>
                        <label className="block text-xs font-medium text-stone-300 mb-1">
                          Dirección de Entrega <span className="text-amber-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Calle, número, zona o referencia..."
                          className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-stone-300 mb-1">
                          Teléfono / Celular
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Ej. 71234567"
                          className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-stone-300 mb-1">
                          Método de Pago
                        </label>
                        <select
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-full bg-stone-950 border border-stone-700 rounded-xl px-2 py-2 text-xs text-stone-100 focus:outline-none focus:border-amber-500"
                        >
                          <option value="Transferencia QR Simple">QR Simple (Banca)</option>
                          <option value="Efectivo contra entrega">Efectivo al recibir</option>
                          <option value="Tarjeta de débito/crédito">POS Móvil / Tarjeta</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-stone-300 mb-1">
                        Notas para el Asador (Opcional)
                      </label>
                      <input
                        type="text"
                        value={generalNotes}
                        onChange={(e) => setGeneralNotes(e.target.value)}
                        placeholder="Ej. Sin cebolla, chimichurri extra..."
                        className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  {validationError && (
                    <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs">
                      {validationError}
                    </div>
                  )}
                </form>
              </>
            )}
          </div>

          {/* Footer of Drawer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-800 bg-stone-950 space-y-4">
              <div className="space-y-1.5 text-xs text-stone-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Bs. {totalPrice}</span>
                </div>
                <div className="flex justify-between text-stone-300">
                  <span>Empaque térmico sellado</span>
                  <span className="text-emerald-400 font-semibold">Gratis</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-stone-800 text-stone-100 font-bold text-base">
                  <span>Total Estimado</span>
                  <span className="font-display text-xl text-amber-400">Bs. {totalPrice}</span>
                </div>
              </div>

              <button
                type="submit"
                form="orderForm"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-stone-950 font-black text-sm tracking-wide shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 fill-stone-950" />
                <span>Enviar Pedido a WhatsApp</span>
              </button>

              <p className="text-[11px] text-center text-stone-500">
                Al enviar, se abrirá WhatsApp con el resumen listo para confirmación inmediata con el restaurante.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
