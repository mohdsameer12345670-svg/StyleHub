'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { Settings, Globe, ShieldAlert, Sparkles } from 'lucide-react';

export default function AdminSettingsPage() {
  const { addToast } = useToast();

  // Settings states
  const [siteName, setSiteName] = useState('StyleHub');
  const [tagline, setTagline] = useState('Curated collection of premium products');
  const [contactEmail, setContactEmail] = useState('support@StyleHub.com');
  const [currencySymbol, setCurrencySymbol] = useState('₹');
  const [announcementActive, setAnnouncementActive] = useState(true);
  const [announcementText, setAnnouncementText] = useState('Free standard shipping on all Indian orders.');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'Global settings updated successfully.',
    });
  };

  return (
    <div className="space-y-[32px] max-w-[800px]">
      <div>
        <h1 className="text-[28px] font-serif font-semibold">Store Settings</h1>
        <p className="text-[14px] text-foreground-secondary mt-[4px]">
          Configure global store properties, contact information, and active features.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-[24px]">
        {/* General Store Info */}
        <div className="border border-border rounded-[12px] p-[24px] bg-white space-y-[20px] shadow-sm">
          <h3 className="text-[16px] font-semibold text-foreground flex items-center gap-[8px]">
            <Settings size={18} className="text-accent" /> General Configurations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
            <div className="space-y-[6px]">
              <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Store Name</label>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                required
                className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
              />
            </div>
            <div className="space-y-[6px]">
              <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Store Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
              />
            </div>
            <div className="space-y-[6px]">
              <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
              />
            </div>
            <div className="space-y-[6px]">
              <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Currency Symbol</label>
              <input
                type="text"
                value={currencySymbol}
                onChange={(e) => setCurrencySymbol(e.target.value)}
                required
                className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
              />
            </div>
          </div>
        </div>

        {/* Announcement Bar */}
        <div className="border border-border rounded-[12px] p-[24px] bg-white space-y-[20px] shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-semibold text-foreground flex items-center gap-[8px]">
              <Sparkles size={18} className="text-accent" /> Announcement Bar
            </h3>
            <div className="flex items-center gap-[8px]">
              <input
                type="checkbox"
                id="ann-active"
                checked={announcementActive}
                onChange={(e) => setAnnouncementActive(e.target.checked)}
                className="w-[16px] h-[16px] accent-accent"
              />
              <label htmlFor="ann-active" className="text-[13px] font-medium text-foreground-secondary cursor-pointer">
                Active
              </label>
            </div>
          </div>

          {announcementActive && (
            <div className="space-y-[6px]">
              <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Announcement Text</label>
              <input
                type="text"
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end pt-[8px]">
          <Button type="submit" size="sm" shimmer>
            Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
