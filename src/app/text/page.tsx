'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import CategorySidebar from '@/components/layout/CategorySidebar';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Type, 
  Star, 
  Play, 
  Settings, 
  Sparkles,
  Search,
  Zap,
  Clock,
  DollarSign
} from 'lucide-react';

interface TextProvider {
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
  contextLength: string;
  badge?: string;
  isPopular?: boolean;
}

const textProviders: TextProvider[] = [
  // OpenAI Models
  {
    id: 'gpt4-turbo',
    name: 'GPT-4',
    displayName: 'GPT-4 Turbo',
    description: 'OpenAI\'s latest and most advanced language model with enhanced capabilities.',
    logo: '🧠',
    rating: 4.9,
    pricing: { basePrice: 0.01, currency: 'USD', unit: '1K tokens' },
    features: ['128K context', 'Multimodal', 'Latest training', 'Function calling', 'JSON mode'],
    category: 'General Purpose',
    speed: 'fast',
    quality: 'high',
    contextLength: '128K',
    badge: 'Latest Model',
    isPopular: true
  },
  {
    id: 'gpt4',
    name: 'GPT-4',
    displayName: 'GPT-4',
    description: 'OpenAI\'s flagship model for complex reasoning and analysis.',
    logo: '🧠',
    rating: 4.8,
    pricing: { basePrice: 0.03, currency: 'USD', unit: '1K tokens' },
    features: ['8K/32K context', 'Code generation', 'Reasoning', 'Multimodal'],
    category: 'General Purpose',
    speed: 'medium',
    quality: 'high',
    contextLength: '32K',
    badge: 'Most Popular',
    isPopular: true
  },
  {
    id: 'gpt35-turbo',
    name: 'GPT-3.5',
    displayName: 'GPT-3.5 Turbo',
    description: 'Fast and cost-effective model for most conversational and text tasks.',
    logo: '⚡',
    rating: 4.6,
    pricing: { basePrice: 0.0015, currency: 'USD', unit: '1K tokens' },
    features: ['16K context', 'Fast generation', 'Cost effective', 'Function calling'],
    category: 'Fast & Affordable',
    speed: 'fast',
    quality: 'high',
    contextLength: '16K',
    badge: 'Best Value'
  },

  // Anthropic Claude Models
  {
    id: 'claude3-opus',
    name: 'Claude 3',
    displayName: 'Claude 3 Opus',
    description: 'Anthropic\'s most capable model for complex reasoning and analysis.',
    logo: '🎭',
    rating: 4.8,
    pricing: { basePrice: 0.075, currency: 'USD', unit: '1K tokens' },
    features: ['200K context', 'Advanced reasoning', 'Safety focused', 'Multimodal'],
    category: 'Reasoning',
    speed: 'slow',
    quality: 'high',
    contextLength: '200K',
    badge: 'Best Reasoning'
  },
  {
    id: 'claude3-sonnet',
    name: 'Claude 3',
    displayName: 'Claude 3 Sonnet',
    description: 'Balanced model with strong performance across a wide range of tasks.',
    logo: '🎼',
    rating: 4.7,
    pricing: { basePrice: 0.015, currency: 'USD', unit: '1K tokens' },
    features: ['200K context', 'Balanced performance', 'Multimodal', 'Fast reasoning'],
    category: 'Balanced',
    speed: 'medium',
    quality: 'high',
    contextLength: '200K',
    isPopular: true
  },
  {
    id: 'claude3-haiku',
    name: 'Claude 3',
    displayName: 'Claude 3 Haiku',
    description: 'Fast and lightweight model for quick tasks and high-volume applications.',
    logo: '🌸',
    rating: 4.5,
    pricing: { basePrice: 0.0008, currency: 'USD', unit: '1K tokens' },
    features: ['200K context', 'Ultra-fast', 'Cost effective', 'Good quality'],
    category: 'Fast & Affordable',
    speed: 'fast',
    quality: 'medium',
    contextLength: '200K',
    badge: 'Fastest'
  },

  // Google Models
  {
    id: 'gemini-ultra',
    name: 'Gemini',
    displayName: 'Gemini Ultra',
    description: 'Google\'s most capable model for highly complex tasks.',
    logo: '💎',
    rating: 4.7,
    pricing: { basePrice: 0.05, currency: 'USD', unit: '1K tokens' },
    features: ['2M context', 'Multimodal', 'Advanced reasoning', 'Google integration'],
    category: 'Multimodal',
    speed: 'slow',
    quality: 'high',
    contextLength: '2M',
    badge: 'Longest Context'
  },
  {
    id: 'gemini-pro',
    name: 'Gemini',
    displayName: 'Gemini Pro',
    description: 'Google\'s balanced model for text and multimodal tasks.',
    logo: '💎',
    rating: 4.6,
    pricing: { basePrice: 0.025, currency: 'USD', unit: '1K tokens' },
    features: ['1M context', 'Multimodal', 'Fast generation', 'Google integration'],
    category: 'Multimodal',
    speed: 'medium',
    quality: 'high',
    contextLength: '1M'
  },
  {
    id: 'gemini-flash',
    name: 'Gemini',
    displayName: 'Gemini Flash',
    description: 'Optimized for speed and efficiency in multimodal tasks.',
    logo: '⚡',
    rating: 4.4,
    pricing: { basePrice: 0.0075, currency: 'USD', unit: '1K tokens' },
    features: ['1M context', 'Ultra-fast', 'Multimodal', 'Cost effective'],
    category: 'Fast Multimodal',
    speed: 'fast',
    quality: 'medium',
    contextLength: '1M'
  },

  // Meta Llama Models
  {
    id: 'llama3-405b',
    name: 'Llama 3',
    displayName: 'Llama 3 405B',
    description: 'Meta\'s largest and most capable open-source language model.',
    logo: '🦙',
    rating: 4.6,
    pricing: { basePrice: 0.02, currency: 'USD', unit: '1K tokens' },
    features: ['128K context', 'Open source', 'Highly capable', 'Code generation'],
    category: 'Open Source',
    speed: 'medium',
    quality: 'high',
    contextLength: '128K',
    badge: 'Open Source Leader'
  },
  {
    id: 'llama3-70b',
    name: 'Llama 3',
    displayName: 'Llama 3 70B',
    description: 'Balanced open-source model with strong performance.',
    logo: '🦙',
    rating: 4.4,
    pricing: { basePrice: 0.009, currency: 'USD', unit: '1K tokens' },
    features: ['128K context', 'Open source', 'Good performance', 'Efficient'],
    category: 'Open Source',
    speed: 'fast',
    quality: 'high',
    contextLength: '128K'
  },
  {
    id: 'llama3-8b',
    name: 'Llama 3',
    displayName: 'Llama 3 8B',
    description: 'Compact and efficient model for lightweight applications.',
    logo: '🦙',
    rating: 4.2,
    pricing: { basePrice: 0.0015, currency: 'USD', unit: '1K tokens' },
    features: ['128K context', 'Open source', 'Lightweight', 'Fast inference'],
    category: 'Lightweight',
    speed: 'fast',
    quality: 'medium',
    contextLength: '128K'
  },

  // Specialized Models
  {
    id: 'cohere-command-r-plus',
    name: 'Cohere',
    displayName: 'Command R+',
    description: 'Cohere\'s most advanced model optimized for complex business tasks.',
    logo: '🏢',
    rating: 4.3,
    pricing: { basePrice: 0.015, currency: 'USD', unit: '1K tokens' },
    features: ['128K context', 'Enterprise focus', 'RAG optimized', 'Tool use'],
    category: 'Enterprise',
    speed: 'medium',
    quality: 'high',
    contextLength: '128K'
  },
  {
    id: 'mistral-large',
    name: 'Mistral',
    displayName: 'Mistral Large',
    description: 'Mistral AI\'s flagship model with strong reasoning capabilities.',
    logo: '🌪️',
    rating: 4.4,
    pricing: { basePrice: 0.02, currency: 'USD', unit: '1K tokens' },
    features: ['128K context', 'Multilingual', 'Function calling', 'Strong reasoning'],
    category: 'European AI',
    speed: 'medium',
    quality: 'high',
    contextLength: '128K'
  },
  {
    id: 'mistral-medium',
    name: 'Mistral',
    displayName: 'Mistral Medium',
    description: 'Balanced model with good performance across various tasks.',
    logo: '🌪️',
    rating: 4.2,
    pricing: { basePrice: 0.0065, currency: 'USD', unit: '1K tokens' },
    features: ['32K context', 'Balanced performance', 'Cost effective', 'Multilingual'],
    category: 'Balanced',
    speed: 'fast',
    quality: 'medium',
    contextLength: '32K'
  },

  // Code-Specialized Models
  {
    id: 'codellama-70b',
    name: 'Code Llama',
    displayName: 'Code Llama 70B',
    description: 'Meta\'s specialized code generation model.',
    logo: '💻',
    rating: 4.5,
    pricing: { basePrice: 0.009, currency: 'USD', unit: '1K tokens' },
    features: ['Code focus', 'Multiple languages', 'Instruction following', 'Open source'],
    category: 'Code Generation',
    speed: 'fast',
    quality: 'high',
    contextLength: '16K'
  },
  {
    id: 'deepseek-coder',
    name: 'DeepSeek Coder',
    displayName: 'DeepSeek Coder v2',
    description: 'Advanced code generation model with strong programming capabilities.',
    logo: '🔍',
    rating: 4.3,
    pricing: { basePrice: 0.008, currency: 'USD', unit: '1K tokens' },
    features: ['Code specialization', 'Multiple languages', 'Problem solving', 'Open source'],
    category: 'Code Generation',
    speed: 'fast',
    quality: 'high',
    contextLength: '64K'
  },

  // Math and Science Models
  {
    id: 'gpt4-math',
    name: 'GPT-4',
    displayName: 'GPT-4 (Math Mode)',
    description: 'GPT-4 optimized for mathematical reasoning and calculations.',
    logo: '🔢',
    rating: 4.7,
    pricing: { basePrice: 0.035, currency: 'USD', unit: '1K tokens' },
    features: ['Math optimization', 'Step-by-step solving', 'Verification', 'Scientific notation'],
    category: 'Mathematics',
    speed: 'medium',
    quality: 'high',
    contextLength: '32K'
  },
  {
    id: 'claude-math',
    name: 'Claude 3',
    displayName: 'Claude 3 (Analysis)',
    description: 'Claude optimized for analytical and mathematical tasks.',
    logo: '📊',
    rating: 4.6,
    pricing: { basePrice: 0.025, currency: 'USD', unit: '1K tokens' },
    features: ['Analytical thinking', 'Data analysis', 'Mathematical reasoning', 'Chart reading'],
    category: 'Analysis',
    speed: 'medium',
    quality: 'high',
    contextLength: '200K'
  },

  // Multilingual and Regional Models
  {
    id: 'qwen-turbo',
    name: 'Qwen',
    displayName: 'Qwen Turbo',
    description: 'Alibaba\'s multilingual model with strong Chinese language support.',
    logo: '🇨🇳',
    rating: 4.2,
    pricing: { basePrice: 0.008, currency: 'USD', unit: '1K tokens' },
    features: ['Multilingual', 'Chinese optimization', 'Fast generation', 'Cultural context'],
    category: 'Multilingual',
    speed: 'fast',
    quality: 'medium',
    contextLength: '32K'
  },
  {
    id: 'yi-large',
    name: 'Yi',
    displayName: 'Yi Large',
    description: '01.AI\'s large language model with strong multilingual capabilities.',
    logo: '🌏',
    rating: 4.1,
    pricing: { basePrice: 0.012, currency: 'USD', unit: '1K tokens' },
    features: ['Multilingual', 'Long context', 'Reasoning', 'Asian languages'],
    category: 'Multilingual',
    speed: 'medium',
    quality: 'medium',
    contextLength: '200K'
  },

  // Creative Writing Models
  {
    id: 'claude-creative',
    name: 'Claude 3',
    displayName: 'Claude 3 (Creative)',
    description: 'Claude fine-tuned for creative writing and storytelling.',
    logo: '✍️',
    rating: 4.5,
    pricing: { basePrice: 0.02, currency: 'USD', unit: '1K tokens' },
    features: ['Creative writing', 'Storytelling', 'Character development', 'Narrative flow'],
    category: 'Creative Writing',
    speed: 'medium',
    quality: 'high',
    contextLength: '200K'
  },
  {
    id: 'gpt4-creative',
    name: 'GPT-4',
    displayName: 'GPT-4 (Creative)',
    description: 'GPT-4 optimized for creative content generation.',
    logo: '🎨',
    rating: 4.4,
    pricing: { basePrice: 0.032, currency: 'USD', unit: '1K tokens' },
    features: ['Creative optimization', 'Style adaptation', 'Character consistency', 'Plot development'],
    category: 'Creative Writing',
    speed: 'medium',
    quality: 'high',
    contextLength: '128K'
  }
];

const TextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filterOptions = [
    { id: 'all', name: 'All Models' },
    { id: 'popular', name: 'Most Popular' },
    { id: 'reasoning', name: 'Best Reasoning' },
    { id: 'code', name: 'Code Generation' },
    { id: 'creative', name: 'Creative Writing' },
    { id: 'multilingual', name: 'Multilingual' }
  ];

  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'context', name: 'Longest Context' },
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
            <div className="w-12 h-12 bg-gradient-to-br from-golden-yellow to-electric-blue rounded-xl flex items-center justify-center">
              <Type className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Text & Language</h1>
              <p className="text-gray-600">Generate text, code, and content with advanced AI models</p>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search language models..."
                className="w-full pl-10 pr-4 py-3 glass rounded-xl border border-white/20 focus:ring-2 focus:ring-golden-yellow focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <select
                className="glass rounded-xl border border-white/20 px-4 py-3 focus:ring-2 focus:ring-golden-yellow"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                {filterOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
              
              <select
                className="glass rounded-xl border border-white/20 px-4 py-3 focus:ring-2 focus:ring-golden-yellow"
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
          {textProviders.map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full relative overflow-hidden group" hover3d glowOnHover>
                {provider.badge && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-golden-yellow to-electric-blue text-white px-3 py-1 rounded-full text-xs font-semibold">
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
                        ${provider.pricing.basePrice.toFixed(3)}
                      </span>
                      <span className="text-sm text-gray-600">per {provider.pricing.unit}</span>
                    </div>
                    {getSpeedIcon(provider.speed)}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="font-medium">{provider.category}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {provider.contextLength} context
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <h4 className="text-sm font-semibold text-gray-700">Key Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {provider.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
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
                    Try
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
            <div className="text-2xl font-bold text-golden-yellow">{textProviders.length}</div>
            <div className="text-sm text-gray-600">Language Models</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">$0.0008</div>
            <div className="text-sm text-gray-600">Starting Price</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">4.5</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">2M</div>
            <div className="text-sm text-gray-600">Max Context</div>
          </Card>
        </motion.div>
      </MainLayout>
    </div>
  );
};

export default TextPage;