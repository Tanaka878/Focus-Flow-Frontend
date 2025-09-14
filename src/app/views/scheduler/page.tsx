"use client";
import React, { useEffect, useState } from "react";
import BASE_URL from "@/app/utils/api";

interface RecursiveTask {
  id?: string;
  name: string;
  taskDuration: number;
  frequency: string;
  taskStartTime: string;
}

const Page = () => {
  const [tasks, setTasks] = useState<RecursiveTask[]>([]);
  const [newTask, setNewTask] = useState<RecursiveTask>({
    name: "",
    taskDuration: 0,
    frequency: "DAILY",
    taskStartTime: "09:00:00",
  });

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/recursive/all`);
      const data = await response.json();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    try {
      await fetch(`${BASE_URL}/api/recursive/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      await fetchTasks();
      setNewTask({ name: "", taskDuration: 0, frequency: "DAILY", taskStartTime: "09:00:00" });
    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  const updateTask = async (task: RecursiveTask) => {
    try {
      await fetch(`${BASE_URL}/api/recursive/update/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      await fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  const deleteTask = async (id?: string) => {
    try {
      await fetch(`${BASE_URL}/api/recursive/delete/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-gray-900">Recursive Tasks</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your recurring tasks and schedules</p>
          </div>

          {/* New Task Form */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Create New Task</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Name</label>
                <input
                  type="text"
                  placeholder="Enter task name"
                  value={newTask.name}
                  onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                <input
                  type="number"
                  placeholder="30"
                  value={newTask.taskDuration}
                  onChange={(e) => setNewTask({ ...newTask, taskDuration: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <select
                  value={newTask.frequency}
                  onChange={(e) => setNewTask({ ...newTask, frequency: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                >
                  <option value="DAILY">Daily</option>
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                <input
                  type="time"
                  value={newTask.taskStartTime}
                  onChange={(e) => setNewTask({ ...newTask, taskStartTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={createTask}
                disabled={!newTask.name.trim()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Create Task
              </button>
            </div>
          </div>

          {/* Tasks Table */}
          <div className="px-6 py-4">
            {tasks.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 text-lg mb-2">📋</div>
                <p className="text-gray-500 text-sm">No tasks available</p>
                <p className="text-gray-400 text-xs">Create your first recurring task above</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Task Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration (min)
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Frequency
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Time
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={task.name}
                            onChange={(e) =>
                              setTasks(
                                tasks.map((t) =>
                                  t.id === task.id ? { ...t, name: e.target.value } : t
                                )
                              )
                            }
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={task.taskDuration}
                            onChange={(e) =>
                              setTasks(
                                tasks.map((t) =>
                                  t.id === task.id
                                    ? { ...t, taskDuration: Number(e.target.value) }
                                    : t
                                )
                              )
                            }
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={task.frequency}
                            onChange={(e) =>
                              setTasks(
                                tasks.map((t) =>
                                  t.id === task.id ? { ...t, frequency: e.target.value } : t
                                )
                              )
                            }
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
                          >
                            <option value="DAILY">Daily</option>
                            <option value="WEEKLY">Weekly</option>
                            <option value="MONTHLY">Monthly</option>
                          </select>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="time"
                            value={task.taskStartTime}
                            onChange={(e) =>
                              setTasks(
                                tasks.map((t) =>
                                  t.id === task.id ? { ...t, taskStartTime: e.target.value } : t
                                )
                              )
                            }
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateTask(task)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                            >
                              Update
                            </button>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;