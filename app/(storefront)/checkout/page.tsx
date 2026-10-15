'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { Check, ChevronRight, CreditCard, MapPin, ShieldCheck, ShoppingBag } from 'lucide-react';

// Steps definition
const STEPS = ['Shipping', 'Payment', 'Review'];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(0);

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container-main py-[120px] text-center max-w-[480px]">
        <ShoppingBag size={48} className="mx-auto text-foreground-secondary mb-[16px]" />
        <h1 className="text-section font-serif mb-[8px]">Nothing to checkout</h1>
        <Button onClick={() => router.push('/products')}>Back to Shop</Button>
      </div>
    );
  }

  const handleNextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate API calls for order creation & Razorpay payment window
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      router.push('/order-confirmation?orderId=ORD-10492');
    }, 2000);
  };

  return (
    <div className="container-main py-[64px]">
      <h1 className="text-section font-serif mb-[32px] text-center">Secure Checkout</h1>

      {/* Multi-step Progress Bar */}
      <div className="max-w-[640px] mx-auto mb-[48px] flex items-center justify-between relative">
        <div className="absolute top-[20px] left-[10%] right-[10%] h-[2px] bg-border-strong -z-10" />
        <div
          className="absolute top-[20px] left-[10%] h-[2px] bg-accent -z-10 transition-all duration-300"
          style={{ width: `${(currentStep / (STEPS.length - 1)) * 80}%` }}
        />

        {STEPS.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;
          return (
            <div key={step} className="flex flex-col items-center gap-[8px] flex-1">
              <div
                className={`w-[40px] h-[40px] rounded-full flex items-center justify-center border-2 text-[14px] font-semibold transition-colors ${
                  isCompleted
                    ? 'border-accent bg-accent text-white'
                    : isActive
                    ? 'border-accent bg-white text-accent'
                    : 'border-border-strong bg-white text-foreground-secondary'
                }`}
              >
                {isCompleted ? <Check size={18} /> : idx + 1}
              </div>
              <span
                className={`text-[12px] font-medium tracking-wider uppercase ${
                  isActive ? 'text-foreground' : 'text-foreground-secondary'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[64px] items-start max-w-[1200px] mx-auto">
        {/* Main interactive Column */}
        <div className="lg:col-span-2 space-y-[32px]">
          <AnimatePresence mode="wait">
            {/* STEP 1: Shipping Details */}
            {currentStep === 0 && (
              <motion.div
                key="step-shipping"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-[24px]"
              >
                <h2 className="text-[20px] font-semibold text-foreground flex items-center gap-[8px]">
                  <MapPin size={20} /> Shipping Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                  {/* Since components/ui/Input is custom, let's write simple input fields directly for speed and correctness */}
                  <div className="space-y-[6px]">
                    <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Sameer Kumar"
                      className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-[6px]">
                    <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sameer@gmail.com"
                      className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-[6px] sm:col-span-2">
                    <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-[6px] sm:col-span-2">
                    <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Address Line 1</label>
                    <input
                      type="text"
                      value={addressLine1}
                      onChange={(e) => setAddressLine1(e.target.value)}
                      placeholder="Apartment, Street Name"
                      className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-[6px] sm:col-span-2">
                    <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      value={addressLine2}
                      onChange={(e) => setAddressLine2(e.target.value)}
                      placeholder="Landmark, Area"
                      className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-[6px]">
                    <label className="text-[12px] font-semibold text-foreground-secondary uppercase">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Mumbai"
                      className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-[6px]">
                    <label className="text-[12px] font-semibold text-foreground-secondary uppercase">State</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Maharashtra"
                      className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
                    />
                  </div>
                  <div className="space-y-[6px]">
                    <label className="text-[12px] font-semibold text-foreground-secondary uppercase">ZIP / Postal Code</label>
                    <input
                      type="text"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="400001"
                      className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-[16px]">
                  <Button
                    size="sm"
                    onClick={handleNextStep}
                    disabled={!fullName || !email || !addressLine1 || !city || !state || !zip}
                  >
                    Continue to Payment
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 2: Payment Integration Selection */}
            {currentStep === 1 && (
              <motion.div
                key="step-payment"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-[24px]"
              >
                <h2 className="text-[20px] font-semibold text-foreground flex items-center gap-[8px]">
                  <CreditCard size={20} /> Payment Option
                </h2>

                <div className="border border-border rounded-[12px] p-[24px] space-y-[16px] bg-background-secondary">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">Razorpay Secure Checkout</span>
                    <ShieldCheck size={24} className="text-success" />
                  </div>
                  <p className="text-[14px] text-foreground-secondary">
                    Pay securely using UPI, NetBanking, Credit/Debit cards, or popular wallets via Razorpay.
                  </p>
                  <div className="border border-dashed border-border-strong rounded-[8px] p-[32px] text-center text-foreground-secondary text-[14px] bg-white">
                    Razorpay Elements will be initialized here.
                  </div>
                </div>

                <div className="flex justify-between pt-[16px]">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Back
                  </Button>
                  <Button size="sm" onClick={handleNextStep}>
                    Continue to Review
                  </Button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Order Review */}
            {currentStep === 2 && (
              <motion.div
                key="step-review"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="space-y-[24px]"
              >
                <h2 className="text-[20px] font-semibold text-foreground">Review Order Details</h2>

                <div className="border border-border rounded-[12px] p-[24px] space-y-[16px] text-[14px]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                    <div>
                      <h4 className="font-semibold text-foreground uppercase tracking-wider text-[11px] text-foreground-secondary">
                        Shipping Address
                      </h4>
                      <p className="mt-[4px] font-medium">{fullName}</p>
                      <p className="text-foreground-secondary">
                        {addressLine1}, {addressLine2 ? `${addressLine2}, ` : ''}
                        {city}, {state} - {zip}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground uppercase tracking-wider text-[11px] text-foreground-secondary">
                        Contact Info
                      </h4>
                      <p className="mt-[4px] font-medium">{email}</p>
                      <p className="text-foreground-secondary">{phone}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-[16px]">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Back
                  </Button>
                  <Button size="sm" shimmer isLoading={isProcessing} onClick={handlePlaceOrder}>
                    Pay & Place Order
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Order Summary Column */}
        <div className="bg-background-secondary rounded-[12px] p-[32px] space-y-[24px]">
          <h3 className="text-[18px] font-semibold text-foreground">Cart Items Summary</h3>
          <div className="divide-y divide-border-strong max-h-[300px] overflow-y-auto pr-[8px]">
            {items.map((item) => (
              <div key={item.id} className="flex gap-[12px] py-[12px] first:pt-0 last:pb-0">
                <div className="w-[48px] h-[60px] bg-white rounded border border-border flex-shrink-0 relative overflow-hidden">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[13px] font-medium text-foreground truncate">{item.title}</h4>
                  <p className="text-[12px] text-foreground-secondary mt-[2px]">Qty: {item.quantity}</p>
                </div>
                <span className="text-[13px] font-semibold text-foreground">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <hr className="border-border-strong" />

          <div className="space-y-[12px] text-[14px]">
            <div className="flex justify-between text-foreground-secondary">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-foreground-secondary">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr className="border-border-strong" />
            <div className="flex justify-between text-[16px] font-bold text-foreground">
              <span>Total Amount</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
