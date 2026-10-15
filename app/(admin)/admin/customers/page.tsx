'use client';

import { useState } from 'react';
import { Search, Mail, Phone, Calendar } from 'lucide-react';
import { Profile } from '@/types';

const mockAdminCustomers: Profile[] = [
  { id: 'u1', email: 'anjali@example.com', full_name: 'Anjali R.', phone: '9876543210', avatar_url: null, role: 'customer', created_at: '2026-08-15T00:00:00Z', updated_at: '' },
  { id: 'u2', email: 'sameer@example.com', full_name: 'Sameer K.', phone: '9123456789', avatar_url: null, role: 'customer', created_at: '2026-08-20T00:00:00Z', updated_at: '' },
  { id: 'u3', email: 'john@example.com', full_name: 'John Doe', phone: '9345678901', avatar_url: null, role: 'customer', created_at: '2026-08-22T00:00:00Z', updated_at: '' },
];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Profile[]>(mockAdminCustomers);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(
    (c) =>
      c.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-[32px]">
      <div>
        <h1 className="text-[28px] font-serif font-semibold">Customers</h1>
        <p className="text-[14px] text-foreground-secondary mt-[4px]">
          View all registered customer profiles, emails, phone contacts, and sign up dates.
        </p>
      </div>

      {/* Filter and search bar */}
      <div className="flex items-center gap-[16px] bg-white border border-border p-[16px] rounded-[12px] shadow-sm">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email..."
            className="w-full h-[44px] pl-[40px] pr-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
          />
          <Search className="absolute left-[12px] top-[14px] text-foreground-secondary" size={16} />
        </div>
      </div>

      {/* Customer registry table */}
      <div className="border border-border rounded-[12px] overflow-hidden bg-white shadow-sm">
        <table className="w-full text-left text-[14px]">
          <thead className="bg-background-secondary border-b border-border text-foreground-secondary font-medium">
            <tr>
              <th className="p-[16px]">Name</th>
              <th className="p-[16px]">Email</th>
              <th className="p-[16px]">Phone</th>
              <th className="p-[16px]">Join Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredCustomers.map((c) => (
              <tr key={c.id} className="hover:bg-background-secondary/30 transition-colors">
                <td className="p-[16px] font-semibold text-foreground">{c.full_name || 'Anonymous User'}</td>
                <td className="p-[16px] text-foreground-secondary flex items-center gap-[6px]">
                  <Mail size={14} />
                  {c.email}
                </td>
                <td className="p-[16px] text-foreground-secondary">
                  {c.phone ? (
                    <span className="flex items-center gap-[6px]">
                      <Phone size={14} />
                      {c.phone}
                    </span>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="p-[16px] text-foreground-secondary flex items-center gap-[6px]">
                  <Calendar size={14} />
                  {new Date(c.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
