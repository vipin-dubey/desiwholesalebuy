'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import BuildingProgress from '@/components/BuildingProgress';
import CategoryNav, { QuickFilterType, SortOptionType } from '@/components/CategoryNav';
import ProductCard from '@/components/ProductCard';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import OrderSuccessModal from '@/components/OrderSuccessModal';
import BuildingModal from '@/components/BuildingModal';

import { Product, ProductCategory, CartItem, BuildingCluster, Order } from '@/types';
import { INITIAL_PRODUCTS } from '@/lib/data';
import {
  getStoredCart,
  saveStoredCart,
  getStoredSelectedBuilding,
  setStoredSelectedBuilding,
} from '@/lib/storage';

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [building, setBuilding] = useState<BuildingCluster | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState<QuickFilterType>('all');
  const [sortBy, setSortBy] = useState<SortOptionType>('recommended');

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const catalogRef = useRef<HTMLDivElement>(null);

  // Sync state with storage on mount and updates
  useEffect(() => {
    setCart(getStoredCart());
    setBuilding(getStoredSelectedBuilding());

    const handleStorageChange = () => {
      setCart(getStoredCart());
      setBuilding(getStoredSelectedBuilding());
    };

    window.addEventListener('desi-storage-update', handleStorageChange);
    return () => window.removeEventListener('desi-storage-update', handleStorageChange);
  }, []);

  // Filter & sort products by category, search, quick filter, and sort order
  const filteredProducts = useMemo(() => {
    const list = INITIAL_PRODUCTS.filter((product) => {
      // 1. Category match
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;

      // 2. Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        (product.hindiName && product.hindiName.toLowerCase().includes(q)) ||
        product.description.toLowerCase().includes(q);

      // 3. Quick Filter match
      let matchesQuickFilter = true;
      if (activeQuickFilter === 'savings') {
        matchesQuickFilter = product.savingsPercent >= 25;
      } else if (activeQuickFilter === 'bulk') {
        matchesQuickFilter = product.weightKg >= 5;
      } else if (activeQuickFilter === 'glass') {
        matchesQuickFilter = Boolean(product.isGlassJar);
      } else if (activeQuickFilter === 'bestsellers') {
        matchesQuickFilter = Boolean(product.isPopular || product.badge === 'Bestseller');
      } else if (activeQuickFilter === 'budget') {
        matchesQuickFilter = product.clubPriceNOK < 50;
      }

      return matchesCategory && matchesSearch && matchesQuickFilter;
    });

    // Sort order
    list.sort((a, b) => {
      if (sortBy === 'price-asc') return a.clubPriceNOK - b.clubPriceNOK;
      if (sortBy === 'price-desc') return b.clubPriceNOK - a.clubPriceNOK;
      if (sortBy === 'savings-desc') return b.savingsPercent - a.savingsPercent;
      if (sortBy === 'weight-desc') return b.weightKg - a.weightKg;
      // Recommended: popular first
      if (a.isPopular && !b.isPopular) return -1;
      if (!a.isPopular && b.isPopular) return 1;
      return 0;
    });

    return list;
  }, [selectedCategory, searchQuery, activeQuickFilter, sortBy]);

  // Category product counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: INITIAL_PRODUCTS.length };
    for (const p of INITIAL_PRODUCTS) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Cart quantity updater
  const handleUpdateQuantity = (product: Product, newQuantity: number) => {
    let updated: CartItem[];
    if (newQuantity <= 0) {
      updated = cart.filter((i) => i.product.id !== product.id);
    } else {
      const exists = cart.find((i) => i.product.id === product.id);
      if (exists) {
        updated = cart.map((i) =>
          i.product.id === product.id ? { ...i, quantity: newQuantity } : i
        );
      } else {
        updated = [...cart, { product, quantity: newQuantity }];
      }
    }
    setCart(updated);
    saveStoredCart(updated);
  };

  const handleClearCart = () => {
    setCart([]);
    saveStoredCart([]);
  };

  const handleOrderSuccess = (order: Order) => {
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setConfirmedOrder(order);
  };

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getQuantityInCart = (productId: string) => {
    const found = cart.find((i) => i.product.id === productId);
    return found ? found.quantity : 0;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4] text-slate-900">
      {/* Navbar */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Hero Banner with Savings Calculator */}
      <HeroBanner onScrollToCatalog={scrollToCatalog} />

      {/* Building Cluster Milestone & Share Widget */}
      {building && (
        <BuildingProgress
          building={building}
          onChangeBuilding={() => setIsBuildingModalOpen(true)}
        />
      )}

      {/* Main Catalog Section */}
      <main ref={catalogRef} className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 pb-24 lg:pb-12">
        {/* Section Header (Oda Category Banner style) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-5 gap-2 sm:gap-3">
          <div>
            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-600 mb-0.5">
              Direct Norwegian Importer Wholesale
            </div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-slate-950">
              {selectedCategory === 'all' && 'Community Wholesale Catalog'}
              {selectedCategory === 'flours' && 'Atta & Specialty Flours'}
              {selectedCategory === 'rice' && 'Basmati & Fragrant Rice'}
              {selectedCategory === 'lentils' && 'Dals, Pulses & Beans'}
              {selectedCategory === 'oils_ghee' && 'Cooking Oils & Pure Ghee'}
              {selectedCategory === 'spices' && 'Spices & Authentic Masalas'}
              {selectedCategory === 'breakfast_mixes' && 'Dosa, Idli & Instant Mixes'}
              {selectedCategory === 'snacks' && 'Snacks, Namkeen & Biscuits'}
              {selectedCategory === 'pickles' && 'Traditional Pickles in Glass Jars'}
              {selectedCategory === 'root_vegetables' && 'Onions & Potatoes Wholesale Sacks'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Bulk wholesale pricing with transparent unit rates (kr/kg &amp; kr/l) compared to Oslo store retail.
            </p>
          </div>

          <div className="text-[11px] sm:text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl border border-slate-200/80 shadow-2xs self-start sm:self-auto flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>
              Showing <strong>{filteredProducts.length}</strong> of {INITIAL_PRODUCTS.length} staples
            </span>
          </div>
        </div>

        {/* Category & Search Navigation (Oda Inspired) */}
        <CategoryNav
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryCounts={categoryCounts}
          activeQuickFilter={activeQuickFilter}
          onQuickFilterChange={setActiveQuickFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalFilteredCount={filteredProducts.length}
          totalCount={INITIAL_PRODUCTS.length}
        />

        {/* Product Cards Grid: 2 columns on mobile, 3-4 on desktop */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 sm:py-20 text-center bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-3">
            <div className="text-4xl">🔍</div>
            <h3 className="font-bold text-slate-800 text-base sm:text-lg">No products matched your search</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try a different search keyword or select another product category above.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantityInCart={getQuantityInCart(product.id)}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>
        )}
      </main>

      {/* Footer (with extra bottom padding on mobile for sticky bottom navigation) */}
      <footer className="bg-slate-900 text-slate-300 py-10 sm:py-12 pb-24 lg:pb-12 border-t border-slate-800 mt-8 sm:mt-16 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌶️</span>
              <span className="font-black text-lg text-white">Desi Bulk Club Norway</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              A community group-buying initiative for Indian &amp; Pakistani dry groceries at wholesale prices. We pool orders across apartment complexes, source wholesale sacks directly from licensed Norwegian importers in Oslo, and deliver as a single scheduled drop.
            </p>
            <div className="text-slate-500 text-[11px]">
              Sourced from licensed Norwegian wholesalers: Abiramy Cash &amp; Carry, Scanasia AS, Deva Gruppen AS, Asia Engros.
            </div>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-xs">Quick Links</div>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <a href="#catalog" className="hover:text-amber-400 transition-colors">
                  Catalog &amp; Wholesale Prices
                </a>
              </li>
              <li>
                <a href="/suppliers" className="hover:text-amber-400 transition-colors">
                  Norwegian Wholesalers &amp; Contacts
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-amber-400 transition-colors">
                  Organizer / Master Picklist
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsBuildingModalOpen(true)}
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Switch or Add Building Complex
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-white uppercase tracking-wider text-xs">Community Drop Schedule</div>
            <p className="text-slate-400 leading-relaxed">
              Saturdays between 09:30 AM and 4:30 PM. Order cut-off Thursday 23:59 for this weekend&apos;s drop.
            </p>
            <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 text-slate-300">
              <strong>Vipps Payment:</strong> Safe prepayment. Free delivery when minimum building threshold is met.
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-slate-800 text-center text-slate-500 text-[11px]">
          Desi Bulk Club © {new Date().getFullYear()} • Community Wholesale Buying for Indian &amp; Pakistani Groceries in Norway
        </div>
      </footer>

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        building={building}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      {building && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          cart={cart}
          building={building}
          onOrderSuccess={handleOrderSuccess}
        />
      )}

      {/* Order Confirmation Modal */}
      {confirmedOrder && (
        <OrderSuccessModal
          order={confirmedOrder}
          onClose={() => setConfirmedOrder(null)}
        />
      )}

      {/* Building Switcher Modal */}
      <BuildingModal
        isOpen={isBuildingModalOpen}
        onClose={() => setIsBuildingModalOpen(false)}
        selectedBuilding={building}
        onSelect={(b) => {
          setBuilding(b);
          setStoredSelectedBuilding(b.id);
          setIsBuildingModalOpen(false);
        }}
      />
    </div>
  );
}
