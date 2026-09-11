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
    <div className="w-full bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-emerald-500/10 border-y border-amber-200/80 py-4 px-4 sm:px-6 lg:px-8 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        {/* Left info */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-xs font-black shadow-sm">
              <Building2 className="w-3.5 h-3.5" />
              <span>Active Delivery Hub</span>
            </div>
            <h2 className="font-extrabold text-slate-900 text-base sm:text-lg">
              {building.name}
            </h2>
            <button
              onClick={onChangeBuilding}
              className="text-xs text-amber-700 hover:text-amber-800 font-bold underline ml-1 cursor-pointer"
            >
              (Change Building)
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              {building.address}
            </span>
            <span className="flex items-center gap-1 font-semibold text-emerald-800">
              <Calendar className="w-3 h-3 text-emerald-600" />
              {building.nextDeliveryDate}
            </span>
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <Clock className="w-3 h-3 text-slate-400" />
              {building.pickupWindow}
            </span>
            {building.hostName && (
              <span className="hidden lg:flex items-center gap-1 text-slate-500">
                <UserCheck className="w-3 h-3 text-slate-400" />
                Building Host: {building.hostName}
              </span>
            )}
          </div>
        </div>

        {/* Right progress meter & share button */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Progress widget */}
          <div className="bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm min-w-[260px]">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span className="text-slate-700">Free Delivery Goal</span>
              <span className={isUnlocked ? 'text-emerald-600' : 'text-amber-600'}>
                {building.currentOrders} of {building.targetOrders} families
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  isUnlocked ? 'bg-emerald-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'
                }`}
                style={{ width: `${percent}%` }}
              ></div>
            </div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
              {isUnlocked ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Target reached! Van scheduled for Saturday.
                </span>
              ) : (
                <span>Only <strong>{remaining} more orders</strong> to confirm free drop!</span>
              )}
              <span className="font-bold text-slate-700">{percent}%</span>
            </div>
          </div>

          {/* Share button */}
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 text-xs font-bold shadow-sm transition-all cursor-pointer whitespace-nowrap"
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
