import { Bell, User, Settings, LogOut, Check, Clock, Star, MessageCircle, Calendar, Shield } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const TopNavbar = () => {
  const [isNotificationTabOpen, setIsNotificationTabOpen] = useState(false);
  const [isProfileTabOpen, setIsProfileTabOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Sample notifications data
  const notifications = [
    {
      id: 1,
      type: 'task',
      icon: Check,
      title: 'Task completed',
      message: 'You completed "Design wireframes"',
      time: '2 minutes ago',
      read: false,
      color: 'text-green-600 bg-green-100'
    },
    {
      id: 2,
      type: 'reminder',
      icon: Clock,
      title: 'Reminder',
      message: 'Meeting with client in 30 minutes',
      time: '5 minutes ago',
      read: false,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      id: 3,
      type: 'achievement',
      icon: Star,
      title: 'Achievement unlocked',
      message: 'You reached a 7-day streak!',
      time: '1 hour ago',
      read: true,
      color: 'text-yellow-600 bg-yellow-100'
    },
    {
      id: 4,
      type: 'comment',
      icon: MessageCircle,
      title: 'New comment',
      message: 'Sarah commented on your project',
      time: '2 hours ago',
      read: true,
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Profile menu items
  const profileMenuItems = [
    { icon: User, label: 'View Profile', action: 'profile' },
    { icon: Settings, label: 'Settings', action: 'settings' },
    { icon: Calendar, label: 'My Schedule', action: 'schedule' },
    { icon: Shield, label: 'Privacy', action: 'privacy' },
    { icon: LogOut, label: 'Sign Out', action: 'logout', danger: true }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationTabOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileTabOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleNotificationClick() {
    setIsNotificationTabOpen(!isNotificationTabOpen);
    setIsProfileTabOpen(false);
  }

  function handleProfileClick() {
    setIsProfileTabOpen(!isProfileTabOpen);
    setIsNotificationTabOpen(false);
  }

  function handleProfileMenuClick(action: string) {
    setIsProfileTabOpen(false);
    if (action === 'logout') {
      // Optionally clear auth data here
      router.push('/Views/login');
      return;
    }
    // Handle other actions here
    console.log(`Profile action: ${action}`);
  }

  function markAsRead(notificationId: number) {
    console.log(`Marking notification ${notificationId} as read`);
  }

  function markAllAsRead() {
    console.log('Marking all notifications as read');
  }

  return (
    <nav className="sticky top-0 left-0 w-full h-16 bg-white/80 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm">
      <div className="flex items-center justify-between h-full px-6 max-w-7xl mx-auto">
        
        {/* App Logo/Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-semibold text-gray-800 hidden sm:block">ProductivePro</span>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          
          {/* Notification Button */}
          <div className="relative" ref={notificationRef}>
            <button 
              className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-200 relative group"
              onClick={handleNotificationClick}
            >
              <Bell size={20} className="text-gray-600 group-hover:text-gray-800" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center px-1 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotificationTabOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                    {unreadCount > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => {
                      const IconComponent = notification.icon;
                      return (
                        <div 
                          key={notification.id}
                          className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${!notification.read ? 'bg-blue-50/50' : ''}`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg ${notification.color} flex-shrink-0`}>
                              <IconComponent size={16} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                )}
                              </div>
                              <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                              <p className="text-gray-400 text-xs mt-2">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <Bell size={48} className="mx-auto mb-4 text-gray-300" />
                      <p>No notifications yet</p>
                    </div>
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="p-3 bg-gray-50 border-t border-gray-100">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                      View all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Button */}
          <div className="relative" ref={profileRef}>
            <button 
              className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg ring-2 ring-blue-500/20"
              onClick={handleProfileClick}
            >
              <span className="text-white font-semibold text-sm">T</span>
            </button>

            {/* Profile Dropdown */}
            {isProfileTabOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">T</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Taylor Smith</h3>
                      <p className="text-sm text-gray-600">taylor@example.com</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-2">
                  {profileMenuItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleProfileMenuClick(item.action)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left ${
                          item.danger ? 'text-red-600 hover:bg-red-50' : 'text-gray-700'
                        }`}
                      >
                        <IconComponent size={18} />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="p-3 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Productivity Score</span>
                    <span className="font-semibold text-green-600">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000" style={{ width: '87%' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;