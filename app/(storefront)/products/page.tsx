'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn, formatCurrency } from '@/lib/utils';
import ProductCard from '@/components/storefront/ProductCard';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import {
  Filter,
  X,
  ChevronDown,
  SlidersHorizontal,
  Eye,
  ShoppingBag,
  Star,
  Plus,
  Minus,
} from 'lucide-react';
import { Product, Category } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/lib/supabase';
import { demoCategories, demoProducts } from '@/lib/demo-data';

const availableColors = [
  'Black',
  'Off-White',
  'Tan',
  'Navy',
  'Olive',
  'Gold',
];

const availableSizes = ['XS', 'S', 'M', 'L', 'XL'];

/* ============================================================
   PRODUCTS LIST CONTENT
============================================================ */

function ProductsListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ============================================================
     URL FILTERS
  ============================================================ */

  const selectedCategory = searchParams.get('category') || '';
  const selectedSort = searchParams.get('sort') || 'newest';

  const minPriceParam =
    Number(searchParams.get('minPrice')) || 0;

  const maxPriceParam =
    Number(searchParams.get('maxPrice')) || 20000;

  const onSaleParam =
    searchParams.get('sale') === 'true';

  /* ============================================================
     SUPABASE DATA
  ============================================================ */

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  /* ============================================================
     LOCAL FILTER STATE
  ============================================================ */

  const [priceRange, setPriceRange] =
    useState<[number, number]>([
      minPriceParam,
      maxPriceParam,
    ]);

  const [selectedColors, setSelectedColors] =
    useState<string[]>([]);

  const [selectedSizes, setSelectedSizes] =
    useState<string[]>([]);

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] =
    useState(false);

  const [visibleCount, setVisibleCount] =
    useState(8);

  /* ============================================================
     QUICK VIEW
  ============================================================ */

  const [quickViewProduct, setQuickViewProduct] =
    useState<Product | null>(null);

  const [selectedQuickSize, setSelectedQuickSize] =
    useState('M');

  const [quickQuantity, setQuickQuantity] =
    useState(1);

  const {
    addItem,
  } = useCart();

  /* ============================================================
     FETCH CATEGORIES
  ============================================================ */

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);

      try {
        const {
          data,
          error,
        } = await supabase
          .from('categories')
          .select('*')
          .order('sort_order', {
            ascending: true,
          });

        if (error) {
          console.error(
            'ERROR FETCHING CATEGORIES:',
            error
          );

          throw error;
        }

        setCategories((data || []) as Category[]);
      } catch (error: any) {
        console.error(
          'CATEGORY FETCH ERROR:',
          error
        );

        setCategories(demoCategories);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  /* ============================================================
     FETCH PRODUCTS + IMAGES
  ============================================================ */

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      setFetchError(null);

      try {
        /* --------------------------------------------------------
           1. Get products
        -------------------------------------------------------- */

        const {
  data: productData,
  error: productError,
} = await supabase
  .from('products')
  .select('*')
  .order('created_at', {
    ascending: false,
  });

        if (productError) {
          console.error(
            'ERROR FETCHING PRODUCTS:',
            productError
          );

          throw productError;
        }

        /* --------------------------------------------------------
           2. Get product images
        -------------------------------------------------------- */

        const {
          data: imageData,
          error: imageError,
        } = await supabase
          .from('product_images')
          .select('*')
          .order('sort_order', {
            ascending: true,
          });

        if (imageError) {
          console.error(
            'ERROR FETCHING PRODUCT IMAGES:',
            imageError
          );

          throw imageError;
        }

        /* --------------------------------------------------------
           3. Convert images into groups by product_id
        -------------------------------------------------------- */

        const imagesByProduct: Record<
          string,
          any[]
        > = {};

        (imageData || []).forEach((image: any) => {
          if (!imagesByProduct[image.product_id]) {
            imagesByProduct[image.product_id] = [];
          }

          imagesByProduct[image.product_id].push({
            id: image.id,
            product_id: image.product_id,
            image_url: image.image_url,
            sort_order: image.sort_order ?? 0,
            alt_text:
              image.alt_text ||
              '',
          });
        });

        /* --------------------------------------------------------
           4. Create category lookup
        -------------------------------------------------------- */

        const categoryLookup: Record<
          string,
          Category
        > = {};

        categories.forEach((category) => {
          categoryLookup[category.id] =
            category;
        });

        /* --------------------------------------------------------
           5. Format products for ProductCard
        -------------------------------------------------------- */

        const formattedProducts: Product[] =
          (productData || []).map((product: any) => {
            const additionalImages =
              imagesByProduct[product.id] || [];

            const allImages: any[] = [];

            /*
             * Main product image
             * comes from products.og_image_url
             */
            if (product.og_image_url) {
              allImages.push({
                id: `${product.id}-main`,
                product_id: product.id,
                image_url:
                  product.og_image_url,
                sort_order: -1,
                alt_text:
                  product.title,
              });
            }

            /*
             * Additional images
             * come from product_images
             */
            additionalImages.forEach(
              (image) => {
                if (
                  !allImages.some(
                    (existing) =>
                      existing.image_url ===
                      image.image_url
                  )
                ) {
                  allImages.push(image);
                }
              }
            );

            return {
              ...product,

              category:
                categoryLookup[
                  product.category_id
                ] || undefined,

              images: allImages,

              options:
                product.options || [],

              variants:
                product.variants || [],
            } as Product;
          });

        setProducts(formattedProducts);
      } catch (error: any) {
        console.error(
          'ERROR FETCHING PRODUCTS:',
          error
        );

        const categoryLookup: Record<string, Category> = {};
        demoCategories.forEach((category) => {
          categoryLookup[category.id] = category;
        });

        const formattedDemoProducts = demoProducts.map((p) => ({
          ...p,
          category: p.category_id ? categoryLookup[p.category_id] : undefined,
        }));

        setProducts(formattedDemoProducts as Product[]);
        setFetchError(null);
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [categories]);

  /* ============================================================
     SYNC PRICE SLIDER WITH URL
  ============================================================ */

  useEffect(() => {
    setPriceRange([
      minPriceParam,
      maxPriceParam,
    ]);
  }, [
    minPriceParam,
    maxPriceParam,
  ]);

  /* ============================================================
     URL UPDATE
  ============================================================ */

  const updateURL = (
    params: Record<
      string,
      string | null
    >
  ) => {
    const nextParams =
      new URLSearchParams(
        searchParams.toString()
      );

    Object.entries(params).forEach(
      ([key, value]) => {
        if (
          value === null ||
          value === ''
        ) {
          nextParams.delete(key);
        } else {
          nextParams.set(
            key,
            value
          );
        }
      }
    );

    const queryString =
      nextParams.toString();

    router.push(
      queryString
        ? `/products?${queryString}`
        : '/products'
    );
  };

  /* ============================================================
     RESET FILTERS
  ============================================================ */

  const handleResetFilters = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setPriceRange([
      0,
      20000,
    ]);

    setVisibleCount(8);

    router.push('/products');
  };

  /* ============================================================
     FILTER + SORT PRODUCTS
  ============================================================ */

  const filteredProducts =
    useMemo(() => {
      const filtered =
        products.filter((product) => {
          /* ------------------------------------------------------
             Category
          ------------------------------------------------------ */

          if (
            selectedCategory &&
            product.category?.slug !==
              selectedCategory
          ) {
            return false;
          }

          /* ------------------------------------------------------
             Price
          ------------------------------------------------------ */

          const price =
            product.sale_price !==
            null &&
            product.sale_price !==
              undefined
              ? Number(
                  product.sale_price
                )
              : Number(
                  product.price
                );

          if (
            price <
              priceRange[0] ||
            price >
              priceRange[1]
          ) {
            return false;
          }

          /* ------------------------------------------------------
             Sale
          ------------------------------------------------------ */

          if (
            onSaleParam &&
            product.sale_price ===
              null
          ) {
            return false;
          }

          return true;
        });

      /* ----------------------------------------------------------
         Sort
      ---------------------------------------------------------- */

      return filtered.sort(
        (a, b) => {
          const aPrice =
            a.sale_price !==
              null &&
            a.sale_price !==
              undefined
              ? Number(
                  a.sale_price
                )
              : Number(a.price);

          const bPrice =
            b.sale_price !==
              null &&
            b.sale_price !==
              undefined
              ? Number(
                  b.sale_price
                )
              : Number(b.price);

          if (
            selectedSort ===
            'price-low'
          ) {
            return (
              aPrice - bPrice
            );
          }

          if (
            selectedSort ===
            'price-high'
          ) {
            return (
              bPrice - aPrice
            );
          }

          if (
            selectedSort ===
            'newest'
          ) {
            return (
              new Date(
                b.created_at
              ).getTime() -
              new Date(
                a.created_at
              ).getTime()
            );
          }

          return 0;
        }
      );
    }, [
      products,
      selectedCategory,
      selectedSort,
      priceRange,
      onSaleParam,
    ]);

  /* ============================================================
     QUICK ADD
  ============================================================ */

  const handleQuickAdd = (
    e: React.MouseEvent,
    product: Product
  ) => {
    e.preventDefault();

    const price =
      product.sale_price !==
        null &&
      product.sale_price !==
        undefined
        ? Number(
            product.sale_price
          )
        : Number(
            product.price
          );

    addItem({
      id: product.id,
      product_id: product.id,
      variant_id: null,
      title: product.title,

      image_url:
        product.images?.[0]
          ?.image_url ||
        product.og_image_url ||
        '',

      price,

      original_price:
        Number(product.price),

      quantity:
        quickQuantity,

      variant_info: {
        Size:
          selectedQuickSize,
      },

      max_quantity:
        product.stock_quantity,
    });

    setQuickViewProduct(null);
    setQuickQuantity(1);
  };

  /* ============================================================
     LOADING
  ============================================================ */

  if (
    loadingProducts ||
    loadingCategories
  ) {
    return (
      <div className="container-main py-[80px]">
        <div className="text-center">
          <div className="inline-flex items-center gap-[10px]">
            <div className="w-[18px] h-[18px] border-2 border-foreground border-t-transparent rounded-full animate-spin" />

            <p className="text-[14px] text-foreground-secondary">
              Loading products...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ============================================================
     ERROR
  ============================================================ */

  if (fetchError) {
    return (
      <div className="container-main py-[80px]">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-[20px] font-semibold mb-[8px]">
            Unable to load products
          </h2>

          <p className="text-[14px] text-foreground-secondary mb-[16px]">
            {fetchError}
          </p>

          <Button
            onClick={() =>
              window.location.reload()
            }
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  /* ============================================================
     MAIN UI
  ============================================================ */

  return (
    <div className="container-main py-[24px] sm:py-[48px]">

      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-[16px] mb-[32px]">

        <div>
          <h1 className="text-section font-serif">
            All Products
          </h1>

          <p className="text-[14px] text-foreground-secondary mt-[4px]">
            Showing{' '}
            {Math.min(
              filteredProducts.length,
              visibleCount
            )}{' '}
            of{' '}
            {filteredProducts.length}{' '}
            items
          </p>
        </div>

        {/* Sort + Mobile Filters */}

        <div className="flex items-center gap-[16px]">

          <button
            onClick={() =>
              setIsMobileFiltersOpen(
                true
              )
            }
            className="md:hidden flex items-center gap-[8px] h-[44px] px-[16px] border border-border-strong rounded-[8px] text-[14px] font-medium"
          >
            <SlidersHorizontal
              size={16}
            />

            Filters
          </button>

          <div className="flex items-center gap-[8px]">

            <span className="text-[14px] text-foreground-secondary hidden sm:inline">
              Sort by
            </span>

<select
  id="product-sort"
  name="sort"
  aria-label="Sort products"
  value={selectedSort}
  onChange={(e) =>
    updateURL({
      sort: e.target.value,
    })
  }
  className="h-[44px] px-[16px] border border-border-strong rounded-[8px] bg-white text-[14px] font-medium outline-none focus:border-accent"
>
  <option value="newest">
    Newest Arrivals
  </option>

  <option value="price-low">
    Price: Low to High
  </option>

  <option value="price-high">
    Price: High to Low
  </option>
</select>

          </div>
        </div>
      </div>

      {/* ========================================================
          MAIN CONTENT
      ======================================================== */}

      <div className="flex gap-[48px] items-start">

        {/* ======================================================
            DESKTOP SIDEBAR
        ====================================================== */}

        <aside className="w-[240px] hidden md:block space-y-[32px] flex-shrink-0">

          {/* Categories */}

          <div>
            <h3 className="text-caption uppercase font-semibold text-foreground tracking-label mb-[16px]">
              Category
            </h3>

            <div className="space-y-[8px]">

              <button
                onClick={() =>
                  updateURL({
                    category:
                      null,
                  })
                }
                className={cn(
                  'block text-[14px] font-medium transition-colors',
                  selectedCategory ===
                    ''
                    ? 'text-accent font-semibold'
                    : 'text-foreground-secondary hover:text-foreground'
                )}
              >
                All Categories
              </button>

              {categories.map(
                (category) => (
                  <button
                    key={
                      category.id
                    }
                    onClick={() =>
                      updateURL({
                        category:
                          category.slug,
                      })
                    }
                    className={cn(
                      'block text-[14px] font-medium transition-colors',
                      selectedCategory ===
                        category.slug
                        ? 'text-accent font-semibold'
                        : 'text-foreground-secondary hover:text-foreground'
                    )}
                  >
                    {
                      category.name
                    }
                  </button>
                )
              )}
            </div>
          </div>

          {/* Price Range */}

          <div>
            <h3 className="text-caption uppercase font-semibold text-foreground tracking-label mb-[16px]">
              Price Range
            </h3>

            <div className="space-y-[16px]">

              <input
                type="range"
                min="0"
                max="20000"
                step="500"
                value={
                  priceRange[1]
                }
                onChange={(e) => {
                  const max =
                    Number(
                      e.target
                        .value
                    );

                  setPriceRange([
                    priceRange[0],
                    max,
                  ]);
                }}
                onMouseUp={() =>
                  updateURL({
                    maxPrice:
                      String(
                        priceRange[1]
                      ),
                  })
                }
                className="w-full accent-accent"
              />

              <div className="flex items-center justify-between text-[13px] text-foreground-secondary">

                <span>
                  {formatCurrency(
                    priceRange[0]
                  )}
                </span>

                <span>
                  {formatCurrency(
                    priceRange[1]
                  )}
                </span>

              </div>
            </div>
          </div>

          {/* Colors */}

          <div>
            <h3 className="text-caption uppercase font-semibold text-foreground tracking-label mb-[16px]">
              Colors
            </h3>

            <div className="flex flex-wrap gap-[8px]">

              {availableColors.map(
                (color) => {
                  const isSelected =
                    selectedColors.includes(
                      color
                    );

                  return (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColors(
                          isSelected
                            ? selectedColors.filter(
                                (
                                  c
                                ) =>
                                  c !==
                                  color
                              )
                            : [
                                ...selectedColors,
                                color,
                              ]
                        );
                      }}
                      className={cn(
                        'px-[12px] py-[6px] rounded-full text-[13px] border transition-all',
                        isSelected
                          ? 'border-foreground bg-foreground text-white'
                          : 'border-border-strong text-foreground-secondary hover:border-foreground'
                      )}
                    >
                      {color}
                    </button>
                  );
                }
              )}

            </div>
          </div>

          {/* Sizes */}

          <div>
            <h3 className="text-caption uppercase font-semibold text-foreground tracking-label mb-[16px]">
              Sizes
            </h3>

            <div className="flex flex-wrap gap-[8px]">

              {availableSizes.map(
                (size) => {
                  const isSelected =
                    selectedSizes.includes(
                      size
                    );

                  return (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSizes(
                          isSelected
                            ? selectedSizes.filter(
                                (
                                  s
                                ) =>
                                  s !==
                                  size
                              )
                            : [
                                ...selectedSizes,
                                size,
                              ]
                        );
                      }}
                      className={cn(
                        'w-[40px] h-[40px] rounded-[8px] text-[13px] border flex items-center justify-center transition-all',
                        isSelected
                          ? 'border-foreground bg-foreground text-white'
                          : 'border-border-strong text-foreground-secondary hover:border-foreground'
                      )}
                    >
                      {size}
                    </button>
                  );
                }
              )}

            </div>
          </div>

          {/* Sale */}

          <div className="flex items-center gap-[8px]">

            <input
              type="checkbox"
              id="sale"
              checked={
                onSaleParam
              }
              onChange={(e) =>
                updateURL({
                  sale: e.target
                    .checked
                    ? 'true'
                    : null,
                })
              }
              className="w-[16px] h-[16px] accent-accent rounded"
            />

            <label
              htmlFor="sale"
              className="text-[14px] text-foreground-secondary cursor-pointer"
            >
              On Sale /
              Discounts
            </label>
          </div>

          {/* Reset */}

          <Button
            variant="outline"
            fullWidth
            size="sm"
            onClick={
              handleResetFilters
            }
          >
            Reset Filters
          </Button>
        </aside>

        {/* ======================================================
            PRODUCT GRID
        ====================================================== */}

        <div className="flex-1">

          {filteredProducts.length ===
          0 ? (
            <div className="text-center py-[80px]">

              <p className="text-[16px] font-medium text-foreground-secondary">
                No products found
                matching the
                criteria.
              </p>

              <button
                onClick={
                  handleResetFilters
                }
                className="text-accent underline text-[14px] mt-[8px] hover:text-accent-hover"
              >
                Clear all
                filters
              </button>

            </div>
          ) : (
            <div className="space-y-[48px]">

              {/* Active Filters */}

              {(selectedCategory ||
                onSaleParam ||
                priceRange[1] <
                  20000) && (
                <div className="flex flex-wrap items-center gap-[8px]">

                  <span className="text-[13px] text-foreground-secondary mr-[4px]">
                    Active Filters:
                  </span>

                  {selectedCategory && (
                    <span className="inline-flex items-center gap-[4px] px-[12px] py-[4px] bg-background-secondary rounded-full text-[12px] font-medium">

                      Category:{' '}
                      {
                        selectedCategory
                      }

                      <button
                        onClick={() =>
                          updateURL({
                            category:
                              null,
                          })
                        }
                        className="hover:text-destructive"
                      >
                        <X size={12} />
                      </button>

                    </span>
                  )}

                  {priceRange[1] <
                    20000 && (
                    <span className="inline-flex items-center gap-[4px] px-[12px] py-[4px] bg-background-secondary rounded-full text-[12px] font-medium">

                      Under{' '}
                      {formatCurrency(
                        priceRange[1]
                      )}

                      <button
                        onClick={() =>
                          updateURL({
                            maxPrice:
                              null,
                          })
                        }
                        className="hover:text-destructive"
                      >
                        <X size={12} />
                      </button>

                    </span>
                  )}

                  {onSaleParam && (
                    <span className="inline-flex items-center gap-[4px] px-[12px] py-[4px] bg-background-secondary rounded-full text-[12px] font-medium">

                      On Sale

                      <button
                        onClick={() =>
                          updateURL({
                            sale: null,
                          })
                        }
                        className="hover:text-destructive"
                      >
                        <X size={12} />
                      </button>

                    </span>
                  )}

                  <button
                    onClick={
                      handleResetFilters
                    }
                    className="text-[12px] text-foreground-secondary hover:text-foreground underline ml-[4px]"
                  >
                    Clear All
                  </button>

                </div>
              )}

              {/* Product Grid */}

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[14px] sm:gap-x-[20px] gap-y-[24px] sm:gap-y-[32px]">

                {filteredProducts
                  .slice(
                    0,
                    visibleCount
                  )
                  .map(
                    (
                      product,
                      index
                    ) => (
                      <div
                        key={
                          product.id
                        }
                        className="relative group"
                      >

                        <ProductCard
                          product={
                            product
                          }
                          index={
                            index
                          }
                          showQuickAdd={
                            false
                          }
                        />

                        {/* Quick View */}

                        <button
                          onClick={() =>
                            setQuickViewProduct(
                              product
                            )
                          }
                          className="absolute top-[8px] right-[8px] p-[8px] rounded-full bg-white/90 backdrop-blur-sm border border-border shadow-sm text-foreground-secondary hover:text-foreground opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                          aria-label="Quick view"
                        >
                          <Eye
                            size={
                              16
                            }
                          />
                        </button>

                      </div>
                    )
                  )}

              </div>

              {/* Load More */}

              {visibleCount <
                filteredProducts.length && (
                <div className="text-center pt-[16px]">

                  <Button
                    variant="outline"
                    size="md"
                    onClick={() =>
                      setVisibleCount(
                        (
                          previous
                        ) =>
                          previous +
                          4
                      )
                    }
                    className="gap-2 px-6"
                  >
                    Load More
                  </Button>

                </div>
              )}

            </div>
          )}

        </div>
      </div>

      {/* ========================================================
          MOBILE FILTER DRAWER
      ======================================================== */}

      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setIsMobileFiltersOpen(
                  false
                )
              }
              className="fixed inset-0 z-[80] backdrop-overlay"
            />

            <motion.div
              initial={{
                y: '100%',
              }}
              animate={{
                y: 0,
              }}
              exit={{
                y: '100%',
              }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 200,
              }}
              className="fixed bottom-0 left-0 right-0 z-[81] bg-white rounded-t-[16px] max-h-[85vh] overflow-y-auto p-[24px] shadow-modal space-y-[24px]"
            >

              <div className="flex items-center justify-between border-b border-border pb-[16px]">

                <h2 className="text-[18px] font-semibold">
                  Filter & Sort
                </h2>

                <button
                  onClick={() =>
                    setIsMobileFiltersOpen(
                      false
                    )
                  }
                  className="p-[4px]"
                >
                  <X size={20} />
                </button>

              </div>

              {/* Mobile Categories */}

              <div>

                <h3 className="text-caption-sm uppercase tracking-label text-foreground-secondary mb-[12px]">
                  Category
                </h3>

                <div className="flex flex-wrap gap-[8px]">

                  <button
                    onClick={() => {
                      updateURL({
                        category:
                          null,
                      });

                      setIsMobileFiltersOpen(
                        false
                      );
                    }}
                    className={cn(
                      'px-[12px] py-[6px] rounded-full text-[13px] border',
                      selectedCategory ===
                        ''
                        ? 'border-foreground bg-foreground text-white'
                        : 'border-border-strong'
                    )}
                  >
                    All
                  </button>

                  {categories.map(
                    (category) => (
                      <button
                        key={
                          category.id
                        }
                        onClick={() => {
                          updateURL({
                            category:
                              category.slug,
                          });

                          setIsMobileFiltersOpen(
                            false
                          );
                        }}
                        className={cn(
                          'px-[12px] py-[6px] rounded-full text-[13px] border',
                          selectedCategory ===
                            category.slug
                            ? 'border-foreground bg-foreground text-white'
                            : 'border-border-strong'
                        )}
                      >
                        {
                          category.name
                        }
                      </button>
                    )
                  )}

                </div>
              </div>

              {/* Mobile Price */}

              <div>

                <h3 className="text-caption-sm uppercase tracking-label text-foreground-secondary mb-[12px]">
                  Max Price
                </h3>

                <input
                  type="range"
                  min="0"
                  max="20000"
                  step="500"
                  value={
                    priceRange[1]
                  }
                  onChange={(e) => {
                    const max =
                      Number(
                        e.target
                          .value
                      );

                    setPriceRange([
                      priceRange[0],
                      max,
                    ]);
                  }}
                  onMouseUp={() =>
                    updateURL({
                      maxPrice:
                        String(
                          priceRange[1]
                        ),
                    })
                  }
                  className="w-full accent-accent"
                />

                <div className="text-[13px] text-foreground-secondary mt-[8px]">
                  Under{' '}
                  {formatCurrency(
                    priceRange[1]
                  )}
                </div>

              </div>

              {/* Mobile Sale */}

              <div className="flex items-center gap-[8px]">

                <input
                  type="checkbox"
                  checked={
                    onSaleParam
                  }
                  onChange={(e) =>
                    updateURL({
                      sale: e.target
                        .checked
                        ? 'true'
                        : null,
                    })
                  }
                  className="w-[16px] h-[16px] accent-accent"
                />

                <span className="text-[14px]">
                  On Sale /
                  Discounts
                </span>

              </div>

              <div className="flex items-center justify-between pt-[16px] border-t border-border">

                <button
                  onClick={
                    handleResetFilters
                  }
                  className="text-[14px] text-foreground-secondary underline"
                >
                  Reset All
                </button>

                <Button
                  onClick={() =>
                    setIsMobileFiltersOpen(
                      false
                    )
                  }
                >
                  Apply Filters
                </Button>

              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ========================================================
          QUICK VIEW MODAL
      ======================================================== */}

      <Modal
        isOpen={
          quickViewProduct !==
          null
        }
        onClose={() =>
          setQuickViewProduct(
            null
          )
        }
        title={
          quickViewProduct?.title
        }
        size="lg"
      >

        {quickViewProduct && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">

            {/* Image */}

            <div className="aspect-square max-h-[360px] bg-background-secondary/50 rounded-[8px] relative overflow-hidden flex items-center justify-center border border-border/40">

              {quickViewProduct
                .images?.[0]
                ?.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={
                    quickViewProduct
                      .images[0]
                      .image_url
                  }
                  alt={
                    quickViewProduct.title
                  }
                  className="w-full h-full object-contain p-2"
                />
              ) : (
                <ShoppingBag
                  size={48}
                  className="absolute inset-0 m-auto text-foreground-muted"
                />
              )}

            </div>

            {/* Details */}

            <div className="space-y-[16px]">

              <div>

                <p className="text-[20px] font-semibold">

                  {formatCurrency(
                    quickViewProduct.sale_price !==
                      null &&
                      quickViewProduct.sale_price !==
                        undefined
                      ? Number(
                          quickViewProduct.sale_price
                        )
                      : Number(
                          quickViewProduct.price
                        )
                  )}

                </p>

                {quickViewProduct.sale_price !==
                  null &&
                  quickViewProduct.sale_price !==
                    undefined && (
                    <p className="text-[14px] text-foreground-secondary line-through">
                      {formatCurrency(
                        Number(
                          quickViewProduct.price
                        )
                      )}
                    </p>
                  )}

              </div>

              <p className="text-[14px] text-foreground-secondary">
                {
                  quickViewProduct.description
                }
              </p>

              {/* Size */}

              <div>

                <span className="text-[12px] font-medium text-foreground-secondary block mb-[8px]">
                  Select Size
                </span>

                <div className="flex gap-[8px]">

                  {[
                    'S',
                    'M',
                    'L',
                  ].map(
                    (size) => (
                      <button
                        key={
                          size
                        }
                        onClick={() =>
                          setSelectedQuickSize(
                            size
                          )
                        }
                        className={cn(
                          'w-[36px] h-[36px] rounded border text-[13px] flex items-center justify-center',
                          selectedQuickSize ===
                            size
                            ? 'border-foreground bg-foreground text-white'
                            : 'border-border-strong'
                        )}
                      >
                        {
                          size
                        }
                      </button>
                    )
                  )}

                </div>

              </div>

              {/* Quantity */}

              <div>

                <span className="text-[12px] font-medium text-foreground-secondary block mb-[8px]">
                  Quantity
                </span>

                <div className="flex items-center border border-border rounded-[6px] w-fit">

                  <button
                    onClick={() =>
                      setQuickQuantity(
                        (
                          quantity
                        ) =>
                          Math.max(
                            1,
                            quantity -
                              1
                          )
                      )
                    }
                    className="w-[32px] h-[32px] flex items-center justify-center text-foreground-secondary"
                  >
                    <Minus
                      size={12}
                    />
                  </button>

                  <span className="w-[32px] text-center text-[13px] font-medium">
                    {
                      quickQuantity
                    }
                  </span>

                  <button
                    onClick={() =>
                      setQuickQuantity(
                        (
                          quantity
                        ) =>
                          quantity +
                          1
                      )
                    }
                    className="w-[32px] h-[32px] flex items-center justify-center text-foreground-secondary"
                  >
                    <Plus
                      size={12}
                    />
                  </button>

                </div>

              </div>

              {/* Add to Cart */}

              <Button
                fullWidth
                onClick={(e) =>
                  handleQuickAdd(
                    e,
                    quickViewProduct
                  )
                }
                className="gap-[8px]"
              >
                <ShoppingBag
                  size={16}
                />

                Add to Cart
              </Button>

            </div>
          </div>
        )}

      </Modal>

    </div>
  );
}

/* ============================================================
   ROOT PAGE
============================================================ */

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container-main py-[80px] text-center">
          <p className="text-foreground-secondary">
            Loading products
            list...
          </p>
        </div>
      }
    >
      <ProductsListContent />
    </Suspense>
 

  );
}