import express from "express";
import {
  getTasks,
  createTask,
  deleteTask,
} from "../controllers/taskController";
import { validateData } from "../middlewares/validateDataMiddleware";
import { createTaskSchema } from "../schemas/taskSchema";

const router = express.Router();

router.get("/", getTasks);
router.post("/", validateData(createTaskSchema), createTask);
router.delete("/:id", deleteTask);

export default router;
