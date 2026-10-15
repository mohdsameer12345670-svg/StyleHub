'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { LogIn, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SignInPage() {
  const router = useRouter();
  const { signIn, signInWithGoogle } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await signIn(email, password);
    setIsLoading(false);

    if (error) {
      addToast({
        type: 'error',
        title: 'Sign In Failed',
        message: error.message || 'Please check your credentials.',
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
          Welcome Back!
        </motion.h2>
        <motion.p 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.3 }}
          className="text-[15px] text-foreground-secondary text-center"
        >
          Successfully signed in. Redirecting to your account...
        </motion.p>
      </div>
    );
  }

  return (
    <div className="container-main py-[96px] max-w-[440px] mx-auto space-y-[32px]">
      <div className="text-center space-y-[8px]">
        <h1 className="text-[32px] font-serif font-semibold">Sign In</h1>
        <p className="text-[14px] text-foreground-secondary">
          Enter your credentials to access your account dashboard.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-[20px]">
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
          <div className="flex justify-between items-center">
            <label className="text-[12px] font-semibold text-foreground-secondary uppercase">Password</label>
            <Link href="#" className="text-[12px] text-accent hover:underline">Forgot password?</Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full h-[48px] px-[16px] border border-border-strong rounded-[8px] outline-none focus:border-accent"
          />
        </div>

        <Button type="submit" fullWidth size="sm" shimmer isLoading={isLoading} className="gap-[8px]">
          <LogIn size={16} />
          Sign In
        </Button>
      </form>

      <div className="relative flex py-[8px] items-center">
        <div className="flex-grow border-t border-border-strong"></div>
        <span className="flex-shrink mx-[16px] text-foreground-secondary text-[13px]">or continue with</span>
        <div className="flex-grow border-t border-border-strong"></div>
      </div>

      <Button variant="outline" fullWidth size="sm" onClick={signInWithGoogle}>
        Google OAuth
      </Button>

      <p className="text-center text-[14px] text-foreground-secondary">
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="text-accent hover:underline font-medium">Sign Up</Link>
      </p>
    </div>
  );
}
