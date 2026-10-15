'use client';

import { useState, useEffect } from 'react';
import { formatCurrency } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import { Search, Plus, Edit2, Trash2, SlidersHorizontal, Eye, X } from 'lucide-react';
import { Product } from '@/types';
import { supabase } from '@/lib/supabase';

export default function AdminProductsPage() {
  const { addToast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
  setLoading(true);

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('ERROR FETCHING PRODUCTS:', error);
      const errMsg = String(error.message || error);
      if (!errMsg.includes('Failed to fetch')) {
        addToast({
          type: 'error',
          title: 'Error',
          message: error.message || 'Failed to load products.',
        });
      }
    } else if (data) {
      const formatted = data.map((d: any) => ({
        ...d,
        images: [],
      }));

      setProducts(formatted);
    }
  } catch (err: any) {
    console.error('UNEXPECTED ERROR FETCHING PRODUCTS:', err);
    const errMsg = String(err.message || err);
    if (!errMsg.includes('Failed to fetch')) {
      addToast({
        type: 'error',
        title: 'Error',
        message: err.message || 'Failed to load products.',
      });
    }
  } finally {
    setLoading(false);
  }
};

  // Form states
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState<'active' | 'draft'>('active');
  const [description, setDescription] = useState('');
 const [category, setCategory] = useState('c76315aa-9e84-4d34-9c96-080dfc1c3677');
  const [discount, setDiscount] = useState('');
  const [images, setImages] = useState<Array<{ url: string; file?: File }>>([]);
  const [isSaving, setIsSaving] = useState(false);

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenAdd = () => {
    setSelectedProduct(null);
    setTitle('');
    setPrice('');
    setSku('');
    setStock('');
    setStatus('active');
    setDescription('');
   setCategory('c76315aa-9e84-4d34-9c96-080dfc1c3677');
    setDiscount('');
    setImages([]);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setSelectedProduct(p);
    setTitle(p.title);
    setPrice(String(p.price));
    setSku(p.sku);
    setStock(String(p.stock_quantity));
    setStatus(p.status);
    setDescription(p.description || '');
    setCategory(p.category_id || 'c76315aa-9e84-4d34-9c96-080dfc1c3677');
    setDiscount(p.sale_price ? String(p.price - p.sale_price) : '');
    
    // Load main image and any additional images
    const imgs: Array<{ url: string }> = p.og_image_url ? [{ url: p.og_image_url }] : [];
    if (p.images) {
      p.images.forEach((img) => {
        if (!imgs.find(i => i.url === img.image_url)) imgs.push({ url: img.image_url });
      });
    }
    setImages(imgs);
    setIsAddModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImages = filesArray.map(file => ({
        url: URL.createObjectURL(file),
        file
      }));
      setImages(prev => {
        const combined = [...prev, ...newImages];
        return combined.slice(0, 4); // Max 4 images
      });
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages(prev => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // 1. Upload images
      const uploadedUrls: string[] = [];
      for (const img of images) {
        if (img.file) {
          const fileExt = img.file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
          const { error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(fileName, img.file);
            
          if (uploadError) {
            console.error('Upload error:', uploadError);
            throw new Error('Failed to upload image. Does the product-images bucket exist?');
          }
          const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(fileName);
          uploadedUrls.push(publicUrl);
        } else {
          uploadedUrls.push(img.url);
        }
      }

      const mainImageUrl = uploadedUrls[0] || null;

      if (selectedProduct) {
        // Edit mode
        const { error: updateError } = await supabase
          .from('products')
          .update({
            title,
            slug: title.toLowerCase().replace(/\s+/g, '-'),
            description,
            category_id: category,
            price: Number(price),
            sale_price: discount ? Number(price) - Number(discount) : null,
            sku,
            stock_quantity: Number(stock),
            status,
            og_image_url: mainImageUrl,
            updated_at: new Date().toISOString(),
          })
          .eq('id', selectedProduct.id);
          
        if (updateError) throw updateError;
        
        // Handle additional images (simplistic approach: delete old, insert new)
        await supabase.from('product_images').delete().eq('product_id', selectedProduct.id);
        if (uploadedUrls.length > 1) {
          const additionalImages = uploadedUrls.slice(1).map((url, i) => ({
            product_id: selectedProduct.id,
            image_url: url,
            sort_order: i + 1
          }));
          await supabase.from('product_images').insert(additionalImages);
        }
        
        addToast({ type: 'success', title: 'Product Updated', message: 'Changes saved successfully.' });
      } else {
        // Add mode
        const { data: newProdData, error: insertError } = await supabase
          .from('products')
          .insert([{
            title,
            slug: title.toLowerCase().replace(/\s+/g, '-'),
            description,
            category_id: category,
            price: Number(price),
            sale_price: discount ? Number(price) - Number(discount) : null,
            sku,
            stock_quantity: Number(stock),
            status,
            og_image_url: mainImageUrl,
            track_inventory: true,
            allow_backorders: false,
          }])
          .select()
          .single();
          
        if (insertError) throw insertError;
        
        // Additional images
        if (uploadedUrls.length > 1 && newProdData) {
          const additionalImages = uploadedUrls.slice(1).map((url, i) => ({
            product_id: newProdData.id,
            image_url: url,
            sort_order: i + 1
          }));
          await supabase.from('product_images').insert(additionalImages);
        }
        
        addToast({ type: 'success', title: 'Product Created', message: 'Product added to database.' });
      }
      
      setIsAddModalOpen(false);
      fetchProducts(); // Refresh list
    } catch (err: any) {
      console.error('Save error:', err);
      addToast({ type: 'error', title: 'Error saving product', message: err.message || 'Something went wrong.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      
      setProducts((prev) => prev.filter((p) => p.id !== id));
      addToast({
        type: 'warning',
        title: 'Product Deleted',
        message: 'Product removed from database.',
      });
    } catch (err: any) {
      console.error('Delete error:', err);
      addToast({ type: 'error', title: 'Delete Failed', message: err.message });
    }
  };

  return (
    <div className="space-y-[32px]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[28px] font-serif font-semibold">Products</h1>
          <p className="text-[14px] text-foreground-secondary mt-[4px]">
            Manage products registry, inventory settings, and status states.
          </p>
        </div>
        <Button onClick={handleOpenAdd} className="gap-[8px] h-5 w-25">
          <Plus size={16} /> Add Product
        </Button>
      </div>

      {/* Filter and search bar */}
      <div className="flex items-center gap-[16px] bg-white border border-border p-[16px] rounded-[12px] shadow-sm">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, sku..."
            className="w-full h-[40px] pl-[36px] pr-[16px] border border-zinc-300 rounded-[8px] outline-none focus:border-accent"
          />
          <Search className="absolute left-[12px] top-[14px] text-foreground-secondary" size={16} />
        </div>
      </div>

      {/* Products list table */}
      <div className="border border-border rounded-[12px] overflow-hidden bg-white shadow-sm">
        <table className="w-full text-left text-[14px]">
          <thead className="bg-background-secondary border-b border-border text-foreground-secondary font-medium">
            <tr>
              <th className="p-[16px]">Product Info</th>
              <th className="p-[16px]">SKU</th>
              <th className="p-[16px]">Price</th>
              <th className="p-[16px]">Stock</th>
              <th className="p-[16px]">Status</th>
              <th className="p-[16px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filteredProducts.map((p) => (
              <tr key={p.id} className="hover:bg-background-secondary/30 transition-colors">
                <td className="p-[16px]">
                  <div className="flex items-center gap-[12px]">
                    <div className="w-[40px] h-[40px] rounded-[8px] bg-background-secondary overflow-hidden flex-shrink-0 border border-border">
                      {p.og_image_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.og_image_url} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-foreground-secondary">
                          <Eye size={16} />
                        </div>
                      )}
                    </div>
                    <span className="font-semibold text-foreground">{p.title}</span>
                  </div>
                </td>
                <td className="p-[16px] text-foreground-secondary">{p.sku}</td>
                <td className="p-[16px] font-medium">{formatCurrency(p.price)}</td>
                <td className="p-[16px]">
                  <span className={`font-semibold ${p.stock_quantity === 0 ? 'text-destructive' : 'text-foreground-secondary'}`}>
                    {p.stock_quantity === 0 ? 'Sold Out' : p.stock_quantity}
                  </span>
                </td>
                <td className="p-[16px]">
                  <span
                    className={`px-[10px] py-[4px] rounded-full text-[12px] font-medium ${
                      p.status === 'active' ? 'bg-success/10 text-success' : 'bg-foreground/10 text-foreground-secondary'
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="p-[16px] text-right space-x-[8px]">
                  <button
                    onClick={() => handleOpenEdit(p)}
                    className="p-[6px] rounded hover:bg-foreground/5 text-foreground-secondary hover:text-foreground transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
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

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={selectedProduct ? 'Edit Product' : 'Add New Product'}
      >
        <form onSubmit={handleSave} className="space-y-[20px] max-h-[70vh] overflow-y-auto pr-2">
          {/* Image Upload */}
          <div className="space-y-[6px]">
            <div className="flex justify-between items-center">
              <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Product Images</label>
              <span className="text-[12px] text-foreground-secondary">{images.length}/4</span>
            </div>
            
            <div className="grid grid-cols-4 gap-[8px]">
              {images.map((img, i) => (
                <div key={i} className="relative w-full aspect-square rounded-[8px] overflow-hidden border border-zinc-200 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 bg-black/50 hover:bg-black text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                  {i === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-[2px]">
                      Main
                    </div>
                  )}
                </div>
              ))}
              
              {images.length < 4 && (
                <div className="relative w-full aspect-square border-2 border-dashed border-zinc-300 rounded-[8px] bg-background-secondary/30 hover:bg-background-secondary/50 transition-colors cursor-pointer flex flex-col items-center justify-center">
                  <Plus className="w-5 h-5 text-foreground-secondary mb-1" />
                  <span className="text-[10px] text-foreground-secondary text-center leading-tight">Upload<br/>Image</span>
                  <input
                    type="file"
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-[6px]">
            <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Product Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

          <div className="grid grid-cols-2 gap-[16px]">
            <div className="space-y-[6px]">
              <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-[40px] px-[12px] border border-zinc-300 rounded-[8px] outline-none focus:border-accent bg-white"
              >
                <option value="c76315aa-9e84-4d34-9c96-080dfc1c3677">Clothing</option>

<option value="7b2f8984-899d-4c7a-ad4f-e813d17726f0">Accessories</option>

<option value="0531db4e-da25-43cd-895f-d3bc754ede2b">
  Home
</option>
              </select>
            </div>
            <div className="space-y-[6px]">
              <label className="text-[12px] font-semibold text-foreground-secondary uppercase">SKU Code</label>
              <input
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                className="w-full h-[40px] px-[12px] border border-zinc-300 rounded-[8px] outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[16px]">
            <div className="space-y-[6px]">
              <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Price (INR)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full h-[40px] px-[12px] border border-zinc-300 rounded-[8px] outline-none focus:border-accent"
              />
            </div>
            <div className="space-y-[6px]">
              <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Discount (INR)</label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                placeholder="Optional"
                className="w-full h-[40px] px-[12px] border border-zinc-300 rounded-[8px] outline-none focus:border-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[16px]">
            <div className="space-y-[6px]">
              <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Initial Stock</label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full h-[40px] px-[12px] border border-zinc-300 rounded-[8px] outline-none focus:border-accent"
              />
            </div>
            <div className="space-y-[6px]">
              <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Status State</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full h-[40px] px-[12px] border border-zinc-300 rounded-[8px] outline-none focus:border-accent bg-white"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
<div className="flex justify-end gap-2">
 <Button
  variant="outline"
  className="!h-6 !w-26 !px-3 !text-sm !bg-white !text-black !border-gray-300 hover:!bg-white active:!bg-white"
>
  Cancel
</Button>

  <Button
    className="h-6 w-30 px-4 text-sm"
  >
    Public Product
  </Button>
</div>
        </form>
      </Modal>
    </div>
  );
}



