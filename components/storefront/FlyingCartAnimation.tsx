'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';

export default function FlyingCartAnimation() {
  const { flyingImage } = useCart();
  const [cartIconRect, setCartIconRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (flyingImage) {
      const cartIcon = document.getElementById('cart-icon');
      if (cartIcon) {
        setCartIconRect(cartIcon.getBoundingClientRect());
      }
    }
  }, [flyingImage]);

  return (
    <AnimatePresence>
      {flyingImage && cartIconRect && (
        <motion.div
          key="flying-image"
          initial={{
            position: 'fixed',
            top: flyingImage.rect.top,
            left: flyingImage.rect.left,
            width: flyingImage.rect.width,
            height: flyingImage.rect.height,
            opacity: 1,
            scale: 1,
            rotate: 0,
            zIndex: 200,
            borderRadius: 8,
            overflow: 'hidden',
          }}
          animate={{
            top: cartIconRect.top,
            left: cartIconRect.left,
            width: 30,
            height: 30,
            opacity: 0,
            scale: 0.2,
            rotate: 10,
          }}
          transition={{
            duration: 0.7,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="pointer-events-none"
        >
          <img
            src={flyingImage.src}
            alt=""
            className="w-full h-full object-cover rounded-[8px]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
