'use client';

import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Check, Plus, X, Calendar, Clock } from 'lucide-react';
import { BuildingCluster } from '@/types';
import { getStoredBuildings, saveStoredBuilding, setStoredSelectedBuilding } from '@/lib/storage';

interface BuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBuilding: BuildingCluster | null;
  onSelect: (b: BuildingCluster) => void;
}

export default function BuildingModal({
  isOpen,
  onClose,
  selectedBuilding,
  onSelect,
}: BuildingModalProps) {
  const [buildings, setBuildings] = useState<BuildingCluster[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New building form
  const [newName, setNewName] = useState('');
  const [newArea, setNewArea] = useState('');
  const [newAddress, setNewAddress] = useState('');

  useEffect(() => {
    if (isOpen) {
      setBuildings(getStoredBuildings());
      setIsAddingNew(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelect = (b: BuildingCluster) => {
    setStoredSelectedBuilding(b.id);
    onSelect(b);
  };

  const handleCreateBuilding = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newAddress.trim()) return;

    const newBuilding: BuildingCluster = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      area: newArea.trim() || 'Oslo / Akershus',
      address: newAddress.trim(),
      targetOrders: 8,
      currentOrders: 1,
      nextDeliveryDate: 'Saturday, Sep 13',
      pickupWindow: '12:00 – 12:45 PM',
      isCustom: true,
    };

    saveStoredBuilding(newBuilding);
    setBuildings(getStoredBuildings());
    handleSelect(newBuilding);
    setIsAddingNew(false);
    setNewName('');
    setNewArea('');
    setNewAddress('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Select Your Apartment Complex</h3>
              <p className="text-xs text-slate-500">
                Bulk deliveries are dropped right at your building entrance or guest parking
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          {!isAddingNew ? (
            <>
              <div className="space-y-3">
                {buildings.map((b) => {
                  const isSelected = selectedBuilding?.id === b.id;
                  const percent = Math.min(100, Math.round((b.currentOrders / b.targetOrders) * 100));
                  const isUnlocked = b.currentOrders >= b.targetOrders;

                  return (
                    <div
                      key={b.id}
                      onClick={() => handleSelect(b)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer text-left relative ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20 shadow-sm'
                          : 'border-slate-200 hover:border-amber-300 hover:bg-slate-50/80'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{b.name}</span>
                            {isUnlocked ? (
                              <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                                ✓ Free Delivery Unlocked!
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                                {b.targetOrders - b.currentOrders} orders needed
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{b.address}</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-slate-600 pt-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-amber-600" />
                              <span>{b.nextDeliveryDate}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-600" />
                              <span>{b.pickupWindow}</span>
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3 pt-2 border-t border-slate-100/80 flex items-center gap-3">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isUnlocked ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                          {b.currentOrders} / {b.targetOrders} families ({percent}%)
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add New Building Trigger */}
              <button
                onClick={() => setIsAddingNew(true)}
                className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-amber-500 hover:bg-amber-50/50 text-slate-600 hover:text-amber-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Live somewhere else? Add your building or housing complex</span>
              </button>
            </>
          ) : (
            /* New Building Form */
            <form onSubmit={handleCreateBuilding} className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 leading-relaxed">
                <strong>Start a bulk club in your building:</strong> When 8 neighbours order together, our van makes a free dedicated drop to your building entrance or garage!
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Building or Housing Complex Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fornebu Panorama Sameie"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Area / Municipality *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bærum, Lillestrøm, or Oslo East"
                  value={newArea}
                  onChange={(e) => setNewArea(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Street Address & Postal Code *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rolfsbuktveien 20, 1364 Fornebu"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-900"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="flex-1 py-2.5 px-4 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 text-sm font-semibold cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold shadow-md cursor-pointer"
                >
                  Register & Select
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
