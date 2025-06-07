'use client';

import { motion } from 'framer-motion';
import { signIn, getProviders } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Github, Chrome, ArrowRight, Sparkles } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
}

const SignInPage = () => {
  const [providers, setProviders] = useState<Record<string, Provider> | null>(null);

  useEffect(() => {
    const loadProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };
    loadProviders();
  }, []);

  const getProviderIcon = (providerId: string) => {
    switch (providerId) {
      case 'google':
        return <Chrome className="w-5 h-5" />;
      case 'github':
        return <Github className="w-5 h-5" />;
      default:
        return <ArrowRight className="w-5 h-5" />;
    }
  };

  const getProviderColor = (providerId: string) => {
    switch (providerId) {
      case 'google':
        return 'from-red-500 to-orange-500';
      case 'github':
        return 'from-gray-800 to-gray-900';
      default:
        return 'from-electric-blue to-neon-cyan';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-16 h-16 bg-gradient-to-br from-electric-blue to-neon-cyan rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold gradient-text mb-2"
          >
            Welcome to Hi-API
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600"
          >
            Sign in to access 80+ premium AI services
          </motion.p>
        </div>

        <Card className="p-8" glowOnHover>
          <div className="space-y-4">
            {providers ? (
              Object.values(providers).map((provider, index) => (
                <motion.div
                  key={provider.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Button
                    onClick={() => signIn(provider.id)}
                    variant="glass"
                    size="lg"
                    className="w-full justify-start relative overflow-hidden group"
                    icon={getProviderIcon(provider.id)}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${getProviderColor(provider.id)} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <span className="relative">Continue with {provider.name}</span>
                  </Button>
                </motion.div>
              ))
            ) : (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-12 bg-gray-200 rounded-lg"></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-8 pt-6 border-t border-gray-200 text-center"
          >
            <p className="text-sm text-gray-600">
              By signing in, you agree to our{' '}
              <a href="/terms" className="text-electric-blue hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-electric-blue hover:underline">
                Privacy Policy
              </a>
            </p>
          </motion.div>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-8 text-center"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Start with $5 Credit</h3>
          <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <div className="text-2xl">🎨</div>
              <div>Image Generation</div>
            </div>
            <div>
              <div className="text-2xl">🎬</div>
              <div>Video Creation</div>
            </div>
            <div>
              <div className="text-2xl">🎵</div>
              <div>Audio Synthesis</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignInPage;