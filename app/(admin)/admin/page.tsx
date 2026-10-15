'use client';

import { formatCurrency } from '@/lib/utils';
import { ArrowUpRight, DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockKPIs = [
  { label: 'Total Revenue', value: 349920, change: '+12.4%', icon: DollarSign },
  { label: 'Total Orders', value: 148, change: '+8.2%', icon: ShoppingBag },
  { label: 'Total Customers', value: 89, change: '+14.5%', icon: Users },
  { label: 'Avg Order Value', value: 2364, change: '+3.1%', icon: TrendingUp },
];

const mockChartData = [
  { name: 'Aug 24', revenue: 45000 },
  { name: 'Aug 25', revenue: 52000 },
  { name: 'Aug 26', revenue: 49000 },
  { name: 'Aug 27', revenue: 63000 },
  { name: 'Aug 28', revenue: 58000 },
  { name: 'Aug 29', revenue: 72000 },
  { name: 'Aug 30', revenue: 84000 },
];

const mockRecentOrders = [
  { id: 'ORD-10492', customer: 'Anjali R.', items: 3, total: 5999, status: 'Processing' },
  { id: 'ORD-10491', customer: 'Sameer K.', items: 1, total: 2499, status: 'Shipped' },
  { id: 'ORD-10490', customer: 'John Doe', items: 2, total: 11998, status: 'Delivered' },
];

const mockLowStock = [
  { name: 'Wool Trench Coat', stock: 4, sku: 'SKU-2006' },
  { name: 'Ceramic Dinnerware Set', stock: 8, sku: 'SKU-2005' },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-[32px]">
      <div>
        <h1 className="text-[28px] font-serif font-semibold">Dashboard Overview</h1>
        <p className="text-[14px] text-foreground-secondary mt-[4px]">
          Real-time updates on sales velocity, revenue metrics, and stock warnings.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
        {mockKPIs.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="border border-border rounded-[12px] p-[24px] bg-white space-y-[16px] shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-[13px] font-semibold text-foreground-secondary uppercase tracking-wider">
                  {kpi.label}
                </span>
                <div className="w-[36px] h-[36px] bg-accent/10 rounded-full flex items-center justify-center text-accent">
                  <Icon size={18} />
                </div>
              </div>
              <div className="flex items-baseline gap-[12px]">
                <h3 className="text-[24px] font-bold text-foreground">
                  {kpi.label.includes('Revenue') || kpi.label.includes('Avg')
                    ? formatCurrency(kpi.value)
                    : kpi.value}
                </h3>
                <span className="text-[12px] font-semibold text-success flex items-center gap-[2px]">
                  <ArrowUpRight size={12} />
                  {kpi.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics Chart area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[24px]">
        <div className="lg:col-span-2 border border-border rounded-[12px] p-[24px] bg-white shadow-sm space-y-[24px]">
          <h3 className="text-[18px] font-semibold text-foreground">Revenue Over Time</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Alerts card */}
        <div className="border border-border rounded-[12px] p-[24px] bg-white shadow-sm space-y-[20px]">
          <h3 className="text-[18px] font-semibold text-foreground">Low Stock Warnings</h3>
          <div className="space-y-[16px]">
            {mockLowStock.map((prod) => (
              <div key={prod.name} className="flex justify-between items-center pb-[16px] border-b border-border last:border-0 last:pb-0">
                <div>
                  <h4 className="text-[14px] font-medium text-foreground">{prod.name}</h4>
                  <p className="text-[12px] text-foreground-secondary">{prod.sku}</p>
                </div>
                <span className="text-[13px] font-semibold text-destructive bg-destructive/10 px-[10px] py-[4px] rounded-full">
                  {prod.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders table */}
      <div className="border border-border rounded-[12px] p-[24px] bg-white shadow-sm space-y-[20px]">
        <h3 className="text-[18px] font-semibold text-foreground">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-background-secondary border-b border-border text-foreground-secondary font-medium">
              <tr>
                <th className="p-[16px]">Order ID</th>
                <th className="p-[16px]">Customer</th>
                <th className="p-[16px]">Items</th>
                <th className="p-[16px]">Total</th>
                <th className="p-[16px]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockRecentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-background-secondary/40 transition-colors">
                  <td className="p-[16px] font-semibold text-accent">{ord.id}</td>
                  <td className="p-[16px] text-foreground">{ord.customer}</td>
                  <td className="p-[16px] text-foreground-secondary">{ord.items}</td>
                  <td className="p-[16px] font-medium">{formatCurrency(ord.total)}</td>
                  <td className="p-[16px]">
                    <span
                      className={`px-[10px] py-[4px] rounded-full text-[12px] font-medium ${
                        ord.status === 'Delivered'
                          ? 'bg-success/10 text-success'
                          : ord.status === 'Shipped'
                          ? 'bg-accent/10 text-accent'
                          : 'bg-warning/10 text-warning'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
