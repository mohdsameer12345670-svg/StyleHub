'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { Globe, Search, ShieldAlert } from 'lucide-react';

export default function AdminSeoPage() {
  const { addToast } = useToast();

  const [titleTemplate, setTitleTemplate] = useState('{Page Title} | StyleHub');
  const [metaDesc, setMetaDesc] = useState('Premium curated collections of fashion items, accessories, and shoes.');
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState('G-104928');
  const [robotsTxt, setRobotsTxt] = useState('User-agent: *\nAllow: /');

  const handleSaveSeo = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      type: 'success',
      title: 'SEO Settings Saved',
      message: 'Global meta data parameters updated successfully.',
    });
  };

  return (
    <div className="space-y-[32px] max-w-[800px]">
      <div>
        <h1 className="text-[28px] font-serif font-semibold">SEO Management</h1>
        <p className="text-[14px] text-foreground-secondary mt-[4px]">
          Configure meta titles, indexing details, robots configuration, and tracking parameters.
        </p>
      </div>

      <form onSubmit={handleSaveSeo} className="space-y-[24px]">
        {/* Global SEO */}
        <div className="border border-border rounded-[12px] p-[24px] bg-white space-y-[20px] shadow-sm">
          <h3 className="text-[16px] font-semibold text-foreground flex items-center gap-[8px]">
            <Globe size={18} className="text-accent" /> Meta Templates
          </h3>

          <div className="space-y-[16px]">
            <div className="space-y-[6px]">
              <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Title Template</label>
              <input
                type="text"
                value={titleTemplate}
                onChange={(e) => setTitleTemplate(e.target.value)}
                required
                className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-[6px]">
              <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Default Meta Description</label>
              <textarea
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                required
                rows={3}
                className="w-full p-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent resize-none"
              />
            </div>
          </div>
        </div>

        {/* Tracking Scripts */}
        <div className="border border-border rounded-[12px] p-[24px] bg-white space-y-[20px] shadow-sm">
          <h3 className="text-[16px] font-semibold text-foreground flex items-center gap-[8px]">
            <Search size={18} className="text-accent" /> Integration Tracking
          </h3>

          <div className="space-y-[6px]">
            <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Google Analytics ID (GA4)</label>
            <input
              type="text"
              value={googleAnalyticsId}
              onChange={(e) => setGoogleAnalyticsId(e.target.value)}
              placeholder="G-XXXXXX"
              className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Indexing Rules */}
        <div className="border border-border rounded-[12px] p-[24px] bg-white space-y-[20px] shadow-sm">
          <h3 className="text-[16px] font-semibold text-foreground flex items-center gap-[8px]">
            <ShieldAlert size={18} className="text-accent" /> Search Index Rules (robots.txt)
          </h3>

          <div className="space-y-[6px]">
            <label className="text-[12px] font-semibold text-foreground-secondary uppercase">robots.txt Content</label>
            <textarea
              value={robotsTxt}
              onChange={(e) => setRobotsTxt(e.target.value)}
              rows={4}
              className="w-full p-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent font-mono text-[13px] resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-[8px]">
          <Button type="submit" size="sm" shimmer>
            Save SEO Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
