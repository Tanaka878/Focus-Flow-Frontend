import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Zap, CheckCircle2, Timer, FileText, Play, Plus } from 'lucide-react';
import BASE_URL from '../utils/api';
import ProjectInfo from '../Interfaces/ProjectInfo';

interface UpcomingTaskDetails {
  title: string;
  description: string;
  localDate: string;
}

function QuickAction(label: string) {
  console.log(`Quick Action selected: ${label}`);
  switch (label) {
    case 'Add Task':
      window.location.href = '/views/manual-creation/';
      break;
    case 'Timer':
      window.location.href = '/Views/Timer/';
      break;
    case 'Note':
      window.location.href = '/views/notes-page/';
      break;
  }
}

const Home = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [, setAnimatedValue] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<number | null>(null);
  const [upcomingTasks, setUpcomingTasks] = useState<UpcomingTaskDetails[]>([]);
  const [projectInfo, setProjectInfo] = useState<ProjectInfo[]>([]);

  useEffect(() => {
    const ownerEmail = localStorage.getItem("userEmail") || "";
    fetch(`${BASE_URL}/api/projects/projectInfo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ownerEmail }),
    })
      .then(res => res.json())
      .then(data => {
        setProjectInfo(data.setProjectInfo || []);
        setUpcomingTasks(Array.isArray(data.upcomingTaskDetails) ? data.upcomingTaskDetails : []);
      })
      .catch(err => console.error("Error fetching project info:", err));
  }, []);

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
    const email = localStorage.getItem("userEmail") || "";
    fetch(`${BASE_URL}/api/projects/getMyStats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then(res => res.json())
      .then(data => {
        setCompletedTasks(data.completedDailyTasks ?? null);
        setUpcomingTasks(Array.isArray(data.upcomingTaskDetails) ? data.upcomingTaskDetails : []);
      })
      .catch(err => console.error("Error fetching stats:", err));
  }, []);

  const quickActions = [
    { label: 'Add Task', icon: Plus, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
    { label: 'Timer', icon: Play, color: 'bg-gradient-to-r from-green-500 to-green-600' },
    { label: 'Note', icon: FileText, color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
    { label: 'Schedule', icon: Calendar, color: 'bg-gradient-to-r from-orange-500 to-orange-600' }
  ];

  const upcomingDeadlines = upcomingTasks.map(task => ({
    task: task.title,
    due: task.localDate,
    urgent: false, // Add your own urgency logic if needed
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Greeting */}
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

        {/* Quick Stats - dynamic only */}
        {completedTasks !== null && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
            <div className="group relative overflow-hidden bg-white rounded-xl shadow-lg">
              <div className="p-3 sm:p-4 lg:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
                  <div className="p-2 lg:p-3 rounded-lg bg-green-500 shadow-lg">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{completedTasks}</div>
                <div className="text-gray-600 text-xs sm:text-sm">Tasks Done</div>
              </div>
            </div>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-4 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-5 lg:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" /> Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      className={`${action.color} hover:scale-105 text-white p-3 rounded-lg transition-all duration-200 flex flex-col items-center gap-2`}
                      onClick={() => QuickAction(action.label)}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Deadlines */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-500" /> Deadlines
                </h2>
              </div>
              <div className="p-4 space-y-3">
                {upcomingDeadlines.length === 0 ? (
                  <p className="text-sm text-gray-500">No deadlines available</p>
                ) : (
                  upcomingDeadlines.map((deadline, index) => (
                    <div key={index} className="p-3 rounded-lg border-l-4 border-blue-400 bg-blue-50">
                      <p className="font-medium text-gray-900 text-xs">{deadline.task}</p>
                      <p className="text-xs text-blue-600 mt-1">{deadline.due}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="text-black mt-3">
          {projectInfo.length === 0 ? (
            <p>No project info available</p>
          ) : (
            projectInfo.map(project => (
              <div key={project.id} className="mb-4 border-b pb-2">
                <h2 className="text-lg font-semibold">{project.name}</h2>
                <p className="text-sm text-gray-600">Status: {project.status}</p>
                <p className="text-sm">{project.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
