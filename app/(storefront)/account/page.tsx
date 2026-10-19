'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { LogOut, MapPin, Package, Heart, User, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

export default function AccountDashboardPage() {
  const { user, profile, isAdmin, signOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('orders');

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/auth/signin';
  };

  // Mock Orders Data
  const mockOrders = [
    {
      id: 'ORD-10492',
      date: 'August 30, 2026',
      total: 5999,
      paymentStatus: 'Paid',
      fulfillmentStatus: 'Processing',
    },
    {
      id: 'ORD-10281',
      date: 'July 14, 2026',
      total: 2499,
      paymentStatus: 'Paid',
      fulfillmentStatus: 'Delivered',
    },
  ];

  return (
    <div className="container-main py-[64px] max-w-[1000px] mx-auto space-y-[40px]">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-section font-serif">My Account</h1>
          <p className="text-[14px] text-foreground-secondary mt-[4px]">
            Welcome back, {profile?.full_name || user?.email || 'Valued Guest'}
          </p>
        </div>

        {isAdmin && (
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white text-[13px] font-medium rounded-lg hover:bg-neutral-800 transition-colors w-fit"
          >
            <ShieldCheck size={16} />
            Go to Admin Panel
          </Link>
        )}
      </div>

      {isAdmin && (
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 text-white p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm border border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="font-semibold text-[15px]">Administrator Privileges Enabled</h2>
              <p className="text-[13px] text-white/70">You can manage products, categories, coupons, orders and site settings.</p>
            </div>
          </div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-neutral-950 font-semibold text-[13px] rounded-xl hover:bg-neutral-100 transition-colors shadow-sm"
          >
            Open Admin Panel &rarr;
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-[40px]">
        {/* Navigation Tabs */}
        <aside className="space-y-[6px]">
          {isAdmin && (
            <Link
              href="/admin"
              className="w-full flex items-center gap-[12px] h-[48px] px-[16px] rounded-[8px] text-[14px] font-semibold text-accent bg-accent/5 hover:bg-accent/10 transition-colors mb-2"
            >
              <ShieldCheck size={18} />
              Admin Portal
            </Link>
          )}

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-[12px] h-[48px] px-[16px] rounded-[8px] text-[14px] font-medium transition-colors ${
              activeTab === 'orders' ? 'bg-background-secondary text-foreground' : 'text-foreground-secondary hover:bg-foreground/5'
            }`}
          >
            <Package size={18} />
            Orders History
          </button>
          
          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center gap-[12px] h-[48px] px-[16px] rounded-[8px] text-[14px] font-medium transition-colors ${
              activeTab === 'addresses' ? 'bg-background-secondary text-foreground' : 'text-foreground-secondary hover:bg-foreground/5'
            }`}
          >
            <MapPin size={18} />
            Address Book 
          </button>
          <button
            onClick={() => router.push('/account/wishlist')}
            className="w-full flex items-center gap-[12px] h-[48px] px-[16px] rounded-[8px] text-[14px] font-medium text-foreground-secondary hover:bg-foreground/5"
          >
            <Heart size={18} />
            Wishlist
          </button>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-[12px] h-[48px] px-[16px] rounded-[8px] text-[14px] font-medium text-destructive hover:bg-destructive/5 transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </aside>

        {/* Dashboard Tabs Content */}
        <div className="md:col-span-3">
          {activeTab === 'orders' && (
            <div className="space-y-[24px]">
              <h2 className="text-[18px] font-semibold">Orders</h2>
              {mockOrders.length === 0 ? (
                <p className="text-[14px] text-foreground-secondary">You haven&apos;t placed any orders yet.</p>
              ) : (
                <div className="border border-border rounded-[12px] overflow-hidden bg-white">
                  <table className="w-full text-left text-[14px]">
                    <thead className="bg-background-secondary border-b border-border text-foreground-secondary font-medium">
                      <tr>
                        <th className="p-[16px]">Order ID</th>
                        <th className="p-[16px]">Date</th>
                        <th className="p-[16px]">Total</th>
                        <th className="p-[16px]">Fulfillment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {mockOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-background-secondary/40 transition-colors">
                          <td className="p-[16px] font-semibold text-accent">{ord.id}</td>
                          <td className="p-[16px] text-foreground-secondary">{ord.date}</td>
                          <td className="p-[16px] font-medium">{formatCurrency(ord.total)}</td>
                          <td className="p-[16px]">
                            <span
                              className={`px-[10px] py-[4px] rounded-full text-[12px] font-medium ${
                                ord.fulfillmentStatus === 'Delivered'
                                  ? 'bg-success/10 text-success'
                                  : 'bg-warning/10 text-warning'
                              }`}
                            >
                              {ord.fulfillmentStatus}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-[24px]">
              <div className="flex justify-between items-center">
                <h2 className="text-[18px] font-semibold">Address Book</h2>
                <Button size="sm" className='h-7 w-17' >Add New Address</Button>
              </div>
              <div className="border border-border rounded-[12px] p-[24px] bg-white space-y-[12px]">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[15px]">Sameer Khan (Default)</span>
                  <span className="text-[12px] text-accent font-medium bg-accent/10 px-[8px] py-[2px] rounded">Home</span>
                </div>
                <p className="text-[14px] text-foreground-secondary leading-relaxed">
                  Apartment 401, Sun City, MG Road,<br />
                  Mumbai, Maharashtra, 400001<br />
                  India
                </p>
                <div className="flex gap-[12px] text-[13px] font-semibold text-foreground-secondary pt-[8px]">
                  <button className="hover:text-foreground">Edit</button>
                  <button className="hover:text-destructive">Remove</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
