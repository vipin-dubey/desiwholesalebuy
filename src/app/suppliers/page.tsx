'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { NORWAY_SUPPLIERS } from '@/lib/data';
import { getStoredOrders } from '@/lib/storage';
import { Order } from '@/types';
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  ExternalLink,
  Copy,
  FileText,
  Building2,
  Sparkles,
  Truck,
  CreditCard,
} from 'lucide-react';

export default function SuppliersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [copiedQuote, setCopiedQuote] = useState(false);

  useEffect(() => {
    setOrders(getStoredOrders());
  }, []);

  // Calculate aggregated batch demand for quotation generator
  const aggregatedItems = orders
    .flatMap((o) => o.items)
    .reduce((acc, item) => {
      const existing = acc.find((i) => i.product.id === item.product.id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        acc.push({ product: item.product, quantity: item.quantity });
      }
      return acc;
    }, [] as { product: (typeof orders)[0]['items'][0]['product']; quantity: number }[]);

  const totalWholesaleValue = aggregatedItems.reduce(
    (sum, i) => sum + i.product.wholesalePriceNOK * i.quantity,
    0
  );
  const totalWeight = aggregatedItems.reduce(
    (sum, i) => sum + i.product.weightKg * i.quantity,
    0
  );

  // Generate copyable B2B quotation email text in English/Norwegian format
  const generateQuotationEmail = () => {
    const lines = [
      'Subject: Wholesale Inquiry / Weekend Collective Pickup - Desi Bulk Club Norway',
      '',
      'Dear Wholesale Sales Team,',
      '',
      'We coordinate a weekly apartment community grocery pool for Indian & Pakistani households in Oslo & Bærum.',
      'Could you please confirm pricing and availability for pickup this upcoming Friday/Saturday for the following items:',
      '',
      ...aggregatedItems.map(
        (i) =>
          `- ${i.quantity} units x ${i.product.name} (${i.product.unit}) [Approx. ${(
            i.product.weightKg * i.quantity
          ).toFixed(1)} kg]`
      ),
      '',
      `Total Estimated Weight: approx. ${totalWeight.toFixed(1)} kg`,
      `Estimated Wholesale Value: approx. ${totalWholesaleValue} kr`,
      '',
      'Please let us know if these can be prepared on pallets / roll-cages for van loading on Friday.',
      '',
      'Best regards,',
      'Desi Bulk Club Community Logistics Coordinator',
      'Oslo, Norway',
    ];
    return lines.join('\n');
  };

  const handleCopyQuote = () => {
    navigator.clipboard.writeText(generateQuotationEmail());
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4] text-slate-900">
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-600/40 text-emerald-200 text-xs font-bold">
            <Store className="w-3.5 h-3.5" />
            <span>Norwegian Wholesalers &amp; Importers</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Wholesale Partners in the Greater Oslo Region
          </h1>

          <p className="text-slate-300 max-w-3xl text-sm sm:text-base leading-relaxed">
            No direct international importation needed at this stage. All dry staples, oils, and spices are procured directly from licensed Norwegian importers and cash &amp; carry warehouses in Oslo. Below are contact details, warehouse locations, opening hours, and procurement guidelines.
          </p>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Quick Guide to B2B Purchasing in Norway */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
              🛒
            </div>
            <h3 className="font-bold text-slate-900 text-sm">1. Cash &amp; Carry (Direct Bulk Buying)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Warehouses like <strong>Abiramy</strong> and <strong>A-Food</strong> allow instant bulk buying using standard bank cards or Vipps. You can pick 10–50 sacks of Atta and rice directly off the warehouse floor with zero credit checks.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
              🏢
            </div>
            <h3 className="font-bold text-slate-900 text-sm">2. Business Accounts (Scanasia / Deva)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              For pallet-scale orders from master importers like <strong>Scanasia AS</strong>, registering a business account with an ENK (sole proprietorship) or AS unlocks 14-day B2B invoicing and wholesale price tiers.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              🚚
            </div>
            <h3 className="font-bold text-slate-900 text-sm">3. Friday Pickup &amp; Saturday Drops</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Orders cut off Thursday evening. On Friday morning, the delivery van loads pallets at Veitvet and Alnabru warehouses, and items are sorted by building complex for Saturday morning deliveries.
            </p>
          </div>
        </div>

        {/* Interactive B2B Quotation Generator */}
        <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-emerald-500/10 p-6 rounded-3xl border border-amber-300 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                <FileText className="w-3.5 h-3.5" />
                <span>Automated B2B RFQ Generator</span>
              </div>
              <h2 className="text-lg font-black text-slate-900">
                Generated Wholesale Quotation Draft for Active Orders
              </h2>
              <p className="text-xs text-slate-600">
                Based on {orders.length} registered orders ({totalWeight.toFixed(1)} kg / {totalWholesaleValue} kr wholesale value).
              </p>
            </div>

            <button
              onClick={handleCopyQuote}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              {copiedQuote ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedQuote ? 'Copied to clipboard!' : 'Copy RFQ Email Draft'}</span>
            </button>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs font-mono text-slate-700 max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed shadow-2xs">
            {generateQuotationEmail()}
          </div>
        </div>

        {/* Detailed Wholesaler Cards */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Wholesale Directory: Oslo &amp; Akershus
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Direct contact details, catalog specialties, and procurement terms for each verified supplier.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {NORWAY_SUPPLIERS.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-3xl border border-slate-200 hover:border-amber-300 shadow-md hover:shadow-xl transition-all p-6 flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Top Badge & Name */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                        {s.categoryBadge}
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 mt-2">{s.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{s.area}</span>
                      </div>
                    </div>

                    {s.website && (
                      <a
                        href={s.website}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                        title="Visit supplier website"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {/* Recommendation banner */}
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium mb-3">
                    <strong>Best For:</strong> {s.recommendedFor}
                  </div>

                  {/* Contact & Location Details */}
                  <div className="space-y-2 text-xs text-slate-700 py-2 border-y border-slate-100">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900">{s.address}</div>
                        <a
                          href={s.mapsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-700 hover:underline inline-flex items-center gap-1 font-bold mt-0.5"
                        >
                          <span>Get directions in Google Maps</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <span className="text-slate-400 mr-1.5">Phone:</span>
                        <span className="font-semibold text-slate-900">{s.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <span className="text-slate-400 mr-1.5">Email:</span>
                        <a href={`mailto:${s.email}`} className="font-semibold text-amber-700 hover:underline">
                          {s.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                      <div>
                        <span className="text-slate-400 mr-1.5">Hours:</span>
                        <span className="font-semibold text-slate-800">{s.openingHours}</span>
                      </div>
                    </div>
                  </div>

                  {/* Specialties checklist */}
                  <div className="pt-3">
                    <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Catalog Specialties &amp; Strengths:
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                      {s.specialties.map((spec, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card footer: payment & MOQ */}
                <div className="pt-3 border-t border-slate-100 text-xs space-y-1 bg-slate-50/70 p-3 rounded-xl">
                  <div className="flex items-start gap-1.5 text-slate-700">
                    <CreditCard className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span><strong>Payment:</strong> {s.paymentTerms}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-slate-700">
                    <Truck className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span><strong>Minimum Order:</strong> {s.moqNotes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
