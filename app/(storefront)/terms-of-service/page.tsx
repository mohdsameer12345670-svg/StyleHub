'use client';

export default function TermsOfServicePage() {
  return (
    <div className="container-main py-[64px] max-w-[800px] mx-auto space-y-[32px]">
      <h1 className="text-section font-serif">Terms of Service</h1>
      <div className="space-y-[20px] text-[15px] text-foreground-secondary leading-relaxed">
        <p>Last updated: August 30, 2026</p>
        <p>
          Please read these Terms of Service carefully before using our e-commerce storefront operated by StyleHub.
        </p>
        <h2 className="text-[20px] font-serif font-semibold text-foreground pt-[12px]">Conditions of Use</h2>
        <p>
          By accessing and using this website, you certify that you have read and reviewed this Agreement and that you agree 
          to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to leave 
          the website accordingly. StyleHub only grants use and access of this website, its products, and its services to those 
          who have accepted its terms.
        </p>
        <h2 className="text-[20px] font-serif font-semibold text-foreground pt-[12px]">User Accounts</h2>
        <p>
          As a user of this website, you may be asked to register with us and provide private information. You are responsible 
          for ensuring the accuracy of this information, and you are responsible for maintaining the safety and security of 
          your identifying information and account login credentials.
        </p>
      </div>
    </div>
  );
}
