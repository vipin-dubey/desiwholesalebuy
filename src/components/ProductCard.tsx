'use client';

import React from 'react';
import { Product } from '@/types';
import { Plus, Minus, Wine, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onUpdateQuantity: (product: Product, newQty: number) => void;
}

// Calculate transparent unit pricing (kr/kg or kr/l) typical of Norwegian grocery stores like Oda
function formatUnitPrice(product: Product): string {
  if (!product.weightKg || product.weightKg <= 0) return '';
  const pricePerUnit = product.clubPriceNOK / product.weightKg;
  const isLiquid =
    product.unit.toLowerCase().includes('l') ||
    product.unit.toLowerCase().includes('ml') ||
    product.category === 'oils_ghee';
  const unitLabel = isLiquid ? 'kr/l' : 'kr/kg';
  const formatted = pricePerUnit >= 100 ? Math.round(pricePerUnit) : pricePerUnit.toFixed(1);
  return `${String(formatted).replace('.', ',')} ${unitLabel}`;
}

export default function ProductCard({
  product,
  quantityInCart,
  onUpdateQuantity,
}: ProductCardProps) {
  const unitPrice = formatUnitPrice(product);
  const isSack = product.weightKg >= 5;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/85 hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden relative group">
      {/* 1. Oda-style Image / Media Box */}
      <div className="relative aspect-square m-2 sm:m-2.5 mb-0 rounded-xl bg-[#F7F8F9] group-hover:bg-[#F3F4F6] transition-colors flex items-center justify-center overflow-hidden">
        {/* Top-left Badges (Category tags & Glass container indicator) */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 items-start pointer-events-none">
          {product.badge && (
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 shadow-2xs">
              {product.badge}
            </span>
          )}
          {product.isGlassJar && (
            <span
              className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1 shadow-2xs"
              title="Cushioned glass jar packaging"
            >
              <Wine className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-700" />
              <span>Glass</span>
            </span>
          )}
          {isSack && !product.badge && (
            <span className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-200 text-slate-700 shadow-2xs">
              Bulk Sack
            </span>
          )}
        </div>

        {/* Top-right Savings Pill (Oda signature high-contrast discount tag) */}
        <div className="absolute top-2 right-2 z-10 pointer-events-none">
          <span className="text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs flex items-center gap-0.5">
            -{product.savingsPercent}%
          </span>
        </div>

        {/* Product Visual Centerpiece */}
        <div className="flex flex-col items-center justify-center p-4 select-none group-hover:scale-105 transition-transform duration-200">
          <span className="text-4xl sm:text-5xl filter drop-shadow-xs">{product.emoji}</span>
        </div>

        {/* In-cart subtle badge on image if already selected */}
        {quantityInCart > 0 && (
          <div className="absolute bottom-2 left-2 z-10 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Check className="w-2.5 h-2.5 text-amber-400" />
            <span>{quantityInCart} in basket</span>
          </div>
        )}
      </div>

      {/* 2. Product Information Area */}
      <div className="p-3 sm:p-3.5 pt-2 sm:pt-2.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Unit Subtitle Line */}
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold mb-1 gap-1">
            <span className="text-amber-800 uppercase tracking-wider truncate max-w-[110px] sm:max-w-none">
              {product.brand}
            </span>
            <span className="text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-semibold whitespace-nowrap shrink-0">
              {product.unit}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug line-clamp-2 min-h-[2rem] sm:min-h-[2.4rem] group-hover:text-amber-800 transition-colors">
            {product.name}
          </h3>

          {/* Hindi Cultural Name */}
          {product.hindiName && (
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium italic mt-0.5 truncate">
              {product.hindiName}
            </div>
          )}

          {/* Short description for larger screens */}
          <p className="hidden md:line-clamp-2 text-xs text-slate-500 mt-1 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* 3. Pricing & Oda-Style Action Button Row */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-end justify-between gap-2">
          {/* Left Price Column */}
          <div className="min-w-0">
            {/* Main Club Price (Oda bold integer format) */}
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-2xl font-black text-slate-950 tracking-tight leading-none">
                {product.clubPriceNOK},-
              </span>
            </div>

            {/* Norwegian Grocery Unit Price (e.g. 22,5 kr/kg) */}
            {unitPrice && (
              <div className="text-[10px] sm:text-[11px] text-slate-500 font-semibold leading-tight mt-1">
                {unitPrice}
              </div>
            )}

            {/* Comparative Oslo Store Price & Savings */}
            <div className="text-[9px] sm:text-[10px] text-slate-400 line-through leading-tight mt-0.5">
              Oslo retail: {product.retailPriceNOK} kr
            </div>
          </div>

          {/* Right Oda Action Button / Stepper */}
          <div className="shrink-0">
            {quantityInCart === 0 ? (
              <button
                onClick={() => onUpdateQuantity(product, 1)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500 hover:bg-amber-600 active:scale-90 text-slate-950 flex items-center justify-center font-black shadow-sm transition-all cursor-pointer"
                aria-label={`Add ${product.name} to cart`}
                title="Add to cart"
              >
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </button>
            ) : (
              <div className="flex items-center bg-amber-100/90 border border-amber-300/90 rounded-full p-0.5 sm:p-1 shadow-2xs">
                <button
                  onClick={() => onUpdateQuantity(product, quantityInCart - 1)}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white hover:bg-amber-200 text-amber-950 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                </button>
                <span className="w-5 sm:w-6 text-center font-black text-xs sm:text-sm text-amber-950">
                  {quantityInCart}
                </span>
                <button
                  onClick={() => onUpdateQuantity(product, quantityInCart + 1)}
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
