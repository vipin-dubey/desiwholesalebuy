'use client';

import React from 'react';
import { CartItem, Product, BuildingCluster } from '@/types';
import { X, Plus, Minus, Trash2, ShoppingBag, Scale, Sparkles, Building2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  building: BuildingCluster | null;
  onUpdateQuantity: (product: Product, quantity: number) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  building,
  onUpdateQuantity,
  onClearCart,
  onProceedToCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, i) => sum + i.product.clubPriceNOK * i.quantity, 0);
  const totalRetail = cart.reduce((sum, i) => sum + i.product.retailPriceNOK * i.quantity, 0);
  const totalSavings = totalRetail - totalAmount;
  const totalWeight = cart.reduce((sum, i) => sum + i.product.weightKg * i.quantity, 0);
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex w-full sm:w-auto sm:pl-10">
        <div className="w-full sm:w-screen sm:max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-base text-slate-900">Your Bulk Club Cart</h2>
                <p className="text-xs text-slate-500">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} added
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {cart.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Clear Cart"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Building destination banner */}
          {building && (
            <div className="px-5 py-2.5 bg-amber-50 border-b border-amber-200 flex items-center justify-between text-xs text-amber-900">
              <div className="flex items-center gap-1.5 truncate">
                <Building2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="truncate">
                  Delivered to: <strong>{building.name}</strong>
                </span>
              </div>
              <span className="font-bold text-emerald-700 whitespace-nowrap">0 kr shipping</span>
            </div>
          )}

          {/* Cart Weight Gauge */}
          <div className="px-5 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-950">
                  Total Shipment Weight: {totalWeight.toFixed(1)} kg
                </div>
                <div className="text-[11px] text-emerald-700">
                  Save your back – we van-drop heavy sacks right to your building.
                </div>
              </div>
            </div>
          </div>

          {/* Items List */}
          <div className="p-4 sm:p-5 overflow-y-auto flex-1 divide-y divide-slate-100">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-3xl">
                  🛒
                </div>
                <h3 className="font-bold text-slate-800 text-base">Your Cart is Empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Add heavy staples like Atta, Basmati, Ghee, cooking oils, and snacks to unlock wholesale savings with your neighbours.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-colors cursor-pointer"
                >
                  Explore Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const lineTotal = item.product.clubPriceNOK * item.quantity;
                const lineWeight = item.product.weightKg * item.quantity;

                return (
                  <div key={item.product.id} className="py-3 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shrink-0">
                      {item.product.emoji}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                        <span>{item.product.unit}</span>
                        <span>•</span>
                        <span className="font-semibold text-slate-700">{lineWeight.toFixed(1)} kg</span>
                      </div>
                      <div className="text-xs font-black text-amber-700 mt-0.5">
                        {lineTotal} kr{' '}
                        <span className="text-[10px] text-slate-400 font-normal line-through ml-1">
                          {item.product.retailPriceNOK * item.quantity} kr
                        </span>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden shrink-0 shadow-2xs">
                      <button
                        onClick={() => onUpdateQuantity(item.product, item.quantity - 1)}
                        className="w-7 h-7 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product, item.quantity + 1)}
                        className="w-7 h-7 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout button */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 pb-8 sm:pb-5 border-t border-slate-200 bg-slate-50/80 space-y-3">
              {/* Savings highlight pill */}
              <div className="p-3 bg-emerald-100/80 border border-emerald-300 rounded-xl flex items-center justify-between text-xs font-bold text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  Your Bulk Club Savings:
                </span>
                <span className="text-sm font-black text-emerald-700">-{totalSavings} kr</span>
              </div>

              {/* Price rows */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Oslo Retail Store Price:</span>
                  <span className="line-through text-slate-400">{totalRetail} kr</span>
                </div>
                <div className="flex justify-between">
                  <span>Community Van Drop (to entrance):</span>
                  <span className="font-bold text-emerald-700">FREE</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-1 border-t border-slate-200">
                  <span>Total to Pay (Vipps):</span>
                  <span className="text-xl text-amber-700">{totalAmount} kr</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Checkout ({totalAmount} kr)</span>
                <span>→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
