import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Zap, CheckCircle2, Timer, FileText, Play, Plus } from 'lucide-react';
import BASE_URL from '../utils/api';

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [, setAnimatedValue] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);  

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const animation = setInterval(() => {
      setAnimatedValue(prev => (prev + 1) % 100);
    }, 50);
    return () => {
      clearInterval(timer);
      clearInterval(animation);
    };
  }, []);


   useEffect(() => {
    const email = localStorage.getItem("userEmail") || "musungaretanaka";
    fetch(`${BASE_URL}/api/projects/getMyStats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then(res => res.json())
      .then(data => {
        setCompletedTasks(data.completedDailyTasks); 
        console.log("Fetched data:", data);
        // Mapping upcomingTaskDetails to priorities using the imported interface
        
      })
   
  }, []);


  const quickStats = [
    { label: 'Tasks Done', value: completedTasks, icon: CheckCircle2, color: 'from-emerald-400 to-green-600', change: '+3' },
    { label: 'Focus Time', value: '4h 32m', icon: Timer, color: 'from-blue-400 to-indigo-600', change: '+45m' }
  ];

  const upcomingDeadlines = [
    { task: 'Product launch presentation', due: 'Tomorrow, 2PM', urgent: true },
    { task: 'Monthly report', due: 'Thu, Jun 19', urgent: false },
    { task: 'Team review', due: 'Fri, Jun 20', urgent: false }
  ];

  const todaysSchedule = [
    { event: 'Daily standup', time: '9:00 AM', status: 'completed' },
    { event: 'Client presentation', time: '2:00 PM', status: 'upcoming' },
    { event: 'Team retrospective', time: '4:30 PM', status: 'upcoming' }
  ];

  const quickActions = [
    { label: 'Add Task', icon: Plus, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
    { label: 'Timer', icon: Play, color: 'bg-gradient-to-r from-green-500 to-green-600' },
    { label: 'Note', icon: FileText, color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
    { label: 'Schedule', icon: Calendar, color: 'bg-gradient-to-r from-orange-500 to-orange-600' }
  ]; 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Responsive */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Good {currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 18 ? 'Afternoon' : 'Evening'}!
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base lg:text-lg">Ready to make today productive?</p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-xl sm:text-2xl font-semibold text-gray-800">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-sm text-gray-500">
                {currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="group relative overflow-hidden bg-white rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                <div className="p-3 sm:p-4 lg:p-6 relative">
                  <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
                    <div className={`p-2 lg:p-3 rounded-lg lg:rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                      <Icon className="w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-green-600 bg-green-100 px-1.5 py-0.5 lg:px-2 lg:py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-xs sm:text-sm">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
          
          {/* Quick Actions - Takes full width on mobile, 1/2 on desktop */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 sm:p-5 lg:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-5 lg:mb-6 flex items-center gap-2 sm:gap-3">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button key={index} className={`${action.color} hover:scale-105 text-white p-3 sm:p-4 rounded-lg lg:rounded-xl transition-all duration-200 transform hover:shadow-lg flex flex-col items-center gap-2 group`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
                      <span className="text-xs sm:text-sm font-medium">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Deadlines - Takes full width on mobile, 1/2 on desktop */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden h-full">
              <div className="p-4 sm:p-5 lg:p-6 border-b border-gray-100">
                <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  Deadlines
                </h2>
              </div>
              <div className="p-4 sm:p-5 lg:p-6 space-y-3 sm:space-y-4">
                {upcomingDeadlines.map((deadline, index) => (
                  <div key={index} className={`p-3 sm:p-4 rounded-lg lg:rounded-xl border-l-4 ${deadline.urgent ? 'border-red-400 bg-red-50' : 'border-blue-400 bg-blue-50'} hover:shadow-md transition-shadow`}>
                    <p className="font-medium text-gray-900 text-xs sm:text-sm">{deadline.task}</p>
                    <p className={`text-xs mt-1 ${deadline.urgent ? 'text-red-600' : 'text-blue-600'}`}>
                      {deadline.due}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Today's Schedule - Full width at bottom */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 sm:p-5 lg:p-6 border-b border-gray-100">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 sm:gap-3">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500" />
              Today&apos;s Schedule
            </h2>
          </div>
          <div className="p-4 sm:p-5 lg:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {todaysSchedule.map((event, index) => (
                <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${event.status === 'completed' ? 'bg-green-400' : 'bg-indigo-400'}`}></div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium text-xs sm:text-sm ${event.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {event.event}
                    </p>
                    <p className="text-xs text-gray-500">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;