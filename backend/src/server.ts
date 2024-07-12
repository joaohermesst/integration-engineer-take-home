import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());

let tasks: number[] = [];
let nextTaskId = 1;

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {});

app.delete("/tasks/:id", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
