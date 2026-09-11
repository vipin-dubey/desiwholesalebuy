'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import {
  getStoredOrders,
  updateStoredOrderStatus,
  deleteStoredOrder,
  getStoredBuildings,
} from '@/lib/storage';
import { Order, OrderStatus, BuildingCluster } from '@/types';
import {
  ShieldCheck,
  Package,
  TrendingUp,
  Scale,
  Building2,
  Phone,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Trash2,
  ExternalLink,
  Search,
  Filter,
  Users,
  Store,
} from 'lucide-react';

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [buildings, setBuildings] = useState<BuildingCluster[]>([]);
  const [activeTab, setActiveTab] = useState<'picklist' | 'routes' | 'orders'>('picklist');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuildingFilter, setSelectedBuildingFilter] = useState<string>('all');

  const refreshData = () => {
    setOrders(getStoredOrders());
    setBuildings(getStoredBuildings());
  };

  useEffect(() => {
    refreshData();
    const handleUpdate = () => refreshData();
    window.addEventListener('desi-storage-update', handleUpdate);
    return () => window.removeEventListener('desi-storage-update', handleUpdate);
  }, []);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesBuilding =
        selectedBuildingFilter === 'all' || o.customer.buildingId === selectedBuildingFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customer.firstName.toLowerCase().includes(q) ||
        o.customer.lastName.toLowerCase().includes(q) ||
        o.customer.phone.includes(q) ||
        o.customer.buildingName.toLowerCase().includes(q);

      return matchesBuilding && matchesSearch;
    });
  }, [orders, selectedBuildingFilter, searchQuery]);

  // Overall Financial & Logistics KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmountNOK, 0);
  const totalWholesale = orders.reduce((sum, o) => sum + o.totalWholesaleCostNOK, 0);
  const totalGrossProfit = totalRevenue - totalWholesale;
  const grossProfitMargin = totalRevenue > 0 ? Math.round((totalGrossProfit / totalRevenue) * 100) : 0;
  const totalWeightKg = orders.reduce((sum, o) => sum + o.totalWeightKg, 0);

  // Consolidated Wholesale Picklist calculation
  const picklist = useMemo(() => {
    const itemMap = new Map<
      string,
      {
        product: Order['items'][0]['product'];
        totalQuantity: number;
        totalWeightKg: number;
        totalWholesaleCost: number;
        totalClubValue: number;
        orderCount: number;
      }
    >();

    for (const order of orders) {
      for (const item of order.items) {
        const existing = itemMap.get(item.product.id);
        if (existing) {
          existing.totalQuantity += item.quantity;
          existing.totalWeightKg += item.product.weightKg * item.quantity;
          existing.totalWholesaleCost += item.product.wholesalePriceNOK * item.quantity;
          existing.totalClubValue += item.product.clubPriceNOK * item.quantity;
          existing.orderCount += 1;
        } else {
          itemMap.set(item.product.id, {
            product: item.product,
            totalQuantity: item.quantity,
            totalWeightKg: item.product.weightKg * item.quantity,
            totalWholesaleCost: item.product.wholesalePriceNOK * item.quantity,
            totalClubValue: item.product.clubPriceNOK * item.quantity,
            orderCount: 1,
          });
        }
      }
    }

    return Array.from(itemMap.values()).sort((a, b) => b.totalWeightKg - a.totalWeightKg);
  }, [orders]);

  // Status badge style helper
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            Pending Vipps
          </span>
        );
      case 'confirmed':
        return (
          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300">
            Confirmed
          </span>
        );
      case 'picked':
        return (
          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-900 border border-purple-300">
            Loaded on Van
          </span>
        );
      case 'delivered':
        return (
          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
            Delivered
          </span>
        );
    }
  };

  // CSV Export
  const exportToCSV = () => {
    const headers = [
      'Order ID',
      'Date',
      'Customer',
      'Phone',
      'Building Complex',
      'Apartment/Unit',
      'Amount (NOK)',
      'Wholesale Cost (NOK)',
      'Gross Profit (NOK)',
      'Weight (kg)',
      'Status',
      'Items',
    ];

    const rows = orders.map((o) => [
      o.id,
      new Date(o.createdAt).toLocaleDateString('en-GB'),
      `"${o.customer.firstName} ${o.customer.lastName}"`,
      `"${o.customer.phone}"`,
      `"${o.customer.buildingName}"`,
      `"${o.customer.apartmentNumber}"`,
      o.totalAmountNOK,
      o.totalWholesaleCostNOK,
      o.totalAmountNOK - o.totalWholesaleCostNOK,
      o.totalWeightKg.toFixed(1),
      o.status,
      `"${o.items.map((i) => `${i.quantity}x ${i.product.name}`).join('; ')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `desibulkclub_manifest_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4] text-slate-900">
      <Navbar />

      {/* Admin Title Header */}
      <div className="bg-slate-900 text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Organizer &amp; Logistics Control</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Collective Buying Dashboard &amp; Wholesale Picklist
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Manage customer orders, consolidated wholesale procurement picklists, and building delivery routes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportToCSV}
              className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Export Manifest (CSV)</span>
            </button>
            <Link
              href="/suppliers"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition-colors"
            >
              <Store className="w-4 h-4 text-amber-400" />
              <span>Wholesale Directory</span>
            </Link>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Orders
            </div>
            <div className="text-2xl font-black text-slate-900">{orders.length}</div>
            <div className="text-[11px] text-slate-500">across {buildings.length} buildings</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Revenue
            </div>
            <div className="text-2xl font-black text-amber-700">{totalRevenue} kr</div>
            <div className="text-[11px] text-slate-500">collected via Vipps</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Wholesale Cost (COGS)
            </div>
            <div className="text-2xl font-black text-slate-700">{totalWholesale} kr</div>
            <div className="text-[11px] text-slate-500">for Friday procurement</div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Gross Profit
            </div>
            <div className="text-2xl font-black text-emerald-700">+{totalGrossProfit} kr</div>
            <div className="text-[11px] font-bold text-emerald-600">
              {grossProfitMargin}% gross margin
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1 col-span-2 lg:col-span-1">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Total Van Weight
            </div>
            <div className="text-2xl font-black text-blue-900">{totalWeightKg.toFixed(1)} kg</div>
            <div className="text-[11px] text-slate-500">
              {totalWeightKg < 800 ? '✅ Fits in standard delivery van' : '⚠️ Requires larger van/trailer'}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 gap-4">
          <button
            onClick={() => setActiveTab('picklist')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'picklist'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Wholesale Picklist ({picklist.length} line items)</span>
          </button>

          <button
            onClick={() => setActiveTab('routes')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'routes'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Routes &amp; Building Complexes</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'border-amber-600 text-amber-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>All Orders ({orders.length})</span>
          </button>
        </div>

        {/* TAB 1: Consolidated Wholesale Picklist */}
        {activeTab === 'picklist' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
              <div className="text-xs text-amber-900 space-y-0.5">
                <div className="font-bold text-sm">Consolidated Wholesale Picklist (Friday Morning)</div>
                <p>
                  Exact quantities of bulk sacks, oil tins, and spice cartons to pick up from <strong>Abiramy</strong> and <strong>Scanasia</strong>.
                </p>
              </div>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 font-bold text-xs shadow-2xs self-start sm:self-auto cursor-pointer"
              >
                🖨️ Print Picklist
              </button>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Item / SKU</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4 text-center">Quantity to Pick</th>
                      <th className="py-3.5 px-4 text-right">Total Weight</th>
                      <th className="py-3.5 px-4 text-right">Wholesale Cost (COGS)</th>
                      <th className="py-3.5 px-4 text-right">Customer Revenue</th>
                      <th className="py-3.5 px-4 text-right">Gross Margin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {picklist.map((item) => (
                      <tr key={item.product.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <span className="text-lg shrink-0">{item.product.emoji}</span>
                            <div>
                              <div className="font-bold text-slate-900">{item.product.name}</div>
                              <div className="text-[11px] text-slate-400">
                                {item.product.brand} • {item.product.unit}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-500 uppercase text-[10px] font-bold">
                          {item.product.category}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-3 py-1 bg-amber-100 text-amber-950 font-black rounded-lg text-sm">
                            {item.totalQuantity} units
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-slate-800">
                          {item.totalWeightKg.toFixed(1)} kg
                        </td>
                        <td className="py-3 px-4 text-right text-slate-600">
                          {item.totalWholesaleCost} kr
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-slate-900">
                          {item.totalClubValue} kr
                        </td>
                        <td className="py-3 px-4 text-right font-black text-emerald-700">
                          +{item.totalClubValue - item.totalWholesaleCost} kr
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50 font-black text-xs border-t-2 border-slate-200">
                    <tr>
                      <td className="py-3.5 px-4" colSpan={3}>
                        TOTAL SHIPMENT:
                      </td>
                      <td className="py-3.5 px-4 text-right text-blue-950">
                        {totalWeightKg.toFixed(1)} kg
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-800">
                        {totalWholesale} kr
                      </td>
                      <td className="py-3.5 px-4 text-right text-amber-900">
                        {totalRevenue} kr
                      </td>
                      <td className="py-3.5 px-4 text-right text-emerald-800 text-sm">
                        +{totalGrossProfit} kr
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Building Delivery Routes */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            <p className="text-xs text-slate-500">
              Orders grouped by apartment complex for Saturday drops. Contact building host upon arrival.
            </p>

            <div className="grid grid-cols-1 gap-6">
              {buildings.map((b) => {
                const buildingOrders = orders.filter((o) => o.customer.buildingId === b.id);
                const buildingWeight = buildingOrders.reduce((sum, o) => sum + o.totalWeightKg, 0);
                const buildingRevenue = buildingOrders.reduce((sum, o) => sum + o.totalAmountNOK, 0);

                return (
                  <div key={b.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
                    {/* Building Header Bar */}
                    <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-amber-600 bg-amber-100 px-2.5 py-0.5 rounded-full">
                            Drop Stop
                          </span>
                          <h3 className="font-extrabold text-base text-slate-900">{b.name}</h3>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {b.address} • Scheduled: <strong>{b.nextDeliveryDate} at {b.pickupWindow}</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-xs">
                        <span className="font-semibold text-slate-700">
                          {buildingOrders.length} orders
                        </span>
                        <span>•</span>
                        <span className="font-bold text-blue-900">{buildingWeight.toFixed(1)} kg</span>
                        <span>•</span>
                        <span className="font-black text-emerald-700">{buildingRevenue} kr</span>
                      </div>
                    </div>

                    {/* Orders inside this building */}
                    <div className="p-4 divide-y divide-slate-100">
                      {buildingOrders.length === 0 ? (
                        <div className="py-4 text-center text-xs text-slate-400">
                          No orders registered for this stop yet.
                        </div>
                      ) : (
                        buildingOrders.map((bo) => (
                          <div
                            key={bo.id}
                            className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900">
                                  {bo.customer.firstName} {bo.customer.lastName}
                                </span>
                                <span className="text-slate-500 font-medium">({bo.customer.apartmentNumber})</span>
                                {getStatusBadge(bo.status)}
                              </div>
                              <div className="text-slate-500 flex items-center gap-3">
                                <span>Phone: <strong>{bo.customer.phone}</strong></span>
                                <span>•</span>
                                <span>Weight: {bo.totalWeightKg.toFixed(1)} kg</span>
                                <span>•</span>
                                <span>Total: <strong>{bo.totalAmountNOK} kr</strong></span>
                              </div>
                              {bo.customer.notes && (
                                <div className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mt-1 max-w-lg">
                                  Note: {bo.customer.notes}
                                </div>
                              )}
                            </div>

                            {/* Status Changer dropdown */}
                            <div className="flex items-center gap-2 self-end sm:self-auto">
                              <select
                                value={bo.status}
                                onChange={(e) =>
                                  updateStoredOrderStatus(bo.id, e.target.value as OrderStatus)
                                }
                                className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-800 bg-white"
                              >
                                <option value="pending">Pending Vipps</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="picked">Loaded on Van</option>
                                <option value="delivered">Delivered</option>
                              </select>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: All Orders Management Table */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by customer name, phone, or order ID..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <select
                value={selectedBuildingFilter}
                onChange={(e) => setSelectedBuildingFilter(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 outline-none"
              >
                <option value="all">All Building Complexes</option>
                {buildings.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Order ID</th>
                      <th className="py-3.5 px-4">Customer &amp; Phone</th>
                      <th className="py-3.5 px-4">Building Complex</th>
                      <th className="py-3.5 px-4">Items</th>
                      <th className="py-3.5 px-4 text-right">Weight</th>
                      <th className="py-3.5 px-4 text-right">Amount</th>
                      <th className="py-3.5 px-4 text-center">Status</th>
                      <th className="py-3.5 px-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-slate-400">
                          No orders found.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((o) => (
                        <tr key={o.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">{o.id}</td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900">
                              {o.customer.firstName} {o.customer.lastName}
                            </div>
                            <div className="text-[11px] text-slate-400">{o.customer.phone}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-800">{o.customer.buildingName}</div>
                            <div className="text-[11px] text-slate-400">{o.customer.apartmentNumber}</div>
                          </td>
                          <td className="py-3 px-4 max-w-xs truncate text-[11px] text-slate-600">
                            {o.items.map((i) => `${i.quantity}x ${i.product.name}`).join(', ')}
                          </td>
                          <td className="py-3 px-4 text-right font-semibold">
                            {o.totalWeightKg.toFixed(1)} kg
                          </td>
                          <td className="py-3 px-4 text-right font-black text-amber-700 text-sm">
                            {o.totalAmountNOK} kr
                          </td>
                          <td className="py-3 px-4 text-center">{getStatusBadge(o.status)}</td>
                          <td className="py-3 px-4 text-center">
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete order ${o.id}?`)) {
                                  deleteStoredOrder(o.id);
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                              title="Delete order"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
