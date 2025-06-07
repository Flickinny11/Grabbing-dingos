'use client';

import { motion } from 'framer-motion';
import { 
  Image, 
  Video, 
  Headphones, 
  Box, 
  Type, 
  Workflow,
  Sparkles,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react';

const categories = [
  {
    name: 'Image Generation',
    icon: Image,
    href: '/image',
    color: 'from-electric-blue to-neon-cyan',
    count: 15,
    description: 'DALL-E, Midjourney, Stable Diffusion & more'
  },
  {
    name: 'Video Generation', 
    icon: Video,
    href: '/video',
    color: 'from-iridescent-purple to-coral-pink',
    count: 12,
    description: 'Minimax, Kling, Runway & more'
  },
  {
    name: 'Audio Generation',
    icon: Headphones, 
    href: '/audio',
    color: 'from-neon-green to-golden-yellow',
    count: 18,
    description: 'ElevenLabs, Murf, Stability AI & more'
  },
  {
    name: '3D Generation',
    icon: Box,
    href: '/3d', 
    color: 'from-coral-pink to-iridescent-purple',
    count: 8,
    description: 'Meshy, Luma AI, Kaedim & more'
  },
  {
    name: 'Text & Language',
    icon: Type,
    href: '/text',
    color: 'from-golden-yellow to-electric-blue',
    count: 22,
    description: 'GPT-4, Claude, Gemini & more'
  },
  {
    name: 'Workflows',
    icon: Workflow,
    href: '/workflows',
    color: 'from-neon-cyan to-neon-green',
    count: 5,
    description: 'Chain services together'
  }
];

const quickStats = [
  { label: 'Active Services', value: '80+', icon: Sparkles },
  { label: 'Monthly Generations', value: '2.5M+', icon: TrendingUp },
  { label: 'Avg Response Time', value: '1.2s', icon: Clock },
  { label: 'User Rating', value: '4.9/5', icon: Star },
];

const CategorySidebar = () => {
  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed left-0 top-16 bottom-0 w-80 glass border-r border-white/20 p-6 overflow-y-auto scrollbar-hide z-40"
    >
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="glass p-3 rounded-lg text-center"
            >
              <stat.icon className="w-4 h-4 text-electric-blue mx-auto mb-1" />
              <div className="text-sm font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
          {categories.map((category, index) => (
            <motion.a
              key={category.name}
              href={category.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 10 }}
              whileTap={{ scale: 0.98 }}
              className="group block p-4 glass rounded-xl hover:shadow-glow transition-all duration-300 border border-transparent hover:border-white/30"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  <category.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 group-hover:text-electric-blue transition-colors duration-200">
                    {category.name}
                  </h4>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {category.count} services
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
                {category.description}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <div className="space-y-2">
            {[
              { type: 'image', service: 'DALL-E 3', time: '2 min ago' },
              { type: 'video', service: 'Minimax', time: '5 min ago' },
              { type: 'audio', service: 'ElevenLabs', time: '12 min ago' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-2 glass rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-900">{activity.service}</div>
                  <div className="text-xs text-gray-600">{activity.time}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default CategorySidebar;