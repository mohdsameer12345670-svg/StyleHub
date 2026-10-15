'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const { addToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      addToast({
        type: 'success',
        title: 'Message Sent',
        message: "We have received your message and will reply within 24 hours.",
      });
      setName('');
      setEmail('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="container-main py-[32px] sm:py-[64px] max-w-[1000px] mx-auto space-y-[32px] sm:space-y-[48px]">
      <div className="text-center space-y-[8px]">
        <h1 className="text-section font-serif">Contact Us</h1>
        <p className="text-[14px] sm:text-[15px] text-foreground-secondary">
          We would love to hear from you. Fill out the form or reach out directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[32px] md:gap-[64px] items-start">
        {/* Direct Contact Info */}
        <div className="space-y-[24px] sm:space-y-[32px]">
          <h2 className="text-[18px] sm:text-[20px] font-semibold">Get in Touch</h2>
          <p className="text-[14px] sm:text-[15px] text-foreground-secondary leading-relaxed">
            Have questions about our collections, sizing assistance, or return/exchange queries? 
            Our customer care team is here to assist.
          </p>

          <div className="space-y-[16px] sm:space-y-[20px]">
            <div className="flex gap-[16px] items-start">
              <Mail size={20} className="text-accent mt-[4px]" />
              <div>
                <h4 className="font-semibold text-[14px]">Email Support</h4>
                <p className="text-[14px] text-foreground-secondary mt-[2px]">support@StyleHub.com</p>
              </div>
            </div>
            <div className="flex gap-[16px] items-start">
              <Phone size={20} className="text-accent mt-[4px]" />
              <div>
                <h4 className="font-semibold text-[14px]">Call Support</h4>
                <p className="text-[14px] text-foreground-secondary mt-[2px]">+91 1800 123 4567</p>
              </div>
            </div>
            <div className="flex gap-[16px] items-start">
              <div>
                <h4 className="font-semibold text-[14px]">Corporate HQ</h4>
                <p className="text-[14px] text-foreground-secondary mt-[2px]">
              G-54, Near Hanuman mandir, Sector - 4, Dwarka, New Delhi, Delhi - 110075
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-[20px] bg-background-secondary p-[20px] sm:p-[32px] rounded-[12px]">
          <div className="space-y-[6px]">
            <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Sameer Kumar"
              className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent bg-white"
            />
          </div>

          <div className="space-y-[6px]">
            <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
              className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent bg-white"
            />
          </div>

          <div className="space-y-[6px]">
            <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Your Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Type your message here..."
              rows={4}
              className="w-full p-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent bg-white resize-none"
            />
          </div>

          <Button type="submit" fullWidth size="lg" shimmer isLoading={isSubmitting} className="gap-[8px] h-6">
            <Send size={16} />
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
