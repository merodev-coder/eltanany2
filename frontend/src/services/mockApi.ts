import { laptops, accessories, orders, saveOrder, updateOrderStatus, updateOrderDeposit, updateOrderDepositVerification, governorates, heroSlides, whyCards, testimonials, stats, trustedBrands, categoryCards, saveAdminProduct, getAllCatalogProducts, getDeliverySettingsData, saveDeliverySettingsData, getMonthlyInventoryArchives, getMonthlyInventoryByKey } from './mockData';
import type { Product, Order, FilterOptions, Governorate, HeroSlide, WhyCard, Testimonial, StatItem, PriceListFile, AddProductInput, InventoryItem, InventoryStats, InventoryLedgerItem, DeliverySettings, MonthlyInventorySnapshot, OrderDeposit } from '@/types';

const PRICE_LIST_STORAGE_KEY = 'eltanany_price_list';

let priceListMemory: PriceListFile | null = null;
let priceListObjectUrl: string | null = null;

function loadPriceListFromStorage(): PriceListFile | null {
  if (priceListMemory) return priceListMemory;
  try {
    const raw = localStorage.getItem(PRICE_LIST_STORAGE_KEY);
    if (!raw) return null;
    priceListMemory = JSON.parse(raw) as PriceListFile;
    return priceListMemory;
  } catch {
    return null;
  }
}

function revokePriceListObjectUrl() {
  if (priceListObjectUrl) {
    URL.revokeObjectURL(priceListObjectUrl);
    priceListObjectUrl = null;
  }
}

function savePriceListToStorage(file: PriceListFile) {
  revokePriceListObjectUrl();
  priceListMemory = file;
  try {
    localStorage.setItem(PRICE_LIST_STORAGE_KEY, JSON.stringify(file));
  } catch {
    priceListMemory = file;
  }
}

function clearPriceListStorage() {
  revokePriceListObjectUrl();
  priceListMemory = null;
  try {
    localStorage.removeItem(PRICE_LIST_STORAGE_KEY);
  } catch {
    priceListMemory = null;
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1] || result;
      resolve(base64);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function normalizeBase64(value: string): string {
  const trimmed = value.trim();
  if (trimmed.includes(',')) {
    return trimmed.split(',').pop()?.trim() || trimmed;
  }
  return trimmed.replace(/\s/g, '');
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const normalized = normalizeBase64(base64);
  const binary = atob(normalized);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

export async function getPriceList(): Promise<PriceListFile | null> {
  await delay(200);
  return loadPriceListFromStorage();
}

export async function getPriceListArrayBuffer(): Promise<ArrayBuffer | null> {
  await delay(200);
  const file = loadPriceListFromStorage();
  if (!file) return null;
  return base64ToArrayBuffer(file.base64);
}

export function getPriceListObjectUrl(): string | null {
  const file = loadPriceListFromStorage();
  if (!file) {
    revokePriceListObjectUrl();
    return null;
  }
  if (priceListObjectUrl) return priceListObjectUrl;
  const buffer = base64ToArrayBuffer(file.base64);
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
  priceListObjectUrl = URL.createObjectURL(blob);
  return priceListObjectUrl;
}

export async function uploadPriceList(file: File): Promise<PriceListFile> {
  await delay(600);
  if (!file.name.toLowerCase().endsWith('.docx')) {
    throw new Error('INVALID_FILE_TYPE');
  }
  clearPriceListStorage();
  const base64 = await fileToBase64(file);
  const priceList: PriceListFile = {
    name: file.name,
    uploadDate: new Date().toISOString(),
    size: file.size,
    base64,
  };
  savePriceListToStorage(priceList);
  return priceList;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getAllLaptops(): Promise<Product[]> {
  await delay(400);
  return [...laptops];
}

export async function getAllAccessories(): Promise<Product[]> {
  await delay(400);
  return [...accessories];
}

export async function getAllProducts(): Promise<Product[]> {
  await delay(500);
  return getAllCatalogProducts();
}

export async function getProductById(id: string): Promise<Product | undefined> {
  await delay(300);
  return getAllCatalogProducts().find(p => p.id === id);
}

export async function getFeaturedLaptops(): Promise<Product[]> {
  await delay(350);
  return laptops.filter(l => l.isFeatured);
}

export async function getFeaturedAccessories(): Promise<Product[]> {
  await delay(350);
  return accessories.filter(a => a.isFeatured);
}

export async function getNewArrivals(): Promise<Product[]> {
  await delay(300);
  return getAllCatalogProducts().filter(p => p.isNew);
}

export async function filterLaptops(filters: Partial<FilterOptions>): Promise<Product[]> {
  await delay(500);
  let result = [...laptops];

  if (filters.brands?.length) {
    result = result.filter(p => filters.brands!.includes(p.brand));
  }

  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    result = result.filter(p => p.price >= min && p.price <= max);
  }

  if (filters.categories?.length) {
    result = result.filter(p => filters.categories!.includes(p.subcategory || ''));
  }

  if (filters.cpu?.length) {
    result = result.filter(p => {
      const cpu = p.specs['المعالج'] || '';
      return filters.cpu!.some(c => cpu.toLowerCase().includes(c.toLowerCase()));
    });
  }

  if (filters.gpu?.length) {
    result = result.filter(p => {
      const gpu = p.specs['كرت الشاشة'] || '';
      return filters.gpu!.some(g => gpu.toLowerCase().includes(g.toLowerCase()));
    });
  }

  if (filters.ram?.length) {
    result = result.filter(p => {
      const ram = p.specs['الرام'] || '';
      return filters.ram!.some(r => ram.includes(r));
    });
  }

  if (filters.storage?.length) {
    result = result.filter(p => {
      const storage = p.specs['التخزين'] || '';
      return filters.storage!.some(s => storage.includes(s));
    });
  }

  if (filters.screenSize?.length) {
    result = result.filter(p => {
      const screen = p.specs['الشاشة'] || '';
      return filters.screenSize!.some(s => screen.includes(s));
    });
  }

  if (filters.os?.length) {
    result = result.filter(p => {
      const os = p.specs['نظام التشغيل'] || '';
      return filters.os!.some(o => os.toLowerCase().includes(o.toLowerCase()));
    });
  }

  return result;
}

export async function filterAccessories(subcategory?: string): Promise<Product[]> {
  await delay(400);
  if (subcategory) {
    return accessories.filter(a => a.subcategory === subcategory);
  }
  return [...accessories];
}

export async function searchProducts(query: string): Promise<Product[]> {
  await delay(400);
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return getAllCatalogProducts().filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.category.includes(q) ||
    (p.subcategory || '').includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}

export async function getRelatedProducts(productId: string, category: 'laptop' | 'accessory'): Promise<Product[]> {
  await delay(350);
  const pool = category === 'laptop' ? laptops : accessories;
  return pool.filter(p => p.id !== productId).slice(0, 6);
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  await delay(200);
  return [...heroSlides];
}

export async function getWhyCards(): Promise<WhyCard[]> {
  await delay(200);
  return [...whyCards];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  await delay(200);
  return [...testimonials];
}

export async function getStats(): Promise<StatItem[]> {
  await delay(200);
  return [...stats];
}

export async function getTrustedBrands(): Promise<typeof trustedBrands> {
  await delay(200);
  return [...trustedBrands];
}

export async function getCategoryCards(): Promise<typeof categoryCards> {
  await delay(200);
  return [...categoryCards];
}

export async function getGovernorates(): Promise<Governorate[]> {
  await delay(200);
  return [...governorates];
}

export async function createOrder(order: Omit<Order, 'id' | 'date' | 'status'>): Promise<Order> {
  await delay(800);
  const newOrder: Order = {
    ...order,
    id: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    date: new Date().toISOString(),
    status: 'pending',
  };
  saveOrder(newOrder);
  return newOrder;
}

export async function getOrders(): Promise<Order[]> {
  await delay(400);
  return [...orders];
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  await delay(300);
  return orders.find(o => o.id === id);
}

export async function updateOrderStatusAsync(orderId: string, status: Order['status']): Promise<void> {
  await delay(400);
  updateOrderStatus(orderId, status);
}

export async function deleteOrder(orderId: string): Promise<void> {
  await delay(300);
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx !== -1) {
    orders.splice(idx, 1);
    try {
      localStorage.setItem('eltanany_orders', JSON.stringify(orders));
    } catch {
      // silently fail
    }
  }
}

export function getFilterOptions(): {
  brands: string[];
  cpus: string[];
  gpus: string[];
  rams: string[];
  storages: string[];
  screenSizes: string[];
  oss: string[];
  subcategories: string[];
} {
  const allLaptops = laptops;
  const cpus = [...new Set(allLaptops.map(l => l.specs['المعالج']).filter(Boolean))];
  const gpus = [...new Set(allLaptops.map(l => l.specs['كرت الشاشة']).filter(Boolean))];
  const rams = [...new Set(allLaptops.map(l => l.specs['الرام']).filter(Boolean))];
  const storages = [...new Set(allLaptops.map(l => l.specs['التخزين']).filter(Boolean))];
  const screenSizes = [...new Set(allLaptops.map(l => l.specs['الشاشة']).filter(Boolean))];
  const oss = [...new Set(allLaptops.map(l => l.specs['نظام التشغيل']).filter(Boolean))];
  const subcategories = [...new Set(allLaptops.map(l => l.subcategory).filter(Boolean))] as string[];
  return { brands, cpus, gpus, rams, storages, screenSizes, oss, subcategories };
}

const laptopBrands = [...new Set(laptops.map(l => l.brand))];
const accessoryBrands = [...new Set(accessories.map(a => a.brand))];
const brands = [...new Set([...laptopBrands, ...accessoryBrands])];

function getUnitsSoldForProduct(productId: string): number {
  return orders.reduce((sum, order) => {
    if (order.status === 'cancelled') return sum;
    const match = order.items.find(item => item.product.id === productId);
    return sum + (match?.quantity || 0);
  }, 0);
}

function getLedgerStatus(stock: number): InventoryLedgerItem['status'] {
  if (stock <= 0) return 'out';
  if (stock <= 5) return 'critical';
  return 'high';
}

function estimateCostPrice(sellingPrice: number): number {
  return Math.round(sellingPrice * 0.72);
}

function mapProductToLedgerItem(product: Product, stockOverride?: number, unitsSoldOverride?: number): InventoryLedgerItem {
  const stock = stockOverride ?? product.stock;
  const unitsSold = unitsSoldOverride ?? getUnitsSoldForProduct(product.id);
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    image: product.images[0] || '/images/logo.jpeg',
    category: product.category,
    costPrice: estimateCostPrice(product.price),
    sellingPrice: product.price,
    stock,
    unitsSold,
    status: getLedgerStatus(stock),
  };
}

export async function addProduct(input: AddProductInput): Promise<Product> {
  await delay(700);
  const prefix = input.category === 'laptop' ? 'lp' : 'acc';
  const product: Product = {
    id: `${prefix}-${Date.now()}`,
    name: input.name,
    brand: input.brand,
    category: input.category,
    subcategory: input.category === 'laptop' ? 'general' : 'general',
    price: input.price,
    oldPrice: input.oldPrice,
    images: input.images.length > 0 ? input.images : ['/images/logo.jpeg'],
    description: input.description,
    specs: input.specs,
    stock: input.stock,
    rating: 0,
    reviewCount: 0,
    reviews: [],
    isFeatured: false,
    isNew: true,
  };
  saveAdminProduct(product);
  return product;
}

export async function getInventoryItems(): Promise<InventoryItem[]> {
  await delay(400);
  return getAllCatalogProducts().map(product => ({
    id: product.id,
    name: product.name,
    brand: product.brand,
    image: product.images[0] || '/images/logo.jpeg',
    stock: product.stock,
    unitsSold: getUnitsSoldForProduct(product.id),
    status: getLedgerStatus(product.stock),
  }));
}

export async function getInventoryLedger(monthKey?: string): Promise<InventoryLedgerItem[]> {
  await delay(400);
  if (monthKey && monthKey !== 'current') {
    const snapshot = getMonthlyInventoryByKey(monthKey);
    if (snapshot) {
      return snapshot.items.map(item => {
        const product = getAllCatalogProducts().find(p => p.id === item.productId);
        const sellingPrice = product?.price || Math.round(item.revenue / Math.max(item.unitsSold, 1));
        return {
          id: item.productId,
          name: item.productName,
          brand: item.brand,
          image: item.image,
          category: item.category,
          costPrice: estimateCostPrice(sellingPrice),
          sellingPrice,
          stock: item.closingStock,
          unitsSold: item.unitsSold,
          status: getLedgerStatus(item.closingStock),
        };
      });
    }
  }
  return getAllCatalogProducts().map(p => mapProductToLedgerItem(p));
}

export async function getInventoryStats(monthKey?: string): Promise<InventoryStats> {
  await delay(300);
  const ledger = monthKey && monthKey !== 'current'
    ? await getInventoryLedger(monthKey)
    : getAllCatalogProducts().map(p => mapProductToLedgerItem(p));
  const lowStockCount = ledger.filter(item => item.status === 'critical').length;
  const totalInventoryValue = ledger.reduce((sum, item) => sum + item.stock * item.sellingPrice, 0);
  const activeProductsCount = ledger.filter(item => item.stock > 0).length;
  return { totalInventoryValue, lowStockCount, activeProductsCount };
}

export async function getDeliverySettings(): Promise<DeliverySettings> {
  await delay(250);
  const data = getDeliverySettingsData();
  return {
    shippingCompanies: data.shippingCompanies.map(c => ({ ...c })),
    governorates: data.governorates.map(g => ({ ...g })),
    storePickup: { ...data.storePickup },
  };
}

export async function updateDeliverySettings(settings: DeliverySettings): Promise<DeliverySettings> {
  await delay(500);
  saveDeliverySettingsData(settings);
  return settings;
}

export async function getMonthlyInventoryList(): Promise<MonthlyInventorySnapshot[]> {
  await delay(300);
  return getMonthlyInventoryArchives().map(snapshot => ({
    ...snapshot,
    items: [...snapshot.items],
    monthlyRevenue: { ...snapshot.monthlyRevenue },
  }));
}

export async function getMonthlyInventory(monthKey: string): Promise<MonthlyInventorySnapshot | null> {
  await delay(300);
  const snapshot = getMonthlyInventoryByKey(monthKey);
  if (!snapshot) return null;
  return {
    ...snapshot,
    items: [...snapshot.items],
    monthlyRevenue: { ...snapshot.monthlyRevenue },
  };
}

export async function updateOrderDepositAsync(orderId: string, deposit: OrderDeposit): Promise<void> {
  await delay(400);
  updateOrderDeposit(orderId, deposit);
}

export async function updateOrderDepositVerificationAsync(orderId: string, status: 'pending' | 'confirmed' | 'rejected'): Promise<void> {
  await delay(400);
  updateOrderDepositVerification(orderId, status);
}
