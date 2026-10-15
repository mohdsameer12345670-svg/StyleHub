'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import { CheckCircle2, ChevronRight, FileText, ShoppingBag } from 'lucide-react';
import { Suspense } from 'react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD-10001';

  return (
    <div className="container-main py-[96px] text-center max-w-[560px] mx-auto">
      {/* Draw SVGs animated check */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="w-[80px] h-[80px] rounded-full bg-success/15 flex items-center justify-center mx-auto mb-[32px] text-success"
      >
        <CheckCircle2 size={48} />
      </motion.div>

      <h1 className="text-hero md:text-[40px] font-serif font-semibold mb-[12px]">Order Confirmed</h1>
      <p className="text-[16px] text-foreground-secondary mb-[32px]">
        Thank you for your purchase. Your order number is <span className="font-semibold text-foreground">{orderId}</span>.
        We have emailed your invoice receipt and will notify you when it ships.
      </p>

      <div className="flex flex-col sm:flex-row gap-[16px] justify-center items-center">
        <Link href="/products">
          <Button variant="outline" size="sm" className="w-[200px]">
            <ShoppingBag size={16} className="mr-[8px]" />
            Continue Shopping
          </Button>
        </Link>
        <Link href="/account">
          <Button size="sm" className="w-[200px]">
            <FileText size={16} className="mr-[8px]" />
            Track Order
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="container-main py-[96px] text-center">
        <p className="text-foreground-secondary">Loading details...</p>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
