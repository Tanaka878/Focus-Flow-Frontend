'use client'
import React, { useState } from "react";
import { Plus, Home, Settings, Bell } from "lucide-react";

const TopNavbar = () => {
  return (
    <nav className="sticky top-0 left-0 w-full h-14 bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="flex items-center justify-between h-full px-4 max-w-4xl mx-auto">
        {/* Notification icon on the left */}
        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative">
          <Bell size={20} className="text-gray-600" />
          {/* Notification badge */}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        {/* Circled T on the right */}
        <button className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200">
          <span className="text-white font-semibold text-sm">T</span>
        </button>
      </div>
    </nav>
  );
};

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'create', icon: Plus, label: 'Create' },
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <nav className="sticky bottom-0 left-0 w-full h-16 bg-gray-900 border-t border-gray-700 z-50 mt-auto">
      <div className="flex items-center justify-around h-full max-w-md mx-auto px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`
                flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'text-blue-400 bg-blue-400/10 scale-110' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }
                min-w-0 flex-1 max-w-20
              `}
            >
              <Icon 
                size={20} 
                className={`mb-1 ${isActive ? 'animate-pulse' : ''}`}
              />
              <span className="text-xs font-medium truncate">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default function Layout({  }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopNavbar />
      <div className="flex-1 max-w-4xl mx-auto px-4 py-6 w-full">
        
        {/* Demo content to show the navbar in action */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">FocusFlow</h1>
            <p className="text-gray-600 mb-4">
              Welcome to your productivity dashboard. The navigation bar below is fully responsive and includes:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Create button (+) for adding new items</li>
              <li>Home button for navigation</li>
              <li>Settings button for configuration</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Responsive Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h3 className="font-medium text-gray-900">Mobile ({'<'} 768px)</h3>
                <p>Full-width navbar with centered icons</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Desktop (≥ 768px)</h3>
                <p>Constrained width with better spacing</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Interactive Elements</h2>
            <p className="text-gray-600">
              Click the navigation buttons to see active states, hover effects, and smooth transitions.
              The active button has a blue accent color and subtle scaling animation.
            </p>
          </div>
          
          {/* Add some height to demonstrate scrolling */}
          <div className="h-96 bg-gradient-to-b from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-600 text-center">
              Scroll down to see how the fixed navbar stays in place
            </p>
          </div>
          
          <div className="h-96 bg-gradient-to-b from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-600 text-center">
              The navbar is always accessible at the bottom of the screen
            </p>
          </div>
        </div>
      </div>
      
      <Navbar />
    </div>
  );
}