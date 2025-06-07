'use client';

import Header from '@/components/layout/Header';
import CategorySidebar from '@/components/layout/CategorySidebar';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Type, Star, Play, Settings, Sparkles } from 'lucide-react';

const TextPage = () => {
  const textProviders = [
    {
      id: 'gpt4',
      name: 'GPT-4',
      description: 'OpenAI\'s most advanced language model for any text task',
      logo: '🧠',
      rating: 4.9,
      price: '$0.03/1K tokens',
      features: ['128K context', 'Code generation', 'Reasoning', 'Multimodal']
    },
    {
      id: 'claude3-opus',
      name: 'Claude 3 Opus',
      description: 'Anthropic\'s most capable model for complex reasoning',
      logo: '🎭',
      rating: 4.8,
      price: '$0.075/1K tokens',
      features: ['200K context', 'Advanced reasoning', 'Safety focused', 'Multimodal']
    },
    {
      id: 'gemini-pro',
      name: 'Gemini Pro',
      description: 'Google\'s advanced AI for text and multimodal tasks',
      logo: '💎',
      rating: 4.6,
      price: '$0.025/1K tokens',
      features: ['1M context', 'Multimodal', 'Fast generation', 'Google integration']
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <CategorySidebar />
      <MainLayout>
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {textProviders.map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full" hover3d glowOnHover>
                <div className="flex items-start space-x-4 mb-4">
                  <div className="text-4xl">{provider.logo}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{provider.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">{provider.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600">{provider.description}</p>
                  </div>
                </div>

                <div className="text-lg font-bold text-gray-900 mb-4">{provider.price}</div>

                <div className="space-y-2 mb-6">
                  <h4 className="text-sm font-semibold text-gray-700">Features:</h4>
                  <div className="flex flex-wrap gap-1">
                    {provider.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="primary" className="flex-1" icon={<Sparkles className="w-4 h-4" />}>
                    Generate
                  </Button>
                  <Button variant="glass" icon={<Play className="w-4 h-4" />}>Preview</Button>
                  <Button variant="ghost" icon={<Settings className="w-4 h-4" />}>Config</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </MainLayout>
    </div>
  );
};

export default TextPage;