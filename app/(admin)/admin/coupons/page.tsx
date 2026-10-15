'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { Search, Plus, Trash2, Tag } from 'lucide-react';
import { Coupon } from '@/types';
import Modal from '@/components/ui/Modal';

const mockCoupons: Coupon[] = [
  { id: 'c1', code: 'SUMMER40', type: 'percentage', value: 40, min_order_amount: 5000, usage_limit: 100, per_customer_limit: 1, times_used: 18, valid_from: null, valid_to: null, applicable_products: [], applicable_categories: [], is_active: true, created_at: '' },
  { id: 'c2', code: 'WELCOME10', type: 'fixed', value: 500, min_order_amount: 2000, usage_limit: null, per_customer_limit: 1, times_used: 42, valid_from: null, valid_to: null, applicable_products: [], applicable_categories: [], is_active: true, created_at: '' },
];

export default function AdminCouponsPage() {
  const { addToast } = useToast();
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [code, setCode] = useState('');
  const [type, setType] = useState<'percentage' | 'fixed'>('percentage');
  const [value, setValue] = useState('');
  const [minAmount, setMinAmount] = useState('');

  const filteredCoupons = coupons.filter((c) =>
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setCode('');
    setType('percentage');
    setValue('');
    setMinAmount('');
    setIsAddModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newCoupon: Coupon = {
      id: `coupon-${Date.now()}`,
      code: code.toUpperCase(),
      type,
      value: Number(value),
      min_order_amount: minAmount ? Number(minAmount) : null,
      usage_limit: null,
      per_customer_limit: 1,
      times_used: 0,
      valid_from: null,
      valid_to: null,
      applicable_products: [],
      applicable_categories: [],
      is_active: true,
      created_at: new Date().toISOString(),
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    addToast({
      type: 'success',
      title: 'Coupon Created',
      message: `Discount code ${code.toUpperCase()} is active.`,
    });
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    addToast({
      type: 'warning',
      title: 'Coupon Removed',
      message: 'Discount code disabled.',
    });
  };

  return (
    <div className="space-y-[32px]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[28px] font-serif font-semibold">Coupons</h1>
          <p className="text-[14px] text-foreground-secondary mt-[4px]">
            Manage coupon lists, custom promotion percentages, and active discount codes.
          </p>
        </div>
        <Button onClick={handleOpenAdd} className="gap-[8px] h-5 px-2">
          <Plus size={16} /> Add Coupon
        </Button>
      </div>

      {/* Filter and search bar */}
      <div className="flex items-center gap-[16px] bg-white border border-border p-[16px] rounded-[12px] shadow-sm">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search promo codes..."
            className="w-full h-[44px] pl-[40px] pr-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
          />
          <Search className="absolute left-[12px] top-[14px] text-foreground-secondary" size={16} />
        </div>
      </div>

      {/* Table list */}
      <div className="border border-border rounded-[12px] overflow-hidden bg-white shadow-sm">
        <table className="w-full text-left text-[14px]">
          <thead className="bg-background-secondary border-b border-border text-foreground-secondary font-medium">
            <tr>
              <th className="p-[16px]">Promo Code</th>
              <th className="p-[16px]">Discount Type</th>
              <th className="p-[16px]">Value</th>
              <th className="p-[16px]">Min Order</th>
              <th className="p-[16px]">Times Used</th>
              <th className="p-[16px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredCoupons.map((c) => (
              <tr key={c.id} className="hover:bg-background-secondary/30 transition-colors">
                <td className="p-[16px] font-bold text-foreground flex items-center gap-[8px]">
                  <Tag size={14} className="text-accent" />
                  {c.code}
                </td>
                <td className="p-[16px] text-foreground-secondary uppercase">{c.type}</td>
                <td className="p-[16px] font-medium">
                  {c.type === 'percentage' ? `${c.value}%` : `₹${c.value}`}
                </td>
                <td className="p-[16px] text-foreground-secondary">
                  {c.min_order_amount ? `₹${c.min_order_amount}` : 'No Minimum'}
                </td>
                <td className="p-[16px] font-semibold text-foreground-secondary">{c.times_used}</td>
                <td className="p-[16px] text-right">
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-[6px] rounded hover:bg-destructive/5 text-foreground-secondary hover:text-destructive transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} title="Create Promo Code">
        <form onSubmit={handleSave} className="space-y-[20px]">
          <div className="space-y-[6px]">
            <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Promo Code</label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="FESTIVE20"
              className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-[16px]">
            <div className="space-y-[6px]">
              <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent bg-white"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="fixed">Fixed Amount (₹)</option>
              </select>
            </div>
            <div className="space-y-[6px]">
              <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Value</label>
              <input
                type="number"
                required
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="20"
                className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="space-y-[6px]">
            <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Min Order Amount (Optional)</label>
            <input
              type="number"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              placeholder="3000"
              className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
            />
          </div>

          <div className="flex justify-end gap-[12px] pt-[12px]">
            <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Coupon</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
