export type CategoryId = 'todos' | 'parrilladas' | 'ahumados' | 'cortes' | 'guarniciones' | 'bebidas';

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  price: number;
  image: string;
  tags: string[];
  featured?: boolean;
  badge?: string;
  prepTime?: string;
  serves?: string;
}

export interface PromoItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  regularPrice?: number;
  promoPrice: number;
  condition: string;
  image: string;
  tags: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  notes?: string;
  doneness?: 'Jugoso' | 'A punto' | 'Tres cuartos' | 'Bien cocido';
}

export interface ReservationData {
  name: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  occasion: string;
  specialRequests?: string;
}
