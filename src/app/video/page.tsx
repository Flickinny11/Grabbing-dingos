'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import CategorySidebar from '@/components/layout/CategorySidebar';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Search, 
  Star, 
  Zap, 
  DollarSign,
  Clock,
  Video,
  Play,
  Settings,
  Sparkles
} from 'lucide-react';

interface VideoProvider {
  id: string;
  name: string;
  displayName: string;
  description: string;
  logo: string;
  rating: number;
  pricing: {
    basePrice: number;
    currency: string;
    unit: string;
  };
  features: string[];
  category: string;
  speed: 'fast' | 'medium' | 'slow';
  quality: 'high' | 'medium' | 'low';
  maxDuration: number; // in seconds
  resolutions: string[];
  badge?: string;
  isPopular?: boolean;
}

const videoProviders: VideoProvider[] = [
  {
    id: 'minimax-video-01',
    name: 'Minimax Video-01',
    displayName: 'Minimax Video-01',
    description: 'Leading Chinese AI video generator with exceptional quality and prompt adherence.',
    logo: '🎬',
    rating: 4.8,
    pricing: { basePrice: 0.12, currency: 'USD', unit: 'second' },
    features: ['High resolution', 'Smooth motion', 'Text-to-video', 'Image-to-video'],
    category: 'General Purpose',
    speed: 'medium',
    quality: 'high',
    maxDuration: 6,
    resolutions: ['720p', '1080p'],
    badge: 'Most Popular',
    isPopular: true
  },
  {
    id: 'kling-ai',
    name: 'Kling AI',
    displayName: 'Kling AI',
    description: 'Advanced video AI from Kuaishou with impressive realism and motion quality.',
    logo: '🎯',
    rating: 4.7,
    pricing: { basePrice: 0.10, currency: 'USD', unit: 'second' },
    features: ['Realistic motion', 'Long duration', 'Multiple aspects', 'Style transfer'],
    category: 'Realistic',
    speed: 'medium',
    quality: 'high',
    maxDuration: 10,
    resolutions: ['720p', '1080p', '4K'],
    badge: 'Best Quality'
  },
  {
    id: 'runway-gen3',
    name: 'Runway Gen-3',
    displayName: 'Runway Gen-3 Alpha',
    description: 'Professional-grade video generation with fine-grained control and editing tools.',
    logo: '🛫',
    rating: 4.6,
    pricing: { basePrice: 0.15, currency: 'USD', unit: 'second' },
    features: ['Professional tools', 'Motion control', 'Inpainting', 'Camera control'],
    category: 'Professional',
    speed: 'slow',
    quality: 'high',
    maxDuration: 4,
    resolutions: ['720p', '1080p'],
    isPopular: true
  },
  {
    id: 'pika-labs',
    name: 'Pika Labs',
    displayName: 'Pika 1.0',
    description: 'Creative video AI with unique artistic styles and animation capabilities.',
    logo: '🎨',
    rating: 4.5,
    pricing: { basePrice: 0.08, currency: 'USD', unit: 'second' },
    features: ['Artistic styles', 'Animation', 'Style consistency', 'Creative control'],
    category: 'Creative',
    speed: 'fast',
    quality: 'medium',
    maxDuration: 3,
    resolutions: ['720p', '1080p'],
    badge: 'Best Value'
  },
  {
    id: 'luma-dream-machine',
    name: 'Luma Dream Machine',
    displayName: 'Luma Dream Machine',
    description: 'Fast and efficient video generation with good quality-to-speed ratio.',
    logo: '💫',
    rating: 4.4,
    pricing: { basePrice: 0.06, currency: 'USD', unit: 'second' },
    features: ['Fast generation', 'Good quality', 'Text prompts', 'Image animation'],
    category: 'Fast',
    speed: 'fast',
    quality: 'medium',
    maxDuration: 5,
    resolutions: ['720p', '1080p']
  },
  {
    id: 'stable-video',
    name: 'Stable Video Diffusion',
    displayName: 'Stable Video Diffusion',
    description: 'Open-source video generation with customization and fine-tuning options.',
    logo: '⚡',
    rating: 4.3,
    pricing: { basePrice: 0.04, currency: 'USD', unit: 'second' },
    features: ['Open source', 'Customizable', 'Fine-tuning', 'ControlNet'],
    category: 'Open Source',
    speed: 'medium',
    quality: 'medium',
    maxDuration: 4,
    resolutions: ['512p', '720p']
  }
];

const VideoPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filterOptions = [
    { id: 'all', name: 'All Providers' },
    { id: 'popular', name: 'Most Popular' },
    { id: 'fastest', name: 'Fastest' },
    { id: 'cheapest', name: 'Most Affordable' },
    { id: 'longest', name: 'Longest Duration' }
  ];

  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'duration', name: 'Max Duration' },
    { id: 'name', name: 'Name A-Z' }
  ];

  const getSpeedIcon = (speed: string) => {
    switch (speed) {
      case 'fast': return <Zap className="w-4 h-4 text-green-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'slow': return <Clock className="w-4 h-4 text-red-500" />;
    }
  };

  const getQualityBadge = (quality: string) => {
    const colors = {
      high: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 rounded-full text-xs font-medium ${colors[quality as keyof typeof colors]}`;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <CategorySidebar />
      <MainLayout>
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-iridescent-purple to-coral-pink rounded-xl flex items-center justify-center">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Video Generation</h1>
              <p className="text-gray-600">Create cinematic videos with AI-powered generators</p>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search video generators..."
                className="w-full pl-10 pr-4 py-3 glass rounded-xl border border-white/20 focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <select
                className="glass rounded-xl border border-white/20 px-4 py-3 focus:ring-2 focus:ring-electric-blue"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                {filterOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
              
              <select
                className="glass rounded-xl border border-white/20 px-4 py-3 focus:ring-2 focus:ring-electric-blue"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Provider Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {videoProviders.map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full relative overflow-hidden group" hover3d glowOnHover>
                {provider.badge && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-iridescent-purple to-coral-pink text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {provider.badge}
                  </div>
                )}

                <div className="flex items-start space-x-4 mb-4">
                  <div className="text-4xl">{provider.logo}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{provider.displayName}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{provider.rating}</span>
                      </div>
                      <span className={getQualityBadge(provider.quality)}>
                        {provider.quality} quality
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{provider.description}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-lg font-bold text-gray-900">
                        ${provider.pricing.basePrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-600">per {provider.pricing.unit}</span>
                    </div>
                    {getSpeedIcon(provider.speed)}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Max {provider.maxDuration}s</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Video className="w-4 h-4" />
                      <span>Up to {provider.resolutions[provider.resolutions.length - 1]}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-semibold text-gray-700">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {provider.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    className="flex-1"
                    icon={<Sparkles className="w-4 h-4" />}
                  >
                    Generate
                  </Button>
                  <Button
                    variant="glass"
                    icon={<Play className="w-4 h-4" />}
                  >
                    Preview
                  </Button>
                  <Button
                    variant="ghost"
                    icon={<Settings className="w-4 h-4" />}
                  >
                    Config
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-iridescent-purple">{videoProviders.length}</div>
            <div className="text-sm text-gray-600">Video Providers</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">$0.04</div>
            <div className="text-sm text-gray-600">Starting Price</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">4.5</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">10s</div>
            <div className="text-sm text-gray-600">Max Duration</div>
          </Card>
        </motion.div>
      </MainLayout>
    </div>
  );
};

export default VideoPage;