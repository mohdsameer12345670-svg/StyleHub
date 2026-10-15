'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: 'active' | 'draft';
  product_count: number;
};

const mockCategories: Category[] = [
  { id: '1', name: 'Clothing', slug: 'clothing', description: 'All types of apparel', status: 'active', product_count: 45 },
  { id: '2', name: 'Accessories', slug: 'accessories', description: 'Bags, watches, jewelry', status: 'active', product_count: 23 },
  { id: '3', name: 'Home', slug: 'home', description: 'Home decor and kitchenware', status: 'active', product_count: 12 },
];

export default function AdminCategoriesPage() {
  const { addToast } = useToast();
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'active' | 'draft'>('active');

  const filteredCategories = categories.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setSelectedCategory(null);
    setName('');
    setDescription('');
    setStatus('active');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (c: Category) => {
    setSelectedCategory(c);
    setName(c.name);
    setDescription(c.description);
    setStatus(c.status);
    setIsAddModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategory) {
      // Edit mode
      setCategories((prev) =>
        prev.map((c) =>
          c.id === selectedCategory.id
            ? {
                ...c,
                name,
                slug: name.toLowerCase().replace(/\s+/g, '-'),
                description,
                status,
              }
            : c
        )
      );
      addToast({
        type: 'success',
        title: 'Category Updated',
        message: 'Changes saved successfully.',
      });
    } else {
      // Add mode
      const newCat: Category = {
        id: `cat-${Date.now()}`,
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        description,
        status,
        product_count: 0,
      };
      setCategories((prev) => [newCat, ...prev]);
      addToast({
        type: 'success',
        title: 'Category Created',
        message: 'Category added successfully.',
      });
    }
    setIsAddModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    addToast({
      type: 'warning',
      title: 'Category Deleted',
      message: 'Category removed successfully.',
    });
  };

  return (
    <div className="space-y-[32px]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[28px] font-serif font-semibold">Categories</h1>
          <p className="text-[14px] text-foreground-secondary mt-[4px]">
            Manage product categories and organize your catalog.
          </p>
        </div>
        <Button onClick={handleOpenAdd} className="gap-[8px] h-5 px-2">
          <Plus size={16} /> Add Category
        </Button>
      </div>

      {/* Filter and search bar */}
      <div className="flex items-center gap-[16px] bg-white border border-border p-[16px] rounded-[12px] shadow-sm">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, slug..."
            className="w-full h-[40px] pl-[36px] pr-[16px] border border-zinc-300 rounded-[8px] outline-none focus:border-accent"
          />
          <Search className="absolute left-[12px] top-[12px] text-foreground-secondary" size={16} />
        </div>
      </div>

      {/* Categories list table */}
      <div className="border border-border rounded-[12px] overflow-hidden bg-white shadow-sm">
        <table className="w-full text-left text-[14px]">
          <thead className="bg-background-secondary border-b border-border text-foreground-secondary font-medium">
            <tr>
              <th className="p-[16px]">Category Name</th>
              <th className="p-[16px]">Slug</th>
              <th className="p-[16px]">Products Count</th>
              <th className="p-[16px]">Status</th>
              <th className="p-[16px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredCategories.map((c) => (
              <tr key={c.id} className="hover:bg-background-secondary/30 transition-colors">
                <td className="p-[16px]">
                  <p className="font-semibold text-foreground">{c.name}</p>
                  <p className="text-[12px] text-foreground-secondary line-clamp-1">{c.description}</p>
                </td>
                <td className="p-[16px] text-foreground-secondary">{c.slug}</td>
                <td className="p-[16px] font-medium">{c.product_count}</td>
                <td className="p-[16px]">
                  <span
                    className={`px-[10px] py-[4px] rounded-full text-[12px] font-medium ${
                      c.status === 'active' ? 'bg-success/10 text-success' : 'bg-foreground/10 text-foreground-secondary'
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-[16px] text-right space-x-[8px]">
                  <button
                    onClick={() => handleOpenEdit(c)}
                    className="p-[6px] rounded hover:bg-foreground/5 text-foreground-secondary hover:text-foreground transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="p-[6px] rounded hover:bg-destructive/5 text-foreground-secondary hover:text-destructive transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredCategories.length === 0 && (
              <tr>
                <td colSpan={5} className="p-[32px] text-center text-foreground-secondary">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={selectedCategory ? 'Edit Category' : 'Add New Category'}
      >
        <form onSubmit={handleSave} className="space-y-[20px] max-h-[70vh] overflow-y-auto pr-2">
          
          <div className="space-y-[6px]">
            <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Category Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[40px] px-[12px] border border-zinc-300 rounded-[8px] outline-none focus:border-accent"
            />
          </div>
          
          <div className="space-y-[6px]">
            <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Description</label>
            <textarea
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-[80px] p-[12px] border border-zinc-300 rounded-[8px] outline-none focus:border-accent resize-none"
            />
          </div>

          <div className="space-y-[6px]">
            <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full h-[40px] px-[12px] border border-zinc-300 rounded-[8px] outline-none focus:border-accent bg-white"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
          </div>
<div className="flex justify-end gap-3">
  <Button>
    Cancel
  </Button>

  <Button>
    save changes
  </Button>
</div>
        </form>
      </Modal>
    </div>
  );
}
