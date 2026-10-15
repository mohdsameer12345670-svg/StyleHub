'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

import {
  cn,
  formatCurrency,
  isOnSale,
  getEffectivePrice,
  getDiscountPercentage,
  getCartItemId,
} from '@/lib/utils';

import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';
import { ShoppingBag } from 'lucide-react';
import Badge from '@/components/ui/Badge';

interface ProductCardProps {
  product: Product;
  index?: number;
  showQuickAdd?: boolean;
}

export default function ProductCard({
  product,
  index = 0,
  showQuickAdd = true,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { addItem, triggerFlyAnimation } = useCart();

  const imageRef = useRef<HTMLDivElement>(null);

  const onSale = isOnSale(product);
  const effectivePrice = getEffectivePrice(product);

  // Demo fallback images
  const fallbackImages: Record<string, string> = {
    'premium-cotton-tshirt':
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
    'ladies-designer-handbag':
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    'leather-crossbody-bag':
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    'premium-school-backpack':
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    'minimalist-watch':
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    'minimalist-gold-watch':
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    'canvas-sneakers':
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    'canvas-hightop-sneakers':
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    'silk-blend-scarf':
      'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=800&q=80',
    'ceramic-vase-set':
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    'ceramic-dinnerware-set':
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    'wool-blend-coat':
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    'wool-trench-coat':
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
    'handcrafted-sunglasses':
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    'pure-linen-bedding-set':
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    'linen-bedding-set':
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
    'leather-billfold-wallet':
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    'suede-chelsea-boots':
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=800&q=80',
    'aromatic-candle-set':
      'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?auto=format&fit=crop&w=800&q=80',
  };

  // Use database image first.
  // If database doesn't have an image, use demo fallback.
  const primaryImage =
    product.images?.[0]?.image_url ||
    fallbackImages[product.slug] ||
    '';

  const secondaryImage = product.images?.[1]?.image_url || '';

  const hasSecondImage = Boolean(secondaryImage);

  const isNew =
    new Date(product.created_at) >
    new Date(Date.now() - 14 * 24 * 60 * 60 * 1000);

  const [primaryError, setPrimaryError] = useState(false);
  const displayImage = primaryError
    ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
    : primaryImage;

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (imageRef.current && displayImage) {
      const rect = imageRef.current.getBoundingClientRect();

      triggerFlyAnimation(displayImage, rect);
    }

    addItem({
      id: getCartItemId(product.id, null),
      product_id: product.id,
      variant_id: null,
      title: product.title,
      image_url: displayImage,
      price: effectivePrice,
      original_price: product.price,
      quantity: 1,
      variant_info: null,
      max_quantity: product.stock_quantity,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin: '-50px',
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="group block"
      >
        {/* Product Image */}
        <div
          ref={imageRef}
          className="relative aspect-square sm:aspect-[4/5] rounded-[8px] overflow-hidden bg-background-secondary mb-[12px] flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Primary Image */}
          {displayImage ? (
            <Image
              src={displayImage}
              alt={product.title}
              fill
              priority={index < 3}
              onError={() => setPrimaryError(true)}
              className={cn(
                'object-cover transition-transform duration-500 ease-premium-hover',
                isHovered && 'scale-105'
              )}
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingBag
                size={40}
                className="text-foreground-muted"
              />
            </div>
          )}

          {/* Secondary Image */}
          {hasSecondImage && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{
                duration: 0.4,
              }}
            >
              <Image
                src={secondaryImage}
                alt={`${product.title} - alternate view`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </motion.div>
          )}

          {/* Badges */}
          <div className="absolute top-[8px] left-[8px] flex flex-col gap-[4px]">
            {isNew && (
              <Badge
                variant="info"
                pulse
              >
                NEW
              </Badge>
            )}

            {onSale && product.sale_price && (
              <Badge variant="destructive">
                -
                {getDiscountPercentage(
                  product.price,
                  product.sale_price
                )}
                %
              </Badge>
            )}

            {product.stock_quantity === 0 && (
              <Badge variant="default">
                SOLD OUT
              </Badge>
            )}
          </div>

          {/* Quick Add */}
          {showQuickAdd && product.stock_quantity > 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20,
              }}
              transition={{
                duration: 0.3,
                delay: 0.1,
              }}
              className="absolute bottom-[12px] left-[12px] right-[12px]"
            >
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className="w-full h-[40px] bg-white/95 backdrop-blur-sm text-foreground text-[13px] font-medium rounded-[6px] hover:bg-white transition-colors flex items-center justify-center gap-[6px] shadow-card"
              >
                <ShoppingBag size={14} />
                Quick Add
              </motion.button>
            </motion.div>
          )}
        </div>

        {/* Product Information */}
        <div className="space-y-[4px]">
          <h3 className="text-[14px] font-medium text-foreground group-hover:text-accent transition-colors truncate">
            {product.title}
          </h3>

          {product.category && (
            <p className="text-[12px] text-foreground-secondary uppercase tracking-wider">
              {product.category.name}
            </p>
          )}

          <div className="flex items-center gap-[8px]">
            <span
              className={cn(
                'text-[15px] font-semibold',
                onSale
                  ? 'text-destructive'
                  : 'text-foreground'
              )}
            >
              {formatCurrency(effectivePrice)}
            </span>

            {onSale && (
              <span className="text-[13px] text-foreground-secondary line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}