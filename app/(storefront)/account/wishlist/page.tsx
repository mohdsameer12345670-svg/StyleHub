'use client';

import Link from 'next/link';
import ProductCard from '@/components/storefront/ProductCard';
import Button from '@/components/ui/Button';
import { Heart } from 'lucide-react';
import { Product } from '@/types';

// Mock Wishlist Products
const mockWishlistProducts: Product[] = [
  {
    id: 'prod-1',
    title: 'Premium Cotton T-Shirt',
    slug: 'premium-cotton-tshirt',
    description: 'An elegant addition to your lifestyle, crafted from premium materials.',
    category_id: null,
    price: 2499,
    sale_price: 1999,
    sale_start: '2024-01-01',
    sale_end: '2026-12-31',
    sku: 'SKU-2000',
    stock_quantity: 25,
    track_inventory: true,
    allow_backorders: false,
    status: 'active' as const,
    meta_title: null,
    meta_description: null,
    og_image_url: null,
    tags: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'prod-2',
    title: 'Leather Crossbody Bag',
    slug: 'leather-crossbody-bag',
    description: 'An elegant addition to your lifestyle, crafted from premium materials.',
    category_id: null,
    price: 5999,
    sale_price: null,
    sale_start: null,
    sale_end: null,
    sku: 'SKU-2001',
    stock_quantity: 15,
    track_inventory: true,
    allow_backorders: false,
    status: 'active' as const,
    meta_title: null,
    meta_description: null,
    og_image_url: null,
    tags: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function WishlistPage() {
  return (
    <div className="container-main py-[64px] max-w-[1000px] mx-auto space-y-[40px]">
      <div>
        <h1 className="text-section font-serif">My Wishlist</h1>
        <p className="text-[14px] text-foreground-secondary mt-[4px]">
          Products you saved for later purchase.
        </p>
      </div>

      {mockWishlistProducts.length === 0 ? (
        <div className="text-center py-[80px] max-w-[400px] mx-auto space-y-[16px]">
          <Heart size={48} className="mx-auto text-foreground-muted" />
          <h2 className="text-[18px] font-semibold">Your wishlist is empty</h2>
          <p className="text-[14px] text-foreground-secondary">
            Save items that you like to check them here later.
          </p>
          <Link href="/products">
            <Button>Explore Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[20px]">
          {mockWishlistProducts.map((p, i) => (
            <div key={p.id} className="relative group">
              <ProductCard product={p} index={i} showQuickAdd={false} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
