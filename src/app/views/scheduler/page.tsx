"use client";
import React, { useEffect, useState } from "react";

interface RecursiveTask {
  id?: number;
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

  const BASE_URL = "http://localhost:8080/api/recursive";

  // Load tasks from backend
  useEffect(() => {
    fetch(`${BASE_URL}/all`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const createTask = () => {
    fetch(`${BASE_URL}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then(() => {
        // reload tasks
        return fetch(`${BASE_URL}/all`);
      })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setNewTask({ name: "", taskDuration: 0, frequency: "DAILY", taskStartTime: "09:00:00" });
      });
  };

  const updateTask = (task: RecursiveTask) => {
    fetch(`${BASE_URL}/update/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    })
      .then(() => {
        return fetch(`${BASE_URL}/all`);
      })
      .then((res) => res.json())
      .then((data) => setTasks(data));
  };

  const deleteTask = (id?: number) => {
    fetch(`${BASE_URL}/delete/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTasks(tasks.filter((t) => t.id !== id));
      });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Recursive Tasks</h1>

      {/* New Task Form */}
      <div className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="Task name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Duration"
          value={newTask.taskDuration}
          onChange={(e) => setNewTask({ ...newTask, taskDuration: Number(e.target.value) })}
          className="border p-2 w-full"
        />
        <select
          value={newTask.frequency}
          onChange={(e) => setNewTask({ ...newTask, frequency: e.target.value })}
          className="border p-2 w-full"
        >
          <option value="DAILY">DAILY</option>
          <option value="WEEKLY">WEEKLY</option>
          <option value="MONTHLY">MONTHLY</option>
        </select>
        <input
          type="time"
          value={newTask.taskStartTime}
          onChange={(e) => setNewTask({ ...newTask, taskStartTime: e.target.value })}
          className="border p-2 w-full"
        />
        <button onClick={createTask} className="bg-blue-500 text-white p-2 rounded">
          Create Task
        </button>
      </div>

      {/* Tasks Table */}
      {tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Name</th>
              <th className="border p-2">Duration</th>
              <th className="border p-2">Frequency</th>
              <th className="border p-2">Start Time</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td className="border p-2">
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
                    className="border p-1 w-full"
                  />
                </td>
                <td className="border p-2">
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
                    className="border p-1 w-full"
                  />
                </td>
                <td className="border p-2">
                  <select
                    value={task.frequency}
                    onChange={(e) =>
                      setTasks(
                        tasks.map((t) =>
                          t.id === task.id ? { ...t, frequency: e.target.value } : t
                        )
                      )
                    }
                    className="border p-1 w-full"
                  >
                    <option value="DAILY">DAILY</option>
                    <option value="WEEKLY">WEEKLY</option>
                    <option value="MONTHLY">MONTHLY</option>
                  </select>
                </td>
                <td className="border p-2">
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
                    className="border p-1 w-full"
                  />
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => updateTask(task)}
                    className="bg-green-500 text-white px-2 py-1 mr-2 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Page;
