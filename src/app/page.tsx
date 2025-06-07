'use client';

import Header from '@/components/layout/Header';
import CategorySidebar from '@/components/layout/CategorySidebar';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  Zap, 
  ArrowRight,
  Star,
  Users,
  Globe,
  Palette,
  Video,
  Headphones,
  Box,
  Type
} from 'lucide-react';

const featuredProviders = [
  {
    name: 'DALL-E 3',
    category: 'Image',
    logo: '🎨',
    description: 'OpenAI&apos;s most advanced image generation model',
    rating: 4.9,
    color: 'from-electric-blue to-neon-cyan',
    icon: Palette
  },
  {
    name: 'Minimax Video',
    category: 'Video', 
    logo: '🎬',
    description: 'High-quality video generation with multiple models',
    rating: 4.8,
    color: 'from-iridescent-purple to-coral-pink',
    icon: Video
  },
  {
    name: 'ElevenLabs',
    category: 'Audio',
    logo: '🎙️',
    description: 'Ultra-realistic voice synthesis and cloning',
    rating: 4.9,
    color: 'from-neon-green to-golden-yellow',
    icon: Headphones
  },
  {
    name: 'Meshy 3D',
    category: '3D',
    logo: '🎭',
    description: 'Text-to-3D and image-to-3D generation',
    rating: 4.7,
    color: 'from-coral-pink to-iridescent-purple',
    icon: Box
  },
  {
    name: 'GPT-4',
    category: 'Text',
    logo: '🧠',
    description: 'Most advanced language model for any task',
    rating: 4.9,
    color: 'from-golden-yellow to-electric-blue',
    icon: Type
  }
];

const stats = [
  { label: 'AI Services', value: '80+', icon: Sparkles },
  { label: 'Happy Users', value: '50K+', icon: Users },
  { label: 'Countries', value: '120+', icon: Globe },
  { label: 'Uptime', value: '99.9%', icon: TrendingUp }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <CategorySidebar />
      <MainLayout>
        {/* Hero Section */}
        <section className="relative mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              The Ultimate AI Platform
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Access 80+ premium AI services in one place. Generate stunning images, videos, audio, 3D models, and text with the world&apos;s most advanced AI providers.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button size="xl" variant="primary" icon={<Sparkles className="w-5 h-5" />}>
                Start Creating
              </Button>
              <Button size="xl" variant="glass" icon={<ArrowRight className="w-5 h-5" />} iconPosition="right">
                Explore Services
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center" glowOnHover>
                  <stat.icon className="w-8 h-8 text-electric-blue mx-auto mb-3" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Providers */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured AI Services</h2>
            <p className="text-lg text-gray-600">Handpicked premium providers for exceptional results</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProviders.map((provider, index) => (
              <motion.div
                key={provider.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full" hover3d glowOnHover>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${provider.color} flex items-center justify-center text-2xl shadow-lg`}>
                      {provider.logo}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900">{provider.name}</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{provider.category}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-golden-yellow fill-current" />
                          <span className="text-sm font-medium text-gray-700">{provider.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{provider.description}</p>
                  <Button variant="ghost" className="w-full" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                    Try Now
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card className="p-12 text-center bg-gradient-to-br from-electric-blue/5 to-neon-cyan/5" variant="gradient">
              <Zap className="w-16 h-16 text-electric-blue mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Create Something Amazing?</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Join thousands of creators using Hi-API to bring their ideas to life. Start with $5 and unlock unlimited possibilities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="primary" icon={<Sparkles className="w-5 h-5" />}>
                  Get Started - $5 Minimum
                </Button>
                <Button size="lg" variant="glass">
                  View Pricing
                </Button>
              </div>
            </Card>
          </motion.div>
        </section>
      </MainLayout>
    </div>
  );
}
