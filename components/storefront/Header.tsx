'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import {
  Search,
  ShoppingBag,
  User,
  Heart,
  X,
  Home,
  LogIn,
  UserPlus,
  LogOut,
  ShieldCheck,
  Info,
  Phone,
  Package,
  Menu,
  ChevronRight,
  HelpCircle,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

const navLinks = [
  { label: 'Home',    href: '/',         icon: Home     },
  { label: 'Shop',    href: '/products', icon: Package  },
  { label: 'About',   href: '/about',    icon: Info     },
];

const quickCategories = [
  { label: 'All Products', href: '/products' },
  { label: 'New Arrivals', href: '/products?sort=newest' },
  { label: 'Best Sellers', href: '/products?sort=price-high' },
  { label: 'On Sale',      href: '/products?sale=true' },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const { itemCount, openCart } = useCart();
  const { user, profile, isAdmin, signOut } = useAuth();

  const cartIconRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        router.push('/search');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/auth/signin';
  };

  const userDisplayName =
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split('@')[0] ||
    'Member';

  return (
    <>
      {/* ── HEADER (Mobile & Laptop Friendly) ─────────────────────────── */}
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'h-[60px] bg-white/95 backdrop-blur-md shadow-[0_1px_20px_rgba(0,0,0,0.07)] border-b border-black/5'
            : 'h-[72px] sm:h-[76px] bg-white/85 backdrop-blur-sm border-b border-black/5'
        )}
      >
        <div className="container-main h-full flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">

          {/* ── LEFT: Brand ─────────────────────────────────────── */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              id="header-home-brand"
              aria-label="StyleHub Home"
              className="group flex items-center gap-2 sm:gap-2.5 transition-all duration-200 hover:opacity-85"
            >
              {/* Logo box */}
              <div className={cn(
                'flex items-center justify-center rounded-[10px] font-serif font-bold text-white transition-all duration-300 shadow-sm',
                isScrolled ? 'w-[34px] h-[34px] text-[15px]' : 'w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] text-[17px]',
                'bg-[#1a1a1a]'
              )}>
                S
              </div>
              {/* Brand name */}
              <span className={cn(
                'font-serif font-bold text-[#1a1a1a] tracking-[-0.04em] leading-none transition-all duration-300',
                isScrolled ? 'text-[19px] sm:text-[21px]' : 'text-[20px] sm:text-[23px]'
              )}>
                StyleHub
              </span>
            </Link>
          </div>

          {/* ── CENTER: Nav Links (Laptop & Desktop) ─────────────── */}
          <nav className="hidden md:flex items-center gap-1 shrink-0" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-4 lg:px-5 py-2 rounded-full text-[13.5px] font-medium transition-all duration-200',
                    isActive
                      ? 'text-[#1a1a1a] bg-[#1a1a1a]/6'
                      : 'text-[#6b6460] hover:text-[#1a1a1a] hover:bg-[#1a1a1a]/4'
                  )}
                >
                  {link.label}
                  {/* Active underline indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1a1a1a]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── RIGHT: Actions (Search, Cart, User, Menu) ────────── */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2.5 shrink-0">

            {/* Search Pill — Laptop / Tablet (>= sm) */}
            <Link
              href="/search"
              id="header-search-button"
              aria-label="Search products"
              className="hidden sm:flex items-center justify-between gap-2 px-3.5 h-5 rounded-full bg-[#f3f2f0] hover:bg-[#eae9e6] text-[#6b6460] hover:text-[#1a1a1a] text-[12px] font-medium transition-all border border-[#e5e3df] w-[140px] md:w-[170px] sm:w-[195px]"
            >
              <div className="flex items-center gap-2 truncate">
                <Search size={14} className="shrink-0 text-[#8a8480]" />
                <span className="truncate">Search...</span>
              </div>
              <kbd className="hidden md:inline-block text-[10px] font-semibold text-[#8a8480] bg-white border border-[#dedcd8] rounded px-1.5 py-0.5 shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
                ⌘K
              </kbd>
            </Link>

            {/* Search icon — Mobile only (< sm) */}
            <Link
              href="/search"
              aria-label="Search"
              className="sm:hidden p-2 rounded-full text-[#6b6460] hover:text-[#1a1a1a] hover:bg-[#f0f0ee] transition-all"
            >
              <Search size={19} />
            </Link>

            {/* Cart Button */}
            <button
              ref={cartIconRef}
              id="cart-icon"
              onClick={openCart}
              className="relative p-2 rounded-full text-[#6b6460] hover:text-[#1a1a1a] hover:bg-[#f0f0ee] transition-all group"
              aria-label={`Shopping Cart with ${itemCount} items`}
            >
              <ShoppingBag size={19} className="group-hover:scale-105 transition-transform" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] flex items-center justify-center bg-[#1a1a1a] text-white text-[10px] font-bold rounded-full px-1 shadow-sm"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* User Account Button & Dropdown (Desktop & Tablet) */}
            {user ? (
              <div className="flex items-center gap-2 relative" ref={userMenuRef}>
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-900 text-white text-[12px] font-semibold rounded-full hover:bg-neutral-800 transition-colors shadow-sm"
                  >
                    <ShieldCheck size={13} />
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  type="button"
                  aria-label="Account Menu"
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="w-[32px] h-[32px] sm:w-[34px] sm:h-[34px] rounded-full bg-[#1a1a1a] text-white text-[13px] font-bold flex items-center justify-center hover:opacity-85 transition-opacity ring-2 ring-transparent focus:ring-black/20"
                  title="Account Menu"
                >
                  {userDisplayName.charAt(0).toUpperCase()}
                </button>

                {/* Account Dropdown Menu */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-[calc(100%+8px)] w-[240px] bg-white rounded-2xl shadow-xl border border-black/10 p-2 z-50 overflow-hidden"
                    >
                      <div className="px-3 py-2 border-b border-black/5 mb-1">
                        <p className="text-[13px] font-semibold text-[#1a1a1a] truncate">{userDisplayName}</p>
                        <p className="text-[11px] text-[#8a8480] truncate">{user.email}</p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 text-neutral-800">
                          {isAdmin ? '🛡️ Administrator' : '👤 Customer'}
                        </span>
                      </div>

                      <div className="space-y-0.5">
                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-neutral-900 hover:bg-neutral-100 transition-colors"
                          >
                            <ShieldCheck size={16} className="text-blue-600" />
                            <span>Admin Portal</span>
                          </Link>
                        )}

                        <Link
                          href="/account"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
                        >
                          <User size={16} />
                          <span>My Account</span>
                        </Link>

                        <Link
                          href="/account/wishlist"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
                        >
                          <Heart size={16} />
                          <span>Wishlist</span>
                        </Link>

                        <div className="border-t border-black/5 my-1"></div>

                        <button
                          type="button"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            handleSignOut();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={16} />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                type="button"
                aria-label="Sign in"
                onClick={() => router.push('/auth/signin')}
                className="hidden sm:flex p-2 rounded-full text-[#6b6460] hover:text-[#1a1a1a] hover:bg-[#f0f0ee] transition-all"
              >
                <User size={19} />
              </button>
            )}

            {/* ── MOBILE MENU BUTTON (Displayed on mobile & tablet < md) ── */}
            <button
              type="button"
              id="mobile-menu-button"
              aria-label="Open navigation menu"
              className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1a1a] text-white hover:bg-neutral-800 active:scale-95 transition-all shadow-sm"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={16} strokeWidth={2.2} />
              <span className="text-[12px] font-semibold tracking-wide">Menu</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE NAVIGATION DRAWER ─────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-[61] w-full max-w-[360px] sm:max-w-[400px] bg-white flex flex-col shadow-2xl md:hidden overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-black/8 bg-[#faf9f8]">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2.5 font-serif text-[19px] font-bold text-[#1a1a1a]"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] text-white flex items-center justify-center text-[14px] font-bold shadow-sm">
                    S
                  </div>
                  <span>StyleHub</span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full text-[#1a1a1a] hover:bg-black/8 active:scale-95 transition-all"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Drawer Content Area (Scrollable) */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">

                {/* Quick Search Bar */}
                <div>
                  <Link
                    href="/search"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl bg-[#f5f4f2] text-[#6b6460] text-[14px] border border-[#e5e3df] hover:border-[#1a1a1a]/30 transition-all"
                  >
                    <Search size={16} className="text-[#8a8480]" />
                    <span>Search all products...</span>
                  </Link>
                </div>

                {/* Primary Navigation Links */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8a8480] px-3 mb-2">
                    Menu
                  </p>
                  <nav className="space-y-1">
                    {navLinks.map((link) => {
                      const isActive =
                        link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            'flex items-center justify-between py-3 px-3.5 rounded-xl text-[15px] font-medium transition-all',
                            isActive
                              ? 'bg-[#1a1a1a] text-white shadow-sm'
                              : 'text-[#1a1a1a] hover:bg-[#f5f4f2]'
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <Icon size={18} />
                            <span>{link.label}</span>
                          </div>
                          <ChevronRight size={15} className={isActive ? 'text-white/70' : 'text-[#a09a96]'} />
                        </Link>
                      );
                    })}

                    {/* Cart in mobile menu */}
                    <button
                      type="button"
                      onClick={() => { setIsMobileMenuOpen(false); openCart(); }}
                      className="w-full flex items-center justify-between py-3 px-3.5 rounded-xl text-[15px] font-medium text-[#1a1a1a] hover:bg-[#f5f4f2] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <ShoppingBag size={18} />
                        <span>Shopping Cart</span>
                      </div>
                      {itemCount > 0 ? (
                        <span className="bg-[#1a1a1a] text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                          {itemCount}
                        </span>
                      ) : (
                        <ChevronRight size={15} className="text-[#a09a96]" />
                      )}
                    </button>
                  </nav>
                </div>

                {/* Quick Shop Collections */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8a8480] px-3 mb-2.5">
                    Featured Collections
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickCategories.map((cat) => (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#faf9f8] border border-[#e8e6e3] text-[13px] font-medium text-[#1a1a1a] hover:bg-[#f0ede9] transition-all"
                      >
                        <span className="truncate">{cat.label}</span>
                        <ChevronRight size={13} className="text-[#8a8480] shrink-0 ml-1" />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* User / Authentication Area */}
                <div className="pt-2 border-t border-black/8">
                  {user ? (
                    <div className="space-y-2">
                      <div className="px-4 py-3 bg-[#faf9f8] rounded-2xl border border-[#e8e6e3]">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#8a8480]">Signed In As</p>
                        <p className="text-[14px] font-semibold text-[#1a1a1a] mt-0.5 truncate">{userDisplayName}</p>
                        {user.email && (
                          <p className="text-[12px] text-[#6b6460] truncate">{user.email}</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <Link
                          href="/account"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 py-2.5 px-3.5 rounded-xl text-[14px] text-[#1a1a1a] hover:bg-[#f5f4f2] transition-colors"
                        >
                          <User size={16} /> My Account
                        </Link>
                        <Link
                          href="/account/wishlist"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 py-2.5 px-3.5 rounded-xl text-[14px] text-[#1a1a1a] hover:bg-[#f5f4f2] transition-colors"
                        >
                          <Heart size={16} /> Wishlist
                        </Link>
                        {isAdmin && (
                          <Link
                            href="/admin"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-3 py-2.5 px-3.5 rounded-xl text-[14px] font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <ShieldCheck size={16} /> Admin Dashboard
                          </Link>
                        )}
                        <button
                          type="button"
                          onClick={() => { setIsMobileMenuOpen(false); handleSignOut(); }}
                          className="w-full flex items-center gap-3 py-2.5 px-3.5 rounded-xl text-[14px] font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={16} /> Sign Out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8a8480] px-3">
                        Account
                      </p>
                      <div className="grid grid-cols-2 gap-2.5">
                        <Link
                          href="/auth/signin"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-[#d6d3ce] text-[13px] font-medium text-[#1a1a1a] hover:bg-[#f5f4f2] transition-colors"
                        >
                          <LogIn size={15} /> Sign In
                        </Link>
                        <Link
                          href="/auth/signup"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1a1a1a] text-white text-[13px] font-medium hover:bg-neutral-800 transition-colors shadow-sm"
                        >
                          <UserPlus size={15} /> Join Now
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Customer Service Links */}
                <div className="pt-2 border-t border-black/8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8a8480] px-3 mb-2">
                    Customer Care
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[12px] text-[#6b6460]">
                    <Link
                      href="/faq"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-lg hover:bg-black/5 hover:text-[#1a1a1a] transition-colors flex items-center gap-1.5"
                    >
                      <HelpCircle size={14} /> FAQ
                    </Link>
                    <Link
                      href="/shipping-policy"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-lg hover:bg-black/5 hover:text-[#1a1a1a] transition-colors flex items-center gap-1.5"
                    >
                      <Truck size={14} /> Shipping
                    </Link>
                    <Link
                      href="/returns-policy"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-lg hover:bg-black/5 hover:text-[#1a1a1a] transition-colors flex items-center gap-1.5"
                    >
                      <RotateCcw size={14} /> Returns
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-2 rounded-lg hover:bg-black/5 hover:text-[#1a1a1a] transition-colors flex items-center gap-1.5"
                    >
                      <Phone size={14} /> Contact
                    </Link>
                  </div>
                </div>

              </div>

              {/* Drawer Bottom Footer */}
              <div className="px-5 py-3 border-t border-black/8 bg-[#faf9f8] text-center">
                <p className="text-[11px] text-[#8a8480]">
                  StyleHub © {new Date().getFullYear()} — Premium Fashion & Lifestyle
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Spacer so page content doesn't hide under fixed header ─── */}
      <div className={cn(isScrolled ? 'h-[60px]' : 'h-[72px] sm:h-[76px]', 'transition-all duration-300')} />
    </>
  );
}
