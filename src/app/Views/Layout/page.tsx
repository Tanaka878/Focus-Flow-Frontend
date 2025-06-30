'use client'
import React, { useState } from "react";
import Navbar from "../NavBar";
import TopNavbar from "../TopNavBar";
import Home from "../Home";
import Settings from "../Settings";
import ProjectCreationPage from "../ProjectCreation/page";

export default function Layout({  }) {
    const [currentView, setCurrentView] = useState('Home');

  
const renderContent = () => {
    switch (currentView) {
      case 'Home':
        return <Home />;
      case 'Settings':
        return <Settings />;
      case 'Create':
        return < ProjectCreationPage/>; 
      
      default:
        return <Home />;
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopNavbar />
      <div className="flex-1 max-w-4xl mx-auto px-4 py-6 w-full">
        
        {/* Demo content to show the navbar in action */}
        <div className="space-y-6">
          
          
          
          
          
          {renderContent()}
         
          
          
        </div>
      </div>
      
      <Navbar
          onSelectPage={(view) => setCurrentView(view)}

       />
    </div>
  );
}