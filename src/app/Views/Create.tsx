import React, { useState, FormEvent } from 'react';
import { Plus, X, Calendar, Users, CheckCircle, Clock, Target } from 'lucide-react';
import BASE_URL from '../utils/api';



type Task = {
  taskId?: string;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  estimatedHours: string | number;
  taskTimeline: { plannedStart: string; plannedEnd: string };
  createdBy?: string;
};

type Member = {
  email: string;
  memberId?: string; // Added to match usage
};

type FormData = {
  projectName: string;
  projectDescription: string;
  author: string;
  projectType: string;
  projectStatus: string;
  projectTimeline: {
    actualStart: string;
    actualEnd: string;
  };
  projectTags: { [key: string]: string };
  members: Member[];
  tasks: Task[]; // <-- Added this line
};

const Create: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    projectDescription: '',
    author: '',
    projectType: 'PERSONAL',
    projectStatus: 'ACTIVE',
    projectTimeline: {
      actualStart: '',
      actualEnd: ''
    },
    projectTags: {},
    members: [],
    tasks: [], // <-- Added this line
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [newMember, setNewMember] = useState<Member>({ email: '' });
  const [newTask, setNewTask] = useState<Task>({
    title: '',
    description: '',
    status: 'TODO',
    assignedTo: '',
    estimatedHours: '',
    taskTimeline: { plannedStart: '', plannedEnd: '' },
  });
 

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTimelineChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      projectTimeline: {
        ...prev.projectTimeline,
        [field]: value
      }
    }));
  };



  const addMember = () => {
    if (newMember.email ) {
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, { ...newMember, memberId: Date.now().toString() }]
      }));
      setNewMember({ email: ''});
    }
  };

  const removeMember = (email: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.filter(member => member.email !== email)
    }));
  };



  const addTask = () => {
    if (newTask.title) {
      setFormData(prev => ({
        ...prev,
        tasks: [...prev.tasks, { 
          ...newTask, 
          taskId: Date.now().toString(),
          createdBy: formData.author,
          estimatedHours: typeof newTask.estimatedHours === 'string'
            ? parseFloat(newTask.estimatedHours) || 0
            : newTask.estimatedHours || 0
        }]
      }));
      setNewTask({
        title: '',
        description: '',
        status: 'TODO',
        assignedTo: '',
        estimatedHours: '',
        taskTimeline: { plannedStart: '', plannedEnd: '' },
      });
    }
  };

  const removeTask = (taskId: string) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.taskId !== taskId)
    }));
  };

  const postProjectData = async (data: FormData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/projects/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Failed to create project');
      }
      return await response.json();
    } catch (error) {
      console.error('Error posting project:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await postProjectData(formData);
      alert('Project created successfully!');
    } catch {
      alert('Failed to create project. Please try again.');
    }
  };

  const steps = [
    { id: 1, title: 'Basic Info', icon: Target },
    { id: 2, title: 'Timeline', icon: Calendar },
    { id: 3, title: 'Team & Tags', icon: Users },
    { id: 4, title: 'Tasks', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Create New Project</h1>
          <p className="text-gray-600">Build your next great project with detailed planning</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
              <div className="flex items-center gap-2 md:gap-4 overflow-x-auto py-2 px-1 -mx-1">            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      currentStep >= step.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 ml-4 ${
                      currentStep > step.id ? 'bg-blue-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Project Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={formData.projectName}
                    onChange={(e) => handleInputChange('projectName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Enter project name (3-100 characters)"
                    required
                    minLength={3}
                    maxLength={100}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description *
                  </label>
                  <textarea
                    value={formData.projectDescription}
                    onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    placeholder="Describe your project (max 500 characters)"
                    required
                    maxLength={500}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.projectDescription.length}/500 characters
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* Step 2: Timeline */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Project Timeline</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Actual Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.projectTimeline.actualStart}
                    onChange={(e) => handleTimelineChange('actualStart', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Actual End Date
                  </label>
                  <input
                    type="date"
                    value={formData.projectTimeline.actualEnd}
                    onChange={(e) => handleTimelineChange('actualEnd', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                </div>
              </div>
            </div>
          )}

{/* Step 3: Team & Tags */}
{currentStep === 3 && (
  <div className="space-y-6 sm:space-y-8">
    <div className="px-2 sm:px-0">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
        Team &amp; Tags
      </h2>
    </div>

    {/* Team Members */}
    <div className="px-2 sm:px-0">
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
        Team Members
      </h3>
      {/* Add Member Form */}
      <div className="flex flex-col gap-y-3 sm:grid sm:grid-cols-1 md:grid-cols-2 sm:gap-4 mb-4">
        <input
          type="text"
          value={newMember.email}
          onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
          placeholder="Member email"
          className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base text-black"
        />
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          
          <button
            type="button"
            onClick={addMember}
            className="w-full sm:w-auto px-3 py-2.5 sm:px-4 sm:py-3 bg-blue-500 text-white rounded-md sm:rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Plus size={18} className="sm:w-5 sm:h-5 mx-auto" />
          </button>
        </div>
      </div>
      {/* Members List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {formData.members.map((member) => (
          <div
            key={member.email}
            className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-md sm:rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-medium text-sm sm:text-base text-gray-900 truncate">
                  {member.email}
                </span>
               
              </div>
            </div>
            <button
              type="button"
              onClick={() => member.email && removeMember(member.email)}
              className="ml-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200 flex-shrink-0"
            >
              <X size={16} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        ))}
        {formData.members.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            No team members added yet
          </div>
        )}
      </div>
    </div>
  </div>
)}


{/* Step 4: Tasks */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Project Tasks</h2>
    {/* Add New Task */}
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Task</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
            placeholder="Task title"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          />
          <select
            value={newTask.status}
            onChange={(e) => setNewTask({...newTask, status: e.target.value})}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="TODO">To Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
        <textarea
          value={newTask.description}
          onChange={(e) => setNewTask({...newTask, description: e.target.value})}
          placeholder="Task description"
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-black">
          <input
            type="number"
            value={newTask.estimatedHours}
            onChange={(e) => setNewTask({...newTask, estimatedHours: e.target.value})}
            placeholder="Estimated hours"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={newTask.taskTimeline.plannedStart}
              onChange={(e) => setNewTask({
                ...newTask,
                taskTimeline: {...newTask.taskTimeline, plannedStart: e.target.value}
              })}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="date"
              value={newTask.taskTimeline.plannedEnd}
              onChange={(e) => setNewTask({
                ...newTask,
                taskTimeline: {...newTask.taskTimeline, plannedEnd: e.target.value}
              })}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={addTask}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Task
        </button>
      </div>
    </div>
    {/* Task List */}
    <div className="space-y-4">
      {formData.tasks.map((task) => (
        <div key={task.taskId} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-gray-800">{task.title}</h4>
              <p className="text-gray-600 text-sm">{task.description}</p>
            </div>
            <button
              type="button"
              onClick={() => task.taskId && removeTask(task.taskId)}
              className="text-red-500 hover:text-red-700"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {task.status.replace('_', ' ')}
            </span>
            {task.assignedTo && (
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                {task.assignedTo}
              </span>
            )}
            {task.estimatedHours && (
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
                <Clock size={12} className="inline mr-1" />
                {task.estimatedHours}h
              </span>
            )}
          </div>
          
        </div>
      ))}
    </div>
  </div>
)}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Next
              </button>
            ) : (
                          <button
                type="submit"
                onClick={handleSubmit}
                className="px-4 py-2 sm:px-6 sm:py-2.5 bg-green-500 text-white rounded-md sm:rounded-lg hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium text-sm sm:text-base shadow-sm hover:shadow-md transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                Create Project
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;