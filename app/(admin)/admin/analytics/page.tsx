'use client';

import { formatCurrency } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const mockSalesData = [
  { month: 'Jan', sales: 120000, orders: 48 },
  { month: 'Feb', sales: 150000, orders: 62 },
  { month: 'Mar', sales: 180000, orders: 75 },
  { month: 'Apr', sales: 220000, orders: 90 },
  { month: 'May', sales: 290000, orders: 115 },
  { month: 'Jun', sales: 340000, orders: 148 },
];

const mockCategorySales = [
  { name: 'Clothing', value: 145000 },
  { name: 'Accessories', value: 89000 },
  { name: 'Footwear', value: 64000 },
  { name: 'Home & Living', value: 52000 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-[32px]">
      <div>
        <h1 className="text-[28px] font-serif font-semibold">Store Analytics</h1>
        <p className="text-[14px] text-foreground-secondary mt-[4px]">
          Track performance over time, including total order velocity, categories performance, and revenue trends.
        </p>
      </div>

      {/* Primary analytics charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
        {/* Sales Performance Line Chart */}
        <div className="border border-border rounded-[12px] p-[24px] bg-white shadow-sm space-y-[20px]">
          <h3 className="text-[18px] font-semibold text-foreground">Monthly Sales Revenues</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="month" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#2563EB" strokeWidth={2} activeDot={{ r: 8 }} name="Sales (₹)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Categories Bar Chart */}
        <div className="border border-border rounded-[12px] p-[24px] bg-white shadow-sm space-y-[20px]">
          <h3 className="text-[18px] font-semibold text-foreground">Sales by Product Categories</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockCategorySales}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#2563EB" radius={[4, 4, 0, 0]} name="Sales (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
