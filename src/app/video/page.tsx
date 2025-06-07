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
  // Runway Models
  {
    id: 'runway-gen4',
    name: 'Runway Gen-4',
    displayName: 'Runway Gen-4',
    description: 'Latest generation Runway model with breakthrough video quality and extended duration.',
    logo: '🚀',
    rating: 4.9,
    pricing: { basePrice: 0.25, currency: 'USD', unit: 'second' },
    features: ['Ultra-high quality', 'Extended duration', 'Advanced motion', 'Professional tools'],
    category: 'Professional',
    speed: 'slow',
    quality: 'high',
    maxDuration: 10,
    resolutions: ['1080p', '4K'],
    badge: 'Latest Model',
    isPopular: true
  },
  {
    id: 'runway-gen4-turbo',
    name: 'Runway Gen-4 Turbo',
    displayName: 'Runway Gen-4 Turbo',
    description: 'Optimized version of Gen-4 for faster generation with maintained quality.',
    logo: '⚡',
    rating: 4.8,
    pricing: { basePrice: 0.18, currency: 'USD', unit: 'second' },
    features: ['Fast generation', 'High quality', 'Motion control', 'Efficient processing'],
    category: 'Professional',
    speed: 'medium',
    quality: 'high',
    maxDuration: 8,
    resolutions: ['720p', '1080p', '4K'],
    badge: 'Speed Optimized'
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
    resolutions: ['720p', '1080p']
  },
  
  // Google Imagen Video Models
  {
    id: 'google-imagen-video-gen3',
    name: 'Google Imagen Video',
    displayName: 'Imagen Video Gen-3',
    description: 'Google\'s latest video generation model with exceptional realism and temporal consistency.',
    logo: '🔍',
    rating: 4.8,
    pricing: { basePrice: 0.20, currency: 'USD', unit: 'second' },
    features: ['Photorealistic', 'Temporal consistency', 'Text-to-video', 'High fidelity'],
    category: 'Realistic',
    speed: 'medium',
    quality: 'high',
    maxDuration: 8,
    resolutions: ['1080p', '4K'],
    badge: 'Google AI'
  },
  {
    id: 'google-imagen-video-gen2',
    name: 'Google Imagen Video',
    displayName: 'Imagen Video Gen-2',
    description: 'Previous generation Google video model, reliable and cost-effective.',
    logo: '🔍',
    rating: 4.5,
    pricing: { basePrice: 0.12, currency: 'USD', unit: 'second' },
    features: ['Reliable quality', 'Good motion', 'Text understanding', 'Cost effective'],
    category: 'General Purpose',
    speed: 'medium',
    quality: 'high',
    maxDuration: 6,
    resolutions: ['720p', '1080p']
  },

  // Hunyuan Video Models
  {
    id: 'hunyuan-video-pro',
    name: 'Hunyuan Video',
    displayName: 'Hunyuan Video Pro',
    description: 'Tencent\'s advanced video generation model with superior Chinese text understanding.',
    logo: '🐉',
    rating: 4.7,
    pricing: { basePrice: 0.14, currency: 'USD', unit: 'second' },
    features: ['Multilingual', 'Chinese text support', 'Cultural accuracy', 'High quality'],
    category: 'Multilingual',
    speed: 'medium',
    quality: 'high',
    maxDuration: 8,
    resolutions: ['720p', '1080p', '4K'],
    badge: 'Multilingual'
  },
  {
    id: 'hunyuan-video-lite',
    name: 'Hunyuan Video',
    displayName: 'Hunyuan Video Lite',
    description: 'Lightweight version optimized for speed and efficiency.',
    logo: '🐲',
    rating: 4.4,
    pricing: { basePrice: 0.08, currency: 'USD', unit: 'second' },
    features: ['Fast generation', 'Efficient', 'Good quality', 'Multilingual support'],
    category: 'Fast',
    speed: 'fast',
    quality: 'medium',
    maxDuration: 5,
    resolutions: ['720p', '1080p']
  },

  // Wan2.1 Models
  {
    id: 'wan21-720p',
    name: 'Wan2.1',
    displayName: 'Wan2.1 (720p)',
    description: 'High-quality video generation optimized for 720p resolution with excellent detail.',
    logo: '🌊',
    rating: 4.6,
    pricing: { basePrice: 0.10, currency: 'USD', unit: 'second' },
    features: ['720p optimized', 'High detail', 'Smooth motion', 'Artistic styles'],
    category: 'Artistic',
    speed: 'medium',
    quality: 'high',
    maxDuration: 6,
    resolutions: ['720p'],
    badge: '720p Specialist'
  },
  {
    id: 'wan21-480p',
    name: 'Wan2.1',
    displayName: 'Wan2.1 (480p)',
    description: 'Fast and efficient video generation for 480p content with artistic flair.',
    logo: '🌊',
    rating: 4.3,
    pricing: { basePrice: 0.06, currency: 'USD', unit: 'second' },
    features: ['480p optimized', 'Fast generation', 'Artistic quality', 'Cost effective'],
    category: 'Fast',
    speed: 'fast',
    quality: 'medium',
    maxDuration: 8,
    resolutions: ['480p'],
    badge: 'Budget Friendly'
  },

  // Existing and Updated Models
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
    id: 'kling-ai-v15',
    name: 'Kling AI',
    displayName: 'Kling AI v1.5',
    description: 'Updated Kling AI with improved realism and extended duration capabilities.',
    logo: '🎯',
    rating: 4.7,
    pricing: { basePrice: 0.10, currency: 'USD', unit: 'second' },
    features: ['Realistic motion', 'Long duration', 'Multiple aspects', 'Style transfer'],
    category: 'Realistic',
    speed: 'medium',
    quality: 'high',
    maxDuration: 12,
    resolutions: ['720p', '1080p', '4K'],
    badge: 'Best Quality'
  },
  {
    id: 'pika-labs-v2',
    name: 'Pika Labs',
    displayName: 'Pika 2.0',
    description: 'Enhanced version with improved creative control and animation capabilities.',
    logo: '🎨',
    rating: 4.6,
    pricing: { basePrice: 0.09, currency: 'USD', unit: 'second' },
    features: ['Enhanced creativity', 'Better animation', 'Style consistency', 'Creative control'],
    category: 'Creative',
    speed: 'fast',
    quality: 'high',
    maxDuration: 5,
    resolutions: ['720p', '1080p', '4K'],
    badge: 'Creative Pro'
  },
  {
    id: 'luma-dream-machine-v2',
    name: 'Luma Dream Machine',
    displayName: 'Luma Dream Machine v2',
    description: 'Enhanced version with improved quality and extended capabilities.',
    logo: '💫',
    rating: 4.5,
    pricing: { basePrice: 0.07, currency: 'USD', unit: 'second' },
    features: ['Improved quality', 'Fast generation', 'Text prompts', 'Image animation'],
    category: 'Fast',
    speed: 'fast',
    quality: 'high',
    maxDuration: 7,
    resolutions: ['720p', '1080p', '4K']
  },

  // Additional Providers from Replicate, PiAPI, Segmind
  {
    id: 'zeroscope-v2',
    name: 'Zeroscope',
    displayName: 'Zeroscope v2',
    description: 'Open-source video generation model with good quality and customization options.',
    logo: '🔬',
    rating: 4.2,
    pricing: { basePrice: 0.05, currency: 'USD', unit: 'second' },
    features: ['Open source', 'Customizable', 'Good quality', 'Research friendly'],
    category: 'Open Source',
    speed: 'medium',
    quality: 'medium',
    maxDuration: 4,
    resolutions: ['576p', '720p']
  },
  {
    id: 'stable-video-xl',
    name: 'Stable Video Diffusion',
    displayName: 'Stable Video XL',
    description: 'Enhanced open-source video generation with higher resolution and better quality.',
    logo: '⚡',
    rating: 4.4,
    pricing: { basePrice: 0.06, currency: 'USD', unit: 'second' },
    features: ['Open source', 'High resolution', 'ControlNet', 'Fine-tuning'],
    category: 'Open Source',
    speed: 'medium',
    quality: 'high',
    maxDuration: 6,
    resolutions: ['720p', '1080p']
  },
  {
    id: 'animatediff',
    name: 'AnimateDiff',
    displayName: 'AnimateDiff',
    description: 'Animation-focused model for creating smooth video transitions and motion.',
    logo: '🎭',
    rating: 4.3,
    pricing: { basePrice: 0.04, currency: 'USD', unit: 'second' },
    features: ['Animation focused', 'Smooth transitions', 'Motion control', 'Style transfer'],
    category: 'Animation',
    speed: 'fast',
    quality: 'medium',
    maxDuration: 3,
    resolutions: ['512p', '720p']
  },
  {
    id: 'morph-studio',
    name: 'Morph Studio',
    displayName: 'Morph Studio',
    description: 'Specialized video morphing and transformation effects.',
    logo: '🔄',
    rating: 4.1,
    pricing: { basePrice: 0.08, currency: 'USD', unit: 'second' },
    features: ['Video morphing', 'Transformation', 'Effects', 'Creative tools'],
    category: 'Effects',
    speed: 'medium',
    quality: 'medium',
    maxDuration: 4,
    resolutions: ['720p', '1080p']
  },
  {
    id: 'gen2-stability',
    name: 'Gen-2 Stability',
    displayName: 'Gen-2 (Stability AI)',
    description: 'Stability AI\'s video generation model with consistent quality.',
    logo: '⚖️',
    rating: 4.2,
    pricing: { basePrice: 0.07, currency: 'USD', unit: 'second' },
    features: ['Consistent quality', 'Stable results', 'Good motion', 'Reliable'],
    category: 'Stable',
    speed: 'medium',
    quality: 'medium',
    maxDuration: 4,
    resolutions: ['720p', '1080p']
  },
  {
    id: 'cogvideo',
    name: 'CogVideo',
    displayName: 'CogVideo',
    description: 'Open-source large-scale text-to-video generation model.',
    logo: '🧠',
    rating: 4.0,
    pricing: { basePrice: 0.03, currency: 'USD', unit: 'second' },
    features: ['Open source', 'Large scale', 'Text-to-video', 'Research grade'],
    category: 'Research',
    speed: 'slow',
    quality: 'medium',
    maxDuration: 5,
    resolutions: ['480p', '720p']
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
            <div className="text-2xl font-bold text-green-600">$0.03</div>
            <div className="text-sm text-gray-600">Starting Price</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">4.5</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">12s</div>
            <div className="text-sm text-gray-600">Max Duration</div>
          </Card>
        </motion.div>
      </MainLayout>
    </div>
  );
};

export default VideoPage;