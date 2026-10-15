'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Header from '@/components/storefront/Header';
import Footer from '@/components/storefront/Footer';
import CartDrawer from '@/components/storefront/CartDrawer';
import FlyingCartAnimation from '@/components/storefront/FlyingCartAnimation';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <CartDrawer />
      <FlyingCartAnimation />
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="min-h-screen bg-[#f5f5f3] pt-0"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  );
}

