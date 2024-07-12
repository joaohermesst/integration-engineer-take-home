import { Request, Response } from "express";
import Task from "../interfaces/Task";

let tasks: Task[] = [];
let nextTaskId = 1;

const getTasks = async (_request: Request, response: Response) => {
  return response.json(tasks);
};

const createTask = async (request: Request, response: Response) => {
  const { title, description } = request.body;
  const newTask: Task = {
    id: nextTaskId++,
    title,
    description,
  };
  tasks.push(newTask);
  return response.status(201).json(newTask);
};

const deleteTask = async (request: Request, response: Response) => {
  const id = parseInt(request.params.id);
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex === -1) {
    return response.status(404).json({ error: "Task not found" });
  }
  tasks.splice(taskIndex, 1);
  return response.status(204).send();
};

export { getTasks, createTask, deleteTask };
