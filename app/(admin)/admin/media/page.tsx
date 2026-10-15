'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { Image as ImageIcon, Upload, Trash2, Link as LinkIcon, Search } from 'lucide-react';

interface MediaItem {
  id: string;
  url: string;
  filename: string;
  size: string;
}

const mockMediaLibrary: MediaItem[] = [
  { id: 'm1', url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80', filename: 'tshirt-white-front.jpg', size: '142 KB' },
  { id: 'm2', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', filename: 'crossbody-bag-tan.jpg', size: '284 KB' },
  { id: 'm3', url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80', filename: 'minimal-gold-watch.jpg', size: '412 KB' },
  { id: 'm4', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', filename: 'sneakers-canvas.jpg', size: '198 KB' },
];

export default function AdminMediaPage() {
  const { addToast } = useToast();
  const [mediaList, setMediaList] = useState<MediaItem[]>(mockMediaLibrary);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMedia = mediaList.filter((m) =>
    m.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpload = () => {
    const newItem: MediaItem = {
      id: `m-${Date.now()}`,
      url: 'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?auto=format&fit=crop&w=800&q=80',
      filename: `user-upload-${Math.floor(Math.random() * 1000)}.jpg`,
      size: '220 KB',
    };
    setMediaList((prev) => [newItem, ...prev]);
    addToast({
      type: 'success',
      title: 'Media Uploaded',
      message: 'New image added to the media library.',
    });
  };

  const handleDeleteMedia = (id: string) => {
    setMediaList((prev) => prev.filter((m) => m.id !== id));
    addToast({
      type: 'warning',
      title: 'Image Deleted',
      message: 'File removed from database.',
    });
  };

  const handleCopyLink = () => {
    addToast({
      type: 'info',
      title: 'URL Copied',
      message: 'Image public URL copied to clipboard.',
    });
  };

  return (
    <div className="space-y-[32px]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[28px] font-serif font-semibold">Media Library</h1>
          <p className="text-[14px] text-foreground-secondary mt-[4px]">
            Upload and copy public links for product images, badges, or brand logos.
          </p>
        </div>
        <Button onClick={handleUpload} className="gap-[8px] h-5 px-2">
          <Upload size={16} /> Upload Image
        </Button>
      </div>

      {/* Filter and search bar */}
      <div className="flex items-center gap-[16px] bg-white border border-border p-[16px] rounded-[12px] shadow-sm">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search files by name..."
            className="w-full h-[44px] pl-[40px] pr-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
          />
          <Search className="absolute left-[12px] top-[14px] text-foreground-secondary" size={16} />
        </div>
      </div>

      {/* Grid gallery */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[24px]">
        {filteredMedia.map((m) => (
          <div key={m.id} className="border border-border rounded-[12px] overflow-hidden bg-white shadow-sm group">
            <div className="aspect-[4/3] bg-background-secondary flex items-center justify-center relative">
              <ImageIcon size={32} className="text-foreground-muted group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="p-[12px] space-y-[8px]">
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-foreground truncate">{m.filename}</p>
                <p className="text-[11px] text-foreground-secondary">{m.size}</p>
              </div>
              <div className="flex justify-between items-center pt-[4px] border-t border-border">
                <button
                  onClick={handleCopyLink}
                  className="p-[4px] hover:bg-foreground/5 rounded text-foreground-secondary hover:text-foreground"
                  title="Copy link"
                >
                  <LinkIcon size={14} />
                </button>
                <button
                  onClick={() => handleDeleteMedia(m.id)}
                  className="p-[4px] hover:bg-destructive/5 rounded text-foreground-secondary hover:text-destructive"
                  title="Delete image"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
