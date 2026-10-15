'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Percent,
  Settings,
  Image as ImageIcon,
  BarChart3,
  Globe,
  LogOut,
  Menu,
  X,
  UserCheck,
  Tags
} from 'lucide-react';
import { cn } from '@/lib/utils';

const adminNavLinks = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Categories', href: '/admin/categories', icon: Tags },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Coupons', href: '/admin/coupons', icon: Percent },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
  { label: 'SEO Settings', href: '/admin/seo', icon: Globe },
  { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { profile, signOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // In real implementation:
  // if (isLoading) return <LoadingSpinner />
  // if (!isAdmin) router.push('/')

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-admin-bg flex">
      {/* Desktop Sidebar */}
      <aside className="w-[260px] bg-admin-sidebar border-r border-border hidden lg:flex flex-col fixed top-0 bottom-0 left-0 z-40">
        <div className="h-[72px] px-[24px] flex items-center border-b border-border gap-[8px]">
          <UserCheck className="text-accent" size={24} />
          <span className="font-semibold text-[18px] text-foreground">Admin Portal</span>
        </div>

        <nav className="flex-1 px-[16px] py-[24px] space-y-[4px]">
          {adminNavLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-[12px] h-[48px] px-[16px] rounded-[8px] text-[14px] font-medium transition-colors',
                  isActive
                    ? 'bg-accent text-white'
                    : 'text-foreground-secondary hover:text-foreground hover:bg-foreground/5'
                )}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User Card info */}
        <div className="p-[16px] border-t border-border space-y-[12px]">
          <div className="flex items-center gap-[12px]">
            <div className="w-[36px] h-[36px] bg-accent/10 rounded-full flex items-center justify-center font-semibold text-accent text-[14px]">
              {profile?.full_name?.[0] || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-foreground truncate">
                {profile?.full_name || 'Admin User'}
              </p>
              <p className="text-[11px] text-foreground-secondary truncate">
                {profile?.email || 'admin@StyleHub.com'}
              </p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center gap-[8px] w-full h-[36px] rounded-[6px] border border-destructive/20 text-destructive text-[13px] font-medium hover:bg-destructive/5 transition-colors"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-[260px] flex flex-col min-h-screen">
        {/* Top Header Mobile Navigation */}
        <header className="h-[72px] bg-white border-b border-border px-[24px] flex items-center justify-between lg:hidden sticky top-0 z-30">
          <span className="font-semibold text-[16px]">Admin Dashboard</span>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-[8px] rounded-full hover:bg-foreground/5"
          >
            <Menu size={20} />
          </button>
        </header>

        {/* Mobile Sidebar overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSidebarOpen(false)}
                className="fixed inset-0 z-50 backdrop-overlay lg:hidden"
              />
              <motion.aside
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 bottom-0 left-0 w-[280px] bg-white border-r border-border z-50 flex flex-col lg:hidden"
              >
                <div className="h-[72px] px-[24px] flex items-center justify-between border-b border-border">
                  <span className="font-semibold text-[18px]">Admin Portal</span>
                  <button onClick={() => setIsSidebarOpen(false)} className="p-[4px]">
                    <X size={20} />
                  </button>
                </div>
                <nav className="flex-1 px-[16px] py-[24px] space-y-[4px]">
                  {adminNavLinks.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsSidebarOpen(false)}
                        className={cn(
                          'flex items-center gap-[12px] h-[48px] px-[16px] rounded-[8px] text-[14px] font-medium',
                          isActive ? 'bg-accent text-white' : 'text-foreground-secondary hover:bg-foreground/5'
                        )}
                      >
                        <Icon size={18} />
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Content */}
        <main className="flex-1 p-[24px] md:p-[40px]">{children}</main>
      </div>
    </div>
  );
}
