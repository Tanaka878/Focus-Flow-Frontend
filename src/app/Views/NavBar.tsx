import { Plus, Home, Settings } from "lucide-react";
import React, { useState } from "react";
import NavBarProps from "../Interfaces/NavBarProps";


const Navbar: React.FC<NavBarProps> = ({onSelectPage}) => {
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'create', icon: Plus, label: 'Create' },
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  function handleClick(id: string, label: string){
    console.log(id)
    setActiveTab(id)
    onSelectPage(label)

  }

  return (
    <nav className="sticky bottom-0 left-0 w-full h-16 bg-gray-900 border-t border-gray-700 z-50 mt-auto">
      <div className="flex items-center justify-around h-full max-w-md mx-auto px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
                        onClick={()=> handleClick(item.id, item.label)}
                        
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

export default Navbar;