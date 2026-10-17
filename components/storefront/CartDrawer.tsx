'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { cn, formatCurrency } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] backdrop-overlay"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[71] w-full max-w-[420px] bg-white shadow-drawer flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-[24px] py-[20px] border-b border-border">
              <div className="flex items-center gap-[8px]">
                <ShoppingBag size={20} />
                <h2 className="text-[16px] font-semibold">
                  Cart ({itemCount})
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="p-[4px] rounded-[6px] text-foreground-secondary hover:text-foreground hover:bg-foreground/5 transition-colors"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-[24px] text-center">
                  <div className="w-[80px] h-[80px] rounded-full bg-background-secondary flex items-center justify-center mb-[16px]">
                    <ShoppingBag size={32} className="text-foreground-secondary" />
                  </div>
                  <p className="text-[16px] font-medium text-foreground mb-[4px]">
                    Your cart is empty
                  </p>
                  <p className="text-[14px] text-foreground-secondary mb-[24px]">
                    Add items to your cart to see them here.
                  </p>
                  <Button onClick={closeCart} variant="outline" size="sm">
                    Continue Shopping
                  </Button>   
                </div>
              ) : (
                <motion.div className="p-[24px] space-y-[16px]">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 50, height: 0, marginBottom: 0, padding: 0 }}
                        transition={{
                          delay: index * 0.05,
                          duration: 0.3,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="flex gap-[12px] pb-[16px] border-b border-border last:border-0"
                      >
                        {/* Image */}
                        <div className="w-[80px] h-[100px] rounded-[6px] overflow-hidden bg-background-secondary flex-shrink-0 relative">
                          {item.image_url ? (
                            <Image
                              src={item.image_url}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag size={20} className="text-foreground-secondary" />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[14px] font-medium text-foreground truncate">
                            {item.title}
                          </h4>
                          {item.variant_info && (
                            <p className="text-[12px] text-foreground-secondary mt-[2px]">
                              {Object.values(item.variant_info).join(' / ')}
                            </p>
                          )}
                          <p className="text-[14px] font-semibold text-foreground mt-[4px]">
                            {formatCurrency(item.price)}
                          </p>

                          {/* Quantity + Remove */}
                          <div className="flex items-center justify-between mt-[8px]">
                            <div className="flex items-center border border-border rounded-[6px]">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="w-[28px] h-[28px] flex items-center justify-center text-foreground-secondary hover:text-foreground disabled:opacity-30 transition-colors"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="w-[28px] text-center text-[13px] font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.max_quantity}
                                className="w-[28px] h-[28px] flex items-center justify-center text-foreground-secondary hover:text-foreground disabled:opacity-30 transition-colors"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-[12px] text-foreground-secondary hover:text-destructive transition-colors underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-[24px] space-y-[16px]">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] text-foreground-secondary">Subtotal</span>
                  <span className="text-[18px] font-semibold">{formatCurrency(subtotal)}</span>
                </div>
                <p className="text-[12px] text-foreground-secondary">
                  Shipping & taxes calculated at checkout
                </p>
                <Link href="/checkout" onClick={closeCart}>
                  <Button fullWidth shimmer size="sm" className="gap-[8px]">
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link href="/cart" onClick={closeCart}>
                  <button className="w-full text-center text-[13px] text-foreground-secondary hover:text-foreground underline transition-colors mt-[8px]">
                    View Full Cart
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
