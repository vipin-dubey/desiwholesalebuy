'use client';

import React from 'react';
import { ProductCategory } from '@/types';
import { Search } from 'lucide-react';

interface CategoryNavProps {
  selectedCategory: ProductCategory | 'all';
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  categoryCounts: Record<string, number>;
}

export default function CategoryNav({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  categoryCounts,
}: CategoryNavProps) {
  const categories: { id: ProductCategory | 'all'; label: string; emoji: string }[] = [
    { id: 'all', label: 'All Staples', emoji: '🛒' },
    { id: 'flours', label: 'Atta & Flours', emoji: '🌾' },
    { id: 'rice', label: 'Basmati & Rice', emoji: '🍚' },
    { id: 'lentils', label: 'Dals & Pulses', emoji: '🍲' },
    { id: 'oils_ghee', label: 'Cooking Oils & Ghee', emoji: '🧈' },
    { id: 'spices', label: 'Spices & Masalas', emoji: '🌶️' },
    { id: 'breakfast_mixes', label: 'Dosa & Instant Mixes', emoji: '🥞' },
    { id: 'snacks', label: 'Snacks & Biscuits', emoji: '🥨' },
    { id: 'pickles', label: 'Pickles (Glass Jars)', emoji: '🫙' },
    { id: 'root_vegetables', label: 'Onions & Potatoes (Sacks)', emoji: '🧅' },
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Search Input Bar */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search staples (e.g. Atta, Basmati, Amul Ghee, Toor Dal, Red Onions, Mango Pickle)..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 shadow-xs text-sm text-slate-900 placeholder:text-slate-400 transition-all outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-0.5 rounded-full cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] ?? 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 scale-[1.02]'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 shadow-2xs'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                  isSelected ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
