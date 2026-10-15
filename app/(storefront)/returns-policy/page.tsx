'use client';

export default function ReturnsPolicyPage() {
  return (
    <div className="container-main py-[64px] max-w-[800px] mx-auto space-y-[32px]">
      <h1 className="text-section font-serif">Returns & Exchanges Policy</h1>
      <div className="space-y-[20px] text-[15px] text-foreground-secondary leading-relaxed">
        <p>Last updated: August 30, 2026</p>
        <p>
          If you are not entirely satisfied with your purchase, we are here to help. Our products can be returned 
          within 30 days of the original delivery date.
        </p>
        <h2 className="text-[20px] font-serif font-semibold text-foreground pt-[12px]">Conditions for Return</h2>
        <p>
          To be eligible for a return, please ensure that the product was delivered in the last 30 days, is in its 
          original packaging, has all original labels and tags attached, and shows no signs of wear, washing, or damage.
        </p>
        <h2 className="text-[20px] font-serif font-semibold text-foreground pt-[12px]">Exchanges & Refunds</h2>
        <p>
          Once we receive and inspect your returned item, we will process your refund back to the original payment method 
          within 5-7 business days. Alternatively, you can opt for store credit/exchanges.
        </p>
      </div>
    </div>
  );
}
