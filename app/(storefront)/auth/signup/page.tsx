'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { UserPlus, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, signInWithGoogle } = useAuth();
  const { addToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signUp(email, password, fullName);
    setIsLoading(false);

    if (error) {
      addToast({
        type: 'error',
        title: 'Sign Up Failed',
        message: error.message || 'Verification could not be created.',
      });
    } else {
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/account');
      }, 2500);
    }
  };

  if (showSuccess) {
    return (
      <div className="container-main py-[96px] max-w-[440px] mx-auto flex flex-col items-center justify-center min-h-[50vh]">
        <motion.div 
          initial={{ scale: 0, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="text-[#4ade80] mb-[24px]"
        >
          <CheckCircle size={80} strokeWidth={1.5} />
        </motion.div>
        <motion.h2 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="text-[32px] font-serif font-semibold text-center mb-[8px]"
        >
          Account Created!
        </motion.h2>
        <motion.p 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.3 }}
          className="text-[15px] text-foreground-secondary text-center"
        >
          Welcome to StyleHub. Redirecting to your account dashboard...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="container-main py-[96px] max-w-[440px] mx-auto space-y-[32px]">
      <div className="text-center space-y-[8px]">
        <h1 className="text-[32px] font-serif font-semibold">Create Account</h1>
        <p className="text-[14px] text-foreground-secondary">
          Join StyleHub today for easy ordering and tracking.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-[20px]">
        <div className="space-y-[6px]">
          <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
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
            required
            placeholder="name@example.com"
            className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
          />
        </div>

        <div className="space-y-[6px]">
          <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
          />
        </div>

        <Button type="submit" fullWidth size="lg" shimmer isLoading={isLoading} className="gap-[8px]">
          <UserPlus size={16} />
          Sign Up
        </Button>
      </form>

      <div className="relative flex py-[8px] items-center">
        <div className="flex-grow border-t border-border-strong"></div>
        <span className="flex-shrink mx-[16px] text-foreground-secondary text-[13px]">or continue with</span>
        <div className="flex-grow border-t border-border-strong"></div>
      </div>

      <Button variant="outline" fullWidth size="lg" onClick={signInWithGoogle}>
        Google OAuth
      </Button>

      <p className="text-center text-[14px] text-foreground-secondary">
        Already have an account?{' '}
        <Link href="/auth/signin" className="text-accent hover:underline font-medium">Sign In</Link>
      </p>
    </div>
  );
}
