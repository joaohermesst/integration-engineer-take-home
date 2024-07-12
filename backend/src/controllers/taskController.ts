import { Request, Response } from "express";

let tasks: number[] = [];
let nextTaskId = 1;

const getTasks = async (request: Request, response: Response) => {
  return response.json(tasks);
};

const createTask = async (request: Request, response: Response) => {};
const deleteTask = async (request: Request, response: Response) => {};

export { getTasks, createTask, deleteTask };
