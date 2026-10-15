import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind classes with clsx + tailwind-merge for conflict resolution.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as currency using the given code and symbol.
 */
export function formatCurrency(
  amount: number,
  currencySymbol: string = '₹',
): string {
  return `${currencySymbol}${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Generate a URL-safe slug from a string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncate text to a max length with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '…';
}

/**
 * Check if a product is currently on sale.
 */
export function isOnSale(product: {
  sale_price: number | null;
  sale_start: string | null;
  sale_end: string | null;
}): boolean {
  if (!product.sale_price) return false;
  const now = new Date();
  if (product.sale_start && new Date(product.sale_start) > now) return false;
  if (product.sale_end && new Date(product.sale_end) < now) return false;
  return true;
}

/**
 * Get the effective price of a product (sale or regular).
 */
export function getEffectivePrice(product: {
  price: number;
  sale_price: number | null;
  sale_start: string | null;
  sale_end: string | null;
}): number {
  return isOnSale(product) ? product.sale_price! : product.price;
}

/**
 * Calculate discount percentage.
 */
export function getDiscountPercentage(original: number, sale: number): number {
  if (original <= 0) return 0;
  return Math.round(((original - sale) / original) * 100);
}

/**
 * Generate a unique cart item ID from product and variant.
 */
export function getCartItemId(productId: string, variantId: string | null): string {
  return variantId ? `${productId}_${variantId}` : productId;
}

/**
 * Format a date string to a human-readable format.
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format a date string to a short format.
 */
export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Debounce a function.
 */
export function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Generate a random string ID.
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Get star rating display info.
 */
export function getStarRating(rating: number): { full: number; half: boolean; empty: number } {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return { full, half, empty };
}

/**
 * Calculate order summary totals.
 */
export function calculateOrderSummary(
  items: { price: number; quantity: number }[],
  shippingCost: number = 0,
  discountAmount: number = 0,
  taxRate: number = 0,
  taxInclusive: boolean = false,
): {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
} {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const afterDiscount = subtotal - discountAmount;
  
  let tax: number;
  if (taxInclusive) {
    tax = afterDiscount - afterDiscount / (1 + taxRate / 100);
  } else {
    tax = (afterDiscount * taxRate) / 100;
  }

  const total = taxInclusive
    ? afterDiscount + shippingCost
    : afterDiscount + tax + shippingCost;

  return {
    subtotal,
    discount: discountAmount,
    shipping: shippingCost,
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100,
  };
}

/**
 * Get fulfillment status color.
 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: '#F59E0B',
    processing: '#3B82F6',
    shipped: '#2563EB',
    delivered: '#16A34A',
    cancelled: '#DC2626',
    refunded: '#DC2626',
    paid: '#16A34A',
    failed: '#DC2626',
  };
  return colors[status] || '#6B6B6B';
}

/**
 * Pluralize a word based on count.
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : (plural || singular + 's');
}
