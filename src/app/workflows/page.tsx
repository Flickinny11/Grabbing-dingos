'use client';

import Header from '@/components/layout/Header';
import CategorySidebar from '@/components/layout/CategorySidebar';
import MainLayout from '@/components/layout/MainLayout';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Workflow, Plus, Play, Settings } from 'lucide-react';

const WorkflowsPage = () => {
  const workflowTemplates = [
    {
      id: 'image-upscale-enhance',
      name: 'Image Upscale & Enhance',
      description: 'Generate image → Upscale → Apply style transfer',
      steps: 3,
      category: 'Image Processing'
    },
    {
      id: 'video-script-production',
      name: 'Video Script to Production',
      description: 'Text script → Voice generation → Video creation → Music overlay',
      steps: 4,
      category: 'Content Creation'
    },
    {
      id: 'podcast-automation',
      name: 'Podcast Automation',
      description: 'Script writing → Voice synthesis → Audio enhancement → Thumbnail generation',
      steps: 4,
      category: 'Audio Production'
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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-cyan to-neon-green rounded-xl flex items-center justify-center">
                <Workflow className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Workflows</h1>
                <p className="text-gray-600">Chain AI services together for complex tasks</p>
              </div>
            </div>
            <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
              Create Workflow
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {workflowTemplates.map((workflow, index) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full" hover3d glowOnHover>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{workflow.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{workflow.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {workflow.category}
                    </span>
                    <span className="text-gray-500">{workflow.steps} steps</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="primary" className="flex-1" icon={<Play className="w-4 h-4" />}>
                    Run
                  </Button>
                  <Button variant="ghost" icon={<Settings className="w-4 h-4" />}>
                    Edit
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Card className="p-8 text-center">
            <Workflow className="w-16 h-16 text-neon-cyan mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Visual Workflow Builder</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Create custom workflows by connecting AI services with our drag-and-drop interface. 
              Automate complex tasks and save time with reusable workflows.
            </p>
            <Button variant="gradient" size="lg" icon={<Plus className="w-5 h-5" />}>
              Open Workflow Builder
            </Button>
          </Card>
        </motion.div>
      </MainLayout>
    </div>
  );
};

export default WorkflowsPage;