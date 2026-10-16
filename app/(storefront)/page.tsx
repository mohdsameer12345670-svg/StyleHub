'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Star, Flame, TrendingUp, ShieldCheck, Truck, RotateCcw, ChevronRight, CheckCircle2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import ProductCard from '@/components/storefront/ProductCard';
import { demoCategories, demoProducts } from '@/lib/demo-data';

const featuredProducts = demoProducts.slice(0, 4);
const trendingProducts = demoProducts.slice(4, 8);

// Marquee items
const marqueeItems = [
  'New Season SS26', 'Free Shipping Above ₹999', 'Premium Quality',
  'Handcrafted Luxury', 'Sustainable Fashion', 'Exclusive Drops',
  'New Season SS26', 'Free Shipping Above ₹999', 'Premium Quality',
  'Handcrafted Luxury', 'Sustainable Fashion', 'Exclusive Drops',
];

const editorialLooks = [
  {
    id: 1,
    label: 'Street Luxe',
    tag: 'TRENDING',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80',
    color: '#c8a97e',
  },
  {
    id: 2,
    label: 'Minimal Core',
    tag: 'EDITOR\'S PICK',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
    color: '#9b8ea0',
  },
  {
    id: 3,
    label: 'Power Dressing',
    tag: 'NEW',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    color: '#7a9e9f',
  },
];

// 3D tilt card hook
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const tiltX = ((y - cy) / cy) * -12;
    const tiltY = ((x - cx) / cx) * 12;
    el.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03,1.03,1.03)`;
  };
  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    }
  };
  return { ref, handleMouseMove, handleMouseLeave };
}

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt();
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
    </div>
  );
}

// Floating 3D hero visual
function HeroVisual() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setPos({ x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
      style: { top: '0%', left: '5%', width: '55%', zIndex: 3 },
      depth: 1.2,
    },
    {
      src: 'https://images.unsplash.com/photo-1485231183945-fffde7cc051e?auto=format&fit=crop&w=400&q=80',
      style: { top: '20%', right: '2%', width: '42%', zIndex: 2 },
      depth: 0.7,
    },
    {
      src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=300&q=80',
      style: { bottom: '2%', left: '20%', width: '38%', zIndex: 4 },
      depth: 1.5,
    },
  ];

  return (
    <div className="relative w-full h-full" style={{ perspective: '1000px' }}>
      {/* Decorative glowing orbs */}
      <div className="absolute top-[10%] right-[15%] w-40 h-40 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #c8a97e, transparent)' }} />
      <div className="absolute bottom-[20%] left-[10%] w-32 h-32 rounded-full opacity-15 blur-2xl"
        style={{ background: 'radial-gradient(circle, #9b8ea0, transparent)' }} />

      {images.map((img, i) => (
        <div
          key={i}
          className="absolute overflow-hidden rounded-2xl shadow-2xl"
          style={{
            ...img.style,
            transform: `translate3d(${pos.x * img.depth * -18}px, ${pos.y * img.depth * -12}px, 0)`,
            transition: 'transform 0.1s ease-out',
            boxShadow: '0 25px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.1)',
          }}
        >
          <img
            src={img.src}
            alt="fashion"
            className="w-full h-full object-cover"
            style={{ aspectRatio: i === 0 ? '3/4' : i === 1 ? '3/4' : '4/3' }}
          />
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>
      ))}

      {/* Floating badge */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[18%] right-[8%] z-10 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl border border-white/60"
        style={{ transform: `translate3d(${pos.x * -10}px, ${pos.y * -10}px, 40px)` }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[11px] font-semibold text-[#1a1a1a] uppercase tracking-wider">42 New Drops</span>
        </div>
      </motion.div>

      {/* Rating badge */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-[22%] right-[4%] z-10 bg-[#1a1a1a]/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-xl"
        style={{ transform: `translate3d(${pos.x * -8}px, ${pos.y * -8}px, 30px)` }}
      >
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={10} className="fill-amber-400 text-amber-400" />
          ))}
          <span className="text-[11px] text-white ml-1 font-medium">4.9 Rating</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
    }, 500);
  };

  return (
    <main ref={containerRef} className="overflow-x-hidden" style={{ background: '#f3f2f0' }}>

      {/* ============================================================ */}
      {/* HERO — 3D Parallax */}
      {/* ============================================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #faf9f7 0%, #f0ede8 50%, #e8e3dc 100%)' }}>
        {/* Background grid texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0" />

        <div className="container-main relative z-10 py-24 lg:py-0 lg:h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">

            {/* Left — Copy */}
            <div className="space-y-8 order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 rounded-full border border-[#c8a97e]/40 bg-[#c8a97e]/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a6a3d]"
              >
                <Sparkles size={12} />
                New Season — SS 2026
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif leading-[1.0] tracking-[-0.04em] text-[#1a1a1a]"
                style={{ fontSize: 'clamp(52px, 7vw, 96px)' }}
              >
                Wear the
                <br />
                <span className="italic text-[#5f5a56]">Future</span>
                <br />
                of Fashion.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[17px] text-[#6b6460] leading-relaxed max-w-[420px]"
              >
                Discover handcrafted luxury — where premium materials meet modern silhouettes. Every piece tells a story.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 "
              >
                <Link href="/products">
                  <Button
                    size="sm"
                    className="gap-2 group shadow-md h-16 w-22"
                  >
                    Shop Now
                    <ArrowRight
                      size={15}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </Link>
                <Link href="/about">
                  <button className="flex items-center gap-1.5 text-[14px] font-medium text-[#1a1a1a] border-b border-[#1a1a1a]/30 pb-0.5 hover:border-[#1a1a1a] transition-colors">
                    Our Story <ChevronRight size={14} />
                  </button>
                </Link>
              </motion.div>

              {/* Micro stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center gap-6 sm:gap-8 pt-4 border-t border-black/8"
              >
                {[
                  { val: '42+', label: 'New Drops' },
                  { val: '4.9★', label: 'Rating' },
                  { val: '12K+', label: 'Happy Customers' },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-[20px] sm:text-[22px] font-bold tracking-tight text-[#1a1a1a]">{s.val}</div>
                    <div className="text-[11px] uppercase tracking-wider text-[#8a8480] mt-0.5">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — 3D Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="order-1 lg:order-2 relative h-[320px] sm:h-[420px] lg:h-[600px] w-full"
            >
              <HeroVisual />
            </motion.div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f3f2f0] to-transparent" />
      </section>

      {/* ============================================================ */}
      {/* MARQUEE STRIP */}
      {/* ============================================================ */}
      <div className="relative overflow-hidden bg-[#1a1a1a] py-3.5 z-10">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="flex items-center gap-0 whitespace-nowrap"
        >
          {marqueeItems.map((item, i) => (
            <span key={i} className="flex items-center gap-5 px-5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">{item}</span>
              <span className="w-1 h-1 rounded-full bg-[#c8a97e]" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* CATEGORIES — 3D Tilt Cards */}
      {/* ============================================================ */}
      <section className="container-main py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10 gap-4"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a8480]">Collections</p>
            <h2 className="mt-2 font-serif text-4xl md:text-5xl tracking-[-0.04em] text-[#1a1a1a]">
              Shop by Style
            </h2>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-1 text-[13px] font-medium text-[#1a1a1a] hover:gap-2 transition-all">
            View all <ChevronRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {demoCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
            >
              <Link href={`/products?category=${cat.slug}`} className="block">
                <TiltCard className="group cursor-pointer rounded-3xl overflow-hidden">
                  <div className="relative overflow-hidden"
                    style={{ aspectRatio: i % 2 === 0 ? '3/4' : '4/5' }}
                  >
                    <img
                      src={cat.image_url || ''}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* 3D shine layer */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%, rgba(255,255,255,0.06) 100%)' }}
                    />

                    {/* Text */}
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/70 mb-1">Collection</p>
                      <h3 className="font-serif text-[22px] md:text-[26px] text-white tracking-[-0.02em] leading-tight">
                        {cat.name}
                      </h3>
                      <div className="mt-3 flex items-center gap-1.5 text-[12px] text-white/80 font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Explore <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* EDITORIAL LOOKBOOK — 3D Floating Panels */}
      {/* ============================================================ */}
      <section className="py-16 md:py-24 overflow-hidden" style={{ background: '#1a1a1a' }}>
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c8a97e]">Lookbook</p>
              <h2 className="mt-2 font-serif text-4xl md:text-5xl tracking-[-0.04em] text-white">
                Styled for You
              </h2>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-1 text-[13px] font-medium text-white/60 hover:text-white transition-colors">
              Full Lookbook <ChevronRight size={14} />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {editorialLooks.map((look, i) => (
              <motion.div
                key={look.id}
                initial={{ opacity: 0, y: 50, rotateY: -8 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
              >
    <TiltCard
  className="group cursor-pointer rounded-3xl overflow-hidden relative [transform-style:preserve-3d]"
>

                  <div className="relative overflow-hidden" style={{ aspectRatio: '3/4' }}>
                    <img
                      src={look.image}
                      alt={look.label}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.1) 100%)' }}
                    />

                    {/* Tag */}
                    <div className="absolute top-5 left-5">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
                        style={{ background: look.color, color: '#fff' }}
                      >
                        {look.tag}
                      </span>
                    </div>

                    {/* Gloss overlay on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `linear-gradient(135deg, ${look.color}22 0%, transparent 60%)` }}
                    />

                    {/* Bottom content */}
                    <div className="absolute bottom-0 inset-x-0 p-6">
                      <h3 className="font-serif text-[26px] text-white tracking-[-0.02em] mb-3">{look.label}</h3>
                      <Link href="/products">
                        <motion.div
                          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white border border-white/30 rounded-full px-4 py-2 hover:bg-white hover:text-[#1a1a1a] transition-all"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          Shop Look <ArrowRight size={11} />
                        </motion.div>
                      </Link>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* NEW ARRIVALS — Product Grid */}
      {/* ============================================================ */}
      <section className="container-main py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a8480]">Just Arrived</p>
            <h2 className="mt-2 font-serif text-4xl md:text-5xl tracking-[-0.04em] text-[#1a1a1a]">
              New Arrivals
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Flame size={16} className="text-orange-500" />
            <span className="text-[13px] font-medium text-[#6b6460]">Hot this week</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} showQuickAdd={true} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/products">
            <Button variant="secondary" size="sm" className="gap-1.5 group">
              View All Products
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FULL-BLEED BANNER — Parallax */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden" style={{ height: 'clamp(420px, 55vw, 680px)' }}>
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1800&q=80"
            alt="Fashion Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(26,26,26,0.72) 0%, rgba(26,26,26,0.35) 60%, rgba(26,26,26,0.15) 100%)' }}
          />
        </motion.div>

        <div className="relative z-10 h-full flex items-center">
          <div className="container-main">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="max-w-xl"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c8a97e] mb-4">
                Limited Edition Drop
              </p>
              <h2 className="font-serif text-white tracking-[-0.04em] leading-tight mb-6"
                style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
              >
                The Capsule<br />
                <em>Collection</em>
              </h2>
              <p className="text-white/70 text-[16px] mb-8 max-w-sm leading-relaxed">
                Meticulously curated pieces that transcend seasons. Invest in timeless wardrobe essentials.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/products">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2.5 bg-white text-[#1a1a1a] rounded-full text-[12px] font-bold uppercase tracking-wider hover:bg-[#f5f5f5] transition-colors shadow-md"
                  >
                    Explore Collection
                  </motion.button>
                </Link>
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2.5 bg-transparent text-white rounded-full text-[12px] font-semibold border border-white/40 hover:border-white transition-colors"
                  >
                    Our Story
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* TRENDING NOW */}
      {/* ============================================================ */}
      <section className="container-main py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-[#2563eb]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8a8480]">This Season</p>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl tracking-[-0.04em] text-[#1a1a1a]">
              Trending Now
            </h2>
          </div>
          <Link href="/products?sort=popular" className="hidden md:flex items-center gap-1 text-[13px] font-medium text-[#1a1a1a] hover:gap-2 transition-all">
            See all <ChevronRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {trendingProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} showQuickAdd={true} />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* DUAL SPLIT — Style Stories */}
      {/* ============================================================ */}
      <section className="container-main py-6 md:py-10 pb-16 md:pb-24">
        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
              title: 'Women\'s Edit',
              sub: 'Effortless & Refined',
              href: '/products?category=clothing',
              bg: '#e8e3dc',
            },
            {
              image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80',
              title: 'Men\'s Edit',
              sub: 'Sharp & Minimal',
              href: '/products?category=clothing',
              bg: '#dce3e8',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <TiltCard className="group rounded-3xl overflow-hidden cursor-pointer relative block">
                <Link href={item.href}>
                 <div
  className="relative overflow-hidden"
  style={{ height: '280px' }}
>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0"
                      style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%)' }}
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)' }}
                    />
                    <div className="absolute inset-0 flex items-end p-8">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.2em] text-white/70 mb-1">{item.sub}</p>
                        <h3 className="font-serif text-[36px] text-white tracking-[-0.02em] mb-4">{item.title}</h3>
                        <motion.div
                          className="inline-flex items-center gap-2 text-[13px] font-semibold text-white border border-white/30 rounded-full px-5 py-2"  whileHover={{ scale: 1.04 }}
                        >
                          Shop Now <ArrowRight size={13} />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* TRUST BADGES */}
      {/* ============================================================ */}
      <section className="py-12 border-y border-black/6" style={{ background: '#f8f7f5' }}>
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹999' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '30-day hassle-free' },
              { icon: ShieldCheck, title: 'Secure Payment', desc: '100% encrypted checkout' },
              { icon: Star, title: 'Premium Quality', desc: 'Handpicked materials' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#1a1a1a] flex items-center justify-center shrink-0">
                  <item.icon size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#1a1a1a]">{item.title}</p>
                  <p className="text-[12px] text-[#8a8480] mt-0.5">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* NEWSLETTER CTA */}
      {/* ============================================================ */}
      <section className="container-main py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] overflow-hidden relative text-center px-8 py-16 md:py-20"
          style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2520 50%, #1a1a1a 100%)' }}
        >
          {/* Decorative orbs */}
          <div className="absolute top-[-20%] left-[10%] w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #c8a97e, transparent)' }} />
          <div className="absolute bottom-[-20%] right-[10%] w-80 h-80 rounded-full opacity-8 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, #9b8ea0, transparent)' }} />

          <div className="relative z-10 max-w-xl mx-auto">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c8a97e] mb-4">
              Stay in the Loop
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white tracking-[-0.04em] mb-4">
              Get Early Access
            </h2>
            <p className="text-white/60 text-[15px] mb-10 leading-relaxed">
              Be the first to know about new drops, exclusive offers, and curated fashion stories delivered to your inbox.
            </p>
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 border border-[#c8a97e]/40 rounded-2xl p-6 text-center backdrop-blur-md max-w-md mx-auto shadow-2xl"
              >
                <div className="w-12 h-12 rounded-full bg-[#c8a97e]/20 border border-[#c8a97e] flex items-center justify-center mx-auto mb-3 text-[#c8a97e]">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-xl font-serif text-white font-semibold mb-2">
                  Thank You for Subscribing!
                </h3>
                <p className="text-white/70 text-[13px] mb-4 leading-relaxed">
                  We&apos;ve sent a welcome confirmation to <span className="text-white font-medium underline underline-offset-2">{newsletterEmail}</span>. Check your inbox for exclusive drops and special offers.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubscribed(false);
                    setNewsletterEmail('');
                  }}
                  className="text-[12px] text-[#c8a97e] hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Subscribe another email
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto">
                <div className="flex h-11 rounded-lg overflow-hidden bg-white/10 border border-white/20 focus-within:border-[#c8a97e]/60 transition-colors">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="flex-1 min-w-0 px-4 h-full bg-transparent text-white placeholder-white/40 text-[13px] outline-none"
                  />
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="h-full px-5 shrink-0 bg-white text-[#1a1a1a] text-[12px] font-semibold hover:bg-[#c8a97e] hover:text-white transition-colors disabled:opacity-60 cursor-pointer"
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </motion.button>
                </div>
                <p className="mt-4 text-[11px] text-white/30 text-center">No spam, ever. Unsubscribe at any time.</p>
              </form>
            )}
          </div>
        </motion.div>
      </section>

      {/* Bottom spacer for mobile nav */}
      <div className="h-20 md:h-0" />
    </main>
  );
}