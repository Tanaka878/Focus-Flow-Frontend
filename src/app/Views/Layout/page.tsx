'use client'
import React from "react";
import Navbar from "../NavBar";
import TopNavbar from "../TopNavBar";



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