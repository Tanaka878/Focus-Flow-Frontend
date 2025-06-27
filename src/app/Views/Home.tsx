import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Target, Zap, Trophy, CheckCircle2, Timer, TrendingUp, Star } from 'lucide-react';
import BASE_URL from '../utils/api';
import DailyPriorities from '../Interfaces/DailyPriorites';

// Remove the local DailyPriorities type definition

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedValue, setAnimatedValue] = useState(0);
  const [todaysPriorities, setTodaysPriorities] = useState<DailyPriorities[]>([]);
  const [loadingPriorities, setLoadingPriorities] = useState(true);
  const [completedTasks, setCompletedTasks] = useState<number>(0);  

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
    setLoadingPriorities(true);
    fetch(`${BASE_URL}/api/projects/getMyStats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then(res => res.json())
      .then(data => {

        console.log("Fetched data:", data.completedDailyTasks);
        setCompletedTasks(data.completedDailyTasks || 0); 
        // Mapping upcomingTaskDetails to priorities using the imported interface
        if (data && data.upcomingTaskDetails) {
          setTodaysPriorities(
            data.upcomingTaskDetails.map((task: { title: string; description?: string }, idx: number) => ({
              id: (idx + 1).toString(), 
              title: task.title,
              description: task.description || "",
              priority: "medium", 
              completed: false,   
              time: "",          
            }))
          );
        } else {
          setTodaysPriorities([]);
        }
      })
      .catch(() => setTodaysPriorities([]))
      .finally(() => setLoadingPriorities(false));
  }, []);

  const quickStats = [
    { label: 'Tasks Done Today', value: completedTasks, icon: CheckCircle2, color: 'from-emerald-400 to-green-600', change: '+3' },
    { label: 'Focus Time', value: '4h 32m', icon: Timer, color: 'from-blue-400 to-indigo-600', change: '+45m' },
    { label: 'Current Streak', value: 23, icon: Zap, color: 'from-amber-400 to-orange-600', change: 'days' },
    { label: 'Productivity Score', value: 87, icon: TrendingUp, color: 'from-purple-400 to-pink-600', change: '+12%' }
  ];

  const recentActivity = [
    { action: 'Completed "Design wireframes"', time: '12 minutes ago', type: 'task' },
    { action: 'Started focus session', time: '1 hour ago', type: 'focus' },
    { action: 'Added 3 new tasks', time: '2 hours ago', type: 'create' },
    { action: 'Achieved daily goal', time: '3 hours ago', type: 'achievement' }
  ];

  const upcomingDeadlines = [
    { task: 'Product launch presentation', due: 'Tomorrow, 2:00 PM', urgent: true },
    { task: 'Monthly report submission', due: 'Thu, Jun 19', urgent: false },
    { task: 'Team performance review', due: 'Fri, Jun 20', urgent: false }
  ];

  const todaysSchedule = [
    { event: 'Daily standup', time: '9:00 AM', status: 'completed' },
    { event: 'Client presentation', time: '2:00 PM', status: 'upcoming' },
    { event: 'Team retrospective', time: '4:30 PM', status: 'upcoming' }
  ];

  /* const quickActions = [
    { label: 'Add Task', icon: Plus, color: 'bg-gradient-to-r from-blue-500 to-blue-600', hoverColor: 'hover:from-blue-600 hover:to-blue-700' },
    { label: 'Start Timer', icon: Play, color: 'bg-gradient-to-r from-green-500 to-green-600', hoverColor: 'hover:from-green-600 hover:to-green-700' },
    { label: 'New Note', icon: FileText, color: 'bg-gradient-to-r from-purple-500 to-purple-600', hoverColor: 'hover:from-purple-600 hover:to-purple-700' },
    { label: 'Schedule', icon: Calendar, color: 'bg-gradient-to-r from-orange-500 to-orange-600', hoverColor: 'hover:from-orange-600 hover:to-orange-700' }
  ]; */

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-400 bg-red-50';
      case 'medium': return 'border-yellow-400 bg-yellow-50';
      case 'low': return 'border-green-400 bg-green-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-400';
      case 'medium': return 'bg-yellow-400';
      case 'low': return 'bg-green-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Good {currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 18 ? 'Afternoon' : 'Evening'}!
              </h1>
              <p className="text-gray-600 mt-2 text-lg">Ready to make today productive?</p>
            <div className="text-right">
              <div className="text-2xl font-semibold text-gray-800">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-gray-500">
                {currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                <div className="p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Today's Priorities */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900">Today&apos;s Priorities</h2>
                <span className="ml-auto bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                  {todaysPriorities.filter(t => !t.completed).length} remaining
                </span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {loadingPriorities ? (
                <div>Loading priorities...</div>
              ) : todaysPriorities.length === 0 ? (
                <div>No priorities for today.</div>
              ) : (
                todaysPriorities.map((item) => (
                  <div key={item.id} className={`p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md ${getPriorityColor(item.priority)} ${item.completed ? 'opacity-60' : ''}`}>
                    <div className="flex items-center gap-4">
                      <button className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-colors ${item.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-indigo-400'}`}>
                        {item.completed && <CheckCircle2 className="w-5 h-5 text-white" />}
                      </button>
                      <div className="flex-1">
                        <div className={`font-medium ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {item.title}
                        </div>
                        {item.description && (
                          <div className="text-sm text-gray-500">{item.description}</div>
                        )}
                        <div className="flex items-center gap-3 mt-1">
                          <div className={`w-2 h-2 rounded-full ${getPriorityDot(item.priority)}`}></div>
                          <span className="text-sm text-gray-500 capitalize">{item.priority} priority</span>
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">{item.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Actions */}
         {/*  <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Zap className="w-6 h-6 text-purple-600" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button key={index} className={`${action.color} ${action.hoverColor} text-white p-4 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg flex flex-col items-center gap-2 group`}>
                      <Icon className="w-6 h-6 group-hover:animate-pulse" />
                      <span className="text-sm font-medium">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div> */}

            {/* Current Streak */}
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-8 h-8" />
                <div>
                  <h3 className="text-lg font-bold">Streak Power!</h3>
                  <p className="text-amber-100 text-sm">Keep the momentum going</p>
                </div>
              </div>
              <div className="text-4xl font-bold mb-2">23 Days</div>
              <div className="w-full bg-amber-200 rounded-full h-2">
                <div className="bg-white rounded-full h-2 transition-all duration-1000" style={{ width: `${(animatedValue % 30) * 3.33}%` }}></div>
              </div>
              <p className="text-sm text-amber-100 mt-2">7 days until next milestone!</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-500" />
                Recent Activity
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'task' ? 'bg-green-400' : activity.type === 'focus' ? 'bg-blue-400' : activity.type === 'create' ? 'bg-purple-400' : 'bg-yellow-400'}`}></div>
                  <div>
                    <p className="text-gray-900 text-sm font-medium">{activity.action}</p>
                    <p className="text-gray-500 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <Clock className="w-6 h-6 text-red-500" />
                Deadlines
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className={`p-4 rounded-xl border-l-4 ${deadline.urgent ? 'border-red-400 bg-red-50' : 'border-blue-400 bg-blue-50'} hover:shadow-md transition-shadow`}>
                  <p className="font-medium text-gray-900 text-sm">{deadline.task}</p>
                  <p className={`text-xs mt-1 ${deadline.urgent ? 'text-red-600' : 'text-blue-600'}`}>
                    {deadline.due}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-indigo-500" />
                Today&apos;s Schedule
              </h2>
            </div>
            <div className="p-6 space-y-4">
              {todaysSchedule.map((event, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={`w-3 h-3 rounded-full ${event.status === 'completed' ? 'bg-green-400' : 'bg-indigo-400'}`}></div>
                  <div className="flex-1">
                    <p className={`font-medium text-sm ${event.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
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