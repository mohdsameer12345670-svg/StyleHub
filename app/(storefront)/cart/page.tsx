'use client';

import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-main py-[120px] text-center max-w-[480px]">
        <div className="w-[80px] h-[80px] rounded-full bg-background-secondary flex items-center justify-center mx-auto mb-[24px]">
          <ShoppingBag size={32} className="text-foreground-secondary" />
        </div>
        <h1 className="text-section font-serif mb-[8px]">Your Cart is Empty</h1>
        <p className="text-[15px] text-foreground-secondary mb-[32px]">
          Before you proceed to checkout, you must add some products to your shopping cart.
        </p>
        <Link href="/products">
          <Button size="lg" shimmer>
            Explore Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-main py-[64px]">
      <h1 className="text-section font-serif mb-[40px]">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[64px] items-start">
        {/* Items list column */}
        <div className="lg:col-span-2 space-y-[24px]">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row gap-[24px] pb-[24px] border-b border-border last:border-0"
            >
              {/* Product Image */}
              <div className="w-[120px] h-[150px] bg-background-secondary rounded-[8px] overflow-hidden relative flex-shrink-0">
                {item.image_url ? (
                  <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                ) : (
                  <ShoppingBag size={24} className="absolute inset-0 m-auto text-foreground-muted" />
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 space-y-[8px] min-w-0">
                <div className="flex justify-between gap-[16px]">
                  <h2 className="text-[16px] font-medium text-foreground truncate">
                    {item.title}
                  </h2>
                  <span className="text-[16px] font-semibold text-foreground">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
                {item.variant_info && (
                  <p className="text-[13px] text-foreground-secondary">
                    {Object.entries(item.variant_info)
                      .map(([k, v]) => `${k}: ${v}`)
                      .join(' / ')}
                  </p>
                )}
                <p className="text-[14px] font-medium text-foreground-secondary">
                  {formatCurrency(item.price)} each
                </p>

                {/* Adjusters */}
                <div className="flex items-center justify-between pt-[8px]">
                  <div className="flex items-center border border-border-strong rounded-[6px]">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-[36px] h-[36px] flex items-center justify-center text-foreground-secondary hover:text-foreground disabled:opacity-30 transition-colors"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="w-[36px] text-center text-[14px] font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.max_quantity}
                      className="w-[36px] h-[36px] flex items-center justify-center text-foreground-secondary hover:text-foreground disabled:opacity-30 transition-colors"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-[4px] text-[13px] text-foreground-secondary hover:text-destructive transition-colors"
                  >
                    <Trash2 size={14} />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary card */}
        <div className="bg-background-secondary rounded-[12px] p-[32px] space-y-[24px]">
          <h2 className="text-[18px] font-semibold text-foreground">Order Summary</h2>

          <div className="space-y-[16px] text-[14px]">
            <div className="flex justify-between text-foreground-secondary">
              <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-foreground-secondary">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr className="border-border-strong" />
            <div className="flex justify-between text-[16px] font-semibold text-foreground">
              <span>Grand Total</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
          </div>

          <Link href="/checkout">
            <Button fullWidth size="sm" shimmer className="gap-[8px] mt-[8px]">
              Proceed to Checkout
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
