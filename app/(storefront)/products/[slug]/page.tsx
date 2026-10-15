'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, formatCurrency, isOnSale, getEffectivePrice, getDiscountPercentage } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import Button from '@/components/ui/Button';
import Accordion from '@/components/ui/Accordion';
import ProductCard from '@/components/storefront/ProductCard';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import {
  ShoppingBag,
  Star,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  Truck,
  RotateCcw,
  Check,
  Package,
  ArrowLeft,
  Sparkles,
  Loader2,
} from 'lucide-react';
import { demoProducts, demoReviews } from '@/lib/demo-data';

export default function ProductDetailPage({ params: initialParams }: { params?: { slug?: string } }) {
  const routerParams = useParams<{ slug: string }>();
  const slug = routerParams?.slug || initialParams?.slug || '';

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }
      try {
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('slug', slug)
          .single();

        if (productError) throw productError;

        if (productData) {
          const { data: imagesData } = await supabase
            .from('product_images')
            .select('*')
            .eq('product_id', productData.id)
            .order('sort_order', { ascending: true });

          setProduct({
            ...productData,
            images: imagesData || []
          } as Product);
        } else {
          // Supabase not configured or product not in DB — fall back to demo data
          const demoProduct = demoProducts.find((p) => p.slug === slug) || null;
          setProduct(demoProduct);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        // On error also try demo data as a graceful fallback
        const demoProduct = demoProducts.find((p) => p.slug === slug) || null;
        setProduct(demoProduct);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  // Active state handlers
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Default');
  const [quantity, setQuantity] = useState(1);
  // activeImages holds color-swapped images; empty means use product default images
  const [activeImages, setActiveImages] = useState<{ id: string; product_id: string; image_url: string; sort_order: number; alt_text: string | null }[]>([]);
  const [brokenImgMap, setBrokenImgMap] = useState<Record<string, boolean>>({});
  const { addItem, triggerFlyAnimation } = useCart();

  // Reset gallery when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
    setActiveImages([]);
  }, [product?.id]);

  // If product is not found, render a helpful, polished fallback
  if (loading) {
    return (
      <div className="container-main py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
        <p className="text-foreground-secondary">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-main py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-6">
          <Package size={32} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-3">
          Product Not Found
        </h1>
        <p className="text-foreground-secondary max-w-md mb-8 leading-relaxed">
          The requested product item could not be located. It may have been renamed, archived, or is currently unavailable.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <Link href="/products">
            <Button size="lg" className="gap-2">
              <ShoppingBag size={18} />
              <span>Explore All Products</span>
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" size="lg" className="gap-2">
              <ArrowLeft size={18} />
              <span>Return Home</span>
            </Button>
          </Link>
        </div>

        {/* Featured Recommendations */}
        <div className="w-full text-left border-t border-border pt-12">
          <h2 className="text-2xl font-serif font-bold mb-6">Featured Collection</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {demoProducts.slice(0, 4).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} showQuickAdd={false} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const onSale = isOnSale(product);
  const effectivePrice = getEffectivePrice(product);
  const productImages = product.images && product.images.length > 0
    ? product.images
    : [{ id: 'fallback', product_id: product.id, image_url: 'https://placehold.co/800x800/f3f4f6/a1a1aa.png?text=No+Image', sort_order: 0, alt_text: product.title }];

  // Use color-swapped images if available, otherwise use default
  const galleryImages = activeImages.length > 0 ? activeImages : productImages;

  const currentReviews = demoReviews[product.id] || [];

  // Color swatch map: option value → CSS color
  const colorSwatchMap: Record<string, string> = {
    'White': '#F5F5F0', 'Clean White': '#F5F5F0',
    'Black': '#1C1C1E', 'Jet Black': '#1C1C1E', 'Onyx Black': '#1C1C1E', 'Matte Black': '#1C1C1E', 'Gloss Black': '#1C1C1E',
    'Olive': '#6B7C4E', 'Olive Moss': '#4A5E3C',
    'Cognac Tan': '#8B5E3C', 'Whiskey Brown': '#7B4A28',
    'Blush Pink': '#F4A7B9',
    'Navy Blue': '#1B3A7A', 'Midnight Navy': '#191970',
    'Charcoal Grey': '#4A4A4A', 'Charcoal': '#36454F', 'Slate Charcoal': '#596069',
    'Light Grey': '#D1D5DB', 'Grey': '#9CA3AF', 'Grey Leather': '#C5C6C7',
    'Camel': '#C19A6B',
    'Gold Mesh': '#D4AF37',
    'Black Leather': '#1C1C1E',
    'Sand Dune': '#C2B280',
    'Botanical Beige': '#E8D5B7',
    'Oatmeal': '#E8D5B0',
    'Dark Tortoise': '#3D2000',
    'Classic Red': '#C0392B',
  };

  // Options that show as color swatches (circles) instead of text pills
  const isSwatchOption = (name: string) =>
    ['color', 'strap', 'glaze', 'pattern', 'leather'].some((k) =>
      name.toLowerCase().includes(k)
    );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const mainImgEl = document.getElementById('main-product-image');
    if (mainImgEl && galleryImages[selectedImageIndex]?.image_url) {
      triggerFlyAnimation(galleryImages[selectedImageIndex].image_url, mainImgEl.getBoundingClientRect());
    }

    addItem({
      id: `${product.id}_${selectedSize}_${selectedColor}`,
      product_id: product.id,
      variant_id: null,
      title: product.title,
      image_url: galleryImages[0]?.image_url || '',
      price: effectivePrice,
      original_price: product.price,
      quantity,
      variant_info: { Size: selectedSize, Color: selectedColor },
      max_quantity: product.stock_quantity,
    });
  };

  const specTable = (
    <table className="w-full text-[14px]">
      <tbody>
        <tr className="border-b border-border py-[8px]">
          <td className="font-medium py-[8px] text-foreground">SKU</td>
          <td className="text-foreground-secondary py-[8px] font-mono text-xs">{product.sku || 'N/A'}</td>
        </tr>
        <tr className="border-b border-border py-[8px]">
          <td className="font-medium py-[8px] text-foreground">Availability</td>
          <td className="text-foreground-secondary py-[8px]">{product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}</td>
        </tr>
      </tbody>
    </table>
  );

  const accordionItems = [
    {
      id: 'details',
      title: 'Product Details & Specs',
      content: specTable,
    },
    {
      id: 'shipping',
      title: 'Complimentary Shipping & Returns',
      content: (
        <div className="space-y-[8px] text-[14px] text-foreground-secondary">
          <p>• Free express shipping on all orders over ₹1,999.</p>
          <p>• Delivered within 2-4 business days across India.</p>
          <p>• 14-day hassle-free return window with doorstep pickup.</p>
        </div>
      ),
    },
    {
      id: 'sustainability',
      title: 'Sustainability & Craftsmanship',
      content: (
        <p className="text-[14px] text-foreground-secondary">
          Produced in carbon-neutral facilities with zero harmful plastic packaging and non-toxic dyes.
        </p>
      ),
    },
  ];

  const relatedProducts = demoProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="container-main py-[32px] md:py-[48px]">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-[8px] text-[13px] text-foreground-secondary mb-[32px]">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight size={14} />
        <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
        <ChevronRight size={14} />
        {product.category && (
          <>
            <Link href={`/products?category=${product.category.slug}`} className="hover:text-foreground transition-colors">
              {product.category.name}
            </Link>
            <ChevronRight size={14} />
          </>
        )}
        <span className="text-foreground font-medium truncate max-w-[200px]">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[32px] lg:gap-[48px] items-start mb-[80px]">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-5 flex flex-col-reverse md:flex-row gap-[16px] max-w-[480px] w-full mx-auto lg:mx-0 lg:sticky lg:top-[96px]">
          {/* Thumbnails list */}
          {galleryImages.length > 1 && (
            <div className="flex md:flex-col gap-[10px] overflow-x-auto md:overflow-visible">
              {galleryImages.map((img, idx) => (
                <button
                  key={img.id || idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={cn(
                    'relative w-[60px] h-[60px] rounded-[8px] overflow-hidden border-2 transition-all flex-shrink-0 bg-background-secondary/40',
                    selectedImageIndex === idx ? 'border-accent shadow-xs' : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                  aria-label={`View image thumbnail ${idx + 1}`}
                >
                  <Image
                    src={brokenImgMap[img.image_url] ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80' : img.image_url}
                    alt={img.alt_text || `${product.title} preview ${idx + 1}`}
                    fill
                    className="object-contain p-1"
                    sizes="60px"
                    onError={() => setBrokenImgMap((prev) => ({ ...prev, [img.image_url]: true }))}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Main Selected Image */}
          <div
            id="main-product-image"
            className="relative flex-1 aspect-square max-h-[440px] sm:max-h-[480px] bg-background-secondary/50 rounded-[12px] overflow-hidden group shadow-sm flex items-center justify-center border border-border/40"
          >
            {(() => {
              const currentImgUrl = galleryImages[selectedImageIndex]?.image_url || galleryImages[0]?.image_url || '';
              const resolvedSrc = brokenImgMap[currentImgUrl]
                ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
                : currentImgUrl;
              return (
                <Image
                  src={resolvedSrc}
                  alt={galleryImages[selectedImageIndex]?.alt_text || product.title}
                  fill
                  priority
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  onError={() => {
                    if (currentImgUrl) {
                      setBrokenImgMap((prev) => ({ ...prev, [currentImgUrl]: true }));
                    }
                  }}
                />
              );
            })()}
            {onSale && (
              <span className="absolute top-[14px] left-[14px] bg-destructive text-white text-[11px] font-bold px-[9px] py-[3px] rounded-full shadow-xs z-10">
                SALE {getDiscountPercentage(product.price, product.sale_price!)}% OFF
              </span>
            )}

            {/* Arrow navigation buttons */}
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)}
                  className="absolute left-[10px] top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={18} className="text-foreground" />
                </button>
                <button
                  onClick={() => setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length)}
                  className="absolute right-[10px] top-1/2 -translate-y-1/2 w-[34px] h-[34px] rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={18} className="text-foreground" />
                </button>

                {/* Dot indicators */}
                <div className="absolute bottom-[14px] left-1/2 -translate-x-1/2 flex gap-[6px] z-10">
                  {galleryImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      aria-label={`Go to image ${idx + 1}`}
                      className={cn(
                        'rounded-full transition-all duration-200',
                        selectedImageIndex === idx
                          ? 'w-[20px] h-[6px] bg-foreground'
                          : 'w-[6px] h-[6px] bg-foreground/40 hover:bg-foreground/80'
                      )}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Product Info & Cart Actions */}
        <div className="lg:col-span-7 space-y-[24px]">
          {/* Category & Title */}
          <div>
            {product.category && (
              <span className="text-[12px] font-semibold text-accent uppercase tracking-widest block mb-[6px]">
                {product.category.name}
              </span>
            )}
            <h1 className="text-[28px] sm:text-[36px] font-serif font-bold text-foreground tracking-tight leading-tight">
              {product.title}
            </h1>
          </div>

          {/* Ratings Summary */}
          <div className="flex items-center gap-[8px]">
            <div className="flex items-center text-warning">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.floor(product.average_rating || 5) ? 'currentColor' : 'none'}
                  stroke="currentColor"
                />
              ))}
            </div>
            <span className="text-[13px] font-medium text-foreground">
              {(product.average_rating || 5.0).toFixed(1)}
            </span>
            <span className="text-[13px] text-foreground-secondary">
              ({product.review_count || currentReviews.length} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-[12px]">
            <span className="text-[28px] font-bold text-foreground">
              {formatCurrency(effectivePrice)}
            </span>
            {onSale && (
              <span className="text-[18px] text-foreground-secondary line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          <p className="text-[15px] text-foreground-secondary leading-relaxed border-b border-border pb-[24px]">
            {product.description}
          </p>

          {/* Product Options (Sizes / Colors / Variants) */}
          {product.options && product.options.length > 0 ? (
            product.options.map((opt) => {
              const isSwatch = isSwatchOption(opt.name);
              const isSizeOpt = opt.name.toLowerCase().includes('size');
              const currentVal = isSizeOpt ? selectedSize : selectedColor;

              return (
                <div key={opt.id} className="space-y-[10px]">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="font-semibold text-foreground">{opt.name}</span>
                    {currentVal !== 'Default' && (
                      <span className="text-foreground-secondary">{currentVal}</span>
                    )}
                  </div>

                  {isSwatch ? (
                    /* ── Color / Swatch circles ── */
                    <div className="flex flex-wrap gap-[10px]">
                      {opt.values?.map((val) => {
                        const isSelected = selectedColor === val.value;
                        const swatchColor = colorSwatchMap[val.value] || '#cccccc';
                        const isLight = ['White', 'Clean White', 'Blush Pink', 'Oatmeal', 'Botanical Beige', 'Sand Dune'].includes(val.value);
                        return (
                          <button
                            key={val.id}
                            type="button"
                            title={val.value}
                            aria-label={`Select ${val.value}`}
                            onClick={() => {
                              setSelectedColor(val.value);
                              // Swap gallery images if this variant has images
                              if (val.images && val.images.length > 0) {
                                setActiveImages(
                                  val.images.map((url, i) => ({
                                    id: `${val.id}-img-${i}`,
                                    product_id: product.id,
                                    image_url: url,
                                    sort_order: i,
                                    alt_text: `${product.title} — ${val.value} view ${i + 1}`,
                                  }))
                                );
                                setSelectedImageIndex(0);
                              }
                            }}
                            style={{ backgroundColor: swatchColor }}
                            className={cn(
                              'w-8 h-8 rounded-full transition-all duration-200 flex-shrink-0',
                              isLight ? 'border border-border/60' : '',
                              isSelected
                                ? 'ring-2 ring-offset-2 ring-foreground scale-110 shadow-md'
                                : 'hover:scale-105 hover:shadow-sm'
                            )}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    /* ── Size / Capacity / other pill buttons ── */
                    <div className="flex flex-wrap gap-[8px]">
                      {opt.values?.map((val) => {
                        const isSelected = isSizeOpt
                          ? selectedSize === val.value
                          : selectedColor === val.value;
                        return (
                          <button
                            key={val.id}
                            type="button"
                            onClick={() => {
                              if (isSizeOpt) setSelectedSize(val.value);
                              else setSelectedColor(val.value);
                            }}
                            className={cn(
                              'px-[16px] py-[8px] rounded-[6px] text-[13px] font-medium border transition-all duration-150',
                              isSelected
                                ? 'border-foreground bg-foreground text-white shadow-xs'
                                : 'border-border bg-white text-foreground hover:border-foreground/40'
                            )}
                          >
                            {val.value}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="space-y-[10px]">
              <div className="flex justify-between text-[13px]">
                <span className="font-semibold text-foreground">Size</span>
                <span className="text-foreground-secondary">{selectedSize}</span>
              </div>
              <div className="flex gap-[8px]">
                {['S', 'M', 'L', 'XL'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={cn(
                      'w-[44px] h-[40px] rounded-[6px] text-[13px] font-medium border transition-all',
                      selectedSize === s
                        ? 'border-foreground bg-foreground text-white shadow-xs'
                        : 'border-border bg-white text-foreground hover:border-foreground/40'
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Stock status */}
          <div className="space-y-[10px]">
            <span className="font-semibold text-[13px] text-foreground block">Quantity</span>
            <div className="flex items-center gap-[16px]">
              <div className="flex items-center border border-border rounded-[8px] bg-white h-[44px]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-[10px] text-foreground-secondary hover:text-foreground transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-[36px] text-center font-medium text-[14px]">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock_quantity || 10, quantity + 1))}
                  className="p-[10px] text-foreground-secondary hover:text-foreground transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              {product.stock_quantity > 0 ? (
                <span className="text-[13px] text-success flex items-center gap-[6px] font-medium">
                  <Check size={14} /> In Stock ({product.stock_quantity} available)
                </span>
              ) : (
                <span className="text-[13px] text-destructive font-medium">Out of Stock</span>
              )}
            </div>
          </div>

          {/* Add to Cart CTA */}
          <Button
            size="sm"
            shimmer
            className="w-full h-[52px] text-[15px] font-semibold shadow-md"
            onClick={handleAddToCart}
            disabled={product.stock_quantity === 0}
          >
            {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2.5 p-3 rounded-sm bg-background-secondary/70 border border-border/50 text-[12px] text-foreground-secondary">
              <Truck size={16} className="text-accent shrink-0" />
              <span>Free Delivery in 2-4 Days</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-sm bg-background-secondary/70 border border-border/50 text-[12px] text-foreground-secondary">
              <RotateCcw size={16} className="text-accent shrink-0" />
              <span>14-Day Easy Returns</span>
            </div>
          </div>

          {/* Accordion specs / details */}
          <Accordion items={accordionItems} />
        </div>
      </div>

      {/* Reviews Section */}
      <section className="border-t border-border pt-[64px] mb-[80px]">
        <h2 className="text-section font-serif mb-[40px]">Customer Reviews</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[48px] items-start">
          {/* Summary Ratings Column */}
          <div className="space-y-[16px] bg-background-secondary p-[24px] rounded-[12px]">
            <h3 className="text-[20px] font-semibold">Reviews Summary</h3>
            <div className="flex items-baseline gap-[8px]">
              <span className="text-[48px] font-serif font-bold">
                {(product.average_rating || 5.0).toFixed(1)}
              </span>
              <span className="text-foreground-secondary text-[16px]">/ 5</span>
            </div>
            <p className="text-[14px] text-foreground-secondary">
              100% of verified buyers recommend this item.
            </p>
          </div>

          {/* Individual Reviews Column */}
          <div className="lg:col-span-2 space-y-[24px]">
            {currentReviews.map((rev) => (
              <div key={rev.id} className="pb-[24px] border-b border-border last:border-0 space-y-[8px]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[15px]">{rev.user?.full_name}</span>
                  <span className="text-[12px] text-foreground-secondary">
                    {new Date(rev.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-[4px] text-warning">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                  {rev.is_verified && (
                    <span className="ml-[8px] text-[11px] bg-success/10 text-success px-[8px] py-[2px] rounded-full font-medium">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <h4 className="font-medium text-[15px] text-foreground mt-[8px]">{rev.title}</h4>
                <p className="text-[14px] text-foreground-secondary leading-relaxed">{rev.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="border-t border-border pt-[64px]">
        <h2 className="text-section font-serif mb-[40px]">Related Products</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {relatedProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} showQuickAdd={false} />
          ))}
        </div>
      </section>
    </div>
  );
}
