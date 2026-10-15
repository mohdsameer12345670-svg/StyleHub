const fs = require('fs');
const path = require('path');

const demoDataContent = `import { Product, Category, Review } from '@/types';

// ============================================================
// DEMO CATEGORIES
// ============================================================
export const demoCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Clothing',
    slug: 'clothing',
    description: 'Timeless apparel made from organic cotton and fine textiles.',
    image_url: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
    parent_id: null,
    sort_order: 1,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'cat-2',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Elevated leather goods, timepieces, and everyday essentials.',
    image_url: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80',
    parent_id: null,
    sort_order: 2,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'cat-3',
    name: 'Footwear',
    slug: 'footwear',
    description: 'Handcrafted sneakers and premium leather boots.',
    image_url: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80',
    parent_id: null,
    sort_order: 3,
    created_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 'cat-4',
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Ceramic decor, linen sets, and aromatic home accents.',
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    parent_id: null,
    sort_order: 4,
    created_at: '2026-01-01T00:00:00Z',
  },
];

// ============================================================
// DEMO PRODUCTS
// Every product has 4 angle images of the EXACT same item.
// Every color option has its own image set for interactive color switching.
// ============================================================
export const demoProducts: Product[] = [
  // ─── PROD-1: Premium Cotton T-Shirt ───────────────────────
  {
    id: 'prod-1',
    title: 'Premium Cotton T-Shirt',
    slug: 'premium-cotton-tshirt',
    description:
      'Crafted from 100% heavyweight organic Supima cotton. Features tailored drop shoulders, reinforced ribbed collar, and pre-shrunk construction for lasting luxury and everyday comfort.',
    category_id: 'cat-1',
    price: 2499,
    sale_price: 1999,
    sale_start: '2024-01-01',
    sale_end: '2026-12-31',
    sku: 'SKU-2001',
    stock_quantity: 45,
    track_inventory: true,
    allow_backorders: false,
    status: 'active',
    meta_title: 'Premium Cotton T-Shirt |StyleHub ',
    meta_description: 'Heavyweight organic Supima cotton t-shirt with tailored drop shoulder.',
    og_image_url: null,
    tags: ['featured', 'summer', 'bestseller'],
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    category: demoCategories[0],
    images: [
      { id: 'img-1-1', product_id: 'prod-1', image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80', sort_order: 0, alt_text: 'White t-shirt front view' },
      { id: 'img-1-2', product_id: 'prod-1', image_url: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?auto=format&fit=crop&w=800&q=80', sort_order: 1, alt_text: 'White t-shirt folded detail' },
      { id: 'img-1-3', product_id: 'prod-1', image_url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80', sort_order: 2, alt_text: 'White t-shirt fabric texture close-up' },
      { id: 'img-1-4', product_id: 'prod-1', image_url: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80', sort_order: 3, alt_text: 'White t-shirt side fit view' },
    ],
    options: [
      {
        id: 'opt-1-size', product_id: 'prod-1', name: 'Size', sort_order: 0,
        values: [
          { id: 'v-s', option_id: 'opt-1-size', value: 'S', sort_order: 0 },
          { id: 'v-m', option_id: 'opt-1-size', value: 'M', sort_order: 1 },
          { id: 'v-l', option_id: 'opt-1-size', value: 'L', sort_order: 2 },
          { id: 'v-xl', option_id: 'opt-1-size', value: 'XL', sort_order: 3 },
        ],
      },
      {
        id: 'opt-1-color', product_id: 'prod-1', name: 'Color', sort_order: 1,
        values: [
          {
            id: 'v-wht', option_id: 'opt-1-color', value: 'White', sort_order: 0,
            images: [
              'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
            ],
          },
          {
            id: 'v-blk', option_id: 'opt-1-color', value: 'Black', sort_order: 1,
            images: [
              'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
            ],
          },
          {
            id: 'v-olv', option_id: 'opt-1-color', value: 'Olive', sort_order: 2,
            images: [
              'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
            ],
          },
        ],
      },
    ],
    variants: [],
    average_rating: 4.9,
    review_count: 24,
  },

  // ─── PROD-2: Ladies Designer Handbag ──────────────────────
  {
    id: 'prod-2',
    title: 'Ladies Designer Handbag',
    slug: 'ladies-designer-handbag',
    description:
      'Elegant Italian calfskin leather handbag crafted for the modern woman. Features brushed gold-tone hardware, magnetic closure, structured bottom feet, and dual carry straps. Perfect for both casual outings and formal occasions.',
    category_id: 'cat-2',
    price: 7499,
    sale_price: 5999,
    sale_start: '2024-01-01',
    sale_end: '2026-12-31',
    sku: 'SKU-2002',
    stock_quantity: 28,
    track_inventory: true,
    allow_backorders: false,
    status: 'active',
    meta_title: 'Ladies Designer Handbag | StyleHub',
    meta_description: 'Elegant Italian leather ladies handbag with gold hardware and structured carry straps.',
    og_image_url: null,
    tags: ['featured', 'accessories', 'ladies', 'bestseller'],
    created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    category: demoCategories[1],
    // Default Cognac Tan angles
    images: [
      { id: 'img-2-1', product_id: 'prod-2', image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80', sort_order: 0, alt_text: 'Ladies handbag front view' },
      { id: 'img-2-2', product_id: 'prod-2', image_url: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80', sort_order: 1, alt_text: 'Ladies handbag side view' },
      { id: 'img-2-3', product_id: 'prod-2', image_url: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80', sort_order: 2, alt_text: 'Ladies handbag interior compartments' },
      { id: 'img-2-4', product_id: 'prod-2', image_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80', sort_order: 3, alt_text: 'Ladies handbag handle and stitch detail' },
    ],
    options: [
      {
        id: 'opt-2-color', product_id: 'prod-2', name: 'Color', sort_order: 0,
        values: [
          {
            id: 'v-tan', option_id: 'opt-2-color', value: 'Cognac Tan', sort_order: 0,
            images: [
              'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
            ],
          },
          {
            id: 'v-onyx', option_id: 'opt-2-color', value: 'Onyx Black', sort_order: 1,
            images: [
              'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
            ],
          },
          {
            id: 'v-blush', option_id: 'opt-2-color', value: 'Blush Pink', sort_order: 2,
            images: [
              'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
            ],
          },
        ],
      },
    ],
    variants: [],
    average_rating: 4.8,
    review_count: 34,
  },

  // ─── PROD-2B: Premium School Backpack ─────────────────────
  {
    id: 'prod-2b',
    title: 'Premium School Backpack',
    slug: 'premium-school-backpack',
    description:
      'Heavy-duty waterproof school backpack designed for students and daily commuting. Features a dedicated 15.6" padded laptop sleeve, multiple utility organizer pockets, ergonomic air-mesh back padding, and reinforced weather-sealed zippers.',
    category_id: 'cat-2',
    price: 3999,
    sale_price: 2999,
    sale_start: '2024-01-01',
    sale_end: '2026-12-31',
    sku: 'SKU-2002B',
    stock_quantity: 45,
    track_inventory: true,
    allow_backorders: false,
    status: 'active',
    meta_title: 'Premium School Backpack | StyleHub',
    meta_description: 'Waterproof school backpack with laptop compartment and ergonomic support.',
    og_image_url: null,
    tags: ['featured', 'accessories', 'school', 'backpack'],
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    category: demoCategories[1],
    // Default Navy backpack angles
    images: [
      { id: 'img-2b-1', product_id: 'prod-2b', image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', sort_order: 0, alt_text: 'School backpack front view' },
      { id: 'img-2b-2', product_id: 'prod-2b', image_url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80', sort_order: 1, alt_text: 'School backpack side view' },
      { id: 'img-2b-3', product_id: 'prod-2b', image_url: 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=800&q=80', sort_order: 2, alt_text: 'School backpack back straps and ergonomics' },
      { id: 'img-2b-4', product_id: 'prod-2b', image_url: 'https://images.unsplash.com/photo-1577368211130-4bbd0181ddf0?auto=format&fit=crop&w=800&q=80', sort_order: 3, alt_text: 'School backpack interior and laptop compartment' },
    ],
    options: [
      {
        id: 'opt-2b-color', product_id: 'prod-2b', name: 'Color', sort_order: 0,
        values: [
          {
            id: 'v-navy', option_id: 'opt-2b-color', value: 'Navy Blue', sort_order: 0,
            images: [
              'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1577368211130-4bbd0181ddf0?auto=format&fit=crop&w=800&q=80',
            ],
          },
          {
            id: 'v-charcoal', option_id: 'opt-2b-color', value: 'Charcoal Grey', sort_order: 1,
            images: [
              'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1577368211130-4bbd0181ddf0?auto=format&fit=crop&w=800&q=80',
            ],
          },
          {
            id: 'v-black', option_id: 'opt-2b-color', value: 'Jet Black', sort_order: 2,
            images: [
              'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1577368211130-4bbd0181ddf0?auto=format&fit=crop&w=800&q=80',
            ],
          },
        ],
      },
      {
        id: 'opt-2b-capacity', product_id: 'prod-2b', name: 'Capacity', sort_order: 1,
        values: [
          { id: 'v-20l', option_id: 'opt-2b-capacity', value: '20L (Day Pack)', sort_order: 0 },
          { id: 'v-30l', option_id: 'opt-2b-capacity', value: '30L (Full Pack)', sort_order: 1 },
        ],
      },
    ],
    variants: [],
    average_rating: 4.7,
    review_count: 22,
  },

  // ─── PROD-3: Minimalist Gold Watch ────────────────────────
  {
    id: 'prod-3',
    title: 'Minimalist Gold Watch',
    slug: 'minimalist-gold-watch',
    description:
      'Swiss quartz movement encased in 316L stainless steel with 18k gold PVD plating. Sapphire crystal glass with anti-reflective coating and interchangeable straps.',
    category_id: 'cat-2',
    price: 14999,
    sale_price: 12999,
    sale_start: '2024-01-01',
    sale_end: '2026-12-31',
    sku: 'SKU-2003',
    stock_quantity: 15,
    track_inventory: true,
    allow_backorders: false,
    status: 'active',
    meta_title: 'Minimalist Gold Watch | StyleHub',
    meta_description: 'Precision Swiss quartz watch in 18k gold finish.',
    og_image_url: null,
    tags: ['luxury', 'bestseller'],
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    category: demoCategories[1],
    images: [
      { id: 'img-3-1', product_id: 'prod-3', image_url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80', sort_order: 0, alt_text: 'Gold watch front face' },
      { id: 'img-3-2', product_id: 'prod-3', image_url: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=800&q=80', sort_order: 1, alt_text: 'Gold watch dial close-up' },
      { id: 'img-3-3', product_id: 'prod-3', image_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80', sort_order: 2, alt_text: 'Gold watch on wrist angle' },
      { id: 'img-3-4', product_id: 'prod-3', image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80', sort_order: 3, alt_text: 'Gold watch clasp detail' },
    ],
    options: [
      {
        id: 'opt-3-strap', product_id: 'prod-3', name: 'Strap', sort_order: 0,
        values: [
          {
            id: 'v-mesh', option_id: 'opt-3-strap', value: 'Gold Mesh', sort_order: 0,
            images: [
              'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
            ],
          },
          {
            id: 'v-lthr', option_id: 'opt-3-strap', value: 'Black Leather', sort_order: 1,
            images: [
              'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
            ],
          },
        ],
      },
    ],
    variants: [],
    average_rating: 5.0,
    review_count: 32,
  },

  // ─── PROD-4: Canvas High-Top Sneakers ─────────────────────
  {
    id: 'prod-4',
    title: 'Canvas High-Top Sneakers',
    slug: 'canvas-hightop-sneakers',
    description:
      'Durable organic cotton canvas upper with vulcanized natural rubber outsole. Cushioned ortholite insole provides all-day arch support and rebound.',
    category_id: 'cat-3',
    price: 4499,
    sale_price: 3499,
    sale_start: '2024-01-01',
    sale_end: '2026-12-31',
    sku: 'SKU-2004',
    stock_quantity: 36,
    track_inventory: true,
    allow_backorders: false,
    status: 'active',
    meta_title: 'Canvas High-Top Sneakers | StyleHub',
    meta_description: 'Classic high-top canvas sneakers with vulcanized rubber sole.',
    og_image_url: null,
    tags: ['footwear', 'new'],
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    category: demoCategories[2],
    images: [
      { id: 'img-4-1', product_id: 'prod-4', image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', sort_order: 0, alt_text: 'Canvas sneaker front profile' },
      { id: 'img-4-2', product_id: 'prod-4', image_url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80', sort_order: 1, alt_text: 'Sneaker side angle' },
      { id: 'img-4-3', product_id: 'prod-4', image_url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80', sort_order: 2, alt_text: 'Sneaker sole tread and lace detail' },
      { id: 'img-4-4', product_id: 'prod-4', image_url: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80', sort_order: 3, alt_text: 'Sneaker back heel view' },
    ],
    options: [
      {
        id: 'opt-4-size', product_id: 'prod-4', name: 'Shoe Size (US)', sort_order: 0,
        values: [
          { id: 'v-8', option_id: 'opt-4-size', value: '8', sort_order: 0 },
          { id: 'v-9', option_id: 'opt-4-size', value: '9', sort_order: 1 },
          { id: 'v-10', option_id: 'opt-4-size', value: '10', sort_order: 2 },
          { id: 'v-11', option_id: 'opt-4-size', value: '11', sort_order: 3 },
        ],
      },
      {
        id: 'opt-4-color', product_id: 'prod-4', name: 'Color', sort_order: 1,
        values: [
          {
            id: 'v-red', option_id: 'opt-4-color', value: 'Classic Red', sort_order: 0,
            images: [
              'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
            ],
          },
          {
            id: 'v-wh', option_id: 'opt-4-color', value: 'Clean White', sort_order: 1,
            images: [
              'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
            ],
          },
          {
            id: 'v-nv', option_id: 'opt-4-color', value: 'Midnight Navy', sort_order: 2,
            images: [
              'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=800&q=80',
            ],
          },
        ],
      },
    ],
    variants: [],
    average_rating: 4.7,
    review_count: 15,
  },

  // ─── PROD-5: Silk Blend Scarf ──────────────────────────────
  {
    id: 'prod-5',
    title: 'Silk Blend Scarf',
    slug: 'silk-blend-scarf',
    description:
      'Luxurious 70% mulberry silk and 30% fine cashmere blend. Hand-rolled edges with subtle botanical prints for effortless seasonal layering.',
    category_id: 'cat-2',
    price: 2999,
    sale_price: 2499,
    sale_start: '2024-01-01',
    sale_end: '2026-12-31',
    sku: 'SKU-2005',
    stock_quantity: 22,
    track_inventory: true,
    allow_backorders: false,
    status: 'active',
    meta_title: 'Silk Blend Scarf | StyleHub',
    meta_description: 'Mulberry silk and cashmere blend scarf with hand-rolled hems.',
    og_image_url: null,
    tags: ['accessories', 'summer'],
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    category: demoCategories[1],
    images: [
      { id: 'img-5-1', product_id: 'prod-5', image_url: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=800&q=80', sort_order: 0, alt_text: 'Silk scarf draped' },
      { id: 'img-5-2', product_id: 'prod-5', image_url: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80', sort_order: 1, alt_text: 'Silk weave texture' },
      { id: 'img-5-3', product_id: 'prod-5', image_url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80', sort_order: 2, alt_text: 'Scarf styled on model' },
      { id: 'img-5-4', product_id: 'prod-5', image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80', sort_order: 3, alt_text: 'Scarf print edge detail' },
    ],
    options: [
      {
        id: 'opt-5-pattern', product_id: 'prod-5', name: 'Pattern', sort_order: 0,
        values: [
          {
            id: 'v-botanical', option_id: 'opt-5-pattern', value: 'Botanical Beige', sort_order: 0,
            images: [
              'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
            ],
          },
          {
            id: 'v-midnight', option_id: 'opt-5-pattern', value: 'Midnight Navy', sort_order: 1,
            images: [
              'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
            ],
          },
        ],
      },
    ],
    variants: [],
    average_rating: 4.9,
    review_count: 11,
  },

  // ─── PROD-6: Ceramic Dinnerware Set ───────────────────────
  {
    id: 'prod-6',
    title: 'Ceramic Dinnerware Set',
    slug: 'ceramic-dinnerware-set',
    description:
      'Hand-thrown stoneware dinner set including 4 dinner plates, 4 salad plates, and 4 multi-purpose bowls with reactive matte glazing. Dishwasher and microwave safe.',
    category_id: 'cat-4',
    price: 7999,
    sale_price: null,
    sale_start: null,
    sale_end: null,
    sku: 'SKU-2006',
    stock_quantity: 18,
    track_inventory: true,
    allow_backorders: false,
    status: 'active',
    meta_title: 'Ceramic Dinnerware Set | StyleHub',
    meta_description: 'Handcrafted reactive glaze stoneware dinnerware 12-piece set.',
    og_image_url: null,
    tags: ['home', 'dining'],
    created_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    category: demoCategories[3],
    images: [
      { id: 'img-6-1', product_id: 'prod-6', image_url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80', sort_order: 0, alt_text: 'Ceramic dinnerware set stack' },
      { id: 'img-6-2', product_id: 'prod-6', image_url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80', sort_order: 1, alt_text: 'Stacked stoneware plates detail' },
      { id: 'img-6-3', product_id: 'prod-6', image_url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80', sort_order: 2, alt_text: 'Ceramic bowl glaze texture' },
      { id: 'img-6-4', product_id: 'prod-6', image_url: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80', sort_order: 3, alt_text: 'Dinnerware set table setting' },
    ],
    options: [
      {
        id: 'opt-6-glaze', product_id: 'prod-6', name: 'Glaze Finish', sort_order: 0,
        values: [
          {
            id: 'v-sand', option_id: 'opt-6-glaze', value: 'Sand Dune', sort_order: 0,
            images: [
              'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
            ],
          },
          {
            id: 'v-slate', option_id: 'opt-6-glaze', value: 'Slate Charcoal', sort_order: 1,
            images: [
              'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
            ],
          },
        ],
      },
    ],
    variants: [],
    average_rating: 4.8,
    review_count: 21,
  },

  // ─── PROD-7: Wool Trench Coat ──────────────────────────────
  {
    id: 'prod-7',
    title: 'Wool Trench Coat',
    slug: 'wool-trench-coat',
    description:
      'Double-breasted tailored trench coat made from 100% Australian virgin wool. Features horn buttons, detachable storm collar, and water-repellent satin lining.',
    category_id: 'cat-1',
    price: 18999,
    sale_price: 15999,
    sale_start: '2024-01-01',
    sale_end: '2026-12-31',
    sku: 'SKU-2007',
    stock_quantity: 12,
    track_inventory: true,
    allow_backorders: false,
    status: 'active',
    meta_title: 'Wool Trench Coat | StyleHub',
    meta_description: 'Double-breasted virgin wool trench coat with tailored fit.',
    og_image_url: null,
    tags: ['outerwear', 'featured'],
    created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    category: demoCategories[0],
    images: [
      { id: 'img-7-1', product_id: 'prod-7', image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80', sort_order: 0, alt_text: 'Wool trench coat front view' },
      { id: 'img-7-2', product_id: 'prod-7', image_url: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80', sort_order: 1, alt_text: 'Trench coat lapel and buttons' },
      { id: 'img-7-3', product_id: 'prod-7', image_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80', sort_order: 2, alt_text: 'Trench coat side profile' },
      { id: 'img-7-4', product_id: 'prod-7', image_url: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80', sort_order: 3, alt_text: 'Trench coat back drape' },
    ],
    options: [
      {
        id: 'opt-7-size', product_id: 'prod-7', name: 'Size', sort_order: 0,
        values: [
          { id: 'v-s', option_id: 'opt-7-size', value: 'S', sort_order: 0 },
          { id: 'v-m', option_id: 'opt-7-size', value: 'M', sort_order: 1 },
          { id: 'v-l', option_id: 'opt-7-size', value: 'L', sort_order: 2 },
        ],
      },
      {
        id: 'opt-7-color', product_id: 'prod-7', name: 'Color', sort_order: 1,
        values: [
          {
            id: 'v-camel', option_id: 'opt-7-color', value: 'Camel', sort_order: 0,
            images: [
              'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
            ],
          },
          {
            id: 'v-charcoal', option_id: 'opt-7-color', value: 'Charcoal', sort_order: 1,
            images: [
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80',
            ],
          },
        ],
      },
    ],
    variants: [],
    average_rating: 4.9,
    review_count: 27,
  },

  // ─── PROD-8: Handcrafted Sunglasses ───────────────────────
  {
    id: 'prod-8',
    title: 'Handcrafted Sunglasses',
    slug: 'handcrafted-sunglasses',
    description:
      'Italian Mazzucchelli acetate frames paired with polarized Carl Zeiss CR-39 lenses offering 100% UVA/UVB protection and 5-barrel custom barrel hinges.',
    category_id: 'cat-2',
    price: 6499,
    sale_price: null,
    sale_start: null,
    sale_end: null,
    sku: 'SKU-2008',
    stock_quantity: 0,
    track_inventory: true,
    allow_backorders: false,
    status: 'active',
    meta_title: 'Handcrafted Sunglasses | StyleHub',
    meta_description: 'Italian acetate sunglasses with polarized Zeiss lenses.',
    og_image_url: null,
    tags: ['accessories', 'summer'],
    created_at: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    category: demoCategories[1],
    images: [
      { id: 'img-8-1', product_id: 'prod-8', image_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80', sort_order: 0, alt_text: 'Sunglasses front profile' },
      { id: 'img-8-2', product_id: 'prod-8', image_url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80', sort_order: 1, alt_text: 'Sunglasses side temple and hinge' },
      { id: 'img-8-3', product_id: 'prod-8', image_url: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80', sort_order: 2, alt_text: 'Sunglasses angled lens view' },
      { id: 'img-8-4', product_id: 'prod-8', image_url: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80', sort_order: 3, alt_text: 'Sunglasses styled view' },
    ],
    options: [
      {
        id: 'opt-8-frame', product_id: 'prod-8', name: 'Frame Finish', sort_order: 0,
        values: [
          {
            id: 'v-tortoise', option_id: 'opt-8-frame', value: 'Dark Tortoise', sort_order: 0,
            images: [
              'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80',
            ],
          },
          {
            id: 'v-black', option_id: 'opt-8-frame', value: 'Gloss Black', sort_order: 1,
            images: [
              'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80',
            ],
          },
        ],
      },
    ],
    variants: [],
    average_rating: 4.6,
    review_count: 19,
  },

  // ─── PROD-9: Pure Linen Bedding Set ───────────────────────
  {
    id: 'prod-9',
    title: 'Pure Linen Bedding Set',
    slug: 'pure-linen-bedding-set',
    description:
      'Woven from 100% French flax linen, pre-washed for irresistible cloud-like softness. Naturally temperature-regulating and hypoallergenic. Includes duvet cover and 2 standard pillowcases.',
    category_id: 'cat-4',
    price: 11999,
    sale_price: 9999,
    sale_start: '2024-01-01',
    sale_end: '2026-12-31',
    sku: 'SKU-2009',
    stock_quantity: 14,
    track_inventory: true,
    allow_backorders: false,
    status: 'active',
    meta_title: 'Pure Linen Bedding Set | StyleHub',
    meta_description: 'French flax 100% linen duvet cover and pillowcase set.',
    og_image_url: null,
    tags: ['home', 'featured'],
    created_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    category: demoCategories[3],
    images: [
      { id: 'img-9-1', product_id: 'prod-9', image_url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80', sort_order: 0, alt_text: 'Linen bedding bedroom set' },
      { id: 'img-9-2', product_id: 'prod-9', image_url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80', sort_order: 1, alt_text: 'Flax linen weave texture' },
      { id: 'img-9-3', product_id: 'prod-9', image_url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80', sort_order: 2, alt_text: 'Pillowcase hem detail' },
      { id: 'img-9-4', product_id: 'prod-9', image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', sort_order: 3, alt_text: 'Duvet cover corner buttoning' },
    ],
    options: [
      {
        id: 'opt-9-size', product_id: 'prod-9', name: 'Bed Size', sort_order: 0,
        values: [
          { id: 'v-queen', option_id: 'opt-9-size', value: 'Queen', sort_order: 0 },
          { id: 'v-king', option_id: 'opt-9-size', value: 'King', sort_order: 1 },
        ],
      },
      {
        id: 'opt-9-color', product_id: 'prod-9', name: 'Color', sort_order: 1,
        values: [
          {
            id: 'v-oatmeal', option_id: 'opt-9-color', value: 'Oatmeal', sort_order: 0,
            images: [
              'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
            ],
          },
          {
            id: 'v-white', option_id: 'opt-9-color', value: 'Clean White', sort_order: 1,
            images: [
              'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
            ],
          },
        ],
      },
    ],
    variants: [],
    average_rating: 4.9,
    review_count: 18,
  },

  // ─── PROD-10: Leather Billfold Wallet ─────────────────────
  {
    id: 'prod-10',
    title: 'Leather Billfold Wallet',
    slug: 'leather-billfold-wallet',
    description:
      'Full-grain vegetable-tanned leather wallet with 8 card slots, dual cash compartments, and RFID blocking lining. Slim profile fits effortlessly in front or back pockets.',
    category_id: 'cat-2',
    price: 3299,
    sale_price: null,
    sale_start: null,
    sale_end: null,
    sku: 'SKU-2010',
    stock_quantity: 30,
    track_inventory: true,
    allow_backorders: false,
    status: 'active',
    meta_title: 'Leather Billfold Wallet | StyleHub',
    meta_description: 'Slim full-grain leather wallet with RFID blocking technology.',
    og_image_url: null,
    tags: ['accessories', 'leather'],
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    category: demoCategories[1],
    images: [
      { id: 'img-10-1', product_id: 'prod-10', image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80', sort_order: 0, alt_text: 'Leather billfold wallet front exterior' },
      { id: 'img-10-2', product_id: 'prod-10', image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80', sort_order: 1, alt_text: 'Leather wallet card slots inside' },
      { id: 'img-10-3', product_id: 'prod-10', image_url: 'https://images.unsplash.com/photo-1563903530908-afdd155d057a?auto=format&fit=crop&w=800&q=80', sort_order: 2, alt_text: 'Leather wallet edge stitch detail' },
      { id: 'img-10-4', product_id: 'prod-10', image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80', sort_order: 3, alt_text: 'Wallet slim profile view' },
    ],
    options: [
      {
        id: 'opt-10-leather', product_id: 'prod-10', name: 'Leather Finish', sort_order: 0,
        values: [
          {
            id: 'v-whiskey', option_id: 'opt-10-leather', value: 'Whiskey Brown', sort_order: 0,
            images: [
              'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1563903530908-afdd155d057a?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
            ],
          },
          {
            id: 'v-black', option_id: 'opt-10-leather', value: 'Matte Black', sort_order: 1,
            images: [
              'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1563903530908-afdd155d057a?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
            ],
          },
        ],
      },
    ],
    variants: [],
    average_rating: 4.8,
    review_count: 42,
  },

  // ─── PROD-11: Suede Chelsea Boots ─────────────────────────
  {
    id: 'prod-11',
    title: 'Suede Chelsea Boots',
    slug: 'suede-chelsea-boots',
    description:
      'Italian calf suede boots with Goodyear welted rubber soles for superior durability and all-weather grip. Elasticated side gussets and woven pull tabs for effortless slip-on comfort.',
    category_id: 'cat-3',
    price: 9999,
    sale_price: 8499,
    sale_start: '2024-01-01',
    sale_end: '2026-12-31',
    sku: 'SKU-2011',
    stock_quantity: 20,
    track_inventory: true,
    allow_backorders: false,
    status: 'active',
    meta_title: 'Suede Chelsea Boots | StyleHub',
    meta_description: 'Goodyear-welted Italian suede Chelsea boots.',
    og_image_url: null,
    tags: ['footwear', 'featured'],
    created_at: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    category: demoCategories[2],
    images: [
      { id: 'img-11-1', product_id: 'prod-11', image_url: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80', sort_order: 0, alt_text: 'Suede Chelsea boots side profile' },
      { id: 'img-11-2', product_id: 'prod-11', image_url: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80', sort_order: 1, alt_text: 'Boots sole tread and welt stitching' },
      { id: 'img-11-3', product_id: 'prod-11', image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80', sort_order: 2, alt_text: 'Boots top down pair view' },
      { id: 'img-11-4', product_id: 'prod-11', image_url: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80', sort_order: 3, alt_text: 'Elastic gusset and heel tab' },
    ],
    options: [
      {
        id: 'opt-11-size', product_id: 'prod-11', name: 'Shoe Size (US)', sort_order: 0,
        values: [
          { id: 'v-8', option_id: 'opt-11-size', value: '8', sort_order: 0 },
          { id: 'v-9', option_id: 'opt-11-size', value: '9', sort_order: 1 },
          { id: 'v-10', option_id: 'opt-11-size', value: '10', sort_order: 2 },
          { id: 'v-11', option_id: 'opt-11-size', value: '11', sort_order: 3 },
        ],
      },
      {
        id: 'opt-11-color', product_id: 'prod-11', name: 'Color', sort_order: 1,
        values: [
          {
            id: 'v-tan', option_id: 'opt-11-color', value: 'Cognac Tan', sort_order: 0,
            images: [
              'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80',
            ],
          },
          {
            id: 'v-black', option_id: 'opt-11-color', value: 'Jet Black', sort_order: 1,
            images: [
              'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80',
            ],
          },
        ],
      },
    ],
    variants: [],
    average_rating: 4.9,
    review_count: 22,
  },

  // ─── PROD-12: Aromatic Candle Set ─────────────────────────
  {
    id: 'prod-12',
    title: 'Aromatic Candle Set',
    slug: 'aromatic-candle-set',
    description:
      'Hand-poured 100% natural soy wax trio infused with pure botanical essential oils of Santal, Amber Noir, and Wild Fig. 50+ hours clean burn time with lead-free cotton wicks.',
    category_id: 'cat-4',
    price: 1999,
    sale_price: null,
    sale_start: null,
    sale_end: null,
    sku: 'SKU-2012',
    stock_quantity: 40,
    track_inventory: true,
    allow_backorders: false,
    status: 'active',
    meta_title: 'Aromatic Candle Set | StyleHub',
    meta_description: 'Hand-poured soy wax scented candle 3-pack set.',
    og_image_url: null,
    tags: ['home', 'bestseller'],
    created_at: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date().toISOString(),
    category: demoCategories[3],
    images: [
      { id: 'img-12-1', product_id: 'prod-12', image_url: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?auto=format&fit=crop&w=800&q=80', sort_order: 0, alt_text: 'Aromatic scented candle in glass vessel' },
      { id: 'img-12-2', product_id: 'prod-12', image_url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80', sort_order: 1, alt_text: 'Candle gift box and wick detail' },
      { id: 'img-12-3', product_id: 'prod-12', image_url: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80', sort_order: 2, alt_text: 'Candle flame and aroma aura' },
      { id: 'img-12-4', product_id: 'prod-12', image_url: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?auto=format&fit=crop&w=800&q=80', sort_order: 3, alt_text: 'Candle collection lineup' },
    ],
    options: [
      {
        id: 'opt-12-scent', product_id: 'prod-12', name: 'Scent Trio', sort_order: 0,
        values: [
          { id: 'v-signature', option_id: 'opt-12-scent', value: 'Santal & Fig Trio', sort_order: 0 },
          { id: 'v-botanical', option_id: 'opt-12-scent', value: 'Cedar & Pine Trio', sort_order: 1 },
        ],
      },
    ],
    variants: [],
    average_rating: 5.0,
    review_count: 36,
  },
];

// ============================================================
// DEMO REVIEWS
// ============================================================
export const demoReviews: Record<string, Review[]> = {
  'prod-1': [
    {
      id: 'r1', product_id: 'prod-1', user_id: 'u1', rating: 5,
      title: 'Remarkable fabric & fit',
      body: 'The Supima cotton is genuinely exceptional. Retains its structure after multiple washes and fits comfortably with a subtle modern drape.',
      is_verified: true, created_at: '2026-08-15T00:00:00Z',
      user: { id: 'u1', email: 'anjali@example.com', full_name: 'Anjali R.', phone: null, avatar_url: null, role: 'customer', created_at: '', updated_at: '' },
    },
    {
      id: 'r2', product_id: 'prod-1', user_id: 'u2', rating: 5,
      title: 'Top tier luxury everyday piece',
      body: 'Feels far better than high-street designer basics. Ordered two more colors right after receiving the first one.',
      is_verified: true, created_at: '2026-08-20T00:00:00Z',
      user: { id: 'u2', email: 'sameer@example.com', full_name: 'Sameer K.', phone: null, avatar_url: null, role: 'customer', created_at: '', updated_at: '' },
    },
  ],
  'prod-2': [
    {
      id: 'r3', product_id: 'prod-2', user_id: 'u3', rating: 5,
      title: 'Exquisite craftsmanship and perfect size',
      body: 'The leather smell, the magnetic clasp, and the finish of the gold hardware are simply stunning. Fits my daily essentials with room to spare.',
      is_verified: true, created_at: '2026-09-01T00:00:00Z',
      user: { id: 'u3', email: 'priya@example.com', full_name: 'Priya Sharma', phone: null, avatar_url: null, role: 'customer', created_at: '', updated_at: '' },
    },
  ],
  'prod-2b': [
    {
      id: 'r4', product_id: 'prod-2b', user_id: 'u4', rating: 5,
      title: 'Super sturdy & comfortable backpack',
      body: 'Holds my 15-inch laptop securely with all books and gym clothes. The back padding is very comfortable during long commutes.',
      is_verified: true, created_at: '2026-09-10T00:00:00Z',
      user: { id: 'u4', email: 'rohit@example.com', full_name: 'Rohit Verma', phone: null, avatar_url: null, role: 'customer', created_at: '', updated_at: '' },
    },
  ],
};

// ============================================================
// SLUG ALIASES MAPPING
// ============================================================
const slugAliases: Record<string, string> = {
  'minimalist-watch': 'minimalist-gold-watch',
  'canvas-sneakers': 'canvas-hightop-sneakers',
  'ceramic-vase-set': 'ceramic-dinnerware-set',
  'wool-blend-coat': 'wool-trench-coat',
  'leather-crossbody-bag': 'ladies-designer-handbag',
  'school-backpack': 'premium-school-backpack',
};

// ============================================================
// HELPER LOOKUP FUNCTIONS
// ============================================================
export function findProductBySlug(slugOrId: string): Product | undefined {
  if (!slugOrId) return undefined;

  const normalized = decodeURIComponent(slugOrId).toLowerCase().trim();

  // 1. Direct slug match
  let product = demoProducts.find((p) => p.slug.toLowerCase() === normalized);
  if (product) return product;

  // 2. Alias slug match
  const mappedSlug = slugAliases[normalized];
  if (mappedSlug) {
    product = demoProducts.find((p) => p.slug.toLowerCase() === mappedSlug);
    if (product) return product;
  }

  // 3. ID match
  product = demoProducts.find((p) => p.id.toLowerCase() === normalized);
  if (product) return product;

  // 4. Fuzzy partial slug match
  product = demoProducts.find(
    (p) =>
      p.slug.toLowerCase().includes(normalized) ||
      normalized.includes(p.slug.toLowerCase())
  );
  if (product) return product;

  return undefined;
}
`;

fs.writeFileSync(path.join(__dirname, '..', 'lib', 'demo-data.ts'), demoDataContent, 'utf-8');
console.log('Successfully written lib/demo-data.ts');
