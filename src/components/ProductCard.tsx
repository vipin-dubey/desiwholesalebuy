'use client';

import React from 'react';
import { Product } from '@/types';
import { Plus, Minus, Scale, Wine } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onUpdateQuantity: (product: Product, newQty: number) => void;
}

export default function ProductCard({
  product,
  quantityInCart,
  onUpdateQuantity,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-amber-300 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden relative group">
      {/* Top badges */}
      <div className="p-4 pb-0 flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5 items-center">
          {product.badge && (
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
              {product.badge}
            </span>
          )}
          {product.isGlassJar && (
            <span
              className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1"
              title="Glass jar – safely packed in cushioned crates"
            >
              <Wine className="w-3 h-3" /> Glass Jar
            </span>
          )}
        </div>

        {/* Savings percentage pill */}
        <span className="text-xs font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs">
          -{product.savingsPercent}%
        </span>
      </div>

      {/* Main product visual & info */}
      <div className="p-4 pt-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Large Emoji & Weight */}
          <div className="flex items-center justify-between mb-2">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 group-hover:bg-amber-100/80 flex items-center justify-center text-3xl transition-colors shadow-2xs">
              {product.emoji}
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
              <Scale className="w-3.5 h-3.5 text-slate-400" />
              <span>{product.unit}</span>
            </div>
          </div>

          {/* Brand & Hindi Name */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-1">
            <span className="text-amber-700 font-bold uppercase tracking-wider">{product.brand}</span>
            {product.hindiName && (
              <span className="text-slate-500 font-normal">{product.hindiName}</span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-amber-700 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing block */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Club Price:
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900">{product.clubPriceNOK}</span>
                <span className="text-xs font-bold text-slate-600">kr</span>
                <span className="text-xs text-slate-400 line-through font-medium ml-1">
                  {product.retailPriceNOK} kr
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Save {product.savingsNOK} kr
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Add to Cart button or Quantity Controls */}
      <div className="p-4 pt-0">
        {quantityInCart === 0 ? (
          <button
            onClick={() => onUpdateQuantity(product, 1)}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Club Cart</span>
          </button>
        ) : (
          <div className="flex items-center justify-between bg-amber-50 border border-amber-300 rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => onUpdateQuantity(product, quantityInCart - 1)}
              className="w-8 h-8 rounded-lg bg-white hover:bg-amber-100 text-amber-900 flex items-center justify-center font-bold transition-colors cursor-pointer shadow-2xs"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <div className="text-center px-2">
              <span className="text-sm font-black text-amber-900">{quantityInCart}</span>
              <span className="text-[10px] text-amber-700 ml-1">in cart</span>
            </div>
            <button
              onClick={() => onUpdateQuantity(product, quantityInCart + 1)}
              className="w-8 h-8 rounded-lg bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center font-bold transition-colors cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
