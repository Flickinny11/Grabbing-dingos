'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import CategorySidebar from '@/components/layout/CategorySidebar';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Box, 
  Star, 
  Play, 
  Settings, 
  Sparkles,
  Search,
  Zap,
  Clock,
  DollarSign
} from 'lucide-react';

interface ThreeDProvider {
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
  badge?: string;
  isPopular?: boolean;
}

const threeDProviders: ThreeDProvider[] = [
  // Leading 3D Generation Models
  {
    id: 'meshy-v4',
    name: 'Meshy',
    displayName: 'Meshy v4',
    description: 'Latest text-to-3D and image-to-3D model generation with enhanced quality.',
    logo: '🎭',
    rating: 4.8,
    pricing: { basePrice: 0.60, currency: 'USD', unit: 'model' },
    features: ['Text-to-3D', 'Image-to-3D', 'High quality', 'Fast generation', 'PBR materials'],
    category: 'General 3D',
    speed: 'medium',
    quality: 'high',
    badge: 'Most Popular',
    isPopular: true
  },
  {
    id: 'luma-ai-genie',
    name: 'Luma AI',
    displayName: 'Luma Genie',
    description: 'Advanced 3D capture and generation with photorealistic quality and instant processing.',
    logo: '📐',
    rating: 4.7,
    pricing: { basePrice: 0.80, currency: 'USD', unit: 'model' },
    features: ['Photogrammetry', 'NeRF capture', 'Real-time', 'Mobile app', 'Instant processing'],
    category: 'Photorealistic',
    speed: 'fast',
    quality: 'high',
    badge: 'Best Quality',
    isPopular: true
  },
  {
    id: 'csm-v3',
    name: 'CSM',
    displayName: 'CSM v3',
    description: 'Enhanced Common Sense Machines for advanced 3D understanding and generation.',
    logo: '🔮',
    rating: 4.5,
    pricing: { basePrice: 0.40, currency: 'USD', unit: 'model' },
    features: ['Multi-view synthesis', 'Geometric accuracy', 'Texture mapping', 'Animation ready'],
    category: 'Multi-View',
    speed: 'medium',
    quality: 'high'
  },

  // AI-Powered 3D Platforms
  {
    id: 'spline-ai',
    name: 'Spline AI',
    displayName: 'Spline AI',
    description: 'AI-powered 3D design tool for creating interactive 3D scenes and objects.',
    logo: '🌐',
    rating: 4.6,
    pricing: { basePrice: 0.35, currency: 'USD', unit: 'scene' },
    features: ['Interactive 3D', 'Scene creation', 'Web-ready', 'Real-time collaboration'],
    category: 'Interactive',
    speed: 'fast',
    quality: 'high'
  },
  {
    id: 'kaedim-v2',
    name: 'Kaedim',
    displayName: 'Kaedim v2',
    description: 'Enhanced 2D to 3D conversion platform with improved automation.',
    logo: '🎨',
    rating: 4.4,
    pricing: { basePrice: 0.45, currency: 'USD', unit: 'model' },
    features: ['2D to 3D', 'Automated workflow', 'Game-ready assets', 'Quality guarantee'],
    category: '2D to 3D',
    speed: 'medium',
    quality: 'high'
  },
  {
    id: 'masterpiece-x',
    name: 'Masterpiece X',
    displayName: 'Masterpiece X',
    description: 'Generative 3D platform for creating game-ready assets with AI.',
    logo: '🏆',
    rating: 4.3,
    pricing: { basePrice: 0.50, currency: 'USD', unit: 'asset' },
    features: ['Game-ready assets', 'Generative AI', 'Asset optimization', 'Export options'],
    category: 'Game Assets',
    speed: 'medium',
    quality: 'high'
  },

  // Specialized 3D Tools
  {
    id: 'alpha3d',
    name: 'Alpha3D',
    displayName: 'Alpha3D',
    description: 'AI platform for converting 2D images to 3D models for AR/VR applications.',
    logo: '🔺',
    rating: 4.2,
    pricing: { basePrice: 0.30, currency: 'USD', unit: 'model' },
    features: ['AR/VR ready', '2D to 3D', 'Batch processing', 'Mobile optimization'],
    category: 'AR/VR',
    speed: 'fast',
    quality: 'medium'
  },
  {
    id: 'polycam-ai',
    name: 'Polycam',
    displayName: 'Polycam AI',
    description: '3D scanning and AI enhancement for mobile and professional use.',
    logo: '📱',
    rating: 4.4,
    pricing: { basePrice: 0.25, currency: 'USD', unit: 'scan' },
    features: ['Mobile scanning', 'AI enhancement', 'Cloud processing', 'Easy sharing'],
    category: '3D Scanning',
    speed: 'fast',
    quality: 'medium'
  },
  {
    id: 'nvidia-get3d',
    name: 'NVIDIA GET3D',
    displayName: 'NVIDIA GET3D',
    description: 'NVIDIA\'s generative 3D model for creating diverse 3D shapes and textures.',
    logo: '🟢',
    rating: 4.6,
    pricing: { basePrice: 0.55, currency: 'USD', unit: 'model' },
    features: ['Diverse shapes', 'High-quality textures', 'Research-grade', 'Customizable'],
    category: 'Research',
    speed: 'slow',
    quality: 'high'
  },

  // Open Source & Community Models
  {
    id: 'shap-e',
    name: 'Shap-E',
    displayName: 'OpenAI Shap-E',
    description: 'OpenAI\'s 3D generation model for creating diverse 3D objects from text.',
    logo: '🔮',
    rating: 4.1,
    pricing: { basePrice: 0.20, currency: 'USD', unit: 'model' },
    features: ['Text-to-3D', 'Diverse objects', 'Open source', 'Research friendly'],
    category: 'Open Source',
    speed: 'medium',
    quality: 'medium'
  },
  {
    id: 'point-e',
    name: 'Point-E',
    displayName: 'OpenAI Point-E',
    description: 'Point cloud generation model for fast 3D object creation.',
    logo: '📍',
    rating: 4.0,
    pricing: { basePrice: 0.15, currency: 'USD', unit: 'model' },
    features: ['Point clouds', 'Fast generation', 'Text prompts', 'Lightweight'],
    category: 'Point Cloud',
    speed: 'fast',
    quality: 'medium'
  },
  {
    id: 'dreamfusion',
    name: 'DreamFusion',
    displayName: 'DreamFusion',
    description: 'Text-to-3D using 2D diffusion models for high-quality results.',
    logo: '💭',
    rating: 4.3,
    pricing: { basePrice: 0.45, currency: 'USD', unit: 'model' },
    features: ['Text-to-3D', '2D diffusion based', 'High quality', 'Research proven'],
    category: 'Research',
    speed: 'slow',
    quality: 'high'
  },

  // Avatar and Character Generation
  {
    id: 'ready-player-me',
    name: 'Ready Player Me',
    displayName: 'Ready Player Me',
    description: 'AI-powered avatar creation platform for games and virtual worlds.',
    logo: '👤',
    rating: 4.5,
    pricing: { basePrice: 0.30, currency: 'USD', unit: 'avatar' },
    features: ['Avatar creation', 'Game integration', 'Customizable', 'Cross-platform'],
    category: 'Avatars',
    speed: 'fast',
    quality: 'high'
  },
  {
    id: 'meshcapade',
    name: 'Meshcapade',
    displayName: 'Meshcapade',
    description: 'AI-driven human body modeling and animation platform.',
    logo: '🏃',
    rating: 4.2,
    pricing: { basePrice: 0.60, currency: 'USD', unit: 'model' },
    features: ['Human modeling', 'Body animation', 'Realistic movement', 'Professional tools'],
    category: 'Human Models',
    speed: 'medium',
    quality: 'high'
  },

  // Interior and Architecture
  {
    id: 'planner5d-ai',
    name: 'Planner 5D',
    displayName: 'Planner 5D AI',
    description: 'AI-enhanced interior design and architectural 3D modeling.',
    logo: '🏠',
    rating: 4.3,
    pricing: { basePrice: 0.40, currency: 'USD', unit: 'room' },
    features: ['Interior design', 'Architectural modeling', 'Furniture placement', 'Realistic rendering'],
    category: 'Architecture',
    speed: 'medium',
    quality: 'high'
  },
  {
    id: 'roomgpt-3d',
    name: 'RoomGPT 3D',
    displayName: 'RoomGPT 3D',
    description: 'AI room design with automatic 3D visualization and furniture arrangement.',
    logo: '🛋️',
    rating: 4.1,
    pricing: { basePrice: 0.25, currency: 'USD', unit: 'design' },
    features: ['Room design', 'Auto furniture', '3D visualization', 'Style matching'],
    category: 'Interior Design',
    speed: 'fast',
    quality: 'medium'
  },

  // Product and Asset Generation
  {
    id: 'hexagon-ai',
    name: 'Hexagon AI',
    displayName: 'Hexagon 3D AI',
    description: 'Industrial-grade 3D modeling AI for manufacturing and design.',
    logo: '⬡',
    rating: 4.4,
    pricing: { basePrice: 0.70, currency: 'USD', unit: 'model' },
    features: ['Industrial grade', 'Manufacturing focus', 'Precision modeling', 'CAD integration'],
    category: 'Industrial',
    speed: 'slow',
    quality: 'high'
  },
  {
    id: 'echo3d-ai',
    name: 'Echo3D',
    displayName: 'Echo3D AI',
    description: 'Cloud-based 3D content management with AI optimization.',
    logo: '☁️',
    rating: 4.2,
    pricing: { basePrice: 0.35, currency: 'USD', unit: 'asset' },
    features: ['Cloud management', 'AI optimization', 'Asset delivery', 'Performance tuning'],
    category: 'Cloud 3D',
    speed: 'fast',
    quality: 'medium'
  },

  // Experimental and Cutting-edge
  {
    id: 'nerf-studio',
    name: 'NeRF Studio',
    displayName: 'NeRF Studio',
    description: 'Neural Radiance Fields for photorealistic 3D scene reconstruction.',
    logo: '🧠',
    rating: 4.6,
    pricing: { basePrice: 0.50, currency: 'USD', unit: 'scene' },
    features: ['Neural rendering', 'Photorealistic', 'Scene reconstruction', 'Research tools'],
    category: 'Neural Rendering',
    speed: 'slow',
    quality: 'high',
    badge: 'Cutting Edge'
  },
  {
    id: 'gaussian-splatting',
    name: 'Gaussian Splatting',
    displayName: '3D Gaussian Splatting',
    description: 'Real-time radiance field rendering with exceptional quality.',
    logo: '💎',
    rating: 4.7,
    pricing: { basePrice: 0.45, currency: 'USD', unit: 'scene' },
    features: ['Real-time rendering', 'High quality', 'Efficient', 'Interactive'],
    category: 'Real-time Rendering',
    speed: 'fast',
    quality: 'high',
    badge: 'Real-time'
  }
];

const ThreeDPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filterOptions = [
    { id: 'all', name: 'All Providers' },
    { id: 'popular', name: 'Most Popular' },
    { id: 'game-assets', name: 'Game Assets' },
    { id: 'avatars', name: 'Avatars' },
    { id: 'architecture', name: 'Architecture' }
  ];

  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'quality', name: 'Best Quality' },
    { id: 'speed', name: 'Fastest' }
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
            <div className="w-12 h-12 bg-gradient-to-br from-coral-pink to-iridescent-purple rounded-xl flex items-center justify-center">
              <Box className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">3D Generation</h1>
              <p className="text-gray-600">Create 3D models and scenes with AI technology</p>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search 3D generators..."
                className="w-full pl-10 pr-4 py-3 glass rounded-xl border border-white/20 focus:ring-2 focus:ring-coral-pink focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <select
                className="glass rounded-xl border border-white/20 px-4 py-3 focus:ring-2 focus:ring-coral-pink"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                {filterOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
              
              <select
                className="glass rounded-xl border border-white/20 px-4 py-3 focus:ring-2 focus:ring-coral-pink"
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
          {threeDProviders.map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full relative overflow-hidden group" hover3d glowOnHover>
                {provider.badge && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-coral-pink to-iridescent-purple text-white px-3 py-1 rounded-full text-xs font-semibold">
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
                  
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{provider.category}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-semibold text-gray-700">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {provider.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
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
            <div className="text-2xl font-bold text-coral-pink">{threeDProviders.length}</div>
            <div className="text-sm text-gray-600">3D Providers</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">$0.15</div>
            <div className="text-sm text-gray-600">Starting Price</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">4.4</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">15</div>
            <div className="text-sm text-gray-600">Categories</div>
          </Card>
        </motion.div>
      </MainLayout>
    </div>
  );
};

export default ThreeDPage;