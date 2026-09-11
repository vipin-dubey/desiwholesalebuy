'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Building2, ChevronDown, Store, ShieldCheck } from 'lucide-react';
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

  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalWeight = cart.reduce((sum, i) => sum + i.product.weightKg * i.quantity, 0);
  const totalAmount = cart.reduce((sum, i) => sum + i.product.clubPriceNOK * i.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav transition-all">
        {/* Top notice banner */}
        <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>
            Next Community Bulk Drop (Oslo / Bærum): <strong>Saturday, Sep 13</strong>. Order cutoff: Thursday 11:59 PM.
          </span>
          <span className="hidden md:inline text-emerald-300">| Wholesale prices direct from local Norwegian distributors.</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="text-xl">🌶️</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-tight text-slate-900">Desi<span className="text-amber-600">BulkClub</span></span>
                <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-1.5 py-0.5 rounded border border-amber-200">Norway</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium leading-none hidden sm:block">
                Community group-buying for Indian & Pakistani groceries
              </p>
            </div>
          </Link>

          {/* Building Drop Selector Pill */}
          <button
            onClick={() => setIsBuildingModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 shadow-sm transition-all text-left max-w-[200px] sm:max-w-xs cursor-pointer"
            title="Click to switch apartment building / complex"
          >
            <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <div className="truncate">
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider leading-none">
                Your Building:
              </div>
              <div className="text-xs font-bold text-slate-800 truncate">
                {selectedBuilding ? selectedBuilding.name : 'Select Building'}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {/* Navigation Links & Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === '/'
                    ? 'text-amber-600 bg-amber-50 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Pantry & Groceries
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
              className="relative flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <div className="text-left leading-tight hidden sm:block">
                <div className="text-xs font-bold">{totalAmount} kr</div>
                <div className="text-[10px] text-amber-100 font-medium">
                  {totalItems > 0 ? `${totalWeight.toFixed(1)} kg` : '0 kg'}
                </div>
              </div>
              {totalItems > 0 && (
                <span className="w-5 h-5 rounded-full bg-white text-amber-700 text-xs font-black flex items-center justify-center shadow-sm">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

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
