'use client';

import React, { useState } from 'react';
import { CartItem, BuildingCluster, Order, CustomerInfo } from '@/types';
import { saveStoredOrder, clearStoredCart } from '@/lib/storage';
import { X, CheckCircle2, Sparkles, User, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  building: BuildingCluster;
  onOrderSuccess: (order: Order) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  building,
  onOrderSuccess,
}: CheckoutModalProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [address, setAddress] = useState(building.address || '');
  const [deliverySlot] = useState(
    `${building.nextDeliveryDate} (${building.pickupWindow})`
  );
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, i) => sum + i.product.clubPriceNOK * i.quantity, 0);
  const totalWholesale = cart.reduce((sum, i) => sum + i.product.wholesalePriceNOK * i.quantity, 0);
  const totalRetail = cart.reduce((sum, i) => sum + i.product.retailPriceNOK * i.quantity, 0);
  const totalSavings = totalRetail - totalAmount;
  const totalWeight = cart.reduce((sum, i) => sum + i.product.weightKg * i.quantity, 0);
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !apartmentNumber.trim()) {
      alert('Please fill out First Name, Last Name, Phone Number, and Apartment Number.');
      return;
    }

    setIsSubmitting(true);

    const customer: CustomerInfo = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone.trim().replace(/\s+/g, ''),
      buildingId: building.id,
      buildingName: building.name,
      apartmentNumber: apartmentNumber.trim(),
      address: address.trim() || building.address,
      deliverySlot: deliverySlot,
      notes: notes.trim(),
    };

    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      customer,
      items: [...cart],
      itemCount: totalItems,
      totalAmountNOK: totalAmount,
      totalWholesaleCostNOK: totalWholesale,
      totalRetailValueNOK: totalRetail,
      totalSavingsNOK: totalSavings,
      totalWeightKg: totalWeight,
      status: 'pending',
      paymentMethod: 'vipps',
    };

    // Save order into localStorage
    saveStoredOrder(newOrder);
    clearStoredCart();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore if canvas-confetti fails in test environment
    }

    setIsSubmitting(false);
    onOrderSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center shadow-md font-bold">
              📦
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">Confirm Bulk Club Order</h3>
              <p className="text-xs text-slate-500">
                Delivered to {building.name} • {building.nextDeliveryDate}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4 flex-1">
          {/* Quick order summary banner */}
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
            <div>
              <div className="font-black text-amber-950 text-sm">{totalAmount} kr</div>
              <div className="text-slate-600">
                {totalItems} items • {totalWeight.toFixed(1)} kg total weight
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg">
                <Sparkles className="w-3 h-3" /> You save {totalSavings} kr
              </span>
            </div>
          </div>

          {/* Customer Personal Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-600" />
              <span>Contact Information</span>
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amit"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sharma"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Norwegian Mobile Phone (+47) *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  +47
                </span>
                <input
                  type="tel"
                  required
                  placeholder="912 34 567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-12 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-900 font-medium"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                We will send an SMS 15 minutes before the delivery van arrives at your building entrance on Saturday.
              </p>
            </div>
          </div>

          {/* Delivery & Apartment Details */}
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-amber-600" />
              <span>Building & Drop Details</span>
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Building Complex
              </label>
              <input
                type="text"
                disabled
                value={building.name}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 font-semibold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Apartment / Door / Entrance *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apt 402, Entrance B"
                  value={apartmentNumber}
                  onChange={(e) => setApartmentNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Pickup Window
              </label>
              <input
                type="text"
                disabled
                value={deliverySlot}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-700 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Delivery Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Will come down with my own shopping trolley, or ring buzzer upon arrival."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-xs text-slate-900"
              />
            </div>
          </div>

          {/* Payment info (Vipps) */}
          <div className="p-4 bg-orange-50/60 rounded-2xl border border-orange-200 text-xs space-y-2">
            <div className="flex items-center gap-2 font-bold text-orange-950">
              <span className="w-5 h-5 rounded-full bg-[#FF5B24] text-white flex items-center justify-center font-black text-[10px]">
                v
              </span>
              <span>Convenient Settlement via Vipps</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              You pay <strong>{totalAmount} kr</strong> via Vipps once your order is registered. No upfront risk – funds are held for the collective wholesale run on Friday.
            </p>
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Complete Order ({totalAmount} kr)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
