export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'laptop' | 'accessory';
  subcategory?: string;
  price: number;
  oldPrice?: number;
  images: string[];
  description: string;
  specs: Record<string, string>;
  stock: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  badge?: string;
  isFeatured: boolean;
  isNew: boolean;
  compatibility?: string[];
  colors?: string[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
}

export interface Order {
  id: string;
  customer: CustomerInfo;
  items: CartItem[];
  deliveryMethod: 'home' | 'pickup';
  paymentMethod: 'cod';
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  date: string;
  deposit?: OrderDeposit;
}

export interface OrderDeposit {
  paidAmount: number;
  remainingAmount: number;
  receiptImage?: string;
  verificationStatus?: 'pending' | 'confirmed' | 'rejected';
}

export interface CustomerInfo {
  name: string;
  phone: string;
  governorate: string;
  city: string;
  address: string;
  landmark?: string;
}

export interface FilterOptions {
  brands: string[];
  priceRange: [number, number];
  categories: string[];
  cpu?: string[];
  gpu?: string[];
  ram?: string[];
  storage?: string[];
  screenSize?: string[];
  os?: string[];
}

export interface Governorate {
  name: string;
  cities: string[];
}

export interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  cta: string;
  image: string;
  link: string;
}

export interface WhyCard {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
}

export interface StatItem {
  id: number;
  label: string;
  value: string;
  suffix?: string;
}

export interface PriceListFile {
  name: string;
  uploadDate: string;
  size: number;
  base64: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  stock: number;
  unitsSold: number;
  status: 'high' | 'critical' | 'out';
}

export interface InventoryLedgerItem {
  id: string;
  name: string;
  brand: string;
  image: string;
  category: 'laptop' | 'accessory';
  costPrice: number;
  sellingPrice: number;
  stock: number;
  unitsSold: number;
  status: 'high' | 'critical' | 'out';
}

export interface InventoryStats {
  totalInventoryValue: number;
  lowStockCount: number;
  activeProductsCount: number;
}

export interface ShippingCompany {
  id: string;
  name: string;
  active: boolean;
  deliverySla: string;
  trackingUrl?: string;
}

export interface DeliveryGovernorate {
  id: string;
  name: string;
  shippingFee: number;
  carrierId: string;
}

export interface DeliverySettings {
  shippingCompanies: ShippingCompany[];
  governorates: DeliveryGovernorate[];
  storePickup: {
    enabled: boolean;
    address: string;
    workingHours: string;
  };
}

export interface MonthlyInventoryRecord {
  productId: string;
  productName: string;
  brand: string;
  image: string;
  category: 'laptop' | 'accessory';
  openingStock: number;
  closingStock: number;
  unitsSold: number;
  revenue: number;
  difference: number;
}

export interface MonthlyInventorySnapshot {
  monthKey: string;
  label: string;
  beginningStockValue: number;
  currentStockValue: number;
  unitsSoldThisMonth: number;
  monthlyRevenue: {
    laptops: number;
    accessories: number;
    total: number;
  };
  items: MonthlyInventoryRecord[];
}

export interface AddProductInput {
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  stock: number;
  category: 'laptop' | 'accessory';
  description: string;
  specs: Record<string, string>;
  images: string[];
}
