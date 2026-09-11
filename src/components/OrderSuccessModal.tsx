'use client';

import React from 'react';
import { Order } from '@/types';
import Link from 'next/link';
import { CheckCircle2, Calendar, Clock, MapPin, Scale, Sparkles, Building2, ExternalLink } from 'lucide-react';

interface OrderSuccessModalProps {
  order: Order;
  onClose: () => void;
}

export default function OrderSuccessModal({ order, onClose }: OrderSuccessModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Celebration Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white text-center relative overflow-hidden">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-inner">
            <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h2 className="text-lg sm:text-2xl font-black tracking-tight">Order Confirmed!</h2>
          <p className="text-xs text-emerald-100 mt-0.5">
            Order ID: <strong className="text-white font-mono">{order.id}</strong>
          </p>
          <div className="inline-flex items-center gap-1.5 mt-2.5 px-3 py-1 rounded-full bg-emerald-500/40 text-emerald-100 text-[11px] sm:text-xs font-bold border border-emerald-300/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>You saved {order.totalSavingsNOK} kr on this delivery!</span>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 sm:space-y-4 text-xs text-slate-700 flex-1">
          {/* Customer & Location */}
          <div className="p-3.5 sm:p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900">
              <span>Recipient:</span>
              <span>{order.customer.firstName} {order.customer.lastName}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                Building:
              </span>
              <span className="font-semibold text-slate-800 truncate max-w-[200px] sm:max-w-none">{order.customer.buildingName}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Apartment / Unit:
              </span>
              <span className="font-semibold text-slate-800">{order.customer.apartmentNumber}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Pickup Window:
              </span>
              <span className="font-bold text-amber-700">{order.customer.deliverySlot}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-200">
              <span className="flex items-center gap-1 font-bold">
                <Scale className="w-3.5 h-3.5 text-emerald-600" />
                Total Order Weight:
              </span>
              <span className="font-black text-slate-900">{order.totalWeightKg.toFixed(1)} kg</span>
            </div>
          </div>

          {/* Vipps Instructions */}
          <div className="p-3.5 sm:p-4 bg-orange-50/70 rounded-2xl border border-orange-200 space-y-1.5">
            <div className="flex items-center gap-2 font-black text-orange-950 text-sm">
              <span className="w-5 h-5 rounded-full bg-[#FF5B24] text-white flex items-center justify-center font-bold text-[10px]">
                v
              </span>
              <span>Vipps Settlement: {order.totalAmountNOK} kr</span>
            </div>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Please Vipps to community number <strong>#812345</strong> (Desi Bulk Club Norway) before Thursday 23:59. Mention order ID <strong>{order.id}</strong> in the message note.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-2 pt-1">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
              What happens next?
            </h4>
            <div className="space-y-2 border-l-2 border-amber-300 ml-2 pl-3">
              <div>
                <div className="font-bold text-slate-900 text-xs">1. Order Logged &amp; Pooled</div>
                <div className="text-[11px] text-slate-500">
                  Added to this weekend&apos;s collective order list for {order.customer.buildingName}.
                </div>
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">2. Friday: Wholesale Procurement</div>
                <div className="text-[11px] text-slate-500">
                  We collect bulk sacks, tins, and cartons from Abiramy &amp; Scanasia warehouses in Oslo.
                </div>
              </div>
              <div>
                <div className="font-bold text-slate-900 text-xs">3. Saturday: Building Drop &amp; Pickup</div>
                <div className="text-[11px] text-slate-500">
                  You will receive an SMS 15 minutes before the delivery van arrives at your building complex.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-3 sm:p-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row gap-2 sm:gap-2.5">
          <button
            onClick={onClose}
            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Continue Shopping
          </button>
          <Link
            href="/admin"
            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white border border-slate-300 hover:border-amber-500 text-slate-700 hover:text-amber-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Organizer Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
