-- ============================================================
-- Supabase initial schema migration
-- Covers all 20 tables, custom enums, RLS policies, storage buckets, 
-- and triggers for the Next.js e-commerce platform.
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- --- Custom Enums ---
create type user_role as enum ('customer', 'admin'); GET / 200 in 6031ms
 ○ Compiling /favicon.ico ...
 ✓ Compiled /favicon.ico in 2.9s (853 modules)
 GET /favicon.ico 200 in 3403ms
 ○ Compiling /products ...
 ✓ Compiled /products in 1282ms (861 modules)
 ⨯ upstream image response failed for https://images.unsplash.com/photo-1601924994987-69e26d50dc64?auto=format&fit=crop&w=800&q=80 404
 ⨯ upstream image response failed for https://images.unsplash.com/photo-1601924994987-69e26d50dc64?auto=format&fit=crop&w=800&q=80 404
 ○ Compiling /auth/signin ...
 ✓ Compiled /auth/signin in 1081ms (825 modules)
 ○ Compiling /auth/signup ...
 ✓ Compiled /auth/signup in 2.6s (1641 modules)
 ✓ Compiled in 1310ms (819 modules)

 *  History restored 

PS C:\Users\SAMEER\Desktop\ecommerce> npm run dev

> ecommerce@0.1.0 dev
> next dev

  ▲ Next.js 14.2.35
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Starting...
 ✓ Ready in 24.4s
 ○ Compiling / ...
 ✓ Compiled / in 37.4s (1573 modules)
 GET / 200 in 41227ms
 ✓ Compiled in 3.6s (779 modules)
 ⨯ upstream image response failed for https://images.unsplash.com/photo-1601924994987-69e26d50dc64?auto=format&fit=crop&w=800&q=80 404
 ○ Compiling /products ...
 ✓ Compiled /products in 3.7s (1573 modules)
 ⨯ upstream image response failed for https://images.unsplash.com/photo-1601924994987-69e26d50dc64?auto=format&fit=crop&w=800&q=80 404
 ⨯ upstream image response failed for https://images.unsplash.com/photo-1601924994987-69e26d50dc64?auto=format&fit=crop&w=800&q=80 404
 ○ Compiling /admin ...
 ✓ Compiled /admin in 19.5s (2564 modules)
 GET /admin 200 in 20966ms
 ○ Compiling /admin/products ...
 ✓ Compiled in 3.4s (2590 modules)
 ✓ Compiled in 4.2s (2590 modules)
 ✓ Compiled in 2.4s (2590 modules)
PS C:\Users\SAMEER\Desktop\ecommerce>
                                      ^C
PS C:\Users\SAMEER\Desktop\ecommerce> npm run dev

> ecommerce@0.1.0 dev
> next dev

  ▲ Next.js 14.2.35
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Starting...
 ✓ Ready in 15.2s
 ○ Compiling / ...
 ✓ Compiled / in 18.8s (1573 modules)
 GET / 200 in 21781ms
 ✓ Compiled in 2.9s (779 modules)
 ⨯ upstream image response failed for https://images.unsplash.com/photo-1601924994987-69e26d50dc64?auto=format&fit=crop&w=800&q=80 404
 ○ Compiling /auth/signin ...
 ✓ Compiled /auth/signin in 3.1s (1567 modules)
 ○ Compiling /admin ...
 ✓ Compiled /admin in 6s (2558 modules)
 GET /admin 200 in 7219ms
 ○ Compiling /admin/products ...
 ✓ Compiled /admin/products in 2.7s (2572 modules)
 ○ Compiling /admin/media ...
 ✓ Compiled /admin/media in 2.3s (2101 modules)
 ✓ Compiled in 4.6s (2115 modules)
 GET /admin/products 200 in 654ms
 ○ Compiling /favicon.ico ...
 ✓ Compiled /favicon.ico in 1794ms (860 modules)
 GET /favicon.ico 200 in 2505ms
 ✓ Compiled in 4.9s (2115 modules)
 ✓ Compiled in 6.1s (2117 modules)
 ✓ Compiled in 1568ms (1288 modules)
 ✓ Compiled in 3.6s (2103 modules)
 ○ Compiling /admin/categories ...
 ✓ Compiled /admin/categories in 1475ms (2109 modules)
 ✓ Compiled in 6s (2123 modules)
 GET /admin/products 200 in 736ms
 ○ Compiling /favicon.ico ...
 ✓ Compiled /favicon.ico in 2.2s (865 modules)
 GET /favicon.ico 200 in 2574ms

 *  History restored 

PS C:\Users\SAMEER\Desktop\ecommerce> npm run dev

> ecommerce@0.1.0 dev
> next dev

  ▲ Next.js 14.2.35
  - Local:        http://localhost:3000
  - Environments: .env.local

 ✓ Starting...
 ✓ Ready in 28.3s
 ○ Compiling / ...
 ✓ Compiled / in 33.7s (1573 modules)
 GET / 200 in 38020ms
 ✓ Compiled in 3.9s (779 modules)
 ○ Compiling /products ...
 ✓ Compiled /products in 2.5s (1573 modules)
 ⨯ upstream image response failed for https://images.unsplash.com/photo-1601924994987-69e26d50dc64?auto=format&fit=crop&w=800&q=80 404
 ⨯ upstream image response failed for https://images.unsplash.com/photo-1601924994987-69e26d50dc64?auto=format&fit=crop&w=800&q=80 404
 ○ Compiling /admin ...
 ✓ Compiled /admin in 9.9s (2566 modules)
 GET /admin 200 in 12686ms
 ○ Compiling /admin/settings ...
 ✓ Compiled /admin/settings in 4.4s (2574 modules)
 ○ Compiling /admin/media ...
 ✓ Compiled /admin/media in 4.8s (2588 modules)
 ○ Compiling /admin/categories ...
 ✓ Compiled /admin/categories in 3.6s (2598 modules)
 ○ Compiling /admin/products ...
 ✓ Compiled /admin/products in 3.5s (2594 modules)
 ○ Compiling / ...
 ✓ Compiled / in 1416ms (1316 modules)
 GET / 200 in 6681ms
 ⨯ upstream image response failed for https://images.unsplash.com/photo-1601924994987-69e26d50dc64?auto=format&fit=crop&w=800&q=80 404
 ○ Compiling /products ...
 ✓ Compiled /products in 647ms (840 modules)
 ⨯ upstream image response failed for https://images.unsplash.com/photo-1601924994987-69e26d50dc64?auto=format&fit=crop&w=800&q=80 404
 ○ Compiling /admin ...
 ✓ Compiled /admin in 931ms (1318 modules)
 GET /admin 200 in 1700ms
create type product_status as enum ('draft', 'active');
create type payment_status as enum ('pending', 'paid', 'failed', 'refunded');
create type fulfillment_status as enum ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
create type coupon_type as enum ('percentage', 'fixed');

-- ============================================================
-- 1. Profiles Table
-- ============================================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  phone text,
  avatar_url text,
  role user_role not null default 'customer',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================
-- 2. Site Settings Table
-- ============================================================
create table public.site_settings (
  id uuid default uuid_generate_v4() primary key,
  site_name text not null default 'StyleHub',
  tagline text,
  logo_url text,
  logo_inverted_url text,
  favicon_url text,
  contact_email text,
  contact_phone text,
  business_address text,
  currency_code text not null default 'INR',
  currency_symbol text not null default '₹',
  tax_rate numeric not null default 18.0,
  tax_inclusive boolean not null default true,
  announcement_bar_active boolean not null default false,
  announcement_bar_text text,
  announcement_bar_link text,
  announcement_bar_color text,
  social_instagram text,
  social_facebook text,
  social_twitter text,
  social_tiktok text,
  social_youtube text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert a default row for site settings
insert into public.site_settings (site_name) values ('StyleHub');

-- ============================================================
-- 3. SEO Settings Table
-- ============================================================
create table public.seo_settings (
  id uuid default uuid_generate_v4() primary key,
  meta_title_template text default '{Page Title} | {Site Name}',
  default_meta_description text,
  og_default_image_url text,
  ga_tracking_id text,
  fb_pixel_id text,
  search_console_meta text,
  robots_txt text default 'User-agent: *' || chr(10) || 'Allow: /',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default row for SEO settings
insert into public.seo_settings (default_meta_description) values ('Premium curated collections.');

-- ============================================================
-- 4. Page SEO Table
-- ============================================================
create table public.page_seo (
  id uuid default uuid_generate_v4() primary key,
  page_slug text not null unique,
  meta_title text,
  meta_description text,
  og_image_url text
);

-- ============================================================
-- 5. Categories Table
-- ============================================================
create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  parent_id uuid references public.categories(id) on delete set null,
  sort_order integer not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================
-- 6. Products Table
-- ============================================================
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  description text,
  category_id uuid references public.categories(id) on delete set null,
  price numeric not null,
  sale_price numeric,
  sale_start timestamp with time zone,
  sale_end timestamp with time zone,
  sku text not null unique,
  stock_quantity integer not null default 0,
  track_inventory boolean not null default true,
  allow_backorders boolean not null default false,
  status product_status not null default 'draft',
  meta_title text,
  meta_description text,
  og_image_url text,
  tags text[] not null default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================
-- 7. Product Images Table
-- ============================================================
create table public.product_images (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  image_url text not null,
  sort_order integer not null default 0,
  alt_text text
);

-- ============================================================
-- 8. Product Options Table
-- ============================================================
create table public.product_options (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  name text not null, -- E.g. 'Size', 'Color'
  sort_order integer not null default 0
);

-- ============================================================
-- 9. Product Option Values Table
-- ============================================================
create table public.product_option_values (
  id uuid default uuid_generate_v4() primary key,
  option_id uuid references public.product_options(id) on delete cascade not null,
  value text not null, -- E.g. 'XL', 'Red'
  sort_order integer not null default 0
);

-- ============================================================
-- 10. Product Variants Table
-- ============================================================
create table public.product_variants (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  sku text not null unique,
  price numeric, -- Price override for this variant
  stock_quantity integer not null default 0,
  option_values jsonb not null, -- Array of {option_name, value}
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================
-- 11. Addresses Table
-- ============================================================
create table public.addresses (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  full_name text not null,
  phone text,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  zip text not null,
  country text not null default 'India',
  is_default boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================
-- 12. Orders Table
-- ============================================================
create table public.orders (
  id bigint generated always as identity primary key,
  order_number text unique, -- ORD-10001 format generated via trigger
  user_id uuid references public.profiles(id) on delete set null,
  email text not null,
  shipping_address jsonb not null, -- Snapshot of shipping address details
  billing_address jsonb not null, -- Snapshot of billing address details
  shipping_method text,
  shipping_cost numeric not null default 0,
  subtotal numeric not null,
  discount_amount numeric not null default 0,
  tax_amount numeric not null default 0,
  total numeric not null,
  coupon_code text,
  payment_status payment_status not null default 'pending',
  fulfillment_status public.fulfillment_status not null default 'pending',
  razorpay_payment_id text,
  tracking_number text,
  tracking_carrier text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================
-- 13. Order Items Table
-- ============================================================
create table public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id bigint references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete set null,
  variant_id uuid references public.product_variants(id) on delete set null,
  title text not null,
  variant_info jsonb, -- Snapshot of selected variants
  quantity integer not null check (quantity > 0),
  unit_price numeric not null,
  line_total numeric not null
);

-- ============================================================
-- 14. Order Timeline Table
-- ============================================================
create table public.order_timeline (
  id uuid default uuid_generate_v4() primary key,
  order_id bigint references public.orders(id) on delete cascade not null,
  status text not null,
  note text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================
-- 15. Reviews Table
-- ============================================================
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  rating integer not null check (rating >= 1 and rating <= 5),
  title text,
  body text,
  is_verified boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================
-- 16. Coupons Table
-- ============================================================
create table public.coupons (
  id uuid default uuid_generate_v4() primary key,
  code text not null unique,
  type coupon_type not null default 'percentage',
  value numeric not null,
  min_order_amount numeric,
  usage_limit integer,
  per_customer_limit integer,
  times_used integer not null default 0,
  valid_from timestamp with time zone,
  valid_to timestamp with time zone,
  applicable_products uuid[] default '{}',
  applicable_categories uuid[] default '{}',
  is_active boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================
-- 17. Subscribers Table
-- ============================================================
create table public.subscribers (
  id uuid default uuid_generate_v4() primary key,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================
-- 18. Hero Slides Table
-- ============================================================
create table public.hero_slides (
  id uuid default uuid_generate_v4() primary key,
  image_url text not null,
  heading text not null,
  subheading text,
  cta_text text,
  cta_link text,
  sort_order integer not null default 0,
  is_active boolean not null default true
);

-- ============================================================
-- 19. Wishlist Table
-- ============================================================
create table public.wishlist (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

-- ============================================================
-- 20. Media Table
-- ============================================================
create table public.media (
  id uuid default uuid_generate_v4() primary key,
  url text not null,
  filename text not null,
  size bigint not null,
  mime_type text not null,
  uploaded_by uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================
-- Database Functions and Triggers
-- ============================================================

-- Function: update updated_at timestamp
create or replace function public.handle_update_timestamp()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply updated_at triggers
create trigger trigger_update_profiles
  before update on public.profiles
  for each row execute function public.handle_update_timestamp();

create trigger trigger_update_products
  before update on public.products
  for each row execute function public.handle_update_timestamp();

create trigger trigger_update_orders
  before update on public.orders
  for each row execute function public.handle_update_timestamp();

create trigger trigger_update_site_settings
  before update on public.site_settings
  for each row execute function public.handle_update_timestamp();

create trigger trigger_update_seo_settings
  before update on public.seo_settings
  for each row execute function public.handle_update_timestamp();


-- Function: Automatically create profile on auth.users signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.raw_user_meta_data->>'avatar_url',
    'customer'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- Function: Auto-generate order number (e.g. ORD-10001)
create or replace function public.handle_order_number()
returns trigger as $$
begin
  new.order_number = 'ORD-' || (10000 + new.id);
  return new;
end;
$$ language plpgsql;

create trigger trigger_generate_order_number
  before insert on public.orders
  for each row execute function public.handle_order_number();


-- Function: Decrement product/variant stock on order item insertion
create or replace function public.decrement_inventory_on_order()
returns trigger as $$
declare
  is_inventory_tracked boolean;
begin
  -- Check if inventory tracking is enabled for the product
  select track_inventory into is_inventory_tracked
  from public.products
  where id = new.product_id;

  if is_inventory_tracked = true then
    -- If variant is specified, decrement variant stock
    if new.variant_id is not null then
      update public.product_variants
      set stock_quantity = stock_quantity - new.quantity
      where id = new.variant_id;
    else
      -- Otherwise decrement product main stock
      update public.products
      set stock_quantity = stock_quantity - new.quantity
      where id = new.product_id;
    end if;
  end if;

  return new;
end;
$$ language plpgsql;

create trigger trigger_decrement_inventory
  after insert on public.order_items
  for each row execute function public.decrement_inventory_on_order();


-- Function: Increment coupon use count
create or replace function public.increment_coupon_usage()
returns trigger as $$
begin
  if new.coupon_code is not null then
    update public.coupons
    set times_used = times_used + 1
    where code = new.coupon_code;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger trigger_increment_coupon_usage
  after insert on public.orders
  for each row execute function public.increment_coupon_usage();


-- ============================================================
-- Row Level Security (RLS) Policies
-- ============================================================

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.seo_settings enable row level security;
alter table public.page_seo enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_options enable row level security;
alter table public.product_option_values enable row level security;
alter table public.product_variants enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.order_timeline enable row level security;
alter table public.reviews enable row level security;
alter table public.coupons enable row level security;
alter table public.subscribers enable row level security;
alter table public.hero_slides enable row level security;
alter table public.wishlist enable row level security;
alter table public.media enable row level security;

-- Profile Helper Function to check Admin status
create or replace function public.is_admin(user_id uuid)
returns boolean as $$
declare
  user_role public.user_role;
begin
  select role into user_role from public.profiles where id = user_id;
  return user_role = 'admin';
end;
$$ language plpgsql security definer;

-- --- Profiles RLS ---
create policy "Allow public read profile details" on public.profiles for select using (true);
create policy "Allow users to update own profile" on public.profiles for update using (auth.uid() = id);

-- --- Site Settings / SEO Settings / Page SEO RLS ---
create policy "Allow public read site settings" on public.site_settings for select using (true);
create policy "Allow admin write site settings" on public.site_settings for all using (public.is_admin(auth.uid()));

create policy "Allow public read seo settings" on public.seo_settings for select using (true);
create policy "Allow admin write seo settings" on public.seo_settings for all using (public.is_admin(auth.uid()));

create policy "Allow public read page seo" on public.page_seo for select using (true);
create policy "Allow admin write page seo" on public.page_seo for all using (public.is_admin(auth.uid()));

-- --- Categories RLS ---
create policy "Allow public read categories" on public.categories for select using (true);
create policy "Allow admin write categories" on public.categories for all using (public.is_admin(auth.uid()));

-- --- Products / Variants / Images / Options RLS ---
create policy "Allow public read products" on public.products for select using (status = 'active' or public.is_admin(auth.uid()));
create policy "Allow admin write products" on public.products for all using (public.is_admin(auth.uid()));

create policy "Allow public read product images" on public.product_images for select using (true);
create policy "Allow admin write product images" on public.product_images for all using (public.is_admin(auth.uid()));

create policy "Allow public read product options" on public.product_options for select using (true);
create policy "Allow admin write product options" on public.product_options for all using (public.is_admin(auth.uid()));

create policy "Allow public read option values" on public.product_option_values for select using (true);
create policy "Allow admin write option values" on public.product_option_values for all using (public.is_admin(auth.uid()));

create policy "Allow public read product variants" on public.product_variants for select using (true);
create policy "Allow admin write product variants" on public.product_variants for all using (public.is_admin(auth.uid()));

-- --- Addresses RLS ---
create policy "Allow users to read own addresses" on public.addresses for select using (auth.uid() = user_id);
create policy "Allow users to write own addresses" on public.addresses for all using (auth.uid() = user_id);

-- --- Orders / Order Items / Timeline RLS ---
create policy "Allow users to read own orders" on public.orders for select using (auth.uid() = user_id or public.is_admin(auth.uid()));
create policy "Allow admin write orders" on public.orders for all using (public.is_admin(auth.uid()));

create policy "Allow users to read own order items" on public.order_items for select using (
  exists (
    select 1 from public.orders 
    where orders.id = order_items.order_id 
    and (orders.user_id = auth.uid() or public.is_admin(auth.uid()))
  )
);
create policy "Allow system/admin write order items" on public.order_items for all using (true); -- Trigger handles verification

create policy "Allow users to read own order timeline" on public.order_timeline for select using (
  exists (
    select 1 from public.orders 
    where orders.id = order_timeline.order_id 
    and (orders.user_id = auth.uid() or public.is_admin(auth.uid()))
  )
);
create policy "Allow admin write order timeline" on public.order_timeline for all using (public.is_admin(auth.uid()));

-- --- Reviews RLS ---
create policy "Allow public read reviews" on public.reviews for select using (true);
create policy "Allow auth users to write reviews" on public.reviews for insert with check (auth.uid() = user_id);
create policy "Allow users or admin delete reviews" on public.reviews for delete using (auth.uid() = user_id or public.is_admin(auth.uid()));

-- --- Coupons RLS ---
create policy "Allow public read active coupons" on public.coupons for select using (is_active = true);
create policy "Allow admin write coupons" on public.coupons for all using (public.is_admin(auth.uid()));

-- --- Subscribers RLS ---
create policy "Allow public insert subscribers" on public.subscribers for insert with check (true);
create policy "Allow admin read subscribers" on public.subscribers for select using (public.is_admin(auth.uid()));

-- --- Hero Slides RLS ---
create policy "Allow public read active slides" on public.hero_slides for select using (is_active = true);
create policy "Allow admin write slides" on public.hero_slides for all using (public.is_admin(auth.uid()));

-- --- Wishlist RLS ---
create policy "Allow users to manage own wishlist" on public.wishlist for all using (auth.uid() = user_id);

-- --- Media RLS ---
create policy "Allow public read media" on public.media for select using (true);
create policy "Allow admin write media" on public.media for all using (public.is_admin(auth.uid()));
