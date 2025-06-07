'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import CategorySidebar from '@/components/layout/CategorySidebar';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { 
  Headphones, 
  Star, 
  Play, 
  Settings, 
  Sparkles,
  Search,
  Volume2,
  Clock
} from 'lucide-react';

interface AudioProvider {
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

const audioProviders: AudioProvider[] = [
  // Voice Synthesis & TTS Models
  {
    id: 'elevenlabs-turbo',
    name: 'ElevenLabs',
    displayName: 'ElevenLabs Turbo v2.5',
    description: 'Latest ultra-fast voice synthesis with natural-sounding AI voices and instant generation.',
    logo: '🎙️',
    rating: 4.9,
    pricing: { basePrice: 0.20, currency: 'USD', unit: '1K chars' },
    features: ['Ultra-fast synthesis', 'Voice cloning', 'Multilingual', 'Emotional range', 'Real-time'],
    category: 'Voice Synthesis',
    speed: 'fast',
    quality: 'high',
    badge: 'Fastest TTS',
    isPopular: true
  },
  {
    id: 'elevenlabs-premium',
    name: 'ElevenLabs',
    displayName: 'ElevenLabs Premium',
    description: 'Premium voice synthesis with the highest quality and most natural-sounding AI voices.',
    logo: '🎙️',
    rating: 4.9,
    pricing: { basePrice: 0.30, currency: 'USD', unit: '1K chars' },
    features: ['Highest quality', 'Voice cloning', 'Multilingual', 'Emotional range', 'Professional'],
    category: 'Voice Synthesis',
    speed: 'medium',
    quality: 'high',
    badge: 'Best Quality',
    isPopular: true
  },
  {
    id: 'openai-tts-hd',
    name: 'OpenAI TTS',
    displayName: 'OpenAI TTS HD',
    description: 'High-definition text-to-speech with multiple voice options and excellent quality.',
    logo: '🤖',
    rating: 4.7,
    pricing: { basePrice: 0.015, currency: 'USD', unit: '1K chars' },
    features: ['HD quality', 'Multiple voices', 'Natural speech', 'Fast generation'],
    category: 'Voice Synthesis',
    speed: 'fast',
    quality: 'high',
    badge: 'Best Value'
  },
  {
    id: 'azure-speech',
    name: 'Azure Speech',
    displayName: 'Azure Speech Services',
    description: 'Microsoft\'s enterprise-grade speech synthesis with SSML support.',
    logo: '☁️',
    rating: 4.6,
    pricing: { basePrice: 0.016, currency: 'USD', unit: '1K chars' },
    features: ['Enterprise-grade', 'SSML support', 'Neural voices', 'Custom models'],
    category: 'Enterprise',
    speed: 'medium',
    quality: 'high'
  },
  {
    id: 'google-cloud-tts',
    name: 'Google Cloud TTS',
    displayName: 'Google Cloud Text-to-Speech',
    description: 'Google\'s WaveNet-powered speech synthesis with natural prosody.',
    logo: '🔍',
    rating: 4.5,
    pricing: { basePrice: 0.016, currency: 'USD', unit: '1K chars' },
    features: ['WaveNet technology', 'Natural prosody', '40+ languages', 'Cloud integration'],
    category: 'Cloud TTS',
    speed: 'medium',
    quality: 'high'
  },
  {
    id: 'murf-ai-v3',
    name: 'Murf AI',
    displayName: 'Murf AI v3',
    description: 'Enhanced professional voiceover generation with improved naturalness.',
    logo: '🎵',
    rating: 4.7,
    pricing: { basePrice: 0.18, currency: 'USD', unit: '1K chars' },
    features: ['150+ voices', '25+ languages', 'SSML support', 'Custom voices', 'Emotion control'],
    category: 'Professional',
    speed: 'medium',
    quality: 'high'
  },
  {
    id: 'speechify',
    name: 'Speechify',
    displayName: 'Speechify Studio',
    description: 'High-quality TTS optimized for content creation and accessibility.',
    logo: '📢',
    rating: 4.4,
    pricing: { basePrice: 0.12, currency: 'USD', unit: '1K chars' },
    features: ['Content optimized', 'Natural voices', 'Speed control', 'Accessibility focus'],
    category: 'Content Creation',
    speed: 'fast',
    quality: 'medium'
  },
  {
    id: 'replica-studios',
    name: 'Replica Studios',
    displayName: 'Replica Studios',
    description: 'AI voice actor platform for gaming, film, and interactive media.',
    logo: '🎭',
    rating: 4.5,
    pricing: { basePrice: 0.25, currency: 'USD', unit: '1K chars' },
    features: ['Voice actors', 'Character voices', 'Gaming focus', 'Emotion control'],
    category: 'Character Voices',
    speed: 'medium',
    quality: 'high'
  },

  // Music Generation Models
  {
    id: 'suno-v4',
    name: 'Suno AI',
    displayName: 'Suno v4',
    description: 'Latest Suno model for creating full songs with lyrics, vocals, and instruments.',
    logo: '🎵',
    rating: 4.8,
    pricing: { basePrice: 0.08, currency: 'USD', unit: 'song' },
    features: ['Full song generation', 'Lyrics + vocals', 'Multiple genres', 'Commercial use'],
    category: 'Music Generation',
    speed: 'slow',
    quality: 'high',
    badge: 'Best Music AI',
    isPopular: true
  },
  {
    id: 'udio-v2',
    name: 'Udio',
    displayName: 'Udio v2',
    description: 'Advanced music generation with professional-quality output and style control.',
    logo: '🎶',
    rating: 4.7,
    pricing: { basePrice: 0.10, currency: 'USD', unit: 'song' },
    features: ['Professional quality', 'Style control', 'Instrument separation', 'Genre blending'],
    category: 'Music Generation',
    speed: 'slow',
    quality: 'high',
    badge: 'Pro Music'
  },
  {
    id: 'stability-audio-v2',
    name: 'Stability Audio',
    displayName: 'Stable Audio 2.0',
    description: 'Enhanced music and sound effect generation with longer duration support.',
    logo: '🎼',
    rating: 4.6,
    pricing: { basePrice: 0.03, currency: 'USD', unit: 'second' },
    features: ['Extended duration', 'Music generation', 'Sound effects', 'Stem separation'],
    category: 'Music & SFX',
    speed: 'medium',
    quality: 'high'
  },
  {
    id: 'musicgen',
    name: 'MusicGen',
    displayName: 'MusicGen',
    description: 'Meta\'s open-source music generation model with controllable attributes.',
    logo: '🎹',
    rating: 4.3,
    pricing: { basePrice: 0.02, currency: 'USD', unit: 'second' },
    features: ['Open source', 'Controllable', 'Text-to-music', 'Style conditioning'],
    category: 'Open Source',
    speed: 'medium',
    quality: 'medium'
  },
  {
    id: 'boomy-pro',
    name: 'Boomy',
    displayName: 'Boomy Pro',
    description: 'AI music creation platform with instant song generation and monetization.',
    logo: '💥',
    rating: 4.2,
    pricing: { basePrice: 0.05, currency: 'USD', unit: 'song' },
    features: ['Instant creation', 'Monetization', 'Multiple styles', 'Easy to use'],
    category: 'Creator Economy',
    speed: 'fast',
    quality: 'medium'
  },
  {
    id: 'aiva-v4',
    name: 'AIVA',
    displayName: 'AIVA v4',
    description: 'AI composer specializing in classical, cinematic, and ambient music.',
    logo: '🎼',
    rating: 4.4,
    pricing: { basePrice: 0.06, currency: 'USD', unit: 'composition' },
    features: ['Classical focus', 'Cinematic scores', 'Ambient music', 'Professional output'],
    category: 'Classical & Cinematic',
    speed: 'slow',
    quality: 'high'
  },
  {
    id: 'soundful-v2',
    name: 'Soundful',
    displayName: 'Soundful v2',
    description: 'Royalty-free music generation for content creators and businesses.',
    logo: '🎧',
    rating: 4.3,
    pricing: { basePrice: 0.04, currency: 'USD', unit: 'track' },
    features: ['Royalty-free', 'Content creator focus', 'Multiple genres', 'Customizable'],
    category: 'Royalty-Free',
    speed: 'fast',
    quality: 'medium'
  },

  // Audio Enhancement & Processing
  {
    id: 'adobe-enhance',
    name: 'Adobe Enhance',
    displayName: 'Adobe Audio Enhance',
    description: 'AI-powered audio enhancement and noise reduction for professional quality.',
    logo: '🔧',
    rating: 4.6,
    pricing: { basePrice: 0.05, currency: 'USD', unit: 'minute' },
    features: ['Noise reduction', 'Audio enhancement', 'Professional quality', 'Real-time'],
    category: 'Audio Enhancement',
    speed: 'fast',
    quality: 'high'
  },
  {
    id: 'descript-overdub',
    name: 'Descript',
    displayName: 'Descript Overdub',
    description: 'Text-based audio editing with voice cloning and seamless dubbing.',
    logo: '✂️',
    rating: 4.5,
    pricing: { basePrice: 0.15, currency: 'USD', unit: 'minute' },
    features: ['Text-based editing', 'Voice cloning', 'Overdubbing', 'Seamless integration'],
    category: 'Audio Editing',
    speed: 'medium',
    quality: 'high'
  },
  {
    id: 'resemble-ai',
    name: 'Resemble AI',
    displayName: 'Resemble AI',
    description: 'Real-time voice synthesis and cloning with emotional control.',
    logo: '🎭',
    rating: 4.4,
    pricing: { basePrice: 0.22, currency: 'USD', unit: '1K chars' },
    features: ['Real-time synthesis', 'Voice cloning', 'Emotional control', 'API integration'],
    category: 'Voice Cloning',
    speed: 'fast',
    quality: 'high'
  },

  // Sound Effects & Foley
  {
    id: 'audiocraft',
    name: 'AudioCraft',
    displayName: 'Meta AudioCraft',
    description: 'Comprehensive audio generation including music, sound effects, and compression.',
    logo: '🛠️',
    rating: 4.2,
    pricing: { basePrice: 0.03, currency: 'USD', unit: 'second' },
    features: ['Multi-modal', 'Sound effects', 'Music generation', 'Audio compression'],
    category: 'Multi-Modal',
    speed: 'medium',
    quality: 'medium'
  },
  {
    id: 'freesound-ai',
    name: 'Freesound AI',
    displayName: 'Freesound AI',
    description: 'AI-powered sound effect generation trained on the Freesound database.',
    logo: '🔊',
    rating: 4.1,
    pricing: { basePrice: 0.02, currency: 'USD', unit: 'sound' },
    features: ['Sound effects', 'Foley sounds', 'Environmental audio', 'Creative commons'],
    category: 'Sound Effects',
    speed: 'fast',
    quality: 'medium'
  },

  // Specialized Audio AI
  {
    id: 'beatoven-ai',
    name: 'Beatoven AI',
    displayName: 'Beatoven AI',
    description: 'Mood-based background music generation for videos and content.',
    logo: '🎵',
    rating: 4.3,
    pricing: { basePrice: 0.04, currency: 'USD', unit: 'track' },
    features: ['Mood-based', 'Background music', 'Video sync', 'Royalty-free'],
    category: 'Background Music',
    speed: 'fast',
    quality: 'medium'
  },
  {
    id: 'endel-ai',
    name: 'Endel',
    displayName: 'Endel AI',
    description: 'Adaptive audio for focus, relaxation, and sleep based on real-time data.',
    logo: '🧘',
    rating: 4.2,
    pricing: { basePrice: 0.03, currency: 'USD', unit: 'session' },
    features: ['Adaptive audio', 'Focus enhancement', 'Sleep optimization', 'Real-time data'],
    category: 'Wellness Audio',
    speed: 'fast',
    quality: 'medium'
  },
  {
    id: 'lalal-ai',
    name: 'LALAL.AI',
    displayName: 'LALAL.AI',
    description: 'AI-powered vocal and instrumental stem separation with high accuracy.',
    logo: '🎤',
    rating: 4.4,
    pricing: { basePrice: 0.06, currency: 'USD', unit: 'minute' },
    features: ['Stem separation', 'Vocal isolation', 'Instrumental extraction', 'High accuracy'],
    category: 'Audio Separation',
    speed: 'medium',
    quality: 'high'
  },
  {
    id: 'harmonai',
    name: 'HarmonAI',
    displayName: 'HarmonAI Dance Diffusion',
    description: 'Open-source music generation focused on electronic and dance music.',
    logo: '💃',
    rating: 4.0,
    pricing: { basePrice: 0.02, currency: 'USD', unit: 'track' },
    features: ['Electronic focus', 'Dance music', 'Open source', 'Community driven'],
    category: 'Electronic Music',
    speed: 'medium',
    quality: 'medium'
  },
  {
    id: 'voicemod-ai',
    name: 'Voicemod AI',
    displayName: 'Voicemod AI',
    description: 'Real-time voice changing and effects for gaming and content creation.',
    logo: '🎪',
    rating: 4.1,
    pricing: { basePrice: 0.08, currency: 'USD', unit: 'minute' },
    features: ['Real-time effects', 'Voice changing', 'Gaming focus', 'Content creation'],
    category: 'Voice Effects',
    speed: 'fast',
    quality: 'medium'
  }
];

const AudioPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filterOptions = [
    { id: 'all', name: 'All Providers' },
    { id: 'voice', name: 'Voice Synthesis' },
    { id: 'music', name: 'Music Generation' },
    { id: 'effects', name: 'Sound Effects' },
    { id: 'enhancement', name: 'Audio Enhancement' }
  ];

  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'quality', name: 'Best Quality' },
    { id: 'name', name: 'Name A-Z' }
  ];

  const getSpeedIcon = (speed: string) => {
    switch (speed) {
      case 'fast': return <Volume2 className="w-4 h-4 text-green-500" />;
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
            <div className="w-12 h-12 bg-gradient-to-br from-neon-green to-golden-yellow rounded-xl flex items-center justify-center">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Audio Generation</h1>
              <p className="text-gray-600">Create voices, music, and sound effects with AI</p>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search audio generators..."
                className="w-full pl-10 pr-4 py-3 glass rounded-xl border border-white/20 focus:ring-2 focus:ring-neon-green focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <select
                className="glass rounded-xl border border-white/20 px-4 py-3 focus:ring-2 focus:ring-neon-green"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                {filterOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
              
              <select
                className="glass rounded-xl border border-white/20 px-4 py-3 focus:ring-2 focus:ring-neon-green"
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
          {audioProviders.map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full relative overflow-hidden group" hover3d glowOnHover>
                {provider.badge && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-neon-green to-golden-yellow text-white px-3 py-1 rounded-full text-xs font-semibold">
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
                      <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
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
            <div className="text-2xl font-bold text-neon-green">{audioProviders.length}</div>
            <div className="text-sm text-gray-600">Audio Providers</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">$0.02</div>
            <div className="text-sm text-gray-600">Starting Price</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">4.4</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">27</div>
            <div className="text-sm text-gray-600">Categories</div>
          </Card>
        </motion.div>
      </MainLayout>
    </div>
  );
};

export default AudioPage;