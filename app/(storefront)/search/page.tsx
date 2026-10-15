
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency, getEffectivePrice, isOnSale } from '@/lib/utils';
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';
import { demoProducts } from '@/lib/demo-data';
import {
  Search,
  X,
  ArrowRight,
  Loader2,
  ShoppingBag,
} from 'lucide-react';

// Popular search suggestions
const popularSearches = [
  'Cotton T-Shirt',
  'Crossbody Bag',
  'Gold Watch',
  'Chelsea Boots',
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // --------------------------------------------------
  // Focus input + load recent searches
  // --------------------------------------------------
  useEffect(() => {
    inputRef.current?.focus();

    try {
      const stored = localStorage.getItem('recent_searches');

      if (stored) {
        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          setRecentSearches(parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load recent searches:', error);
    }
  }, []);

  // --------------------------------------------------
  // Real Supabase product search
  // --------------------------------------------------
  useEffect(() => {
    const searchProducts = async () => {
      const trimmedQuery = query.trim();

      if (!trimmedQuery) {
        setResults([]);
        setIsSearching(false);
        setHasSearched(false);
        return;
      }

      setIsSearching(true);

      try {
        /*
         * Search products by:
         * - title
         * - slug
         * - SKU
         *
         * Only active products are returned.
         */
        const { data, error } = await supabase
          .from('products')
          .select(`
            *,
            product_images (
              id,
              image_url,
              sort_order
            )
          `)
          .eq('status', 'active')
          .or(
            `title.ilike.%${trimmedQuery}%,slug.ilike.%${trimmedQuery}%,sku.ilike.%${trimmedQuery}%`
          )
          .order('created_at', { ascending: false })
          .limit(20);

        if (error || !data || data.length === 0) {
          const lowerQ = trimmedQuery.toLowerCase();
          const mockMatches = demoProducts.filter(
            (p) =>
              p.title.toLowerCase().includes(lowerQ) ||
              p.slug.toLowerCase().includes(lowerQ) ||
              p.description?.toLowerCase().includes(lowerQ) ||
              p.category?.name.toLowerCase().includes(lowerQ)
          );
          setResults(mockMatches);
        } else {
          setResults(data as Product[]);
        }
        setHasSearched(true);
      } catch (error) {
        console.error('Search error, using fallback:', error);
        const lowerQ = trimmedQuery.toLowerCase();
        const mockMatches = demoProducts.filter(
          (p) =>
            p.title.toLowerCase().includes(lowerQ) ||
            p.slug.toLowerCase().includes(lowerQ) ||
            p.description?.toLowerCase().includes(lowerQ)
        );
        setResults(mockMatches);
        setHasSearched(true);
      } finally {
        setIsSearching(false);
      }
    };

    // Debounce search by 350ms
    const timeout = setTimeout(searchProducts, 350);

    return () => clearTimeout(timeout);
  }, [query]);

  // --------------------------------------------------
  // Save search
  // --------------------------------------------------
  const saveRecentSearch = (searchTerm: string) => {
    const trimmed = searchTerm.trim();

    if (!trimmed) return;

    const nextRecents = [
      trimmed,
      ...recentSearches.filter(
        (item) => item.toLowerCase() !== trimmed.toLowerCase()
      ),
    ].slice(0, 5);

    setRecentSearches(nextRecents);

    try {
      localStorage.setItem(
        'recent_searches',
        JSON.stringify(nextRecents)
      );
    } catch (error) {
      console.error('Failed to save recent search:', error);
    }
  };

  // --------------------------------------------------
  // Submit search
  // --------------------------------------------------
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    saveRecentSearch(query);
  };

  // --------------------------------------------------
  // Clear search
  // --------------------------------------------------
  const handleClear = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // --------------------------------------------------
  // Select suggestion
  // --------------------------------------------------
  const handleSuggestionClick = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // --------------------------------------------------
  // Get product image
  // --------------------------------------------------
  const getProductImage = (product: Product) => {
    /*
     * Supports product_images relation returned
     * from Supabase.
     */

    const productWithImages = product as Product & {
      product_images?: Array<{
        id: string;
        image_url: string;
        sort_order?: number;
      }>;
    };

    const images = productWithImages.product_images;

    if (images && images.length > 0) {
      const sortedImages = [...images].sort(
        (a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)
      );

      return sortedImages[0]?.image_url || null;
    }

    /*
     * Fallback for projects where Product already
     * contains an images property.
     */
    if (product.images && product.images.length > 0) {
      return product.images[0]?.image_url || null;
    }

    return null;
  };

  return (
    <main className="container-main py-[64px] max-w-[900px] mx-auto min-h-[70vh]">
      <div className="space-y-[40px]">

        {/* ------------------------------------------- */}
        {/* Search Header */}
        {/* ------------------------------------------- */}

        <div className="text-center space-y-[10px]">
          <h1 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-foreground">
            Search
          </h1>

          <p className="text-[14px] md:text-[15px] text-foreground-secondary">
            Find products, collections, and accessories
          </p>
        </div>

        {/* ------------------------------------------- */}
        {/* Search Input */}
        {/* ------------------------------------------- */}

        <form
          onSubmit={handleSearchSubmit}
          className="relative"
        >
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, collections, accessories..."
            autoComplete="off"
            className="
              w-full
              h-[64px]
              pl-[58px]
              pr-[58px]
              border
              border-border-strong
              rounded-[12px]
              text-[17px]
              outline-none
              focus:border-accent
              bg-white
              shadow-sm
              transition-colors
            "
          />

          <Search
            size={24}
            className="
              absolute
              left-[20px]
              top-[20px]
              text-foreground-secondary
            "
          />

          {/* Loading icon */}
          {isSearching && (
            <Loader2
              size={22}
              className="
                absolute
                right-[20px]
                top-[21px]
                animate-spin
                text-foreground-secondary
              "
            />
          )}

          {/* Clear button */}
          {!isSearching && query && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search"
              className="
                absolute
                right-[18px]
                top-[18px]
                w-[28px]
                h-[28px]
                flex
                items-center
                justify-center
                rounded-full
                hover:bg-foreground/5
                transition-colors
              "
            >
              <X
                size={20}
                className="text-foreground-secondary"
              />
            </button>
          )}
        </form>

        {/* ------------------------------------------- */}
        {/* Suggestions */}
        {/* ------------------------------------------- */}

        {!query && (
          <div className="space-y-[32px]">

            {/* Popular */}
            <section>
              <h2
                className="
                  text-caption
                  uppercase
                  tracking-label
                  text-foreground-secondary
                  mb-[14px]
                "
              >
                Popular Searches
              </h2>

              <div className="flex flex-wrap gap-[8px]">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleSuggestionClick(term)}
                    className="
                      px-[16px]
                      py-[9px]
                      bg-background-secondary
                      rounded-full
                      text-[13px]
                      font-medium
                      hover:bg-foreground/5
                      transition-colors
                    "
                  >
                    {term}
                  </button>
                ))}
              </div>
            </section>

            {/* Recent */}
            {recentSearches.length > 0 && (
              <section>
                <h2
                  className="
                    text-caption
                    uppercase
                    tracking-label
                    text-foreground-secondary
                    mb-[14px]
                  "
                >
                  Recent Searches
                </h2>

                <div className="border-t border-border">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() =>
                        handleSuggestionClick(term)
                      }
                      className="
                        flex
                        items-center
                        justify-between
                        w-full
                        text-left
                        py-[13px]
                        border-b
                        border-border
                        text-[14px]
                        text-foreground-secondary
                        hover:text-foreground
                        transition-colors
                      "
                    >
                      <span>{term}</span>

                      <ArrowRight size={15} />
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* ------------------------------------------- */}
        {/* Search Results */}
        {/* ------------------------------------------- */}

        <AnimatePresence mode="wait">
          {query && (
            <motion.section
              key="results"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-[20px]"
            >

              {/* Result heading */}
              <div className="flex items-center justify-between">
                <h2
                  className="
                    text-caption
                    uppercase
                    tracking-label
                    text-foreground-secondary
                  "
                >
                  {isSearching
                    ? 'Searching...'
                    : `Search Results (${results.length})`}
                </h2>
              </div>

              {/* Loading */}
              {isSearching && (
                <div className="flex items-center justify-center py-[50px]">
                  <div className="flex items-center gap-[10px] text-[14px] text-foreground-secondary">
                    <Loader2
                      size={20}
                      className="animate-spin"
                    />
                    Searching products...
                  </div>
                </div>
              )}

              {/* Results */}
              {!isSearching && results.length > 0 && (
                <div className="space-y-[10px]">
                  {results.map((product) => {
                    const image = getProductImage(product);

                    const effectivePrice =
                      getEffectivePrice(product);

                    const productOnSale =
                      isOnSale(product);

                    return (
                      <motion.div
                        key={product.id}
                        initial={{
                          opacity: 0,
                          y: 5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                      >
                        <Link
                          href={`/products/${product.slug}`}
                          className="
                            group
                            flex
                            items-center
                            gap-[16px]
                            p-[12px]
                            border
                            border-border
                            rounded-[10px]
                            hover:border-accent
                            transition-all
                            bg-white
                          "
                        >

                          {/* Product Image */}
                          <div
                            className="
                              relative
                              w-[64px]
                              h-[76px]
                              flex-shrink-0
                              rounded-[7px]
                              overflow-hidden
                              bg-background-secondary
                            "
                          >
                            {image ? (
                              <img
                                src={image}
                                alt={product.title}
                                className="
                                  w-full
                                  h-full
                                  object-cover
                                  transition-transform
                                  duration-300
                                  group-hover:scale-105
                                "
                              />
                            ) : (
                              <div
                                className="
                                  w-full
                                  h-full
                                  flex
                                  items-center
                                  justify-center
                                "
                              >
                                <ShoppingBag
                                  size={22}
                                  className="text-foreground-muted"
                                />
                              </div>
                            )}
                          </div>

                          {/* Product Information */}
                          <div className="flex-1 min-w-0">

                            <h3
                              className="
                                text-[14px]
                                md:text-[15px]
                                font-medium
                                text-foreground
                                truncate
                                group-hover:text-accent
                                transition-colors
                              "
                            >
                              {product.title}
                            </h3>

                            <div className="flex items-center gap-[8px] mt-[4px]">

                              <span
                                className="
                                  text-[14px]
                                  font-semibold
                                  text-foreground
                                "
                              >
                                {formatCurrency(
                                  effectivePrice
                                )}
                              </span>

                              {productOnSale &&
                                product.sale_price && (
                                  <span
                                    className="
                                      text-[12px]
                                      text-foreground-muted
                                      line-through
                                    "
                                  >
                                    {formatCurrency(
                                      product.price
                                    )}
                                  </span>
                                )}
                            </div>

                            {product.stock_quantity <= 0 && (
                              <span
                                className="
                                  text-[11px]
                                  text-red-500
                                  mt-[3px]
                                  block
                                "
                              >
                                Out of stock
                              </span>
                            )}
                          </div>

                          {/* Arrow */}
                          <ArrowRight
                            size={17}
                            className="
                              flex-shrink-0
                              text-foreground-secondary
                              group-hover:text-accent
                              group-hover:translate-x-[2px]
                              transition-all
                            "
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* ------------------------------------- */}
              {/* No Results */}
              {/* ------------------------------------- */}

              {!isSearching &&
                hasSearched &&
                results.length === 0 && (
                  <div
                    className="
                      py-[60px]
                      text-center
                      border
                      border-dashed
                      border-border
                      rounded-[12px]
                    "
                  >
                    <div
                      className="
                        w-[52px]
                        h-[52px]
                        mx-auto
                        mb-[16px]
                        rounded-full
                        bg-background-secondary
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Search
                        size={22}
                        className="text-foreground-muted"
                      />
                    </div>

                    <h3
                      className="
                        text-[16px]
                        font-medium
                        text-foreground
                      "
                    >
                      No products found
                    </h3>

                    <p
                      className="
                        mt-[6px]
                        text-[13px]
                        text-foreground-secondary
                        max-w-[400px]
                        mx-auto
                      "
                    >
                      We couldn't find any products matching
                      "{query}".
                    </p>

                    <button
                      type="button"
                      onClick={handleClear}
                      className="
                        mt-[18px]
                        text-[13px]
                        font-medium
                        text-accent
                        hover:underline
                      "
                    >
                      Clear search
                    </button>
                  </div>
                )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
