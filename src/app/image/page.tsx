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
  Image as ImageIcon,
  Sparkles,
  Play,
  Settings
} from 'lucide-react';

interface ImageProvider {
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
  censorship: 'strict' | 'moderate' | 'permissive';
  styles: string[];
  sizes: string[];
  badge?: string;
  isPopular?: boolean;
  sampleImages: string[];
}

const imageProviders: ImageProvider[] = [
  // OpenAI Models
  {
    id: 'dalle3-hd',
    name: 'DALL-E 3',
    displayName: 'DALL-E 3 HD',
    description: 'OpenAI\'s most advanced image generation model with exceptional prompt understanding and detail.',
    logo: '🎨',
    rating: 4.9,
    pricing: { basePrice: 0.08, currency: 'USD', unit: 'image' },
    features: ['Ultra-high resolution', 'Natural language prompts', 'Style variations', 'Safety filtering'],
    category: 'General Purpose',
    speed: 'medium',
    quality: 'high',
    censorship: 'strict',
    styles: ['Photorealistic', 'Artistic', 'Digital Art', 'Oil Painting', '3D Render'],
    sizes: ['1024x1024', '1024x1792', '1792x1024'],
    badge: 'Most Popular',
    isPopular: true,
    sampleImages: ['/samples/dalle3-1.jpg', '/samples/dalle3-2.jpg']
  },
  {
    id: 'dalle3-standard',
    name: 'DALL-E 3',
    displayName: 'DALL-E 3 Standard',
    description: 'Standard quality version of DALL-E 3 for cost-effective generation.',
    logo: '🎨',
    rating: 4.8,
    pricing: { basePrice: 0.04, currency: 'USD', unit: 'image' },
    features: ['High resolution', 'Natural language prompts', 'Style variations', 'Safety filtering'],
    category: 'General Purpose',
    speed: 'fast',
    quality: 'high',
    censorship: 'strict',
    styles: ['Photorealistic', 'Artistic', 'Digital Art', 'Oil Painting', '3D Render'],
    sizes: ['1024x1024', '1024x1792', '1792x1024'],
    sampleImages: ['/samples/dalle3-1.jpg', '/samples/dalle3-2.jpg']
  },

  // Midjourney Models
  {
    id: 'midjourney-v7',
    name: 'Midjourney',
    displayName: 'Midjourney v7',
    description: 'Latest Midjourney model with enhanced realism and artistic capabilities.',
    logo: '🎭',
    rating: 4.9,
    pricing: { basePrice: 0.04, currency: 'USD', unit: 'image' },
    features: ['Enhanced realism', 'Style consistency', 'Upscaling', 'Variations', 'Character references'],
    category: 'Artistic',
    speed: 'medium',
    quality: 'high',
    censorship: 'moderate',
    styles: ['Fantasy Art', 'Concept Art', 'Portraits', 'Landscapes', 'Architecture'],
    sizes: ['1024x1024', '1024x1456', '1456x1024', '1024x1820', '1820x1024'],
    badge: 'Latest Model',
    isPopular: true,
    sampleImages: ['/samples/midjourney-1.jpg', '/samples/midjourney-2.jpg']
  },
  {
    id: 'midjourney-v6',
    name: 'Midjourney',
    displayName: 'Midjourney v6',
    description: 'Industry-leading AI art generator known for stunning artistic and aesthetic results.',
    logo: '🎭',
    rating: 4.8,
    pricing: { basePrice: 0.032, currency: 'USD', unit: 'image' },
    features: ['Artistic excellence', 'Style consistency', 'Upscaling', 'Variations'],
    category: 'Artistic',
    speed: 'medium',
    quality: 'high',
    censorship: 'moderate',
    styles: ['Fantasy Art', 'Concept Art', 'Portraits', 'Landscapes', 'Architecture'],
    sizes: ['1024x1024', '1024x1456', '1456x1024', '1024x1820', '1820x1024'],
    badge: 'Best Quality',
    sampleImages: ['/samples/midjourney-1.jpg', '/samples/midjourney-2.jpg']
  },

  // Flux Models
  {
    id: 'flux-pro-v2',
    name: 'Flux Pro',
    displayName: 'Flux Pro v2',
    description: 'Latest Flux model with superior prompt adherence and fine details.',
    logo: '🌟',
    rating: 4.8,
    pricing: { basePrice: 0.06, currency: 'USD', unit: 'image' },
    features: ['Ultra-high resolution', 'Precise control', 'Fast generation', 'Text rendering'],
    category: 'Premium',
    speed: 'fast',
    quality: 'high',
    censorship: 'moderate',
    styles: ['Photorealistic', 'Hyperrealistic', 'Fine Art', 'Technical', 'Scientific'],
    sizes: ['1024x1024', '1344x768', '768x1344', '1536x640', '640x1536'],
    badge: 'Latest Model',
    sampleImages: ['/samples/flux-1.jpg', '/samples/flux-2.jpg']
  },
  {
    id: 'flux-dev',
    name: 'Flux Dev',
    displayName: 'Flux Dev',
    description: 'Developer-friendly Flux model with open weights and customization options.',
    logo: '⚡',
    rating: 4.6,
    pricing: { basePrice: 0.025, currency: 'USD', unit: 'image' },
    features: ['Open weights', 'Customizable', 'High quality', 'Developer tools'],
    category: 'Open Source',
    speed: 'fast',
    quality: 'high',
    censorship: 'permissive',
    styles: ['Realistic', 'Artistic', 'Technical', 'Custom Styles', 'Fine-tuned'],
    sizes: ['512x512', '768x768', '1024x1024', '1536x1024', '1024x1536'],
    badge: 'Open Source',
    sampleImages: ['/samples/flux-dev-1.jpg', '/samples/flux-dev-2.jpg']
  },
  {
    id: 'flux-schnell',
    name: 'Flux Schnell',
    displayName: 'Flux Schnell',
    description: 'Ultra-fast Flux model optimized for speed without compromising quality.',
    logo: '💨',
    rating: 4.4,
    pricing: { basePrice: 0.015, currency: 'USD', unit: 'image' },
    features: ['Ultra-fast', 'Good quality', 'Efficient', 'Real-time capable'],
    category: 'Fast',
    speed: 'fast',
    quality: 'medium',
    censorship: 'moderate',
    styles: ['Quick sketches', 'Concepts', 'Rapid prototyping', 'Real-time'],
    sizes: ['512x512', '768x768', '1024x1024'],
    badge: 'Fastest',
    sampleImages: ['/samples/flux-schnell-1.jpg', '/samples/flux-schnell-2.jpg']
  },

  // Stable Diffusion Models
  {
    id: 'stable-diffusion-3-5',
    name: 'Stable Diffusion',
    displayName: 'Stable Diffusion 3.5',
    description: 'Latest Stable Diffusion model with enhanced quality and better text rendering.',
    logo: '⚡',
    rating: 4.7,
    pricing: { basePrice: 0.025, currency: 'USD', unit: 'image' },
    features: ['Enhanced quality', 'Better text', 'ControlNet', 'Inpainting', 'Open source'],
    category: 'Open Source',
    speed: 'fast',
    quality: 'high',
    censorship: 'permissive',
    styles: ['Anime', 'Realistic', 'Abstract', 'Pixel Art', 'Watercolor'],
    sizes: ['512x512', '768x768', '1024x1024', '1536x1024', '1024x1536'],
    badge: 'Latest SD',
    sampleImages: ['/samples/sd35-1.jpg', '/samples/sd35-2.jpg']
  },
  {
    id: 'stable-diffusion-xl',
    name: 'Stable Diffusion XL',
    displayName: 'Stable Diffusion XL',
    description: 'Open-source powerhouse with incredible customization and control options.',
    logo: '⚡',
    rating: 4.7,
    pricing: { basePrice: 0.018, currency: 'USD', unit: 'image' },
    features: ['ControlNet', 'Inpainting', 'Outpainting', 'LoRA models', 'Custom training'],
    category: 'Customizable',
    speed: 'fast',
    quality: 'high',
    censorship: 'permissive',
    styles: ['Anime', 'Realistic', 'Abstract', 'Pixel Art', 'Watercolor'],
    sizes: ['512x512', '768x768', '1024x1024', '1536x1024', '1024x1536'],
    badge: 'Best Value',
    sampleImages: ['/samples/sdxl-1.jpg', '/samples/sdxl-2.jpg']
  },

  // Adobe Models
  {
    id: 'adobe-firefly-v3',
    name: 'Adobe Firefly',
    displayName: 'Adobe Firefly v3',
    description: 'Latest Firefly model with enhanced commercial safety and quality.',
    logo: '🔥',
    rating: 4.7,
    pricing: { basePrice: 0.06, currency: 'USD', unit: 'image' },
    features: ['Enhanced quality', 'Commercial license', 'Brand consistency', 'Typography integration'],
    category: 'Commercial',
    speed: 'medium',
    quality: 'high',
    censorship: 'strict',
    styles: ['Corporate', 'Marketing', 'Photography', 'Illustration', 'Logo Design'],
    sizes: ['1024x1024', '1408x1024', '1024x1408', '1792x1024', '1024x1792'],
    badge: 'Latest Model',
    isPopular: true,
    sampleImages: ['/samples/firefly-v3-1.jpg', '/samples/firefly-v3-2.jpg']
  },
  {
    id: 'adobe-firefly',
    name: 'Adobe Firefly',
    displayName: 'Adobe Firefly',
    description: 'Commercially safe AI art generator designed for creative professionals.',
    logo: '🔥',
    rating: 4.6,
    pricing: { basePrice: 0.05, currency: 'USD', unit: 'image' },
    features: ['Commercial license', 'Brand consistency', 'Typography integration', 'Vector output'],
    category: 'Commercial',
    speed: 'medium',
    quality: 'high',
    censorship: 'strict',
    styles: ['Corporate', 'Marketing', 'Photography', 'Illustration', 'Logo Design'],
    sizes: ['1024x1024', '1408x1024', '1024x1408', '1792x1024', '1024x1792'],
    sampleImages: ['/samples/firefly-1.jpg', '/samples/firefly-2.jpg']
  },

  // Leonardo AI Models
  {
    id: 'leonardo-ai-phoenix',
    name: 'Leonardo AI',
    displayName: 'Leonardo Phoenix',
    description: 'Latest Leonardo model with enhanced photorealism and creative control.',
    logo: '🎮',
    rating: 4.6,
    pricing: { basePrice: 0.03, currency: 'USD', unit: 'image' },
    features: ['Enhanced photorealism', 'Creative control', 'Game assets', 'Character design'],
    category: 'Gaming',
    speed: 'fast',
    quality: 'high',
    censorship: 'moderate',
    styles: ['Game Art', 'Character Design', 'Photorealistic', 'Concept Art', '3D Models'],
    sizes: ['512x512', '768x768', '1024x1024', '1024x576', '576x1024'],
    badge: 'Latest Model',
    sampleImages: ['/samples/leonardo-phoenix-1.jpg', '/samples/leonardo-phoenix-2.jpg']
  },
  {
    id: 'leonardo-ai',
    name: 'Leonardo AI',
    displayName: 'Leonardo AI',
    description: 'Game-focused AI generator with excellent character and asset creation.',
    logo: '🎮',
    rating: 4.5,
    pricing: { basePrice: 0.025, currency: 'USD', unit: 'image' },
    features: ['Game assets', 'Character design', 'Motion generation', 'Texture creation'],
    category: 'Gaming',
    speed: 'fast',
    quality: 'high',
    censorship: 'moderate',
    styles: ['Game Art', 'Character Design', 'Concept Art', 'Pixel Art', '3D Models'],
    sizes: ['512x512', '768x768', '1024x1024', '1024x576', '576x1024'],
    sampleImages: ['/samples/leonardo-1.jpg', '/samples/leonardo-2.jpg']
  },

  // Ideogram Models
  {
    id: 'ideogram-v2',
    name: 'Ideogram',
    displayName: 'Ideogram v2',
    description: 'Advanced text-in-image generation with exceptional typography control.',
    logo: '📝',
    rating: 4.5,
    pricing: { basePrice: 0.04, currency: 'USD', unit: 'image' },
    features: ['Perfect text rendering', 'Typography control', 'Logo design', 'Brand materials'],
    category: 'Typography',
    speed: 'medium',
    quality: 'high',
    censorship: 'moderate',
    styles: ['Logo Design', 'Typography', 'Brand Design', 'Poster Art', 'Marketing'],
    sizes: ['1024x1024', '1024x1456', '1456x1024', '1024x1820', '1820x1024'],
    badge: 'Text Master',
    sampleImages: ['/samples/ideogram-1.jpg', '/samples/ideogram-2.jpg']
  },

  // Playground AI Models
  {
    id: 'playground-v2-5',
    name: 'Playground AI',
    displayName: 'Playground v2.5',
    description: 'Enhanced creative model with better aesthetic quality and style control.',
    logo: '🎪',
    rating: 4.4,
    pricing: { basePrice: 0.035, currency: 'USD', unit: 'image' },
    features: ['Enhanced aesthetics', 'Style control', 'Creative freedom', 'Mixed media'],
    category: 'Creative',
    speed: 'fast',
    quality: 'high',
    censorship: 'moderate',
    styles: ['Mixed Media', 'Creative Art', 'Digital Painting', 'Illustrations', 'Fantasy'],
    sizes: ['512x512', '768x768', '1024x1024', '1536x1024', '1024x1536'],
    badge: 'Creative Pro',
    sampleImages: ['/samples/playground-1.jpg', '/samples/playground-2.jpg']
  },

  // SDXL Specialty Models
  {
    id: 'juggernaut-xl',
    name: 'Juggernaut XL',
    displayName: 'Juggernaut XL',
    description: 'Photorealistic SDXL fine-tune optimized for portrait and character generation.',
    logo: '👤',
    rating: 4.6,
    pricing: { basePrice: 0.02, currency: 'USD', unit: 'image' },
    features: ['Photorealistic portraits', 'Character focus', 'High detail', 'SDXL based'],
    category: 'Portraits',
    speed: 'fast',
    quality: 'high',
    censorship: 'moderate',
    styles: ['Photorealistic', 'Portraits', 'Characters', 'Professional Photos', 'Headshots'],
    sizes: ['768x768', '1024x1024', '1536x1024', '1024x1536'],
    badge: 'Portrait Pro',
    sampleImages: ['/samples/juggernaut-1.jpg', '/samples/juggernaut-2.jpg']
  },
  {
    id: 'realvisxl',
    name: 'RealVisXL',
    displayName: 'RealVisXL',
    description: 'Ultra-realistic SDXL model for photographic quality images.',
    logo: '📷',
    rating: 4.5,
    pricing: { basePrice: 0.02, currency: 'USD', unit: 'image' },
    features: ['Ultra-realistic', 'Photographic quality', 'Natural lighting', 'SDXL based'],
    category: 'Realistic',
    speed: 'fast',
    quality: 'high',
    censorship: 'moderate',
    styles: ['Photography', 'Realistic', 'Natural', 'Documentary', 'Lifestyle'],
    sizes: ['768x768', '1024x1024', '1536x1024', '1024x1536'],
    badge: 'Ultra Realistic',
    sampleImages: ['/samples/realvis-1.jpg', '/samples/realvis-2.jpg']
  },

  // Anime/Artistic Models
  {
    id: 'animagine-xl',
    name: 'Animagine XL',
    displayName: 'Animagine XL',
    description: 'Premier anime and manga style generation model.',
    logo: '🎌',
    rating: 4.7,
    pricing: { basePrice: 0.02, currency: 'USD', unit: 'image' },
    features: ['Anime excellence', 'Manga styles', 'Character consistency', 'Japanese aesthetics'],
    category: 'Anime',
    speed: 'fast',
    quality: 'high',
    censorship: 'moderate',
    styles: ['Anime', 'Manga', 'Japanese Art', 'Character Art', 'Kawaii'],
    sizes: ['768x768', '1024x1024', '1024x1456', '1456x1024'],
    badge: 'Anime Master',
    sampleImages: ['/samples/animagine-1.jpg', '/samples/animagine-2.jpg']
  },

  // ControlNet and Specialized Models
  {
    id: 'controlnet-openpose',
    name: 'ControlNet OpenPose',
    displayName: 'ControlNet OpenPose',
    description: 'Pose-controlled image generation using OpenPose skeletal guidance.',
    logo: '🤸',
    rating: 4.3,
    pricing: { basePrice: 0.025, currency: 'USD', unit: 'image' },
    features: ['Pose control', 'Human figures', 'Skeletal guidance', 'Precise positioning'],
    category: 'Control',
    speed: 'medium',
    quality: 'high',
    censorship: 'moderate',
    styles: ['Human Poses', 'Figure Drawing', 'Character Art', 'Action Scenes', 'Dance'],
    sizes: ['512x512', '768x768', '1024x1024'],
    badge: 'Pose Control',
    sampleImages: ['/samples/openpose-1.jpg', '/samples/openpose-2.jpg']
  },
  {
    id: 'controlnet-depth',
    name: 'ControlNet Depth',
    displayName: 'ControlNet Depth',
    description: 'Depth-map controlled generation for 3D structure preservation.',
    logo: '🗻',
    rating: 4.2,
    pricing: { basePrice: 0.025, currency: 'USD', unit: 'image' },
    features: ['Depth control', '3D structure', 'Spatial awareness', 'Architecture'],
    category: 'Control',
    speed: 'medium',
    quality: 'high',
    censorship: 'moderate',
    styles: ['Architecture', 'Landscapes', '3D Scenes', 'Interior Design', 'Environments'],
    sizes: ['512x512', '768x768', '1024x1024'],
    badge: 'Depth Control',
    sampleImages: ['/samples/depth-1.jpg', '/samples/depth-2.jpg']
  },

  // Specialized Use Cases
  {
    id: 'qr-code-monster',
    name: 'QR Code Monster',
    displayName: 'QR Code Monster',
    description: 'Artistic QR code generation that maintains scanability.',
    logo: '📱',
    rating: 4.1,
    pricing: { basePrice: 0.03, currency: 'USD', unit: 'image' },
    features: ['Artistic QR codes', 'Scannable designs', 'Brand integration', 'Custom patterns'],
    category: 'Utility',
    speed: 'fast',
    quality: 'medium',
    censorship: 'strict',
    styles: ['QR Art', 'Functional Design', 'Brand QR', 'Creative Codes', 'Marketing'],
    sizes: ['512x512', '768x768', '1024x1024'],
    badge: 'QR Specialist',
    sampleImages: ['/samples/qr-1.jpg', '/samples/qr-2.jpg']
  },

  // Additional Providers from Replicate/PiAPI/Segmind
  {
    id: 'deliberate-v3',
    name: 'Deliberate',
    displayName: 'Deliberate v3',
    description: 'Versatile model balancing realism and artistic style.',
    logo: '🎯',
    rating: 4.4,
    pricing: { basePrice: 0.02, currency: 'USD', unit: 'image' },
    features: ['Balanced style', 'Versatile', 'Good details', 'Flexible prompting'],
    category: 'Balanced',
    speed: 'fast',
    quality: 'high',
    censorship: 'moderate',
    styles: ['Semi-realistic', 'Artistic', 'Portraits', 'Scenes', 'Concepts'],
    sizes: ['512x512', '768x768', '1024x1024'],
    sampleImages: ['/samples/deliberate-1.jpg', '/samples/deliberate-2.jpg']
  },
  {
    id: 'dreamshaper-xl',
    name: 'DreamShaper XL',
    displayName: 'DreamShaper XL',
    description: 'Artistic model with enhanced creativity and style flexibility.',
    logo: '💭',
    rating: 4.3,
    pricing: { basePrice: 0.02, currency: 'USD', unit: 'image' },
    features: ['Creative styles', 'Artistic freedom', 'Style blending', 'Imaginative'],
    category: 'Artistic',
    speed: 'fast',
    quality: 'high',
    censorship: 'permissive',
    styles: ['Surreal', 'Fantasy', 'Abstract', 'Imaginative', 'Creative Art'],
    sizes: ['768x768', '1024x1024', '1536x1024', '1024x1536'],
    sampleImages: ['/samples/dreamshaper-1.jpg', '/samples/dreamshaper-2.jpg']
  }
];

const ImagePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filterOptions = [
    { id: 'all', name: 'All Providers' },
    { id: 'popular', name: 'Most Popular' },
    { id: 'fastest', name: 'Fastest' },
    { id: 'cheapest', name: 'Most Affordable' },
    { id: 'highest-quality', name: 'Highest Quality' }
  ];

  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
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
            <div className="w-12 h-12 bg-gradient-to-br from-electric-blue to-neon-cyan rounded-xl flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Image Generation</h1>
              <p className="text-gray-600">Create stunning images with AI-powered generators</p>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search image generators..."
                className="w-full pl-10 pr-4 py-3 glass rounded-xl border border-white/20 focus:ring-2 focus:ring-electric-blue focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Filters */}
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
          {imageProviders.map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full relative overflow-hidden group" hover3d glowOnHover>
                {/* Badge */}
                {provider.badge && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-electric-blue to-neon-cyan text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {provider.badge}
                  </div>
                )}

                {/* Provider Header */}
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

                {/* Pricing */}
                <div className="flex items-center space-x-2 mb-4">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-lg font-bold text-gray-900">
                    ${provider.pricing.basePrice.toFixed(3)}
                  </span>
                  <span className="text-sm text-gray-600">per {provider.pricing.unit}</span>
                  {getSpeedIcon(provider.speed)}
                </div>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-semibold text-gray-700">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {provider.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                    {provider.features.length > 3 && (
                      <span className="text-xs text-gray-500">+{provider.features.length - 3} more</span>
                    )}
                  </div>
                </div>

                {/* Styles */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-sm font-semibold text-gray-700">Supported Styles:</h4>
                  <div className="flex flex-wrap gap-1">
                    {provider.styles.slice(0, 3).map((style, idx) => (
                      <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {style}
                      </span>
                    ))}
                    {provider.styles.length > 3 && (
                      <span className="text-xs text-blue-500">+{provider.styles.length - 3} more</span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
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
            <div className="text-2xl font-bold text-electric-blue">{imageProviders.length}</div>
            <div className="text-sm text-gray-600">Image Providers</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">$0.018</div>
            <div className="text-sm text-gray-600">Starting Price</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">4.7</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">50+</div>
            <div className="text-sm text-gray-600">Art Styles</div>
          </Card>
        </motion.div>
      </MainLayout>
    </div>
  );
};

export default ImagePage;