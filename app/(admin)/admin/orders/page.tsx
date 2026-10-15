'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { Search, Eye, ShoppingCart } from 'lucide-react';
import Modal from '@/components/ui/Modal';

interface AdminOrder {
  id: string;
  customer: string;
  email: string;
  items: number;
  total: number;
  paymentStatus: string;
  fulfillmentStatus: string;
  date: string;
}

const mockAdminOrders: AdminOrder[] = [
  { id: 'ORD-10492', customer: 'Anjali R.', email: 'anjali@example.com', items: 3, total: 5999, paymentStatus: 'Paid', fulfillmentStatus: 'Processing', date: 'Aug 30, 2026' },
  { id: 'ORD-10491', customer: 'Sameer K.', email: 'sameer@example.com', items: 1, total: 2499, paymentStatus: 'Paid', fulfillmentStatus: 'Shipped', date: 'Aug 29, 2026' },
  { id: 'ORD-10490', customer: 'John Doe', email: 'john@example.com', items: 2, total: 11998, paymentStatus: 'Paid', fulfillmentStatus: 'Delivered', date: 'Aug 28, 2026' },
  { id: 'ORD-10489', customer: 'Sarah L.', email: 'sarah@example.com', items: 1, total: 6499, paymentStatus: 'Failed', fulfillmentStatus: 'Cancelled', date: 'Aug 27, 2026' },
];

export default function AdminOrdersPage() {
  const { addToast } = useToast();
  const [orders, setOrders] = useState<AdminOrder[]>(mockAdminOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, fulfillmentStatus: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder((prev) => (prev ? { ...prev, fulfillmentStatus: newStatus } : null));
    }
    addToast({
      type: 'success',
      title: 'Order Updated',
      message: `Fulfillment status changed to ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-[32px]">
      <div>
        <h1 className="text-[28px] font-serif font-semibold">Orders</h1>
        <p className="text-[14px] text-foreground-secondary mt-[4px]">
          Track orders, adjust fulfillment status updates, and search clients listings.
        </p>
      </div>

      {/* Filter and search bar */}
      <div className="flex items-center gap-[16px] bg-white border border-border p-[16px] rounded-[12px] shadow-sm">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order ID, customer name..."
            className="w-full h-[44px] pl-[40px] pr-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
          />
          <Search className="absolute left-[12px] top-[14px] text-foreground-secondary" size={16} />
        </div>
      </div>

      {/* Orders Table */}
      <div className="border border-border rounded-[12px] overflow-hidden bg-white shadow-sm">
        <table className="w-full text-left text-[14px]">
          <thead className="bg-background-secondary border-b border-border text-foreground-secondary font-medium">
            <tr>
              <th className="p-[16px]">Order ID</th>
              <th className="p-[16px]">Customer</th>
              <th className="p-[16px]">Date</th>
              <th className="p-[16px]">Total</th>
              <th className="p-[16px]">Payment</th>
              <th className="p-[16px]">Fulfillment</th>
              <th className="p-[16px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredOrders.map((o) => (
              <tr key={o.id} className="hover:bg-background-secondary/30 transition-colors">
                <td className="p-[16px] font-semibold text-accent">{o.id}</td>
                <td className="p-[16px]">
                  <div>
                    <p className="font-medium text-foreground">{o.customer}</p>
                    <p className="text-[12px] text-foreground-secondary">{o.email}</p>
                  </div>
                </td>
                <td className="p-[16px] text-foreground-secondary">{o.date}</td>
                <td className="p-[16px] font-medium">{formatCurrency(o.total)}</td>
                <td className="p-[16px]">
                  <span
                    className={`px-[10px] py-[4px] rounded-full text-[12px] font-medium ${
                      o.paymentStatus === 'Paid' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                    }`}
                  >
                    {o.paymentStatus}
                  </span>
                </td>
                <td className="p-[16px]">
                  <span
                    className={`px-[10px] py-[4px] rounded-full text-[12px] font-medium ${
                      o.fulfillmentStatus === 'Delivered'
                        ? 'bg-success/10 text-success'
                        : o.fulfillmentStatus === 'Cancelled'
                        ? 'bg-destructive/10 text-destructive'
                        : 'bg-warning/10 text-warning'
                    }`}
                  >
                    {o.fulfillmentStatus}
                  </span>
                </td>
                <td className="p-[16px] text-right">
                  <button
                    onClick={() => setSelectedOrder(o)}
                    className="p-[6px] rounded hover:bg-foreground/5 text-foreground-secondary hover:text-foreground transition-colors"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      <Modal
        isOpen={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
        title={`Order Details — ${selectedOrder?.id}`}
      >
        {selectedOrder && (
          <div className="space-y-[24px]">
            <div className="grid grid-cols-2 gap-[16px] text-[14px]">
              <div>
                <h4 className="font-semibold text-foreground-secondary uppercase text-[11px]">Customer</h4>
                <p className="mt-[2px] font-medium">{selectedOrder.customer}</p>
                <p className="text-foreground-secondary">{selectedOrder.email}</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground-secondary uppercase text-[11px]">Order Date</h4>
                <p className="mt-[2px] font-medium">{selectedOrder.date}</p>
              </div>
            </div>

            <hr className="border-border" />

            <div className="space-y-[8px]">
              <h4 className="font-semibold text-foreground-secondary uppercase text-[11px]">Fulfillment Status</h4>
              <div className="flex gap-[8px]">
                {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusChange(selectedOrder.id, status)}
                    className={`px-[12px] py-[6px] rounded-full text-[13px] border transition-colors ${
                      selectedOrder.fulfillmentStatus === status
                        ? 'border-accent bg-accent text-white font-medium'
                        : 'border-border-strong text-foreground-secondary hover:border-foreground'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-[12px]">
              <Button onClick={() => setSelectedOrder(null)}>Done</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
