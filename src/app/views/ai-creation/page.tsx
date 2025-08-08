'use client';
import React, { useState } from 'react';
import { Sparkles, Send, ArrowLeft, Brain, Zap, CheckCircle2, Bell, Clock, Lightbulb, Target, Users, Calendar } from 'lucide-react';
import BASE_URL from '@/app/utils/api';

const AIProjectCreationPage = () => {
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleBack = () => {
    // Navigate back to project creation options
    console.log('Navigate back to project creation page');
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setDescription(text);
    setCharCount(text.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      // Send to backend
      const response = await fetch(`${BASE_URL}/spring/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: description.trim(),
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to submit project');
      }
    } catch (error) {
      console.error('Error submitting project:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  const suggestionPrompts = [
    "Build a mobile app for food delivery with user authentication, restaurant listings, and order tracking",
    "Create a marketing campaign for a new eco-friendly product launch targeting millennials",
    "Develop a comprehensive employee onboarding system for a 50-person tech startup",
    "Design and implement a customer support chatbot for an e-commerce website"
  ];

  const handleSuggestionClick = (prompt : string) => {
    setDescription(prompt);
    setCharCount(prompt.length);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 text-center">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Project Submitted Successfully!
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our AI is now working on creating your project structure. This usually takes 2-5 minutes.
            </p>
            
            <div className="bg-blue-50 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-blue-900">Notification Settings</h3>
              </div>
              <p className="text-blue-800 text-sm">
                You&apos;ll receive a notification via email and in-app when your project is ready. 
                You can also check the status in your dashboard.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => console.log('Navigate to dashboard')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setDescription('');
                  setCharCount(0);
                }}
                className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
              >
                Create Another Project
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-8">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-4 group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Options
          </button>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-2xl shadow-lg">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            AI Project Creation
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Describe your project idea and let our AI create a comprehensive project structure with tasks, timelines, and team assignments
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {/* Description Input */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <Brain className="w-6 h-6 text-purple-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Describe Your Project</h2>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                    placeholder="Describe your project in detail. Include goals, features, target audience, timeline preferences, and any specific requirements. The more detail you provide, the better our AI can structure your project."
                    className="w-full h-40 p-6 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500 text-lg leading-relaxed"
                    maxLength={2000}
                    required
                  />
                  <div className="absolute bottom-4 right-4 text-sm text-gray-400">
                    {charCount}/2000
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 bg-amber-50 p-4 rounded-xl">
                  <Lightbulb className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0" />
                  <span>
                    <strong>Tip:</strong> Include details like project type, team size, deadlines, specific features, and success criteria for best results.
                  </span>
                </div>
              </div>
            </div>

            {/* Suggestion Prompts */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Need Inspiration? Try These Examples</h3>
              <div className="grid gap-4">
                {suggestionPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionClick(prompt)}
                    className="text-left p-4 border border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
                  >
                    <div className="flex items-start">
                      <Zap className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 group-hover:text-purple-700 transition-colors">
                        {prompt}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Processing Info */}
              <h3 className="text-2xl font-bold mb-6">What Our AI Will Create</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <Target className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Smart Task Breakdown</h4>
                    <p className="text-purple-100 text-sm">Intelligent decomposition of your project into manageable tasks and subtasks</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Timeline Estimation</h4>
                    <p className="text-purple-100 text-sm">Realistic deadlines and milestones based on project complexity and best practices</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Resource Planning</h4>
                    <p className="text-purple-100 text-sm">Suggested team roles, skills needed, and resource allocation recommendations</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={!description.trim() || isSubmitting}
                onClick={handleSubmit}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-200 flex items-center mx-auto"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
                    Processing with AI...
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6 mr-3" />
                    Create Project with AI
                  </>
                )}
              </button>
              
              {isSubmitting && (
                <div className="mt-6 bg-blue-50 rounded-2xl p-6 max-w-md mx-auto">
                  <div className="flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="text-blue-900 font-semibold">Estimated Time: 2-5 minutes</span>
                  </div>
                  <p className="text-blue-800 text-sm">
                    Our AI is analyzing your description and creating a comprehensive project structure. 
                    You&apos;ll be notified when it&apos;s complete!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default AIProjectCreationPage;