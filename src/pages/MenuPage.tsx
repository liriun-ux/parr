import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Flame, Plus, MessageCircle, Check, Filter } from 'lucide-react';
import { ALL_MENU_ITEMS } from '../data/restaurantData';
import { CategoryId, MenuItem } from '../types';
import { useCart } from '../context/CartContext';

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'parrilladas', label: 'Parrilladas' },
  { id: 'ahumados', label: 'Ahumados' },
  { id: 'cortes', label: 'Cortes Individuales' },
  { id: 'guarniciones', label: 'Guarniciones' },
  { id: 'bebidas', label: 'Bebidas' },
];

export const MenuPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('categoria') as CategoryId) || 'todos';

  const [activeCategory, setActiveCategory] = useState<CategoryId>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('todos');
  const [addedItemNotification, setAddedItemNotification] = useState<string | null>(null);

  const { addToCart, generateWhatsAppItemUrl } = useCart();

  useEffect(() => {
    const cat = searchParams.get('categoria') as CategoryId;
    if (cat && CATEGORIES.some((c) => c.id === cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (catId: CategoryId) => {
    setActiveCategory(catId);
    if (catId === 'todos') {
      searchParams.delete('categoria');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ categoria: catId });
    }
  };

  // Collect all unique tags for filter pills
  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>();
    ALL_MENU_ITEMS.forEach((item) => {
      item.tags.forEach((t) => tagsSet.add(t));
    });
    return Array.from(tagsSet);
  }, []);

  // Filtered menu
  const filteredItems = useMemo(() => {
    return ALL_MENU_ITEMS.filter((item) => {
      const matchCategory = activeCategory === 'todos' || item.category === activeCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchTag = selectedTag === 'todos' || item.tags.includes(selectedTag);
      return matchCategory && matchSearch && matchTag;
    });
  }, [activeCategory, searchQuery, selectedTag]);

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item, 1);
    setAddedItemNotification(item.name);
    setTimeout(() => {
      setAddedItemNotification(null);
    }, 2500);
  };

  const handleDirectWhatsApp = (item: MenuItem) => {
    const url = generateWhatsAppItemUrl(item, 1);
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
          Carta Oficial & Pedidos en Línea
        </span>
        <h1 className="font-display font-black text-3xl sm:text-5xl text-stone-100">
          Menú Digital Completo
        </h1>
        <p className="text-sm sm:text-base text-stone-400">
          Elige tus cortes y ahumados favoritos, añade guarniciones y ordénalos directo a tu casa con empaque térmico sellado.
        </p>
      </div>

      {/* Added notification toast */}
      {addedItemNotification && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 bg-emerald-600 text-stone-950 px-4 py-2.5 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <Check className="w-4 h-4 stroke-[3]" />
          <span>¡"{addedItemNotification}" añadido a tu pedido!</span>
        </div>
      )}

      {/* Controls Bar: Category Tabs & Search */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por corte, plato, guarnición o bebida..."
            className="w-full bg-stone-900 border border-stone-800 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
            >
              Borrar
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 gap-2 scrollbar-none no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-950/40 font-bold scale-[1.02]'
                  : 'bg-stone-900/90 text-stone-300 hover:text-white hover:bg-stone-850 border border-stone-800'
              }`}
            >
              {cat.id === 'ahumados' && <span className="mr-1">🔥</span>}
              {cat.id === 'parrilladas' && <span className="mr-1">🥩</span>}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tag Filters (Sub-filters) */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-1 text-xs">
          <span className="text-stone-500 flex items-center gap-1 font-medium">
            <Filter className="w-3 h-3" /> Filtrar por tag:
          </span>
          <button
            onClick={() => setSelectedTag('todos')}
            className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              selectedTag === 'todos'
                ? 'bg-stone-800 text-amber-400 border border-amber-500/40'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Todos los tags
          </button>
          {availableTags.slice(0, 6).map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? 'todos' : tag)}
              className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                  : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Products */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 bg-stone-900/30 rounded-3xl border border-stone-800/80 space-y-3">
          <Flame className="w-10 h-10 text-stone-600 mx-auto" />
          <h3 className="font-display font-bold text-lg text-stone-300">
            No encontramos platos que coincidan con tu búsqueda
          </h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Prueba cambiando los filtros de categoría o buscando un término diferente como "brisket", "costillas" o "chorizo".
          </p>
          <button
            onClick={() => {
              setActiveCategory('todos');
              setSearchQuery('');
              setSelectedTag('todos');
            }}
            className="mt-2 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden flex flex-col justify-between hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-950/20 transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative h-56 sm:h-60 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/20" />

                {/* Badge */}
                {item.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-stone-950/90 border border-amber-500/40 text-amber-300 text-xs font-bold backdrop-blur-sm shadow-md">
                    {item.badge}
                  </span>
                )}

                {item.serves && (
                  <span className="absolute bottom-3 right-3 text-[11px] font-medium bg-black/75 px-2.5 py-1 rounded-md text-stone-300 backdrop-blur-sm">
                    👥 {item.serves}
                  </span>
                )}
              </div>

              {/* Product Info */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-2.5">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-stone-800 text-stone-300 text-[10px] font-medium border border-stone-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Name */}
                  <h3 className="font-display font-bold text-lg sm:text-xl text-stone-100 group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Price and actions */}
                <div className="mt-6 pt-4 border-t border-stone-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                      Precio
                    </span>
                    <span className="font-display font-black text-2xl text-amber-400">
                      Bs. {item.price}
                    </span>
                  </div>

                  {/* Reusable Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md active:scale-95"
                      title="Agregar al pedido del carrito"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>+ Agregar</span>
                    </button>

                    <button
                      onClick={() => handleDirectWhatsApp(item)}
                      className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-emerald-600 hover:text-stone-950 text-stone-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-stone-700/80 active:scale-95"
                      title="Pedir este plato directamente a WhatsApp"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bottom delivery guarantee strip */}
      <div className="p-6 rounded-2xl bg-stone-900/60 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
        <div className="flex items-center gap-3">
          <span className="text-2xl">📦</span>
          <div>
            <h4 className="font-bold text-stone-200">¿Tienes requerimientos especiales?</h4>
            <p className="text-stone-400">
              Podemos preparar cortes a término especial, sin sal o porciones adicionales de salsas ahumadas.
            </p>
          </div>
        </div>
        <a
          href={`https://wa.me/59178945612?text=${encodeURIComponent('Hola Fuego & Cifras! Deseo hacer una consulta especial sobre el menú.')}`}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold"
        >
          Consultar al Asador
        </a>
      </div>
    </div>
  );
};
