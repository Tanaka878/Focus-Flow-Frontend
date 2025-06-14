import { Bell } from "lucide-react";

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

export default TopNavbar;