import React, { useState, useEffect } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [createFormData, setCreateFormData] = useState({
    title: "",
    description: "",
  });
  const [updateFormData, setUpdateFormData] = useState({
    title: "",
    description: "",
  });
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks`);
    const tasks = await response.json();
    setTasks(tasks);
  };

  const cleanUpdate = async () => {
    setTaskToUpdate(null);
    setUpdateFormData({ title: "", description: "" });
  };

  const setUpdateTask = async (id: number) => {
    const task = tasks.find((task) => task.id == id);
    if (task) {
      setTaskToUpdate(task);
      setUpdateFormData({ title: task.title, description: task.description });
    }
  };

  const createTask = async () => {
    if (!createFormData.title || !createFormData.description) {
      alert("Please fill in all fields");
      return;
    }
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createFormData),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
  };

  const updateTask = async (id: number) => {
    if (!updateFormData.title || !updateFormData.description) {
      alert("Please fill in at least one field");
      return;
    }
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateFormData),
    });
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          ...updateFormData,
        };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
    cleanUpdate();
  };

  const deleteTask = async (id: number) => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id != id));
  };

  return (
    <div>
      <h1>Task Management App</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            <button onClick={() => setUpdateTask(task.id)}>Update</button>
          </li>
        ))}
      </ul>
      {taskToUpdate && (
        <div>
          <h2>Update Task - {taskToUpdate.title}</h2>
          <input
            type="text"
            placeholder="Title"
            value={updateFormData.title}
            onChange={(e) =>
              setUpdateFormData({ ...updateFormData, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Description"
            value={updateFormData.description}
            onChange={(e) =>
              setUpdateFormData({
                ...updateFormData,
                description: e.target.value,
              })
            }
          />
          <button onClick={() => updateTask(taskToUpdate.id)}>Update</button>
          <button onClick={cleanUpdate}>Cancel</button>
        </div>
      )}
      <div>
        <h2>Create Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={createFormData.title}
          onChange={(e) =>
            setCreateFormData({ ...createFormData, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={createFormData.description}
          onChange={(e) =>
            setCreateFormData({
              ...createFormData,
              description: e.target.value,
            })
          }
        />
        <button onClick={createTask}>Create</button>
      </div>
    </div>
  );
};

export default App;
