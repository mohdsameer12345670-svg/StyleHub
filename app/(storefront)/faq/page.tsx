'use client';

import Accordion from '@/components/ui/Accordion';

export default function FAQPage() {
  const faqItems = [
    {
      id: 'faq-1',
      title: 'What shipping methods do you offer?',
      content: 'We offer free standard shipping on all Indian orders. Standard shipping takes 3-5 business days. Express shipping options are available during checkout for faster delivery.'
    },
    {
      id: 'faq-2',
      title: 'What is your return policy?',
      content: 'We accept returns on all items within 30 days of delivery in their original, unused condition, with all packaging and tags intact. Returns can be initiated directly through your Account dashboard.'
    },
    {
      id: 'faq-3',
      title: 'How do I track my order?',
      content: 'Once your order ships, we will send you a tracking number and shipping link via email. You can also view shipping status updates under the Orders section of your Account page.'
    },
    {
      id: 'faq-4',
      title: 'Are your materials organic or sustainable?',
      content: 'Yes, we are committed to sustainable sourcing. Over 90% of our clothing utilizes certified organic cotton, recycled fibers, and eco-friendly dyes. Detailed fabric profiles are available under PDP specifications.'
    }
  ];

  return (
    <div className="container-main py-[64px] max-w-[800px] mx-auto space-y-[40px]">
      <div className="text-center space-y-[8px]">
        <h1 className="text-section font-serif">Frequently Asked Questions</h1>
        <p className="text-[15px] text-foreground-secondary">
          Find instant answers to common questions about shipping, returns, and products.
        </p>
      </div>

      <Accordion items={faqItems} className="border-t border-border" />
    </div>
  );
}
