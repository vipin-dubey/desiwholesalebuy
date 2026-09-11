'use client';

import React from 'react';
import { ProductCategory } from '@/types';
import { Search, SlidersHorizontal, Sparkles, ArrowUpDown, X } from 'lucide-react';

export type QuickFilterType = 'all' | 'savings' | 'bulk' | 'glass' | 'bestsellers' | 'budget';
export type SortOptionType = 'recommended' | 'price-asc' | 'price-desc' | 'savings-desc' | 'weight-desc';

interface CategoryNavProps {
  selectedCategory: ProductCategory | 'all';
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  categoryCounts: Record<string, number>;
  activeQuickFilter: QuickFilterType;
  onQuickFilterChange: (filter: QuickFilterType) => void;
  sortBy: SortOptionType;
  onSortChange: (sort: SortOptionType) => void;
  totalFilteredCount: number;
  totalCount: number;
}

export default function CategoryNav({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  categoryCounts,
  activeQuickFilter,
  onQuickFilterChange,
  sortBy,
  onSortChange,
  totalFilteredCount,
  totalCount,
}: CategoryNavProps) {
  const categories: { id: ProductCategory | 'all'; label: string; emoji: string }[] = [
    { id: 'all', label: 'All Products', emoji: '🛒' },
    { id: 'flours', label: 'Atta & Flours', emoji: '🌾' },
    { id: 'rice', label: 'Basmati & Rice', emoji: '🍚' },
    { id: 'lentils', label: 'Dals & Pulses', emoji: '🍲' },
    { id: 'oils_ghee', label: 'Oils & Ghee', emoji: '🧈' },
    { id: 'spices', label: 'Spices & Masalas', emoji: '🌶️' },
    { id: 'breakfast_mixes', label: 'Dosa & Instant Mixes', emoji: '🥞' },
    { id: 'snacks', label: 'Snacks & Biscuits', emoji: '🥨' },
    { id: 'pickles', label: 'Pickles (Glass)', emoji: '🫙' },
    { id: 'root_vegetables', label: 'Onions & Potatoes', emoji: '🧅' },
  ];

  const quickFilters: { id: QuickFilterType; label: string; emoji?: string }[] = [
    { id: 'all', label: 'All Staples' },
    { id: 'bestsellers', label: 'Bestsellers', emoji: '⭐' },
    { id: 'savings', label: 'Top Savings (25%+)', emoji: '🔥' },
    { id: 'bulk', label: 'Bulk Sacks (5kg+)', emoji: '📦' },
    { id: 'glass', label: 'Glass Jars', emoji: '🫙' },
    { id: 'budget', label: 'Under 50 kr', emoji: '🏷️' },
  ];

  const quickKeywords = ['Aashirvaad 10kg', 'Toor Dal', 'Basmati', 'Pure Ghee', 'Pickles'];

  const hasActiveFilters =
    selectedCategory !== 'all' || activeQuickFilter !== 'all' || searchQuery !== '';

  const handleResetFilters = () => {
    onSelectCategory('all');
    onQuickFilterChange('all');
    onSearchChange('');
  };

  return (
    <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
      {/* 1. Search Bar & Quick Keyword Pills */}
      <div className="max-w-2xl mx-auto space-y-2">
        <div className="relative">
          <Search className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search groceries (e.g. Atta, Basmati, Toor Dal, Ghee)..."
            className="w-full pl-10 sm:pl-11 pr-20 sm:pr-24 py-2.5 sm:py-3 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 shadow-2xs text-sm sm:text-base text-slate-900 placeholder:text-slate-400 transition-all outline-none"
          />
          {searchQuery ? (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-full cursor-pointer transition-colors"
            >
              Clear
            </button>
          ) : (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-[11px] font-semibold text-slate-400">
              <span>Press / to search</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Search Keyword Chips */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto pb-0.5">
          <span className="font-semibold text-slate-400 shrink-0">Popular:</span>
          {quickKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => onSearchChange(kw)}
              className="px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 transition-colors cursor-pointer text-[11px] font-medium shrink-0"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Oda-style Subcategory Pills (Horizontal Scroll) */}
      <div className="-mx-3 sm:mx-0 px-3 sm:px-0 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none scroll-smooth">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] ?? 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-sm scale-[1.02]'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/90 shadow-2xs'
              }`}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-black ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Oda-style Secondary Filters & Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
        {/* Quick Filter Chips */}
        <div className="-mx-3 sm:mx-0 px-3 sm:px-0 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
            <SlidersHorizontal className="w-3 h-3" />
            <span>Filter:</span>
          </div>

          {quickFilters.map((qf) => {
            const isActive = activeQuickFilter === qf.id;
            return (
              <button
                key={qf.id}
                onClick={() => onQuickFilterChange(qf.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? 'bg-amber-600 text-white font-bold shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {qf.emoji && <span>{qf.emoji}</span>}
                <span>{qf.label}</span>
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown & Product Counter */}
        <div className="flex items-center justify-between sm:justify-end gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium hidden sm:inline">Sort:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as SortOptionType)}
                aria-label="Sort products by"
                className="bg-white border border-slate-200/90 rounded-xl px-2.5 py-1.5 pr-7 text-xs font-bold text-slate-800 shadow-2xs hover:border-slate-300 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer appearance-none"
              >
                <option value="recommended">⭐ Recommended</option>
                <option value="price-asc">💰 Price: Low to High</option>
                <option value="price-desc">📈 Price: High to Low</option>
                <option value="savings-desc">🏷️ Highest Savings %</option>
                <option value="weight-desc">⚖️ Heaviest First</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Active filter count & Reset button */}
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-1 rounded-lg border border-amber-200 transition-colors cursor-pointer"
            >
              <X className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          <div className="text-[11px] font-bold text-slate-500 whitespace-nowrap bg-slate-100 px-2 py-1 rounded-lg">
            {totalFilteredCount} of {totalCount}
          </div>
        </div>
      </div>
    </div>
  );
}
