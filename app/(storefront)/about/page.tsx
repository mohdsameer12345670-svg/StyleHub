'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="container-main py-[40px] sm:py-[96px] max-w-[800px] mx-auto space-y-[36px] sm:space-y-[48px]">
      <div className="text-center space-y-[12px]">
        <p className="tracking-label text-foreground-secondary">OUR STORY</p>
        <h1 className="text-section-lg font-serif">A Heritage of Quality</h1>
      </div>

      <div className="space-y-[24px] text-[15px] sm:text-[16px] text-foreground-secondary leading-relaxed">
        <p>
          Founded in 2026, StyleHub was created from a shared desire to return to quality, simplicity, 
          and conscious creation. We believed that products should be made to last, crafted from premium materials, 
          and design-focused.
        </p>
        <p>
          Every item in our collection is curated with intent. We collaborate with generational artisans and 
          factories that prioritize fair labor conditions and environmental sustainability, ensuring that our products 
          are both premium in build and ethical in impact.
        </p>
        <p>
          We hope our products become extensions of your lifestyle, serving as timeless additions that gather character 
          and age beautifully with time.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-[24px] pt-[24px]">
        <div className="text-center p-[24px] bg-background-secondary rounded-[12px] space-y-[8px]">
          <h3 className="text-[28px] font-serif font-bold text-foreground">100%</h3>
          <p className="text-[12px] uppercase font-semibold tracking-wider text-foreground-secondary">Organic Materials</p>
        </div>
        <div className="text-center p-[24px] bg-background-secondary rounded-[12px] space-y-[8px]">
          <h3 className="text-[28px] font-serif font-bold text-foreground">30+</h3>
          <p className="text-[12px] uppercase font-semibold tracking-wider text-foreground-secondary">Global Artisans</p>
        </div>
        <div className="text-center p-[24px] bg-background-secondary rounded-[12px] space-y-[8px]">
          <h3 className="text-[28px] font-serif font-bold text-foreground">50k+</h3>
          <p className="text-[12px] uppercase font-semibold tracking-wider text-foreground-secondary">Happy Customers</p>
        </div>
      </div>
    </div>
  );
}
