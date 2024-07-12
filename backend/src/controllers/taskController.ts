import { Request, Response } from "express";
import Task from "../interfaces/Task";

let tasks: Task[] = [];
let nextTaskId = 1;

const getTasks = async (request: Request, response: Response) => {
  return response.json(tasks);
};

const createTask = async (request: Request, response: Response) => {};
const deleteTask = async (request: Request, response: Response) => {};

export { getTasks, createTask, deleteTask };
