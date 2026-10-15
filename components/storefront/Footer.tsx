'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

const shopLinks = [
  { label: 'All Products', href: '/products' },
  { label: 'New Arrivals', href: '/products?sort=newest' },
  { label: 'Best Sellers', href: '/products?sort=best-selling' },
  { label: 'Sale', href: '/products?sale=true' },
];

const helpLinks = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Shipping & Delivery', href: '/shipping-policy' },
  { label: 'Returns & Exchanges', href: '/returns-policy' },
  { label: 'Contact Us', href: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
];

const socialLinks = [
  { icon: '◎', href: '#', label: 'Instagram' },
  { icon: 'f', href: '#', label: 'Facebook' },
  { icon: '𝕏', href: '#', label: 'Twitter' },
  { icon: '▶', href: '#', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
    }, 500);
  };
  return (
    <footer className="bg-foreground text-white">
      <div className="container-main py-[64px]">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[48px]">

          {/* Brand */}
          <div className="space-y-[16px]">

            <Link
              href="/"
              className="font-serif text-[24px] font-bold tracking-tight"
            >
              StyleHub
            </Link>

            <p className="text-[14px] text-white/60 leading-relaxed max-w-[280px]">
              Curated collection of premium products designed for the modern
              lifestyle. Quality craftsmanship, timeless design.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-[12px] pt-[8px]">

              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-[36px] h-[36px] rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all"
                >
                  <span className="text-[15px] font-semibold">
                    {social.icon}
                  </span>
                </a>
              ))}

            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-caption-sm uppercase tracking-label text-white/40 mb-[16px]">
              Shop
            </h4>

            <ul className="space-y-[10px]">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-caption-sm uppercase tracking-label text-white/40 mb-[16px]">
              Help
            </h4>

            <ul className="space-y-[10px]">
              {helpLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-caption-sm uppercase tracking-label text-white/40 mb-[16px]">
              Stay Updated
            </h4>

            <p className="text-[14px] text-white/60 mb-[16px]">
              Subscribe to get special offers, free giveaways, and new arrivals.
            </p>

            {isSubscribed ? (
              <div className="bg-white/10 border border-white/20 rounded-[8px] p-4 text-center">
                <div className="flex items-center justify-center gap-1.5 text-white font-medium text-[13px] mb-1">
                  <CheckCircle2 size={16} className="text-[#c8a97e]" />
                  <span>Thank you for subscribing!</span>
                </div>
                <p className="text-[12px] text-white/60 mb-2">
                  Check your inbox for exclusive updates.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubscribed(false);
                    setEmail('');
                  }}
                  className="text-[11px] text-white/50 hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
                >
                  Subscribe another email
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="flex-1 h-[44px] px-[15px] bg-white/10 border border-white/20 rounded-l-[8px] text-[14px] text-white placeholder:text-white/40 outline-none focus:border-white/40 transition-colors"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-[44px] px-[14px] bg-white text-foreground text-[13px] font-semibold rounded-r-[8px] hover:bg-white/90 transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? '...' : 'Subscribe'}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-[64px] pt-[24px] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-[16px]">

          <p className="text-[12px] text-white/40">
            © {new Date().getFullYear()} StyleHub. All rights reserved.
          </p>

          <div className="flex items-center gap-[16px]">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[12px] text-white/40 hover:text-white/60 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Payment methods */}
          <div className="flex items-center gap-[8px]">
            {['Visa', 'MC', 'UPI', 'GPay'].map((method) => (
              <span
                key={method}
                className="px-[8px] py-[4px] bg-white/10 rounded-[4px] text-[10px] text-white/60 font-medium"
              >
                {method}
              </span>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
}