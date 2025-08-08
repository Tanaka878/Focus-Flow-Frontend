'use client';
import React, { useState } from 'react';
import { Plus, Sparkles, Target, ArrowRight, Zap, CheckCircle2, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ProjectCreationPage = () => {
        const router = useRouter(); 

  const [hoveredOption, setHoveredOption] = useState<string | null>("");

  const handleManualCreate = () => {
    router.push('/views/manual-creation/'); 
  };

  const handleAICreate = () => {
    router.push('/views/ai-creation/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="container mx-auto px-4 pt-8 pb-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-2xl shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Focus<span className="text-blue-600">Flow</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create your next project and boost your productivity with our intelligent workflow system
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Creation Method</h2>
            <p className="text-gray-600 text-lg">Select how you&apos;d like to set up your new project</p>
          </div>

          {/* Creation Options */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Manual Creation */}
            <div 
              className={`relative group cursor-pointer transition-all duration-300 ${
                hoveredOption === 'manual' ? 'scale-105' : 'hover:scale-102'
              }`}
              onMouseEnter={() => setHoveredOption('manual')}
              onMouseLeave={() => setHoveredOption(null)}
              onClick={handleManualCreate}
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 rounded-2xl shadow-lg">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                  <ArrowRight className={`w-6 h-6 text-gray-400 transition-all duration-300 ${
                    hoveredOption === 'manual' ? 'translate-x-2 text-emerald-600' : ''
                  }`} />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Manual Creation</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Take full control of your project setup. Define every detail from tasks to timelines with precision and flexibility.
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Custom project structure
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Detailed task management
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-3 flex-shrink-0" />
                    Flexible timelines & milestones
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Perfect for detailed planning</span>
                  <div className="flex items-center text-emerald-600">
                    <Clock className="w-4 h-4 mr-1" />
                    5-10 min setup
                  </div>
                </div>
              </div>
            </div>

            {/* AI Creation */}
            <div 
              className={`relative group cursor-pointer transition-all duration-300 ${
                hoveredOption === 'ai' ? 'scale-105' : 'hover:scale-102'
              }`}
              onMouseEnter={() => setHoveredOption('ai')}
              onMouseLeave={() => setHoveredOption(null)}
              onClick={handleAICreate}
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                {/* AI Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-2xl shadow-lg">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <ArrowRight className={`w-6 h-6 text-gray-400 transition-all duration-300 ${
                      hoveredOption === 'ai' ? 'translate-x-2 text-purple-600' : ''
                    }`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">AI-Powered Creation</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Let our intelligent assistant create your project structure. Just describe your goals and watch the magic happen.
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0" />
                      Smart task breakdown
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0" />
                      Automated timeline estimation
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-purple-500 mr-3 flex-shrink-0" />
                      Intelligent resource allocation
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Perfect for quick starts</span>
                    <div className="flex items-center text-purple-600">
                      <Zap className="w-4 h-4 mr-1" />
                      1-2 min setup
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreationPage;