import type { Product, Governorate, HeroSlide, WhyCard, Testimonial, StatItem, Order, DeliverySettings, MonthlyInventorySnapshot, MonthlyInventoryRecord, ShippingCompany, DeliveryGovernorate } from '@/types';

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    title: 'أحدث لابتوبات الألعاب',
    subtitle: 'تجربة ألعاب لا تُنسى مع أقوى المعالجات وكروت الشاشة',
    cta: 'تسوق الآن',
    image: '/images/hero-1.jpg',
    link: '/laptops',
  },
  {
    id: 2,
    title: 'لابتوبات للأعمال والإنتاجية',
    subtitle: 'أداء احترافي لتنجز أكثر في وقت أقل',
    cta: 'اكتشف المزيد',
    image: '/images/hero-2.jpg',
    link: '/laptops',
  },
  {
    id: 3,
    title: 'إكسسوارات احترافية',
    subtitle: 'ماوس، كيبورد، سماعات وكل ما يكمل إعدادك',
    cta: 'تصفح الإكسسوارات',
    image: '/images/hero-3.jpg',
    link: '/accessories',
  },
  {
    id: 4,
    title: 'عروض حصرية',
    subtitle: 'خصومات تصل إلى 30% على أجهزة مختارة',
    cta: 'شوف العروض',
    image: '/images/hero-4.jpg',
    link: '/laptops',
  },
];

export const laptops: Product[] = [
  {
    id: 'lp-001',
    name: 'ASUS ROG Strix G16',
    brand: 'ASUS',
    category: 'laptop',
    subcategory: 'gaming',
    price: 42900,
    oldPrice: 48500,
    images: ['/images/laptops/asus-rog-g16.jpg'],
    description: 'لابتوب ألعاب قوي مع معالج Intel Core i9-13980HX وكرت شاشة RTX 4070، شاشة 16 بوصة FHD+ 165Hz',
    specs: {
      المعالج: 'Intel Core i9-13980HX',
      'كرت الشاشة': 'NVIDIA RTX 4070 8GB',
      الرام: '32GB DDR5',
      'التخزين': '1TB NVMe SSD',
      'الشاشة': '16.0" FHD+ 165Hz',
      'نظام التشغيل': 'Windows 11',
      'الوزن': '2.5 كجم',
    },
    stock: 12,
    rating: 4.8,
    reviewCount: 156,
    reviews: [
      { id: 'r1', author: 'محمد أ.', rating: 5, text: 'أداء خرافي في الألعاب، درجة الحرارة منظمة بشكل ممتاز', date: '2026-06-10', verified: true },
      { id: 'r2', author: 'أحمد س.', rating: 4, text: 'جهاز ممتاز بس البطارية ممكن تكون أحسن', date: '2026-05-28', verified: true },
    ],
    badge: 'الأكثر مبيعاً',
    isFeatured: true,
    isNew: false,
  },
  {
    id: 'lp-002',
    name: 'Lenovo Legion Pro 7i',
    brand: 'Lenovo',
    category: 'laptop',
    subcategory: 'gaming',
    price: 52500,
    oldPrice: 58000,
    images: ['/images/laptops/legion-pro7i.jpg'],
    description: 'أقوى لابتوب ألعاب من لينوفو مع RTX 4080 وشاشة 240Hz',
    specs: {
      المعالج: 'Intel Core i9-13900HX',
      'كرت الشاشة': 'NVIDIA RTX 4080 12GB',
      الرام: '32GB DDR5',
      'التخزين': '2TB NVMe SSD',
      'الشاشة': '16.0" WQXGA 240Hz',
      'نظام التشغيل': 'Windows 11',
      'الوزن': '2.8 كجم',
    },
    stock: 8,
    rating: 4.9,
    reviewCount: 89,
    reviews: [
      { id: 'r3', author: 'خالد م.', rating: 5, text: 'الأفضل في فئته، شاشة 240Hz فرق كبير في competitive gaming', date: '2026-06-15', verified: true },
    ],
    badge: 'جديد',
    isFeatured: true,
    isNew: true,
  },
  {
    id: 'lp-003',
    name: 'HP Omen 16',
    brand: 'HP',
    category: 'laptop',
    subcategory: 'gaming',
    price: 36900,
    oldPrice: 41000,
    images: ['/images/laptops/hp-omen-16.jpg'],
    description: 'لابتوب ألعاب متوازن مع أداء قوي وسعر تنافسي',
    specs: {
      المعالج: 'AMD Ryzen 9 7940HS',
      'كرت الشاشة': 'NVIDIA RTX 4060 8GB',
      الرام: '16GB DDR5',
      'التخزين': '1TB NVMe SSD',
      'الشاشة': '16.1" FHD 165Hz',
      'نظام التشغيل': 'Windows 11',
      'الوزن': '2.4 كجم',
    },
    stock: 15,
    rating: 4.6,
    reviewCount: 203,
    reviews: [
      { id: 'r4', author: 'يوسف ع.', rating: 5, text: 'أفضل قيمة مقابل السعر في فئة الـ4060', date: '2026-06-08', verified: true },
    ],
    badge: undefined,
    isFeatured: true,
    isNew: false,
  },
  {
    id: 'lp-004',
    name: 'MSI Katana 15',
    brand: 'MSI',
    category: 'laptop',
    subcategory: 'gaming',
    price: 28900,
    oldPrice: 32500,
    images: ['/images/laptops/msi-katana-15.jpg'],
    description: 'لابتوب ألعاب اقتصادي بأداء ممتاز للألعاب المتوسطة',
    specs: {
      المعالج: 'Intel Core i7-13620H',
      'كرت الشاشة': 'NVIDIA RTX 4050 6GB',
      الرام: '16GB DDR5',
      'التخزين': '512GB NVMe SSD',
      'الشاشة': '15.6" FHD 144Hz',
      'نظام التشغيل': 'Windows 11',
      'الوزن': '2.3 كجم',
    },
    stock: 20,
    rating: 4.4,
    reviewCount: 312,
    reviews: [],
    badge: 'خصم 11%',
    isFeatured: true,
    isNew: false,
  },
  {
    id: 'lp-005',
    name: 'Dell XPS 15',
    brand: 'Dell',
    category: 'laptop',
    subcategory: 'business',
    price: 58200,
    oldPrice: 64500,
    images: ['/images/laptops/dell-xps-15.jpg'],
    description: 'لابتوب أعمال فاخر بتصميم أنيق وأداء احترافي',
    specs: {
      المعالج: 'Intel Core i7-13700H',
      'كرت الشاشة': 'Intel Iris Xe',
      الرام: '32GB DDR5',
      'التخزين': '1TB NVMe SSD',
      'الشاشة': '15.6" 3.5K OLED',
      'نظام التشغيل': 'Windows 11 Pro',
      'الوزن': '1.86 كجم',
    },
    stock: 6,
    rating: 4.7,
    reviewCount: 134,
    reviews: [
      { id: 'r5', author: 'سارة خ.', rating: 5, text: 'تصميم رائع وشاشة OLED مبهرة، ممتاز للتصميم', date: '2026-06-01', verified: true },
    ],
    badge: 'فاخر',
    isFeatured: true,
    isNew: false,
  },
  {
    id: 'lp-006',
    name: 'MacBook Pro 16 M3 Pro',
    brand: 'Apple',
    category: 'laptop',
    subcategory: 'business',
    price: 89500,
    images: ['/images/laptops/macbook-pro-16.jpg'],
    description: 'أقوى لابتوب من Apple مع شريحة M3 Pro لاحترافيين المحتوى',
    specs: {
      المعالج: 'Apple M3 Pro 12-core',
      'كرت الشاشة': '18-core GPU',
      الرام: '18GB Unified',
      'التخزين': '512GB SSD',
      'الشاشة': '16.2" Liquid Retina XDR',
      'نظام التشغيل': 'macOS Sonoma',
      'الوزن': '2.14 كجم',
    },
    stock: 4,
    rating: 4.9,
    reviewCount: 67,
    reviews: [],
    badge: 'جديد',
    isFeatured: true,
    isNew: true,
  },
  {
    id: 'lp-007',
    name: 'Lenovo ThinkPad X1 Carbon',
    brand: 'Lenovo',
    category: 'laptop',
    subcategory: 'business',
    price: 46800,
    images: ['/images/laptops/thinkpad-x1.jpg'],
    description: 'لابتوب أعمال فائق الخفة مع متانة عسكرية',
    specs: {
      المعالج: 'Intel Core i7-1365U',
      'كرت الشاشة': 'Intel Iris Xe',
      الرام: '16GB LPDDR5',
      'التخزين': '1TB NVMe SSD',
      'الشاشة': '14.0" WUXGA IPS',
      'نظام التشغيل': 'Windows 11 Pro',
      'الوزن': '1.12 كجم',
    },
    stock: 9,
    rating: 4.7,
    reviewCount: 178,
    reviews: [],
    badge: undefined,
    isFeatured: true,
    isNew: false,
  },
  {
    id: 'lp-008',
    name: 'ASUS Zenbook 14 OLED',
    brand: 'ASUS',
    category: 'laptop',
    subcategory: 'business',
    price: 31500,
    oldPrice: 34900,
    images: ['/images/laptops/zenbook-14.jpg'],
    description: 'لابتوب أنيق وخفيف بشاشة OLED مذهلة',
    specs: {
      المعالج: 'AMD Ryzen 9 7940HS',
      'كرت الشاشة': 'AMD Radeon 780M',
      الرام: '16GB LPDDR5',
      'التخزين': '1TB NVMe SSD',
      'الشاشة': '14.0" 2.8K OLED 90Hz',
      'نظام التشغيل': 'Windows 11',
      'الوزن': '1.39 كجم',
    },
    stock: 14,
    rating: 4.5,
    reviewCount: 245,
    reviews: [],
    badge: undefined,
    isFeatured: true,
    isNew: false,
  },
  {
    id: 'lp-009',
    name: 'Acer Nitro 5',
    brand: 'Acer',
    category: 'laptop',
    subcategory: 'gaming',
    price: 25500,
    oldPrice: 28900,
    images: ['/images/laptops/acer-nitro-5.jpg'],
    description: 'لابتوب ألعاب اقتصادي للمبتدئين',
    specs: {
      المعالج: 'Intel Core i5-12500H',
      'كرت الشاشة': 'NVIDIA RTX 3050 4GB',
      الرام: '8GB DDR4',
      'التخزين': '512GB NVMe SSD',
      'الشاشة': '15.6" FHD 144Hz',
      'نظام التشغيل': 'Windows 11',
      'الوزن': '2.5 كجم',
    },
    stock: 18,
    rating: 4.2,
    reviewCount: 421,
    reviews: [],
    badge: 'خصم 12%',
    isFeatured: false,
    isNew: false,
  },
  {
    id: 'lp-010',
    name: 'HP Pavilion 15',
    brand: 'HP',
    category: 'laptop',
    subcategory: 'business',
    price: 19500,
    images: ['/images/laptops/hp-pavilion-15.jpg'],
    description: 'لابتوب متعدد الاستخدامات بسعر ممتاز',
    specs: {
      المعالج: 'AMD Ryzen 7 7730U',
      'كرت الشاشة': 'AMD Radeon Graphics',
      الرام: '16GB DDR4',
      'التخزين': '512GB NVMe SSD',
      'الشاشة': '15.6" FHD IPS',
      'نظام التشغيل': 'Windows 11',
      'الوزن': '1.74 كجم',
    },
    stock: 22,
    rating: 4.3,
    reviewCount: 189,
    reviews: [],
    badge: undefined,
    isFeatured: false,
    isNew: false,
  },
  {
    id: 'lp-011',
    name: 'MSI Raider GE78',
    brand: 'MSI',
    category: 'laptop',
    subcategory: 'gaming',
    price: 78500,
    images: ['/images/laptops/msi-raider-ge78.jpg'],
    description: 'لابتوب ألعاب فاخر بأقوى المواصفات',
    specs: {
      المعالج: 'Intel Core i9-13980HX',
      'كرت الشاشة': 'NVIDIA RTX 4090 16GB',
      الرام: '64GB DDR5',
      'التخزين': '2TB NVMe SSD',
      'الشاشة': '17.0" QHD+ 240Hz',
      'نظام التشغيل': 'Windows 11',
      'الوزن': '3.1 كجم',
    },
    stock: 3,
    rating: 4.9,
    reviewCount: 45,
    reviews: [],
    badge: 'الأقوى',
    isFeatured: false,
    isNew: true,
  },
  {
    id: 'lp-012',
    name: 'Dell G15',
    brand: 'Dell',
    category: 'laptop',
    subcategory: 'gaming',
    price: 32800,
    oldPrice: 36500,
    images: ['/images/laptops/dell-g15.jpg'],
    description: 'لابتوب ألعاب متوسط بأداء قوي',
    specs: {
      المعالج: 'Intel Core i7-13650HX',
      'كرت الشاشة': 'NVIDIA RTX 4060 8GB',
      الرام: '16GB DDR5',
      'التخزين': '512GB NVMe SSD',
      'الشاشة': '15.6" FHD 165Hz',
      'نظام التشغيل': 'Windows 11',
      'الوزن': '2.7 كجم',
    },
    stock: 11,
    rating: 4.5,
    reviewCount: 167,
    reviews: [],
    badge: undefined,
    isFeatured: false,
    isNew: false,
  },
];

export const accessories: Product[] = [
  {
    id: 'ac-001',
    name: 'Logitech G Pro X Superlight',
    brand: 'Logitech',
    category: 'accessory',
    subcategory: 'mouse',
    price: 4200,
    images: ['/images/accessories/gpro-superlight.jpg'],
    description: 'ماوس ألعاب لاسلكي فائق الخفة 63 جرام',
    specs: {
      'نوع الاتصال': 'لاسلكي LIGHTSPEED',
      'وزن': '63 جرام',
      'مستشعر': 'HERO 25K',
      'عمر البطارية': '70 ساعة',
      ' DPI': '100-25600',
    },
    stock: 30,
    rating: 4.8,
    reviewCount: 523,
    reviews: [],
    colors: ['أسود', 'أبيض', 'وردي'],
    isFeatured: true,
    isNew: false,
  },
  {
    id: 'ac-002',
    name: 'Razer DeathAdder V3 Pro',
    brand: 'Razer',
    category: 'accessory',
    subcategory: 'mouse',
    price: 5500,
    images: ['/images/accessories/deathadder-v3.jpg'],
    description: 'ماوس ألعاب احترافي لاسلكي بتصميم مريح',
    specs: {
      'نوع الاتصال': 'لاسلكي Hyperspeed',
      'وزن': '63 جرام',
      'مستشعر': 'Focus Pro 30K',
      'عمر البطارية': '90 ساعة',
      ' DPI': '100-30000',
    },
    stock: 18,
    rating: 4.7,
    reviewCount: 289,
    reviews: [],
    colors: ['أسود', 'أبيض'],
    isFeatured: true,
    isNew: true,
  },
  {
    id: 'ac-003',
    name: 'SteelSeries Arctis Nova Pro',
    brand: 'SteelSeries',
    category: 'accessory',
    subcategory: 'headset',
    price: 7800,
    images: ['/images/accessories/arctis-nova-pro.jpg'],
    description: 'سماعة ألعاب فاخرة بجودة صوت استوديو',
    specs: {
      'نوع الاتصال': 'لاسلكي + سلكي',
      'محرك الصوت': ' custom Hi-Fi 40mm',
      'عمر البطارية': '40 ساعة',
      'إلغاء الضوضاء': 'Active ANC',
      'المايك': 'ClearCast Gen 2',
    },
    stock: 10,
    rating: 4.9,
    reviewCount: 156,
    reviews: [],
    colors: ['أسود'],
    isFeatured: true,
    isNew: false,
  },
  {
    id: 'ac-004',
    name: 'HyperX Cloud III Wireless',
    brand: 'HyperX',
    category: 'accessory',
    subcategory: 'headset',
    price: 4500,
    oldPrice: 5200,
    images: ['/images/accessories/hyperx-cloud3.jpg'],
    description: 'سماعة ألعاب لاسلكية مريحة جداً للجلسات الطويلة',
    specs: {
      'نوع الاتصال': 'لاسلكي 2.4GHz',
      'محرك الصوت': '53mm angled',
      'عمر البطارية': '120 ساعة',
      'المايك': ' detachable noise-cancelling',
      'الوزن': '320 جرام',
    },
    stock: 25,
    rating: 4.6,
    reviewCount: 378,
    reviews: [],
    colors: ['أسود', 'أحمر'],
    isFeatured: true,
    isNew: false,
  },
  {
    id: 'ac-005',
    name: 'Keychron Q1 Pro',
    brand: 'Keychron',
    category: 'accessory',
    subcategory: 'keyboard',
    price: 5200,
    images: ['/images/accessories/keychron-q1pro.jpg'],
    description: 'كيبورد ميكانيكي ألومنيوم قابل للتخصيص بالكامل',
    specs: {
      'نوع الاتصال': 'لاسلكي Bluetooth + سلكي',
      'السويتش': 'Gateron G Pro (Red/Brown/Blue)',
      'التصميم': '75% layout',
      'الهيكل': 'ألومنيوم CNC كامل',
      'الإضاءة': 'RGB South-facing',
    },
    stock: 8,
    rating: 4.8,
    reviewCount: 134,
    reviews: [],
    colors: ['أسود', 'رمادي'],
    isFeatured: false,
    isNew: true,
  },
  {
    id: 'ac-006',
    name: 'Razer Huntsman V2',
    brand: 'Razer',
    category: 'accessory',
    subcategory: 'keyboard',
    price: 4800,
    images: ['/images/accessories/huntsman-v2.jpg'],
    description: 'كيبورد ألعاب بسويتشات بصرية فائقة السرعة',
    specs: {
      'نوع الاتصال': 'سلكي',
      'السويتش': 'Razer Optical (Red/Clicky)',
      'معدل الاستجابة': '0.2ms',
      'الإضاءة': 'Razer Chroma RGB',
      'الماكر': 'متكامل',
    },
    stock: 14,
    rating: 4.5,
    reviewCount: 267,
    reviews: [],
    colors: ['أسود'],
    isFeatured: false,
    isNew: false,
  },
  {
    id: 'ac-007',
    name: 'Logitech G915 TKL',
    brand: 'Logitech',
    category: 'accessory',
    subcategory: 'keyboard',
    price: 6200,
    images: ['/images/accessories/g915-tkl.jpg'],
    description: 'كيبورد ألعاب لاسلكي رفيع بسويتشات ميكانيكية',
    specs: {
      'نوع الاتصال': 'لاسلكي LIGHTSPEED + Bluetooth',
      'السويتش': 'GL Tactile/Linear/Clicky',
      'عمر البطارية': '40 ساعة',
      'التصميم': 'Tenkeyless',
      'الإضاءة': 'LIGHTSYNC RGB',
    },
    stock: 12,
    rating: 4.7,
    reviewCount: 198,
    reviews: [],
    colors: ['أسود', 'أبيض'],
    isFeatured: true,
    isNew: false,
  },
  {
    id: 'ac-008',
    name: 'Razer Basilisk V3 Pro',
    brand: 'Razer',
    category: 'accessory',
    subcategory: 'mouse',
    price: 4800,
    images: ['/images/accessories/basilisk-v3pro.jpg'],
    description: 'ماوس ألعاب لاسلكي مخصص بـ13 زر قابل للبرمجة',
    specs: {
      'نوع الاتصال': 'لاسلكي + Bluetooth + سلكي',
      'مستشعر': 'Focus Pro 30K',
      ' DPI': '100-30000',
      'عمر البطارية': '90 ساعة',
      'الأزرار': '13 قابل للبرمجة',
    },
    stock: 16,
    rating: 4.6,
    reviewCount: 145,
    reviews: [],
    colors: ['أسود'],
    isFeatured: false,
    isNew: false,
  },
  {
    id: 'ac-009',
    name: 'JBL Quantum 810',
    brand: 'JBL',
    category: 'accessory',
    subcategory: 'headset',
    price: 3600,
    oldPrice: 4200,
    images: ['/images/accessories/jbl-quantum-810.jpg'],
    description: 'سماعة ألعاب لاسلكية بصوت QuantumSURROUND',
    specs: {
      'نوع الاتصال': 'لاسلكي 2.4GHz + Bluetooth',
      'محرك الصوت': '50mm',
      'عمر البطارية': '43 ساعة',
      'إلغاء الضوضاء': 'Active ANC',
      'المايك': 'بووم قابل للفصل',
    },
    stock: 20,
    rating: 4.4,
    reviewCount: 98,
    reviews: [],
    colors: ['أسود'],
    isFeatured: false,
    isNew: false,
  },
  {
    id: 'ac-010',
    name: 'Corsair K70 RGB PRO',
    brand: 'Corsair',
    category: 'accessory',
    subcategory: 'keyboard',
    price: 4100,
    images: ['/images/accessories/k70-rgb-pro.jpg'],
    description: 'كيبورد ألعاب ميكانيكي بمفاتيح PBT دوبل شوت',
    specs: {
      'نوع الاتصال': 'سلكي',
      'السويتش': 'CHERRY MX (Red/Brown/Speed)',
      'معدل التقاط': '8000Hz',
      'الإضاءة': 'iCUE RGB per-key',
      'المفاتيح': 'PBT Double-Shot',
    },
    stock: 9,
    rating: 4.5,
    reviewCount: 312,
    reviews: [],
    colors: ['أسود'],
    isFeatured: false,
    isNew: false,
  },
  {
    id: 'ac-011',
    name: 'Logitech G735',
    brand: 'Logitech',
    category: 'accessory',
    subcategory: 'headset',
    price: 5600,
    images: ['/images/accessories/g735.jpg'],
    description: 'سماعة ألعاب لاسلكية بتصميم مريح وإضاءة مخصصة',
    specs: {
      'نوع الاتصال': 'لاسلكي LIGHTSPEED + Bluetooth',
      'محرك الصوت': '40mm',
      'عمر البطارية': '16 ساعة + إضاءة',
      'الإضاءة': 'LIGHTSYNC RGB',
      'المايك': 'Blue VO!CE',
    },
    stock: 7,
    rating: 4.3,
    reviewCount: 76,
    reviews: [],
    colors: ['أبيض', 'بنفسجي'],
    isFeatured: false,
    isNew: true,
  },
  {
    id: 'ac-012',
    name: 'SteelSeries Aerox 5',
    brand: 'SteelSeries',
    category: 'accessory',
    subcategory: 'mouse',
    price: 3200,
    oldPrice: 3800,
    images: ['/images/accessories/aerox-5.jpg'],
    description: 'ماوس ألعاب خفيف الوزن بتصميم honeycomb',
    specs: {
      'نوع الاتصال': 'سلكي + لاسلكي',
      'وزن': '74 جرام',
      'مستشعر': 'TrueMove Air 18K',
      ' DPI': '100-18000',
      'الأزرار': '9 قابل للبرمجة',
    },
    stock: 22,
    rating: 4.4,
    reviewCount: 189,
    reviews: [],
    colors: ['أسود', 'ثلجي'],
    isFeatured: false,
    isNew: false,
  },
];

export const brands = ['ASUS', 'Lenovo', 'HP', 'MSI', 'Dell', 'Apple', 'Acer', 'Logitech', 'Razer', 'SteelSeries', 'HyperX', 'Keychron', 'JBL', 'Corsair'];

export const governorates: Governorate[] = [
  { name: 'القاهرة', cities: ['مدينة نصر', 'مصر الجديدة', 'المعادي', ' Heliopolis', 'التحرير', 'شبرا', 'الزمالك', 'المهندسين', 'العباسية', 'المرج', 'عين شمس', 'السيدة زينب'] },
  { name: 'الجيزة', cities: ['الدقي', 'المهندسين', 'الهرم', 'فيصل', '6 أكتوبر', 'الشيخ زايد', 'حدائق الأهرام', 'إمبابة'] },
  { name: 'الإسكندرية', cities: ['سموحة', 'سبورتنج', 'رشدي', 'المندرة', 'سيدي جابر', 'العصافرة', 'ميامي', 'العجمي', 'المنتزه'] },
  { name: 'الدقهلية', cities: ['المنصورة', 'ميت غمر', 'الجمالية', 'شربين', 'بلقاس', 'منية النصر'] },
  { name: 'الشرقية', cities: ['الزقازيق', 'العاشر من رمضان', 'بلبيس', 'منيا القمح', 'أبو حماد', 'فاقوس'] },
  { name: 'الغربية', cities: ['طنطا', 'المحلة الكبرى', 'كفر الزيات', 'زفتى', 'السنطة', 'بسيون'] },
  { name: 'القليوبية', cities: ['بنها', 'شبرا الخيمة', 'الخانكة', 'قليوب', 'القناطر الخيرية', 'كفر شكر'] },
  { name: 'الفيوم', cities: ['مدينة الفيوم', 'إطسا', 'سنورس', 'طامية', 'يوسف الصديق'] },
  { name: 'المنيا', cities: ['مدينة المنيا', 'ملوي', 'سمالوط', 'بني مزار', 'مطاي', 'أبو قرقاص'] },
  { name: 'أسيوط', cities: ['مدينة أسيوط', 'ديروط', 'منفلوط', 'القوصية', 'أبنوب', 'البداري'] },
  { name: 'سوهاج', cities: ['مدينة سوهاج', 'أخميم', 'طهطا', 'المراغة', 'جهينة', 'طما'] },
  { name: 'قنا', cities: ['مدينة قنا', 'نقادة', 'قوص', 'فرشوط', 'أبو تشت', 'الوقف'] },
  { name: 'الأقصر', cities: ['الأقصر', 'القرنة', 'أرمنت', 'الطود', 'إسنا'] },
  { name: 'أسوان', cities: ['مدينة أسوان', 'إدفو', 'كوم أمبو', 'دراو', 'نصر النوبة'] },
  { name: 'البحيرة', cities: ['دمنهور', 'كفر الدوار', 'رشيد', 'إدكو', 'أبو المطامير', 'الرحمانية'] },
  { name: 'كفر الشيخ', cities: ['مدينة كفر الشيخ', 'دسوق', 'فوه', 'مطوبس', 'البرلس', 'الحامول'] },
  { name: 'دمياط', cities: ['مدينة دمياط', 'رأس البر', 'فارسكور', 'الزرقا', 'كفر سعد', 'الروضة'] },
  { name: 'بورسعيد', cities: ['بورسعيد', 'بورفؤاد', 'الجنوب', 'الضواحي', 'العرب', 'المناخ'] },
  { name: 'الإسماعيلية', cities: ['الإسماعيلية', 'فايد', 'القنطرة شرق', 'القنطرة غرب', 'التل الكبير', 'أبو صوير'] },
  { name: 'السويس', cities: ['السويس', 'الأربعين', 'فيصل', 'عتاقة', 'الجناين'] },
];

export const whyCards: WhyCard[] = [
  {
    id: 1,
    title: 'منتجات أصلية مضمونة',
    description: 'كل منتجاتنا أصلية 100% مع ضمان الوكيل المعتمد. لا نتعامل مع المقلدات أبداً.',
    icon: 'shield',
  },
  {
    id: 2,
    title: 'أسعار تنافسية',
    description: 'نضمن أفضل سعر في السوق مع عروض حصرية وخصومات حقيقية طوال العام.',
    icon: 'tag',
  },
  {
    id: 3,
    title: 'توصيل سريع وآمن',
    description: 'نوصل لكل محافظات مصر في أسرع وقت مع تغليف ممتاز يحمي جهازك.',
    icon: 'truck',
  },
  {
    id: 4,
    title: 'دعم فني متخصص',
    description: 'فريقنا جاهز يساعدك تختار الجهاز المناسب ويرد على استفساراتك.',
    icon: 'headphones',
  },
  {
    id: 5,
    title: 'سياسة إرجاع مرنة',
    description: 'إرجاع أو استبدال خلال 14 يوم. راحتك أولويتنا دائماً.',
    icon: 'refresh',
  },
];

export const testimonials: Testimonial[] = [
  { id: 1, name: 'محمد أحمد', text: 'أحسن مكان اشتريت منه لابتوب للألعاب. الخدمة ممتازة والتوصيل كان سريع. الجهاز وصل مكفول بالكامل.', rating: 5 },
  { id: 2, name: 'سارة خالد', text: 'اشتريت MacBook Pro منهم والمعاملة كانت احترافية جداً. ساعدوني اختار المواصفات المناسبة لشغلي.', rating: 5 },
  { id: 3, name: 'عمر محمود', text: 'عندهم تشكيلة كبيرة والأسعار فعلاً أحسن من أي مكان تاني. بنصح أي حد يشتري منهم.', rating: 4 },
  { id: 4, name: 'نورا سامي', text: 'الدعم الفني عندهم ممتاز. سألت كتير قبل ما اشتري وردوا على كل أسئلتي بصبر.', rating: 5 },
];

export const stats: StatItem[] = [
  { id: 1, label: 'جهاز مباع', value: '5000', suffix: '+' },
  { id: 2, label: 'علامة تجارية', value: '14', suffix: '' },
  { id: 3, label: 'عميل سعيد', value: '3500', suffix: '+' },
  { id: 4, label: 'تقييم متوسط', value: '4.8', suffix: '/5' },
];

export const trustedBrands = [
  { name: 'ASUS', logo: '/images/brands/asus.png' },
  { name: 'Lenovo', logo: '/images/brands/lenovo.png' },
  { name: 'HP', logo: '/images/brands/hp.png' },
  { name: 'MSI', logo: '/images/brands/msi.png' },
  { name: 'Dell', logo: '/images/brands/dell.png' },
  { name: 'Apple', logo: '/images/brands/apple.png' },
  { name: 'Acer', logo: '/images/brands/acer.png' },
  { name: 'Logitech', logo: '/images/brands/logitech.png' },
  { name: 'Razer', logo: '/images/brands/razer.png' },
  { name: 'SteelSeries', logo: '/images/brands/steelseries.png' },
  { name: 'HyperX', logo: '/images/brands/hyperx.png' },
  { name: 'Corsair', logo: '/images/brands/corsair.png' },
];

export const categoryCards = [
  { id: 'gaming', name: 'لابتوبات ألعاب', icon: 'gamepad', image: '/images/categories/gaming.jpg' },
  { id: 'business', name: 'لابتوبات أعمال', icon: 'briefcase', image: '/images/categories/business.jpg' },
  { id: 'mouse', name: 'ماوس وكيبورد', icon: 'mouse', image: '/images/categories/mouse.jpg' },
  { id: 'headset', name: 'سماعات', icon: 'headphones', image: '/images/categories/headset.jpg' },
];

let orders: Order[] = [];

try {
  const stored = localStorage.getItem('eltanany_orders');
  if (stored) orders = JSON.parse(stored);
} catch {
  orders = [];
}

function seedOrdersIfEmpty(): void {
  if (orders.length > 0) return;
  const p1 = laptops[0];
  const p2 = laptops[1];
  const p3 = accessories[0];
  if (!p1 || !p2 || !p3) return;
  orders = [
    {
      id: 'ORD-20260615-101',
      customer: {
        name: 'أحمد محمد علي',
        phone: '01012345678',
        governorate: 'القاهرة',
        city: 'المعادي',
        address: 'شارع 9، المعادي',
        landmark: 'بجوار مسجد النور',
      },
      items: [{ product: p1, quantity: 1 }],
      deliveryMethod: 'home',
      paymentMethod: 'cod',
      status: 'pending',
      total: p1.price + 50,
      date: '2026-06-15T10:30:00.000Z',
      deposit: {
        paidAmount: 10000,
        remainingAmount: p1.price + 50 - 10000,
        receiptImage: '',
        verificationStatus: 'pending',
      },
    },
    {
      id: 'ORD-20260610-204',
      customer: {
        name: 'سارة إبراهيم',
        phone: '01198765432',
        governorate: 'الجيزة',
        city: 'الدقي',
        address: 'شارع الجامعة',
        landmark: 'أمام بنك مصر',
      },
      items: [{ product: p2, quantity: 1 }, { product: p3, quantity: 2 }],
      deliveryMethod: 'home',
      paymentMethod: 'cod',
      status: 'processing',
      total: p2.price + p3.price * 2 + 50,
      date: '2026-06-10T14:20:00.000Z',
      deposit: {
        paidAmount: 15000,
        remainingAmount: p2.price + p3.price * 2 + 50 - 15000,
        receiptImage: '',
        verificationStatus: 'pending',
      },
    },
    {
      id: 'ORD-20260528-089',
      customer: {
        name: 'محمود حسن',
        phone: '01234567890',
        governorate: 'الإسكندرية',
        city: 'سموحة',
        address: 'شارع فوزي معاذ',
      },
      items: [{ product: p3, quantity: 1 }],
      deliveryMethod: 'pickup',
      paymentMethod: 'cod',
      status: 'completed',
      total: p3.price,
      date: '2026-05-28T09:15:00.000Z',
      deposit: {
        paidAmount: 0,
        remainingAmount: p3.price,
      },
    },
  ];
  try {
    localStorage.setItem('eltanany_orders', JSON.stringify(orders));
  } catch {
  }
}

seedOrdersIfEmpty();

export { orders };

export function saveOrder(order: Order): void {
  orders.push(order);
  try {
    localStorage.setItem('eltanany_orders', JSON.stringify(orders));
  } catch {
    // silently fail
  }
}

export function updateOrderStatus(orderId: string, status: Order['status']): void {
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx !== -1) {
    orders[idx].status = status;
    try {
      localStorage.setItem('eltanany_orders', JSON.stringify(orders));
    } catch {
    }
  }
}

export function updateOrderDeposit(orderId: string, deposit: Order['deposit']): void {
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx !== -1 && deposit) {
    orders[idx].deposit = deposit;
    try {
      localStorage.setItem('eltanany_orders', JSON.stringify(orders));
    } catch {
    }
  }
}

export function updateOrderDepositVerification(orderId: string, status: 'pending' | 'confirmed' | 'rejected'): void {
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx !== -1 && orders[idx].deposit) {
    orders[idx].deposit = { ...orders[idx].deposit!, verificationStatus: status };
    if (status === 'confirmed') orders[idx].status = 'processing';
    if (status === 'rejected') orders[idx].status = 'cancelled';
    try {
      localStorage.setItem('eltanany_orders', JSON.stringify(orders));
    } catch {
    }
  }
}

let adminProducts: Product[] = [];

try {
  const storedProducts = localStorage.getItem('eltanany_admin_products');
  if (storedProducts) adminProducts = JSON.parse(storedProducts);
} catch {
  adminProducts = [];
}

export { adminProducts };

export function saveAdminProduct(product: Product): void {
  adminProducts.push(product);
  try {
    localStorage.setItem('eltanany_admin_products', JSON.stringify(adminProducts));
  } catch {
  }
}

export function getAllCatalogProducts(): Product[] {
  return [...laptops, ...accessories, ...adminProducts];
}

const defaultGovernorates: DeliveryGovernorate[] = [
  { id: 'gov-cairo', name: 'القاهرة', shippingFee: 50, carrierId: 'aramex' },
  { id: 'gov-giza', name: 'الجيزة', shippingFee: 50, carrierId: 'aramex' },
  { id: 'gov-alex', name: 'الإسكندرية', shippingFee: 75, carrierId: 'bosta' },
  { id: 'gov-dq', name: 'الدقهلية', shippingFee: 90, carrierId: 'bosta' },
  { id: 'gov-other', name: 'باقي المحافظات', shippingFee: 100, carrierId: 'mylerz' },
];

const defaultShippingCompanies: ShippingCompany[] = [
  {
    id: 'aramex',
    name: 'Aramex',
    active: true,
    deliverySla: '2-3 أيام عمل',
    trackingUrl: 'https://www.aramex.com/track/results?ShipmentNumber=',
  },
  {
    id: 'bosta',
    name: 'Bosta',
    active: true,
    deliverySla: '1-2 أيام عمل',
    trackingUrl: 'https://bosta.co/track/',
  },
  {
    id: 'mylerz',
    name: 'Mylerz',
    active: false,
    deliverySla: '3-5 أيام عمل',
    trackingUrl: 'https://mylerz.com/track/',
  },
];

const defaultDeliverySettings: DeliverySettings = {
  shippingCompanies: defaultShippingCompanies,
  governorates: defaultGovernorates,
  storePickup: {
    enabled: true,
    address: 'القاهرة، مصر — فرع المعادي',
    workingHours: 'يومياً من 10 صباحاً حتى 10 مساءً',
  },
};

function migrateDeliverySettings(raw: Record<string, unknown>): DeliverySettings {
  if (raw.governorates && Array.isArray(raw.governorates)) {
    const settings = raw as unknown as DeliverySettings;
    return {
      shippingCompanies: settings.shippingCompanies.map(c => ({
        id: c.id,
        name: c.name,
        active: c.active,
        deliverySla: c.deliverySla || '2-4 أيام عمل',
        trackingUrl: c.trackingUrl,
      })),
      governorates: [...settings.governorates],
      storePickup: settings.storePickup,
    };
  }
  const legacyCompanies = raw.shippingCompanies as Array<Record<string, unknown>> | undefined;
  if (legacyCompanies && Array.isArray(legacyCompanies)) {
    const companies: ShippingCompany[] = legacyCompanies.map(c => ({
      id: String(c.id),
      name: String(c.name),
      active: Boolean(c.active),
      deliverySla: String(c.deliverySla || '2-4 أيام عمل'),
      trackingUrl: c.trackingUrl ? String(c.trackingUrl) : undefined,
    }));
    const legacyFees = (legacyCompanies[0]?.governorateFees as { id: string; name: string; fee: number }[]) || [];
    const governorates: DeliveryGovernorate[] = legacyFees.length > 0
      ? legacyFees.map(f => ({
          id: f.id,
          name: f.name,
          shippingFee: f.fee,
          carrierId: companies.find(c => c.active)?.id || companies[0]?.id || 'aramex',
        }))
      : defaultGovernorates;
    return {
      shippingCompanies: companies,
      governorates,
      storePickup: (raw.storePickup as DeliverySettings['storePickup']) || defaultDeliverySettings.storePickup,
    };
  }
  const legacyFees = (raw.governorateFees as { id: string; name: string; fee: number }[]) || defaultGovernorates.map(g => ({ id: g.id, name: g.name, fee: g.shippingFee }));
  return {
    shippingCompanies: [
      {
        id: 'legacy-default',
        name: 'الشحن الافتراضي',
        active: (raw.homeDelivery as { enabled?: boolean })?.enabled ?? true,
        deliverySla: '2-4 أيام عمل',
      },
    ],
    governorates: legacyFees.map(f => ({
      id: f.id,
      name: f.name,
      shippingFee: f.fee,
      carrierId: 'legacy-default',
    })),
    storePickup: (raw.storePickup as DeliverySettings['storePickup']) || defaultDeliverySettings.storePickup,
  };
}

let deliverySettings: DeliverySettings = defaultDeliverySettings;

try {
  const storedDelivery = localStorage.getItem('eltanany_delivery_settings');
  if (storedDelivery) deliverySettings = migrateDeliverySettings(JSON.parse(storedDelivery));
} catch {
  deliverySettings = defaultDeliverySettings;
}

export function getDeliverySettingsData(): DeliverySettings {
  return deliverySettings;
}

export function saveDeliverySettingsData(settings: DeliverySettings): void {
  deliverySettings = settings;
  try {
    localStorage.setItem('eltanany_delivery_settings', JSON.stringify(deliverySettings));
  } catch {
  }
}

function buildMonthlySnapshot(monthKey: string, label: string, factor: number): MonthlyInventorySnapshot {
  const products = getAllCatalogProducts().slice(0, 12);
  const items: MonthlyInventoryRecord[] = products.map((product, index) => {
    const unitsSold = Math.max(1, Math.round((index + 2) * factor));
    const closingStock = Math.max(0, product.stock - Math.round(unitsSold * 0.3));
    const openingStock = closingStock + unitsSold;
    const revenue = unitsSold * product.price;
    return {
      productId: product.id,
      productName: product.name,
      brand: product.brand,
      image: product.images[0] || '/images/logo.jpeg',
      category: product.category,
      openingStock,
      closingStock,
      unitsSold,
      revenue,
      difference: openingStock - closingStock,
    };
  });

  const beginningStockValue = items.reduce((sum, item) => sum + item.openingStock * (products.find(p => p.id === item.productId)?.price || 0), 0);
  const currentStockValue = items.reduce((sum, item) => sum + item.closingStock * (products.find(p => p.id === item.productId)?.price || 0), 0);
  const unitsSoldThisMonth = items.reduce((sum, item) => sum + item.unitsSold, 0);
  const laptopRevenue = items.filter(i => i.category === 'laptop').reduce((sum, i) => sum + i.revenue, 0);
  const accessoryRevenue = items.filter(i => i.category === 'accessory').reduce((sum, i) => sum + i.revenue, 0);

  return {
    monthKey,
    label,
    beginningStockValue,
    currentStockValue,
    unitsSoldThisMonth,
    monthlyRevenue: {
      laptops: laptopRevenue,
      accessories: accessoryRevenue,
      total: laptopRevenue + accessoryRevenue,
    },
    items,
  };
}

let monthlyArchives: MonthlyInventorySnapshot[] = [];

try {
  const storedArchives = localStorage.getItem('eltanany_monthly_inventory');
  if (storedArchives) monthlyArchives = JSON.parse(storedArchives);
} catch {
  monthlyArchives = [];
}

if (monthlyArchives.length === 0) {
  monthlyArchives = [
    buildMonthlySnapshot('2026-06', 'جرد شهر يونيو 2026', 1.2),
    buildMonthlySnapshot('2026-05', 'جرد شهر مايو 2026', 1.0),
    buildMonthlySnapshot('2026-04', 'جرد شهر أبريل 2026', 0.85),
    buildMonthlySnapshot('2026-03', 'جرد شهر مارس 2026', 0.7),
  ];
  try {
    localStorage.setItem('eltanany_monthly_inventory', JSON.stringify(monthlyArchives));
  } catch {
  }
}

export function getMonthlyInventoryArchives(): MonthlyInventorySnapshot[] {
  return monthlyArchives;
}

export function getMonthlyInventoryByKey(monthKey: string): MonthlyInventorySnapshot | undefined {
  return monthlyArchives.find(a => a.monthKey === monthKey);
}
