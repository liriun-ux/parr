import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, MenuItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, doneness?: CartItem['doneness'], notes?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openSingleItemOrder: (item: MenuItem) => void;
  generateWhatsAppItemUrl: (item: MenuItem, quantity?: number, notes?: string) => string;
  generateWhatsAppCartUrl: (deliveryInfo: {
    customerName: string;
    phone: string;
    orderType: 'delivery' | 'pickup';
    address: string;
    paymentMethod: string;
    generalNotes?: string;
  }) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('fc_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('fc_cart_items', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addToCart = (
    item: MenuItem,
    quantity = 1,
    doneness?: CartItem['doneness'],
    notes?: string
  ) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.item.id === item.id && ci.doneness === doneness && ci.notes === notes
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }
      return [...prev, { item, quantity, doneness, notes }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, ci) => sum + ci.quantity, 0);
  const totalPrice = items.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);

  const openSingleItemOrder = (item: MenuItem) => {
    addToCart(item, 1);
  };

  const generateWhatsAppItemUrl = (item: MenuItem, quantity = 1, notes?: string) => {
    const text = encodeURIComponent(
      `¡Hola *${RESTAURANT_INFO.name}*! 👋\n\n` +
      `Deseo hacer un pedido directo:\n` +
      `🔥 *${quantity}x ${item.name}* (Bs. ${item.price * quantity})\n` +
      (notes ? `📝 *Detalles:* ${notes}\n` : '') +
      `\n¿Me confirman disponibilidad y tiempo estimado para envío? ¡Muchas gracias!`
    );
    return `https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${text}`;
  };

  const generateWhatsAppCartUrl = (info: {
    customerName: string;
    phone: string;
    orderType: 'delivery' | 'pickup';
    address: string;
    paymentMethod: string;
    generalNotes?: string;
  }) => {
    let orderText = `🔥 *NUEVO PEDIDO - ${RESTAURANT_INFO.name.toUpperCase()}* 🔥\n`;
    orderText += `------------------------------------\n`;

    items.forEach((ci) => {
      orderText += `▪️ *${ci.quantity}x ${ci.item.name}* — Bs. ${ci.item.price * ci.quantity}\n`;
      if (ci.doneness) orderText += `   🥩 Término: ${ci.doneness}\n`;
      if (ci.notes) orderText += `   💬 Nota: ${ci.notes}\n`;
    });

    orderText += `------------------------------------\n`;
    orderText += `💰 *TOTAL A PAGAR:* Bs. ${totalPrice}\n\n`;
    orderText += `👤 *Cliente:* ${info.customerName || 'No indicado'}\n`;
    orderText += `📞 *Teléfono:* ${info.phone || 'El de este WhatsApp'}\n`;
    orderText += `🛵 *Modalidad:* ${info.orderType === 'delivery' ? 'Delivery Térmico a domicilio' : 'Retiro en local (Av. Las Américas 1420)'}\n`;
    if (info.orderType === 'delivery') {
      orderText += `📍 *Dirección de Entrega:* ${info.address || 'Pendiente'}\n`;
    }
    orderText += `💳 *Método de Pago:* ${info.paymentMethod}\n`;
    if (info.generalNotes) {
      orderText += `📝 *Observaciones:* ${info.generalNotes}\n`;
    }
    orderText += `\n¿Podrían confirmarme la recepción del pedido? ¡Muchas gracias!`;

    return `https://wa.me/${RESTAURANT_INFO.whatsappRaw}?text=${encodeURIComponent(orderText)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
        openSingleItemOrder,
        generateWhatsAppItemUrl,
        generateWhatsAppCartUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
