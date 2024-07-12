import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import taskRoutes from "./routes/taskRoutes";

const app = express();

app.use(bodyParser.json());

app.use("/tasks", taskRoutes);

export default app;
