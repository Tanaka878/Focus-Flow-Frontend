import React, { useState, FormEvent } from 'react';
import { Plus, X, Calendar, Users, Tag, CheckCircle, Clock, Target } from 'lucide-react';

type SubTask = {
  subTaskId?: string;
  title: string;
  description: string;
  estimatedHours: string | number;
  subTaskTimeline: { plannedStart: string; plannedEnd: string };
  status?: string;
};

type Task = {
  taskId?: string;
  title: string;
  description: string;
  status: string;
  assignedTo: string;
  estimatedHours: string | number;
  taskTimeline: { plannedStart: string; plannedEnd: string };
  subTasks: SubTask[];
  createdBy?: string;
};

type Member = {
  memberId?: string;
  name: string;
  role: string;
};

type FormData = {
  projectName: string;
  projectDescription: string;
  author: string;
  projectType: string;
  projectStatus: string;
  projectTimeline: {
    plannedStart: string;
    plannedEnd: string;
    actualStart: string;
    actualEnd: string;
  };
  projectTags: { [key: string]: string };
  members: Member[];
  tasks: Task[];
};

const Create = () => {
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    projectDescription: '',
    author: '',
    projectType: 'PERSONAL',
    projectStatus: 'ACTIVE',
    projectTimeline: {
      plannedStart: '',
      plannedEnd: '',
      actualStart: '',
      actualEnd: ''
    },
    projectTags: {},
    members: [],
    tasks: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [newTag, setNewTag] = useState({ key: '', value: '' });
  const [newMember, setNewMember] = useState<Member>({ name: '', role: '' });
  const [newTask, setNewTask] = useState<Task>({
    title: '',
    description: '',
    status: 'TODO',
    assignedTo: '',
    estimatedHours: '',
    taskTimeline: { plannedStart: '', plannedEnd: '' },
    subTasks: []
  });
  const [newSubTask, setNewSubTask] = useState<SubTask>({
    title: '',
    description: '',
    estimatedHours: '',
    subTaskTimeline: { plannedStart: '', plannedEnd: '' }
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

  const addTag = () => {
    if (newTag.key && newTag.value) {
      setFormData(prev => ({
        ...prev,
        projectTags: {
          ...prev.projectTags,
          [newTag.key]: newTag.value
        }
      }));
      setNewTag({ key: '', value: '' });
    }
  };

  const removeTag = (key: string) => {
    setFormData(prev => {
      const updatedTags = { ...prev.projectTags };
      delete updatedTags[key];
      return {
        ...prev,
        projectTags: updatedTags
      };
    });
  };

  const addMember = () => {
    if (newMember.name && newMember.role) {
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, { ...newMember, memberId: Date.now().toString() }]
      }));
      setNewMember({ name: '', role: '' });
    }
  };

  const removeMember = (memberId: string) => {
    setFormData(prev => ({
      ...prev,
      members: prev.members.filter(member => member.memberId !== memberId)
    }));
  };

  const addSubTask = () => {
    if (newSubTask.title) {
      setNewTask(prev => ({
        ...prev,
        subTasks: [...prev.subTasks, { 
          ...newSubTask, 
          subTaskId: Date.now().toString(),
          status: 'TODO'
        }]
      }));
      setNewSubTask({
        title: '',
        description: '',
        estimatedHours: '',
        subTaskTimeline: { plannedStart: '', plannedEnd: '' }
      });
    }
  };

  const removeSubTask = (subTaskId: string) => {
    setNewTask(prev => ({
      ...prev,
      subTasks: prev.subTasks.filter(subTask => subTask.subTaskId !== subTaskId)
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
        subTasks: []
      });
    }
  };

  const removeTask = (taskId: string) => {
    setFormData(prev => ({
      ...prev,
      tasks: prev.tasks.filter(task => task.taskId !== taskId)
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Project Data:', formData);
    alert('Project created successfully! Check console for data.');
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter author name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => handleInputChange('projectType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="PERSONAL">Personal</option>
                    <option value="TEAM">Team</option>
                    <option value="CLIENT">Client</option>
                    <option value="INTERNAL">Internal</option>
                    <option value="RESEARCH">Research</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Status
                  </label>
                  <select
                    value={formData.projectStatus}
                    onChange={(e) => handleInputChange('projectStatus', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="ON_HOLD">On Hold</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
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
                    Planned Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.projectTimeline.plannedStart}
                    onChange={(e) => handleTimelineChange('plannedStart', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Planned End Date
                  </label>
                  <input
                    type="date"
                    value={formData.projectTimeline.plannedEnd}
                    onChange={(e) => handleTimelineChange('plannedEnd', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Actual Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.projectTimeline.actualStart}
                    onChange={(e) => handleTimelineChange('actualStart', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        value={newMember.name}
        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
        placeholder="Member name"
        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
      />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="text"
          value={newMember.role}
          onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
          placeholder="Role"
          className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
        />
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
          key={member.memberId}
          className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-md sm:rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <span className="font-medium text-sm sm:text-base text-gray-900 truncate">
                {member.name}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 sm:ml-2 mt-0.5 sm:mt-0">
                <span className="hidden sm:inline">• </span>
                {member.role}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => member.memberId && removeMember(member.memberId)}
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

  {/* Project Tags */}
  <div className="px-2 sm:px-0">
    <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
      Project Tags
    </h3>
    {/* Add Tag Form */}
    <div className="flex flex-col gap-y-3 sm:grid sm:grid-cols-1 md:grid-cols-2 sm:gap-4 mb-4">
      <input
        type="text"
        value={newTag.key}
        onChange={(e) => setNewTag({ ...newTag, key: e.target.value })}
        placeholder="Tag key (e.g., priority)"
        className="w-full px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
      />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="text"
          value={newTag.value}
          onChange={(e) => setNewTag({ ...newTag, value: e.target.value })}
          placeholder="Tag value (e.g., high)"
          className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
        />
        <button
          type="button"
          onClick={addTag}
          className="w-full sm:w-auto px-3 py-2.5 sm:px-4 sm:py-3 bg-blue-500 text-white rounded-md sm:rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Plus size={18} className="sm:w-5 sm:h-5 mx-auto" />
        </button>
      </div>
    </div>
    {/* Tags Display */}
    <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
      {Object.entries(formData.projectTags).map(([key, value]) => (
        <div
          key={key}
          className="flex items-center bg-blue-100 text-blue-800 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Tag size={14} className="mr-1 sm:mr-1.5 flex-shrink-0" />
          <span className="truncate max-w-32 sm:max-w-none">
            {key}: {value}
          </span>
          <button
            type="button"
            onClick={() => removeTag(key)}
            className="ml-1.5 sm:ml-2 p-0.5 text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full transition-all duration-200 flex-shrink-0"
          >
            <X size={12} className="sm:w-3 sm:h-3" />
          </button>
        </div>
      ))}
      {Object.keys(formData.projectTags).length === 0 && (
        <div className="text-center py-8 text-gray-500 text-sm w-full">
          No tags added yet
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      placeholder="Task title"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={newTask.assignedTo}
                      onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                      placeholder="Assigned to"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      value={newTask.estimatedHours}
                      onChange={(e) => setNewTask({...newTask, estimatedHours: e.target.value})}
                      placeholder="Estimated hours"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

                  {/* Subtasks */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Subtasks</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                      <input
                        type="text"
                        value={newSubTask.title}
                        onChange={(e) => setNewSubTask({...newSubTask, title: e.target.value})}
                        placeholder="Subtask title"
                        className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={newSubTask.estimatedHours}
                          onChange={(e) => setNewSubTask({...newSubTask, estimatedHours: e.target.value})}
                          placeholder="Hours"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                        <button
                          type="button"
                          onClick={addSubTask}
                          className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      {newTask.subTasks.map((subTask) => (
                        <div key={subTask.subTaskId} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                          <span>{subTask.title} ({subTask.estimatedHours || 0}h)</span>
                          <button
                            type="button"
                            onClick={() => subTask.subTaskId && removeSubTask(subTask.subTaskId)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={addTask}
                    className="w-full md:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
                    {task.subTasks.length > 0 && (
                      <div className="mt-2 pl-4 border-l-2 border-gray-200">
                        <p className="text-sm font-medium text-gray-600">Subtasks:</p>
                        {task.subTasks.map((subTask) => (
                          <div key={subTask.subTaskId} className="text-sm text-gray-600">
                            • {subTask.title} ({subTask.estimatedHours || 0}h)
                          </div>
                        ))}
                      </div>
                    )}
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