export type ProductCategory =
  | 'flours'
  | 'rice'
  | 'lentils'
  | 'oils_ghee'
  | 'spices'
  | 'breakfast_mixes'
  | 'snacks'
  | 'pickles'
  | 'root_vegetables';

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: ProductCategory;
  brand: string;
  unit: string;
  weightKg: number;
  retailPriceNOK: number;
  wholesalePriceNOK: number;
  clubPriceNOK: number;
  savingsNOK: number;
  savingsPercent: number;
  badge?: string;
  emoji: string;
  description: string;
  isPopular?: boolean;
  isGlassJar?: boolean;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface BuildingCluster {
  id: string;
  name: string;
  area: string;
  address: string;
  targetOrders: number;
  currentOrders: number;
  nextDeliveryDate: string; // e.g. "Lørdag 13. Sep"
  pickupWindow: string;    // e.g. "11:00 – 11:45"
  hostName?: string;
  hostContact?: string;
  isCustom?: boolean;
}

export type OrderStatus = 'pending' | 'confirmed' | 'picked' | 'delivered';

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  buildingId: string;
  buildingName: string;
  apartmentNumber: string;
  address: string;
  deliverySlot: string;
  notes?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: CustomerInfo;
  items: CartItem[];
  itemCount: number;
  totalAmountNOK: number;
  totalWholesaleCostNOK: number;
  totalRetailValueNOK: number;
  totalSavingsNOK: number;
  totalWeightKg: number;
  status: OrderStatus;
  paymentMethod: 'vipps';
}

export interface Supplier {
  id: string;
  name: string;
  categoryBadge: string;
  address: string;
  area: string;
  phone: string;
  email: string;
  openingHours: string;
  moqNotes: string;
  specialties: string[];
  paymentTerms: string;
  mapsUrl: string;
  website?: string;
  recommendedFor: string;
}
