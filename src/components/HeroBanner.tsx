'use client';

import React, { useState } from 'react';
import { Sparkles, Truck, BadgePercent, Scale, ChevronDown, ChevronUp } from 'lucide-react';

interface HeroBannerProps {
  onScrollToCatalog: () => void;
}

export default function HeroBanner({ onScrollToCatalog }: HeroBannerProps) {
  const [showFullBreakdown, setShowFullBreakdown] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-amber-100/30 to-transparent py-6 sm:py-12 lg:py-14 border-b border-amber-200/50">
      {/* Decorative ambient blurs */}
      <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-amber-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-64 sm:w-80 h-64 sm:h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-amber-100 border border-amber-300/80 text-amber-900 text-[11px] sm:text-xs font-bold tracking-wide">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600" />
              <span>Community Group Buying for South Asians in Norway</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-snug sm:leading-tight">
              Buy Desi Groceries at{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">
                Wholesale Rates
              </span>{' '}
              with your neighbours.
            </h1>

            <p className="text-xs sm:text-base lg:text-lg text-slate-700 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Why pay high retail markups at local convenience stores? We pool grocery orders from 8–15 families in your apartment building, collect wholesale sacks direct from verified Oslo distributors, and van-drop straight to your entrance.
            </p>

            {/* Benefit pills: balanced 3-column micro-badges */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1 max-w-xl mx-auto lg:mx-0">
              <div className="p-2 sm:p-3 bg-white/95 rounded-xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <BadgePercent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="font-bold text-[11px] sm:text-xs text-slate-900 leading-tight">Save 25–40%</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-500">Below Oslo retail</div>
                </div>
              </div>

              <div className="p-2 sm:p-3 bg-white/95 rounded-xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Scale className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="font-bold text-[11px] sm:text-xs text-slate-900 leading-tight">Zero Lifting</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-500">Atta, Rice &amp; Oils</div>
                </div>
              </div>

              <div className="p-2 sm:p-3 bg-white/95 rounded-xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-1 sm:gap-2.5">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div>
                  <div className="font-bold text-[11px] sm:text-xs text-slate-900 leading-tight">Free Drop</div>
                  <div className="text-[9px] sm:text-[11px] text-slate-500">At 8+ orders</div>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
              <button
                onClick={onScrollToCatalog}
                className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Browse All 47 Bulk Staples &amp; Prices</span>
                <span>↓</span>
              </button>
            </div>
          </div>

          {/* Example Savings Comparison Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-4 sm:p-6 border border-amber-200 shadow-md sm:shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Typical Monthly Family Basket
                </div>
                <div className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-md border border-emerald-300 shrink-0">
                  SAVE 400 KR
                </div>
              </div>

              {/* Collapsed view on mobile, full on desktop */}
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span className="font-medium text-[11px] sm:text-xs">🌾 Aashirvaad Chakki Atta (10 kg)</span>
                  <div className="text-right text-[11px] sm:text-xs">
                    <span className="font-bold text-amber-700">225 kr</span>
                    <span className="text-slate-400 line-through ml-1.5">310 kr</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span className="font-medium text-[11px] sm:text-xs">🍚 Daawat Premium Basmati (10 kg)</span>
                  <div className="text-right text-[11px] sm:text-xs">
                    <span className="font-bold text-amber-700">295 kr</span>
                    <span className="text-slate-400 line-through ml-1.5">390 kr</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                  <span className="font-medium text-[11px] sm:text-xs">🫒 KTC Pure Mustard Oil (5 L)</span>
                  <div className="text-right text-[11px] sm:text-xs">
                    <span className="font-bold text-amber-700">155 kr</span>
                    <span className="text-slate-400 line-through ml-1.5">215 kr</span>
                  </div>
                </div>

                {/* Additional items toggleable on mobile, always visible on lg */}
                <div className={`${showFullBreakdown ? 'block' : 'hidden sm:block'} space-y-2`}>
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="font-medium text-[11px] sm:text-xs">🧈 Amul Pure Desi Ghee (1 L)</span>
                    <div className="text-right text-[11px] sm:text-xs">
                      <span className="font-bold text-amber-700">180 kr</span>
                      <span className="text-slate-400 line-through ml-1.5">240 kr</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                    <span className="font-medium text-[11px] sm:text-xs">🧅 Red Onions Bulk Sack (10 kg)</span>
                    <div className="text-right text-[11px] sm:text-xs">
                      <span className="font-bold text-amber-700">150 kr</span>
                      <span className="text-slate-400 line-through ml-1.5">250 kr</span>
                    </div>
                  </div>
                </div>

                {/* Mobile breakdown toggle button */}
                <button
                  onClick={() => setShowFullBreakdown(!showFullBreakdown)}
                  className="sm:hidden w-full text-center text-[11px] font-bold text-amber-700 py-1 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>{showFullBreakdown ? 'Show fewer items' : '+ 2 more items in basket'}</span>
                  {showFullBreakdown ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Total calculation */}
              <div className="mt-3 pt-2.5 bg-amber-50/70 p-2.5 sm:p-3 rounded-xl border border-amber-200/80">
                <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 mb-1">
                  <span>Shipment weight:</span>
                  <span className="font-bold text-slate-800">36.0 kg (5 sacks/cans)</span>
                </div>
                <div className="flex items-center justify-between text-[11px] sm:text-xs text-slate-500 mb-1">
                  <span>Oslo retail store benchmark:</span>
                  <span className="line-through text-slate-500 font-semibold">1,405 kr</span>
                </div>
                <div className="flex items-center justify-between font-black text-xs sm:text-sm text-slate-900 pt-1 border-t border-amber-200">
                  <span>Club Price delivered:</span>
                  <span className="text-base sm:text-lg text-emerald-700 font-black">1,005 kr</span>
                </div>
                <div className="mt-1.5 text-center text-[11px] sm:text-xs font-black text-emerald-800 bg-emerald-100 py-1 rounded-lg">
                  🎉 You save 400 kr (28%) with zero lifting!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
