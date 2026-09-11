'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ShoppingBag,
  Building2,
  ChevronDown,
  Store,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Package,
} from 'lucide-react';
import { BuildingCluster, CartItem } from '@/types';
import { getStoredSelectedBuilding, getStoredCart } from '@/lib/storage';
import BuildingModal from './BuildingModal';

interface NavbarProps {
  onOpenCart?: () => void;
}

export default function Navbar({ onOpenCart }: NavbarProps) {
  const pathname = usePathname();
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingCluster | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const refreshState = () => {
    setSelectedBuilding(getStoredSelectedBuilding());
    setCart(getStoredCart());
  };

  useEffect(() => {
    refreshState();
    const handleStorage = () => refreshState();
    window.addEventListener('desi-storage-update', handleStorage);
    return () => window.removeEventListener('desi-storage-update', handleStorage);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalWeight = cart.reduce((sum, i) => sum + i.product.weightKg * i.quantity, 0);
  const totalAmount = cart.reduce((sum, i) => sum + i.product.clubPriceNOK * i.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav transition-all">
        {/* Top notice banner */}
        <div className="bg-emerald-950 text-emerald-100 text-[11px] sm:text-xs py-1.5 px-3 text-center font-medium flex items-center justify-center gap-1.5 leading-tight">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
          <span className="truncate sm:overflow-visible">
            Next Bulk Drop: <strong className="text-white">Sat, Sep 13</strong>. Cutoff: Thu 11:59 PM.
          </span>
          <span className="hidden md:inline text-emerald-300/80">
            | Wholesale prices direct from local Norwegian distributors.
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 shrink-0 group">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-sm sm:shadow-md group-hover:scale-105 transition-transform">
              <span className="text-base sm:text-xl">🌶️</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-black text-base sm:text-xl tracking-tight text-slate-900">
                  Desi<span className="text-amber-600">BulkClub</span>
                </span>
                <span className="text-[9px] sm:text-[10px] bg-amber-100 text-amber-800 font-bold px-1 py-0.2 rounded border border-amber-300">
                  NO
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium leading-none hidden lg:block">
                Community group-buying for Indian &amp; Pakistani groceries
              </p>
            </div>
          </Link>

          {/* Building Drop Selector Pill */}
          <button
            onClick={() => setIsBuildingModalOpen(true)}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 rounded-full bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 shadow-2xs transition-all text-left max-w-[135px] sm:max-w-xs shrink cursor-pointer"
            title="Click to switch apartment building / complex"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
            <div className="truncate min-w-0">
              <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider leading-none hidden sm:block">
                Building:
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-slate-800 truncate">
                {selectedBuilding ? selectedBuilding.name.replace(' Borettslag', '').replace(' Sameie', '') : 'Select Hub'}
              </div>
            </div>
            <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
          </button>

          {/* Desktop Navigation Links & Cart */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === '/'
                    ? 'text-amber-600 bg-amber-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Pantry &amp; Groceries
              </Link>
              <Link
                href="/suppliers"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  pathname === '/suppliers'
                    ? 'text-amber-600 bg-amber-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Store className="w-4 h-4 text-emerald-600" />
                <span>Wholesale Partners</span>
              </Link>
              <Link
                href="/admin"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  pathname.startsWith('/admin')
                    ? 'text-amber-600 bg-amber-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Coordinator Hub</span>
              </Link>
            </nav>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-sm hover:shadow-md transition-all cursor-pointer shrink-0"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <div className="text-left leading-tight hidden sm:block">
                <div className="text-xs font-bold">{totalAmount} kr</div>
                <div className="text-[10px] text-amber-100 font-medium">
                  {totalItems > 0 ? `${totalWeight.toFixed(1)} kg` : '0 kg'}
                </div>
              </div>
              {totalItems > 0 && (
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white text-amber-700 text-[10px] sm:text-xs font-black flex items-center justify-center shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-4 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
            {/* Building summary chip */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-[10px] font-bold uppercase text-amber-700">Delivery Location</div>
                <div className="text-xs font-extrabold text-slate-900">
                  {selectedBuilding ? selectedBuilding.name : 'No Building Selected'}
                </div>
                {selectedBuilding && (
                  <div className="text-[11px] text-slate-500">
                    Next drop: {selectedBuilding.nextDeliveryDate} ({selectedBuilding.pickupWindow})
                  </div>
                )}
              </div>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsBuildingModalOpen(true);
                }}
                className="px-2.5 py-1.5 bg-white text-amber-800 border border-amber-300 rounded-lg text-xs font-bold shadow-2xs cursor-pointer"
              >
                Change
              </button>
            </div>

            {/* Nav links */}
            <nav className="space-y-1 text-sm font-bold text-slate-800">
              <Link
                href="/"
                className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                  pathname === '/' ? 'bg-amber-100/70 text-amber-900' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🛒</span>
                  <span>Browse 47 Staples &amp; Wholesale Prices</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/suppliers"
                className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                  pathname === '/suppliers' ? 'bg-amber-100/70 text-amber-900' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Store className="w-5 h-5 text-emerald-600" />
                  <span>Norwegian Wholesalers &amp; Contacts</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>

              <Link
                href="/admin"
                className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                  pathname.startsWith('/admin') ? 'bg-amber-100/70 text-amber-900' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-600" />
                  <span>Coordinator Hub &amp; Picklist</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Floating Sticky Mobile Cart Pill (Visible only on mobile when items in cart) */}
      {totalItems > 0 && (
        <div className="lg:hidden fixed bottom-18 left-3 right-3 z-30 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={onOpenCart}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white font-bold shadow-xl flex items-center justify-between cursor-pointer border border-amber-400/30"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-bold text-sm">
                {totalItems}
              </div>
              <div className="text-left leading-tight">
                <div className="text-xs font-black">{totalAmount} kr Total</div>
                <div className="text-[10px] text-amber-100 font-medium">
                  {totalWeight.toFixed(1)} kg bulk weight
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-black bg-white/20 px-3 py-1.5 rounded-xl">
              <span>View Cart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (Thumb friendly for mobile phones) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-2xl safe-area-inset-bottom">
        <Link
          href="/"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-bold transition-colors ${
            pathname === '/' ? 'text-amber-600' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <span className="text-base">🛒</span>
          <span>Catalog</span>
        </Link>

        <Link
          href="/suppliers"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-bold transition-colors ${
            pathname === '/suppliers' ? 'text-amber-600' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Store className="w-4 h-4 text-emerald-600" />
          <span>Suppliers</span>
        </Link>

        <Link
          href="/admin"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-bold transition-colors ${
            pathname.startsWith('/admin') ? 'text-amber-600' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-amber-600" />
          <span>Hub</span>
        </Link>

        <button
          onClick={onOpenCart}
          className="relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-[10px] font-bold text-slate-700 hover:text-amber-600 cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-amber-600 text-white text-[9px] font-black flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>
      </nav>

      {/* Building Switcher Modal */}
      <BuildingModal
        isOpen={isBuildingModalOpen}
        onClose={() => setIsBuildingModalOpen(false)}
        selectedBuilding={selectedBuilding}
        onSelect={(building) => {
          setSelectedBuilding(building);
          setIsBuildingModalOpen(false);
        }}
      />
    </>
  );
}
