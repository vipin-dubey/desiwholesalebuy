'use client';

import React from 'react';
import { BuildingCluster } from '@/types';
import { Building2, Calendar, Clock, MapPin, Share2, Sparkles, UserCheck } from 'lucide-react';

interface BuildingProgressProps {
  building: BuildingCluster;
  onChangeBuilding: () => void;
}

export default function BuildingProgress({
  building,
  onChangeBuilding,
}: BuildingProgressProps) {
  const percent = Math.min(100, Math.round((building.currentOrders / building.targetOrders) * 100));
  const remaining = Math.max(0, building.targetOrders - building.currentOrders);
  const isUnlocked = building.currentOrders >= building.targetOrders;

  const handleShare = () => {
    const text = `Hey neighbours! We're pooling orders for Indian & Pakistani groceries (Atta, Basmati, Ghee, Daal) at wholesale rates for delivery to ${building.name}. Join in so we get free delivery this Saturday!`;
    if (navigator.share) {
      navigator.share({
        title: `Bulk Grocery Club for ${building.name}`,
        text: text,
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.origin}`);
      alert('Link and invite message copied to clipboard! Share with neighbours on WhatsApp.');
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-emerald-500/10 border-y border-amber-200/80 py-3 sm:py-4 px-3 sm:px-6 lg:px-8 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
        {/* Left info */}
        <div className="space-y-1 w-full md:w-auto">
          <div className="flex items-center justify-between sm:justify-start gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[10px] sm:text-xs font-black shadow-2xs">
                <Building2 className="w-3 h-3" />
                <span>Active Hub</span>
              </div>
              <h2 className="font-black text-slate-900 text-sm sm:text-lg truncate max-w-[200px] sm:max-w-none">
                {building.name}
              </h2>
            </div>
            <button
              onClick={onChangeBuilding}
              className="text-xs text-amber-700 hover:text-amber-800 font-bold underline cursor-pointer"
            >
              Change
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-slate-600 flex-wrap">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate max-w-[240px] sm:max-w-none">{building.address}</span>
            </span>
            <span className="flex items-center gap-1 font-semibold text-emerald-800">
              <Calendar className="w-3 h-3 text-emerald-600 shrink-0" />
              {building.nextDeliveryDate}
            </span>
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <Clock className="w-3 h-3 text-slate-400 shrink-0" />
              {building.pickupWindow}
            </span>
            {building.hostName && (
              <span className="hidden lg:flex items-center gap-1 text-slate-500">
                <UserCheck className="w-3 h-3 text-slate-400" />
                Host: {building.hostName}
              </span>
            )}
          </div>
        </div>

        {/* Right progress meter & share button */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          {/* Progress widget */}
          <div className="bg-white px-3.5 py-2 sm:py-2.5 rounded-xl border border-slate-200 shadow-2xs flex-1 sm:min-w-[260px]">
            <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold mb-1">
              <span className="text-slate-700">Free Delivery Goal</span>
              <span className={isUnlocked ? 'text-emerald-600' : 'text-amber-600'}>
                {building.currentOrders} of {building.targetOrders} families
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isUnlocked ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'
                }`}
                style={{ width: `${percent}%` }}
              ></div>
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-500 mt-1 flex items-center justify-between gap-1">
              {isUnlocked ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1 truncate">
                  <Sparkles className="w-3 h-3 shrink-0" /> Van unlocked for Saturday!
                </span>
              ) : (
                <span className="truncate">
                  Need <strong>{remaining} more orders</strong> for free drop
                </span>
              )}
              <span className="font-bold text-slate-700 shrink-0">{percent}%</span>
            </div>
          </div>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 px-3 py-2 sm:py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 text-xs font-bold shadow-2xs transition-all cursor-pointer whitespace-nowrap"
            title="Share with neighbours on WhatsApp"
          >
            <Share2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Invite Neighbours</span>
          </button>
        </div>
      </div>
    </div>
  );
}
