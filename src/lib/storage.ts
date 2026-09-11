'use client';

import { Order, BuildingCluster, CartItem, OrderStatus } from '@/types';
import { INITIAL_BUILDINGS, INITIAL_PRODUCTS } from './data';

const STORAGE_KEYS = {
  ORDERS: 'desi_bulk_orders_v1',
  BUILDINGS: 'desi_bulk_buildings_v1',
  SELECTED_BUILDING: 'desi_bulk_selected_building_v1',
  CART: 'desi_bulk_cart_v1',
};

// Helper for SSR safety
const isBrowser = typeof window !== 'undefined';

// Dispatch custom event so all reactive components re-render immediately
function dispatchStorageEvent(key: string) {
  if (isBrowser) {
    window.dispatchEvent(new CustomEvent('desi-storage-update', { detail: { key } }));
  }
}

// Initial demo orders to populate the admin and building stats realistically
function getInitialSeedOrders(): Order[] {
  return [
    {
      id: 'ORD-2026-0801',
      createdAt: '2026-09-07T18:30:00Z',
      customer: {
        firstName: 'Rajesh',
        lastName: 'Sharma',
        phone: '92345678',
        email: 'rajesh.sharma@example.com',
        buildingId: 'fornebu-portal',
        buildingName: 'Fornebu Portal & Rolfsbuktveien',
        apartmentNumber: 'Leil. 402',
        address: 'Rolfsbuktveien 17, 1364 Fornebu',
        deliverySlot: 'Saturday 10:30 – 11:15 AM',
        notes: 'Ring doorbell or hand over to delivery coordinator at guest parking.',
      },
      items: [
        {
          product: INITIAL_PRODUCTS.find((p) => p.id === 'flour-aashirvaad-10kg')!,
          quantity: 1,
        },
        {
          product: INITIAL_PRODUCTS.find((p) => p.id === 'rice-daawat-10kg')!,
          quantity: 1,
        },
        {
          product: INITIAL_PRODUCTS.find((p) => p.id === 'oil-mustard-5l')!,
          quantity: 1,
        },
        {
          product: INITIAL_PRODUCTS.find((p) => p.id === 'ghee-amul-1l')!,
          quantity: 1,
        },
        {
          product: INITIAL_PRODUCTS.find((p) => p.id === 'pickle-mothers-mango-500g')!,
          quantity: 2,
        },
        {
          product: INITIAL_PRODUCTS.find((p) => p.id === 'veg-onion-5kg')!,
          quantity: 1,
        },
      ],
      itemCount: 7,
      totalAmountNOK: 933,
      totalWholesaleCostNOK: 541,
      totalRetailValueNOK: 1294,
      totalSavingsNOK: 361,
      totalWeightKg: 32.1,
      status: 'confirmed',
      paymentMethod: 'vipps',
    },
    {
      id: 'ORD-2026-0802',
      createdAt: '2026-09-08T09:15:00Z',
      customer: {
        firstName: 'Pooja',
        lastName: 'Nair',
        phone: '41238901',
        email: 'pooja.nair@example.com',
        buildingId: 'lysaker-brygge',
        buildingName: 'Lysaker Brygge Sameie',
        apartmentNumber: 'Oppgang B, H0301',
        address: 'Lysaker Brygge 28, 1366 Lysaker',
        deliverySlot: 'Saturday 11:45 AM – 12:30 PM',
        notes: 'Will meet you by the goods entrance in the basement.',
      },
      items: [
        {
          product: INITIAL_PRODUCTS.find((p) => p.id === 'flour-aashirvaad-5kg')!,
          quantity: 1,
        },
        {
          product: INITIAL_PRODUCTS.find((p) => p.id === 'rice-sonamasoori-5kg')!,
          quantity: 1,
        },
        {
          product: INITIAL_PRODUCTS.find((p) => p.id === 'dal-toor-2kg')!,
          quantity: 1,
        },
        {
          product: INITIAL_PRODUCTS.find((p) => p.id === 'dal-urad-2kg')!,
          quantity: 1,
        },
        {
          product: INITIAL_PRODUCTS.find((p) => p.id === 'oil-sesame-1l')!,
          quantity: 2,
        },
        {
          product: INITIAL_PRODUCTS.find((p) => p.id === 'snack-banana-chips-250g')!,
          quantity: 3,
        },
      ],
      itemCount: 9,
      totalAmountNOK: 638,
      totalWholesaleCostNOK: 388,
      totalRetailValueNOK: 874,
      totalSavingsNOK: 236,
      totalWeightKg: 17.65,
      status: 'confirmed',
      paymentMethod: 'vipps',
    },
    {
      id: 'ORD-2026-0803',
      createdAt: '2026-09-08T11:40:00Z',
      customer: {
        firstName: 'Anand',
        lastName: 'Verma',
        phone: '98765432',
        email: 'anand.verma@example.com',
        buildingId: 'lillestrom-stasjon',
        buildingName: 'Lillestrøm Stasjonsby Borettslag',
        apartmentNumber: 'Leil. 12',
        address: 'Kanalveien 14, 2000 Lillestrøm',
        deliverySlot: 'Saturday 1:15 – 2:00 PM',
        notes: 'Will come down with a shopping trolley.',
      },
      items: [
        {
          product: INITIAL_PRODUCTS.find((p) => p.id === 'flour-aashirvaad-10kg')!,
          quantity: 1,
        },
        {
          product: INITIAL_PRODUCTS.find((p) => p.id === 'rice-indiagate-5kg')!,
          quantity: 1,
        },
        {
          product: INITIAL_PRODUCTS.find((p) => p.id === 'oil-sunflower-5l')!,
          quantity: 1,
        },
        {
          product: INITIAL_PRODUCTS.find((p) => p.id === 'ghee-amul-5l')!,
          quantity: 1,
        },
        {
          product: INITIAL_PRODUCTS.find((p) => p.id === 'veg-onion-10kg')!,
          quantity: 1,
        },
        {
          product: INITIAL_PRODUCTS.find((p) => p.id === 'veg-potato-10kg')!,
          quantity: 1,
        },
        {
          product: INITIAL_PRODUCTS.find((p) => p.id === 'snack-haldiram-aloobhujia-400g')!,
          quantity: 2,
        },
      ],
      itemCount: 8,
      totalAmountNOK: 1602,
      totalWholesaleCostNOK: 983,
      totalRetailValueNOK: 2265,
      totalSavingsNOK: 663,
      totalWeightKg: 45.0,
      status: 'pending',
      paymentMethod: 'vipps',
    },
  ];
}

// ----------------- ORDERS REPOSITORY -----------------
export function getStoredOrders(): Order[] {
  if (!isBrowser) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      const initial = getInitialSeedOrders();
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse orders from localStorage', err);
    return [];
  }
}

export function saveStoredOrder(order: Order): void {
  if (!isBrowser) return;
  try {
    const orders = getStoredOrders();
    const updated = [order, ...orders];
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));

    // Also update current orders count in the building cluster
    incrementBuildingOrderCount(order.customer.buildingId);

    dispatchStorageEvent(STORAGE_KEYS.ORDERS);
  } catch (err) {
    console.error('Failed to save order to localStorage', err);
  }
}

export function updateStoredOrderStatus(orderId: string, status: OrderStatus): void {
  if (!isBrowser) return;
  try {
    const orders = getStoredOrders();
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
    dispatchStorageEvent(STORAGE_KEYS.ORDERS);
  } catch (err) {
    console.error('Failed to update order status', err);
  }
}

export function deleteStoredOrder(orderId: string): void {
  if (!isBrowser) return;
  try {
    const orders = getStoredOrders();
    const updated = orders.filter((o) => o.id !== orderId);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
    dispatchStorageEvent(STORAGE_KEYS.ORDERS);
  } catch (err) {
    console.error('Failed to delete order', err);
  }
}

// ----------------- BUILDINGS REPOSITORY -----------------
export function getStoredBuildings(): BuildingCluster[] {
  if (!isBrowser) return INITIAL_BUILDINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BUILDINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BUILDINGS, JSON.stringify(INITIAL_BUILDINGS));
      return INITIAL_BUILDINGS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read buildings from localStorage', err);
    return INITIAL_BUILDINGS;
  }
}

export function saveStoredBuilding(building: BuildingCluster): void {
  if (!isBrowser) return;
  try {
    const buildings = getStoredBuildings();
    const exists = buildings.find((b) => b.id === building.id);
    const updated = exists ? buildings.map((b) => (b.id === building.id ? building : b)) : [building, ...buildings];
    localStorage.setItem(STORAGE_KEYS.BUILDINGS, JSON.stringify(updated));
    dispatchStorageEvent(STORAGE_KEYS.BUILDINGS);
  } catch (err) {
    console.error('Failed to save building to localStorage', err);
  }
}

function incrementBuildingOrderCount(buildingId: string): void {
  if (!isBrowser) return;
  try {
    const buildings = getStoredBuildings();
    const updated = buildings.map((b) =>
      b.id === buildingId ? { ...b, currentOrders: b.currentOrders + 1 } : b
    );
    localStorage.setItem(STORAGE_KEYS.BUILDINGS, JSON.stringify(updated));
    dispatchStorageEvent(STORAGE_KEYS.BUILDINGS);
  } catch (err) {
    console.error('Failed to increment building count', err);
  }
}

export function getStoredSelectedBuilding(): BuildingCluster {
  if (!isBrowser) return INITIAL_BUILDINGS[0];
  try {
    const selectedId = localStorage.getItem(STORAGE_KEYS.SELECTED_BUILDING);
    const buildings = getStoredBuildings();
    if (selectedId) {
      const match = buildings.find((b) => b.id === selectedId);
      if (match) return match;
    }
    return buildings[0] || INITIAL_BUILDINGS[0];
  } catch {
    return INITIAL_BUILDINGS[0];
  }
}

export function setStoredSelectedBuilding(buildingId: string): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(STORAGE_KEYS.SELECTED_BUILDING, buildingId);
    dispatchStorageEvent(STORAGE_KEYS.SELECTED_BUILDING);
  } catch (err) {
    console.error('Failed to set selected building', err);
  }
}

// ----------------- CART REPOSITORY -----------------
export function getStoredCart(): CartItem[] {
  if (!isBrowser) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CART);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredCart(cart: CartItem[]): void {
  if (!isBrowser) return;
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    dispatchStorageEvent(STORAGE_KEYS.CART);
  } catch (err) {
    console.error('Failed to save cart to localStorage', err);
  }
}

export function clearStoredCart(): void {
  if (!isBrowser) return;
  try {
    localStorage.removeItem(STORAGE_KEYS.CART);
    dispatchStorageEvent(STORAGE_KEYS.CART);
  } catch (err) {
    console.error('Failed to clear cart', err);
  }
}
