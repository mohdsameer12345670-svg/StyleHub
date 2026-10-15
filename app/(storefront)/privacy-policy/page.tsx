'use client';

export default function PrivacyPolicyPage() {
  return (
    <div className="container-main py-[64px] max-w-[800px] mx-auto space-y-[32px]">
      <h1 className="text-section font-serif">Privacy Policy</h1>
      <div className="space-y-[20px] text-[15px] text-foreground-secondary leading-relaxed">
        <p>Last updated: August 30, 2026</p>
        <p>
          At StyleHub, accessible from our online storefront, one of our main priorities is the privacy of our visitors. 
          This Privacy Policy document contains types of information that is collected and recorded by StyleHub and how we use it.
        </p>
        <h2 className="text-[20px] font-serif font-semibold text-foreground pt-[12px]">Information We Collect</h2>
        <p>
          We collect personal information that you provide to us, such as your name, shipping address, payment details (processed securely via Razorpay), 
          email address, and phone number when placing an order or registering for an account.
        </p>
        <h2 className="text-[20px] font-serif font-semibold text-foreground pt-[12px]">How We Use Your Information</h2>
        <p>
          We use the information we collect in various ways, including to provide, operate, and maintain our website, process and ship transactions, 
          manage your account dashboard, send transactional emails, and prevent fraud.
        </p>
      </div>
    </div>
  );
}
