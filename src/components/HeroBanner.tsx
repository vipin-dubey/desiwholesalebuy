'use client';

import React from 'react';
import { Sparkles, Truck, BadgePercent, Scale } from 'lucide-react';

interface HeroBannerProps {
  onScrollToCatalog: () => void;
}

export default function HeroBanner({ onScrollToCatalog }: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-500/10 via-amber-100/30 to-transparent py-10 sm:py-14 border-b border-amber-200/50">
      {/* Decorative ambient blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300/80 text-amber-900 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Community Group Buying for South Asians in Norway</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Buy Desi Groceries at <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700">Wholesale Rates</span> with your neighbours.
            </h1>

            <p className="text-base sm:text-lg text-slate-700 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Why pay 4–5x wholesale markups at local ethnic convenience stores? We pool monthly grocery orders from 8–15 families in your apartment building, collect bulk sacks direct from verified Oslo distributors, and deliver straight to your building entrance.
            </p>

            {/* Benefit pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 max-w-xl mx-auto lg:mx-0 text-left">
              <div className="p-3 bg-white/90 rounded-xl border border-slate-200/80 shadow-xs flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <BadgePercent className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">Save 25–40%</div>
                  <div className="text-[11px] text-slate-500">Below Oslo retail</div>
                </div>
              </div>

              <div className="p-3 bg-white/90 rounded-xl border border-slate-200/80 shadow-xs flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">Zero Heavy Lifting</div>
                  <div className="text-[11px] text-slate-500">Atta, Rice & 5L Oils</div>
                </div>
              </div>

              <div className="p-3 bg-white/90 rounded-xl border border-slate-200/80 shadow-xs flex items-start gap-2.5 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900">Free Building Drop</div>
                  <div className="text-[11px] text-slate-500">Unlocked at 8+ orders</div>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onScrollToCatalog}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Browse All 47 Staples & Prices</span>
                <span>↓</span>
              </button>
            </div>
          </div>

          {/* Example Savings Comparison Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-amber-200 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-600 to-emerald-500 text-white text-xs font-extrabold px-3 py-1 rounded-bl-xl shadow-xs">
                EXAMPLE: MONTHLY PANTRY PACK
              </div>

              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Typical Monthly Family Basket in Norway
              </div>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-medium">🌾 Aashirvaad Chakki Atta (10 kg)</span>
                  <div className="text-right">
                    <span className="font-bold text-amber-700">225 kr</span>
                    <span className="text-slate-400 line-through ml-2">310 kr</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-medium">🍚 Daawat Premium Basmati (10 kg)</span>
                  <div className="text-right">
                    <span className="font-bold text-amber-700">295 kr</span>
                    <span className="text-slate-400 line-through ml-2">390 kr</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-medium">🫒 KTC Pure Mustard Oil (5 L)</span>
                  <div className="text-right">
                    <span className="font-bold text-amber-700">155 kr</span>
                    <span className="text-slate-400 line-through ml-2">215 kr</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-medium">🧈 Amul Pure Desi Ghee (1 L)</span>
                  <div className="text-right">
                    <span className="font-bold text-amber-700">180 kr</span>
                    <span className="text-slate-400 line-through ml-2">240 kr</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="font-medium">🧅 Red Onions Bulk Sack (10 kg)</span>
                  <div className="text-right">
                    <span className="font-bold text-amber-700">150 kr</span>
                    <span className="text-slate-400 line-through ml-2">250 kr</span>
                  </div>
                </div>
              </div>

              {/* Total calculation */}
              <div className="mt-4 pt-3 bg-amber-50/70 p-3 rounded-xl border border-amber-200/80">
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Total shipment weight:</span>
                  <span className="font-bold text-slate-800">36.0 kg</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>Oslo retail / online store price:</span>
                  <span className="line-through text-slate-500 font-semibold">1,405 kr</span>
                </div>
                <div className="flex items-center justify-between font-black text-sm text-slate-900 pt-1 border-t border-amber-200">
                  <span>Bulk Club Price delivered to you:</span>
                  <span className="text-lg text-emerald-700 font-black">1,005 kr</span>
                </div>
                <div className="mt-2 text-center text-xs font-black text-emerald-800 bg-emerald-100 py-1 rounded-lg">
                  🎉 You save 400 kr (28%) on a single order!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
