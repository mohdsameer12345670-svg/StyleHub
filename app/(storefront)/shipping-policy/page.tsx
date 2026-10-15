'use client';

export default function ShippingPolicyPage() {
  return (
    <div className="container-main py-[64px] max-w-[800px] mx-auto space-y-[32px]">
      <h1 className="text-section font-serif">Shipping & Delivery Policy</h1>
      <div className="space-y-[20px] text-[15px] text-foreground-secondary leading-relaxed">
        <p>Last updated: August 30, 2026</p>
        <p>
          We strive to deliver your orders as quickly and safely as possible. Below are the terms and conditions 
          that constitute our Shipping Policy.
        </p>
        <h2 className="text-[20px] font-serif font-semibold text-foreground pt-[12px]">Shipping Rates & Delivery Estimates</h2>
        <p>
          StyleHub offers free standard shipping on all orders placed within India. Deliveries take between 3-5 business days. 
          Orders are not processed, shipped, or delivered on national holidays.
        </p>
        <h2 className="text-[20px] font-serif font-semibold text-foreground pt-[12px]">Tracking Numbers</h2>
        <p>
          You will receive a shipment confirmation email containing your tracking carrier details and tracking code 
          within 24 hours of your order being handed over to our courier partner.
        </p>
      </div>
    </div>
  );
}
