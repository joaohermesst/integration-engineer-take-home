import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

let tasks: number[] = [];
let nextTaskId = 1;

app.get("/tasks", (_req: Request, res: Response) => {
  res.json(tasks);
});

app.post("/tasks", (_req: Request, _res: Response) => {});

app.delete("/tasks/:id", (_req: Request, _res: Response) => {});

export default app;
