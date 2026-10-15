'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Search, Package, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

export default function BottomNav() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { user } = useAuth();

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      label: 'Items',
      href: '/products',
      icon: Package,
      isActive: pathname.startsWith('/products'),
    },
    {
      label: 'Search',
      href: '/search',
      icon: Search,
      isActive: pathname === '/search',
    },
    {
      label: 'Cart',
      onClick: openCart,
      icon: ShoppingBag,
      badge: itemCount,
      isActive: false,
    },
    {
      label: 'Account',
      href: user ? '/account' : '/auth/signin',
      icon: User,
      isActive: pathname.startsWith('/account') || pathname.startsWith('/auth'),
    },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-border/80 px-2 py-1 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isButton = !!item.onClick;

          const content = (
            <div
              className={cn(
                'flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all relative',
                item.isActive
                  ? 'text-accent font-semibold'
                  : 'text-foreground-secondary hover:text-foreground'
              )}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={item.isActive ? 2.4 : 1.8} />
                {item.badge !== undefined && item.badge > 0 && (
                  <AnimatePresence>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1.5 -right-2.5 min-w-[16px] h-[16px] flex items-center justify-center bg-accent text-white text-[9px] font-bold rounded-full px-1"
                    >
                      {item.badge}
                    </motion.span>
                  </AnimatePresence>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">
                {item.label}
              </span>
              {item.isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="w-1 h-1 rounded-full bg-accent mt-0.5"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </div>
          );

          if (isButton) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                className="focus:outline-none"
                aria-label={item.label}
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href!}
              className="focus:outline-none"
              aria-label={item.label}
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
